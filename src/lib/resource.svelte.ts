import { getJSON } from './api';

/**
 * Reactive data resource: re-fetches whenever the reactive `getUrl()` changes.
 * Return null from getUrl to stay idle (e.g. before a search is submitted).
 */
export function resource<T>(getUrl: () => string | null) {
	let data = $state<T | null>(null);
	let loading = $state(false);
	let error = $state<string | null>(null);

	$effect(() => {
		const url = getUrl();
		if (!url) return;
		let cancelled = false;
		loading = true;
		error = null;
		getJSON<T>(url)
			.then((d) => {
				if (!cancelled) {
					data = d;
					loading = false;
				}
			})
			.catch((e) => {
				if (!cancelled) {
					error = e instanceof Error ? e.message : 'Something went wrong';
					loading = false;
				}
			});
		return () => {
			cancelled = true;
		};
	});

	return {
		get data() {
			return data;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		}
	};
}
