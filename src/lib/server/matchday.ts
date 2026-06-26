/**
 * Server-side data helpers for the playground. Wraps the shared football-data client with a
 * module-level singleton (so a warm serverless instance reuses its cache) and shapes the
 * responses the UI needs. Mirrors the logic in the matchday-mcp tools.
 */

import { env } from '$env/dynamic/private';
import {
	FootballData,
	resolveCompetitionCode,
	type Match,
	type Scorer,
	type TableRow,
	type Team
} from './footballdata';

const db = new FootballData({
	apiKey: env.FOOTBALL_DATA_TOKEN,
	cacheTtlMs: 10 * 60 * 1000 // 10 min — friendlier to the 10 req/min free tier
});

export type { Match, Scorer, TableRow, Team };

/** Domestic leagues shown in the UI (these expose a clean standings table). */
export const LEAGUES = [
	{ code: 'PL', name: 'Premier League', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England' },
	{ code: 'PD', name: 'La Liga', country: '🇪🇸 Spain' },
	{ code: 'BL1', name: 'Bundesliga', country: '🇩🇪 Germany' },
	{ code: 'SA', name: 'Serie A', country: '🇮🇹 Italy' },
	{ code: 'FL1', name: 'Ligue 1', country: '🇫🇷 France' },
	{ code: 'DED', name: 'Eredivisie', country: '🇳🇱 Netherlands' },
	{ code: 'PPL', name: 'Primeira Liga', country: '🇵🇹 Portugal' },
	{ code: 'BSA', name: 'Brasileirão', country: '🇧🇷 Brazil' }
] as const;

const LEAGUE_NAME = new Map<string, string>(LEAGUES.map((l) => [l.code, l.name]));

/**
 * football-data season = the start year ("2024" = 2024-25). Default to the in-progress or
 * most recently completed season, since the API's "current season" points at the next,
 * not-yet-started season during the off-season. Cutover in August.
 */
export function getCurrentSeason(now = new Date()): string {
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	return String(month >= 8 ? year : year - 1);
}

export class BadRequest extends Error {}

function leagueOrThrow(competition: string): string {
	const code = resolveCompetitionCode(competition);
	if (!code) throw new BadRequest(`Unknown competition "${competition}".`);
	return code;
}

/** W/D/L from one team's perspective for a finished match. */
function outcomeFor(teamId: number, m: Match): 'W' | 'D' | 'L' | '?' {
	const { home, away } = m.score.fullTime;
	if (home == null || away == null) return '?';
	const isHome = m.homeTeam.id === teamId;
	const us = isHome ? home : away;
	const them = isHome ? away : home;
	if (us > them) return 'W';
	if (us < them) return 'L';
	return 'D';
}

export async function getStandings(competition: string, season?: string) {
	const code = leagueOrThrow(competition);
	const s = season ?? getCurrentSeason();
	const table: TableRow[] = await db.standings(code, s);
	return { code, league: LEAGUE_NAME.get(code) ?? code, season: s, table };
}

export async function getScorers(competition: string, season?: string, limit = 15) {
	const code = leagueOrThrow(competition);
	const s = season ?? getCurrentSeason();
	const scorers: Scorer[] = await db.scorers(code, limit, s);
	return { code, league: LEAGUE_NAME.get(code) ?? code, season: s, scorers };
}

async function teamLeagueMatches(team: Team, season: string): Promise<Match[]> {
	const code = db.competitionCodeForTeam(team.id);
	if (!code) return [];
	const all = await db.competitionMatches(code, { season });
	return all
		.filter((m) => m.homeTeam.id === team.id || m.awayTeam.id === team.id)
		.sort((a, b) => a.utcDate.localeCompare(b.utcDate));
}

export async function getTeam(name: string, season?: string) {
	const team = await db.findTeam(name);
	if (!team) throw new BadRequest(`No team found matching "${name}".`);
	const s = season ?? getCurrentSeason();
	const matches = await teamLeagueMatches(team, s);
	const finished = matches.filter((m) => m.status === 'FINISHED');
	const upcoming = matches.filter((m) => m.status !== 'FINISHED');
	const recent = finished.slice(-5);
	return {
		team,
		season: s,
		form: recent.map((m) => outcomeFor(team.id, m)),
		recent,
		upcoming: upcoming.slice(0, 5)
	};
}

export async function compareTeams(a: string, b: string, season?: string) {
	const [teamA, teamB] = await Promise.all([db.findTeam(a), db.findTeam(b)]);
	if (!teamA) throw new BadRequest(`No team found matching "${a}".`);
	if (!teamB) throw new BadRequest(`No team found matching "${b}".`);
	const s = season ?? getCurrentSeason();
	const [aAll, bAll] = await Promise.all([
		teamLeagueMatches(teamA, s),
		teamLeagueMatches(teamB, s)
	]);
	const side = (team: Team, all: Match[]) => {
		const recent = all.filter((m) => m.status === 'FINISHED').slice(-5);
		const o = recent.map((m) => outcomeFor(team.id, m));
		return {
			team,
			form: o,
			w: o.filter((x) => x === 'W').length,
			d: o.filter((x) => x === 'D').length,
			l: o.filter((x) => x === 'L').length,
			recent
		};
	};
	return { season: s, a: side(teamA, aAll), b: side(teamB, bAll) };
}
