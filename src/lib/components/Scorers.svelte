<script lang="ts">
	import LeagueChips from './LeagueChips.svelte';
	import { resource } from '$lib/resource.svelte';
	import type { ScorersResponse } from '$lib/types';

	let code = $state('PL');
	const res = resource<ScorersResponse>(() => `/api/scorers?competition=${code}`);
</script>

<div class="space-y-5">
	<LeagueChips bind:value={code} />

	{#if res.error}
		<p class="rounded-xl border border-loss/30 bg-loss/5 px-4 py-3 text-sm text-loss">{res.error}</p>
	{:else if res.loading && !res.data}
		<div class="space-y-2" aria-hidden="true">
			{#each Array(8) as _, i (i)}
				<div class="h-12 animate-pulse rounded-lg bg-surface-2"></div>
			{/each}
		</div>
	{:else if res.data}
		<ol class="overflow-hidden rounded-2xl border border-border bg-bg">
			{#each res.data.scorers as s, i (s.player.id)}
				<li
					class="flex items-center gap-3 border-t border-border/60 px-4 py-3 first:border-t-0 transition-colors hover:bg-surface"
				>
					<span
						class="grid h-7 w-7 shrink-0 place-items-center rounded-md text-sm font-bold {i < 3
							? 'bg-primary/12 text-primary'
							: 'text-muted'}">{i + 1}</span
					>
					<div class="min-w-0 flex-1">
						<p class="truncate font-medium">{s.player.name}</p>
						<p class="truncate text-xs text-muted">{s.team.name}</p>
					</div>
					<div class="shrink-0 text-right">
						<span class="font-mono text-lg font-bold tabular-nums">{s.goals}</span>
						<span class="ml-1 text-xs text-muted">goals</span>
						{#if s.assists}<p class="text-xs text-muted">{s.assists} assists</p>{/if}
					</div>
				</li>
			{/each}
		</ol>
	{/if}
</div>
