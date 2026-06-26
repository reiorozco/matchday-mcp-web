<script lang="ts">
	import Crest from './Crest.svelte';
	import FormBadge from './FormBadge.svelte';
	import MatchList from './MatchList.svelte';
	import { resource } from '$lib/resource.svelte';
	import type { TeamResponse } from '$lib/types';

	const PICKS = ['Arsenal', 'Real Madrid', 'Liverpool', 'Barcelona', 'Bayern', 'Inter'];

	let query = $state('');
	let submitted = $state('Arsenal');

	const res = resource<TeamResponse>(() =>
		submitted ? `/api/team?name=${encodeURIComponent(submitted)}` : null
	);

	function search(name: string) {
		submitted = name.trim();
		query = '';
	}
</script>

<div class="space-y-5">
	<form
		onsubmit={(e) => {
			e.preventDefault();
			if (query.trim()) search(query);
		}}
		class="flex gap-2"
	>
		<input
			bind:value={query}
			type="text"
			placeholder="Search a club… e.g. Real Madrid"
			aria-label="Club name"
			class="flex-1 rounded-xl border border-border bg-bg px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-primary"
		/>
		<button
			type="submit"
			class="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
			>Search</button
		>
	</form>

	<div class="flex flex-wrap gap-2">
		{#each PICKS as p (p)}
			<button
				type="button"
				onclick={() => search(p)}
				class="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-primary/40 hover:text-ink"
				>{p}</button
			>
		{/each}
	</div>

	{#if res.error}
		<p class="rounded-xl border border-loss/30 bg-loss/5 px-4 py-3 text-sm text-loss">{res.error}</p>
	{:else if res.loading && !res.data}
		<div class="h-64 animate-pulse rounded-2xl bg-surface-2"></div>
	{:else if res.data}
		{@const t = res.data.team}
		<div class="rounded-2xl border border-border bg-bg p-5">
			<div class="flex items-center gap-4">
				<Crest url={t.crest} name={t.name} size={56} />
				<div class="min-w-0">
					<h3 class="font-display truncate text-2xl">{t.name}</h3>
					<p class="mt-0.5 text-sm text-muted">
						{[t.area?.name, t.venue, t.founded ? `est. ${t.founded}` : null]
							.filter(Boolean)
							.join(' · ')}
					</p>
				</div>
			</div>

			<div class="mt-5 flex items-center gap-3 border-t border-border pt-4">
				<span class="text-xs font-medium uppercase tracking-wide text-muted">Form</span>
				<FormBadge form={res.data.form} size="md" />
			</div>

			<div class="mt-4 grid gap-6 sm:grid-cols-2">
				<div>
					<h4 class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Recent results</h4>
					{#if res.data.recent.length}
						<MatchList matches={res.data.recent} />
					{:else}
						<p class="py-3 text-sm text-muted">No recent league results.</p>
					{/if}
				</div>
				<div>
					<h4 class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">Upcoming</h4>
					{#if res.data.upcoming.length}
						<MatchList matches={res.data.upcoming} />
					{:else}
						<p class="py-3 text-sm text-muted">No upcoming league fixtures.</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
