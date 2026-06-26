import { json } from '@sveltejs/kit';
import { BadRequest } from './matchday';
import { FootballDataError } from './footballdata';

/** Map domain errors to JSON responses with sensible status codes. */
export function fail(e: unknown) {
	if (e instanceof BadRequest) return json({ error: e.message }, { status: 400 });
	if (e instanceof FootballDataError) {
		return json({ error: e.message }, { status: e.status === 429 ? 429 : 502 });
	}
	console.error('[api] unexpected error:', e);
	return json({ error: 'Unexpected error fetching football data.' }, { status: 500 });
}
