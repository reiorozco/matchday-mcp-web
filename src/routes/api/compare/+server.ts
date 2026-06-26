import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { compareTeams, BadRequest } from '$lib/server/matchday';
import { fail } from '$lib/server/respond';

export const GET: RequestHandler = async ({ url }) => {
	const a = url.searchParams.get('a')?.trim();
	const b = url.searchParams.get('b')?.trim();
	const season = url.searchParams.get('season') ?? undefined;
	try {
		if (!a || !b) throw new BadRequest('Both "a" and "b" query parameters are required.');
		return json(await compareTeams(a, b, season));
	} catch (e) {
		return fail(e);
	}
};
