<script lang="ts">
	import Crest from './Crest.svelte';
	import FormBadge from './FormBadge.svelte';
	import MatchList from './MatchList.svelte';
	import { resource } from '$lib/resource.svelte';
	import type { CompareResponse, CompareSide } from '$lib/types';

	let a = $state('Arsenal');
	let b = $state('Barcelona');
	let subA = $state('Arsenal');
	let subB = $state('Barcelona');

	const res = resource<CompareResponse>(() =>
		subA && subB
			? `/api/compare?a=${encodeURIComponent(subA)}&b=${encodeURIComponent(subB)}`
			: null
	);

	const sides = ['a', 'b'] as const;
	function side(d: CompareResponse, k: 'a' | 'b'): CompareSide {
		return d[k];
	}
</script>

<div class="space-y-5">
	<form
		onsubmit={(e) => {
			e.preventDefault();
			if (a.trim() && b.trim()) {
				subA = a.trim();
				subB = b.trim();
			}
		}}
		class="grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto]"
	>
		<input
			bind:value={a}
			aria-label="First club"
			placeholder="First club"
			class="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-primary"
		/>
		<span class="hidden place-items-center px-1 font-display text-muted sm:grid">vs</span>
		<input
			bind:value={b}
			aria-label="Second club"
			placeholder="Second club"
			class="rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none focus:border-primary"
		/>
		<button
			type="submit"
			class="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
			>Compare</button
		>
	</form>

	{#if res.error}
		<p class="rounded-xl border border-loss/30 bg-loss/5 px-4 py-3 text-sm text-loss">{res.error}</p>
	{:else if res.loading && !res.data}
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="h-72 animate-pulse rounded-2xl bg-surface-2"></div>
			<div class="h-72 animate-pulse rounded-2xl bg-surface-2"></div>
		</div>
	{:else if res.data}
		<div class="grid gap-4 sm:grid-cols-2">
			{#each sides as k (k)}
				{@const s = side(res.data, k)}
				<div class="rounded-2xl border border-border bg-bg p-5">
					<div class="flex items-center gap-3">
						<Crest url={s.team.crest} name={s.team.name} size={40} />
						<h3 class="font-display truncate text-xl">{s.team.shortName ?? s.team.name}</h3>
					</div>
					<div class="mt-4 flex items-center justify-between gap-2">
						<FormBadge form={s.form} size="md" />
						<span class="font-mono text-sm tabular-nums text-muted">
							<span class="text-win">{s.w}W</span> · {s.d}D ·
							<span class="text-loss">{s.l}L</span>
						</span>
					</div>
					<div class="mt-4 border-t border-border pt-3">
						<h4 class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Last 5</h4>
						<MatchList matches={s.recent} />
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
