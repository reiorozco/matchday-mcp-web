import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getTeam, BadRequest } from '$lib/server/matchday';
import { fail } from '$lib/server/respond';

export const GET: RequestHandler = async ({ url }) => {
	const name = url.searchParams.get('name')?.trim();
	const season = url.searchParams.get('season') ?? undefined;
	try {
		if (!name) throw new BadRequest('Missing "name" query parameter.');
		return json(await getTeam(name, season));
	} catch (e) {
		return fail(e);
	}
};
