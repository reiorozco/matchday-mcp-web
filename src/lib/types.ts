export interface TeamRef {
	id: number;
	name: string;
	shortName: string | null;
	tla: string | null;
	crest?: string | null;
}

export interface TableRow {
	position: number;
	team: TeamRef;
	playedGames: number;
	form: string | null;
	won: number;
	draw: number;
	lost: number;
	points: number;
	goalsFor: number;
	goalsAgainst: number;
	goalDifference: number;
}

export interface Match {
	id: number;
	utcDate: string;
	status: string;
	matchday: number | null;
	competition: { name: string } | null;
	homeTeam: TeamRef;
	awayTeam: TeamRef;
	score: { winner: string | null; fullTime: { home: number | null; away: number | null } };
}

export interface Scorer {
	player: { id: number; name: string; nationality: string | null };
	team: { id: number; name: string };
	goals: number;
	assists: number | null;
	penalties: number | null;
	playedMatches: number | null;
}

export interface Team {
	id: number;
	name: string;
	shortName: string | null;
	tla: string | null;
	crest: string | null;
	founded: number | null;
	venue: string | null;
	website: string | null;
	area?: { name: string | null } | null;
	runningCompetitions?: { name: string }[];
}

export type Outcome = 'W' | 'D' | 'L' | '?';

export interface StandingsResponse {
	code: string;
	league: string;
	season: string;
	table: TableRow[];
}
export interface ScorersResponse {
	code: string;
	league: string;
	season: string;
	scorers: Scorer[];
}
export interface TeamResponse {
	team: Team;
	season: string;
	form: Outcome[];
	recent: Match[];
	upcoming: Match[];
}
export interface CompareSide {
	team: Team;
	form: Outcome[];
	w: number;
	d: number;
	l: number;
	recent: Match[];
}
export interface CompareResponse {
	season: string;
	a: CompareSide;
	b: CompareSide;
}

export const LEAGUES = [
	{ code: 'PL', name: 'Premier League', country: 'England' },
	{ code: 'PD', name: 'La Liga', country: 'Spain' },
	{ code: 'BL1', name: 'Bundesliga', country: 'Germany' },
	{ code: 'SA', name: 'Serie A', country: 'Italy' },
	{ code: 'FL1', name: 'Ligue 1', country: 'France' },
	{ code: 'DED', name: 'Eredivisie', country: 'Netherlands' },
	{ code: 'PPL', name: 'Primeira Liga', country: 'Portugal' },
	{ code: 'BSA', name: 'Brasileirão', country: 'Brazil' }
] as const;
