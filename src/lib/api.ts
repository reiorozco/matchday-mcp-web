/** Fetch JSON from our internal API, surfacing the server's error message. */
export async function getJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
	const res = await fetch(url, { signal });
	let data: unknown;
	try {
		data = await res.json();
	} catch {
		throw new Error(`Request failed (${res.status})`);
	}
	if (!res.ok) {
		const msg = (data as { error?: string })?.error ?? `Request failed (${res.status})`;
		throw new Error(msg);
	}
	return data as T;
}

/** Date helpers for match rendering. */
export function matchDate(iso: string): string {
	return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
export function matchDateTime(iso: string): string {
	return new Date(iso).toLocaleString(undefined, {
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}
