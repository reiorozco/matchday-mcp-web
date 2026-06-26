import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getStandings } from '$lib/server/matchday';
import { fail } from '$lib/server/respond';

export const GET: RequestHandler = async ({ url }) => {
	const competition = url.searchParams.get('competition') ?? 'PL';
	const season = url.searchParams.get('season') ?? undefined;
	try {
		return json(await getStandings(competition, season));
	} catch (e) {
		return fail(e);
	}
};
