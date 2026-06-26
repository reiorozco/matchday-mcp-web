<script lang="ts">
	import LeagueChips from './LeagueChips.svelte';
	import Crest from './Crest.svelte';
	import FormBadge from './FormBadge.svelte';
	import { resource } from '$lib/resource.svelte';
	import type { StandingsResponse, Outcome } from '$lib/types';

	let code = $state('PL');
	const res = resource<StandingsResponse>(() => `/api/standings?competition=${code}`);

	function form(s: string | null): Outcome[] {
		if (!s) return [];
		return s.split(',').map((x) => x.trim()[0] as Outcome).slice(-5);
	}
</script>

<div class="space-y-5">
	<LeagueChips bind:value={code} />

	{#if res.error}
		<p class="rounded-xl border border-loss/30 bg-loss/5 px-4 py-3 text-sm text-loss">
			{res.error}
		</p>
	{:else if res.loading && !res.data}
		<div class="space-y-2" aria-hidden="true">
			{#each Array(8) as _, i (i)}
				<div class="h-11 animate-pulse rounded-lg bg-surface-2"></div>
			{/each}
		</div>
	{:else if res.data}
		{@const n = res.data.table.length}
		<div class="overflow-hidden rounded-2xl border border-border bg-bg">
			<div class="flex items-baseline justify-between border-b border-border px-4 py-3">
				<h3 class="font-display text-lg">{res.data.league}</h3>
				<span class="font-mono text-xs text-muted">{res.data.season}/{+res.data.season + 1}</span>
			</div>
			<div class="overflow-x-auto">
				<table class="w-full text-sm tabular-nums">
					<thead>
						<tr class="text-left text-xs uppercase tracking-wide text-muted">
							<th class="py-2 pl-4 pr-2 font-medium">#</th>
							<th class="px-2 py-2 font-medium">Club</th>
							<th class="px-2 py-2 text-center font-medium">P</th>
							<th class="hidden px-2 py-2 text-center font-medium sm:table-cell">W</th>
							<th class="hidden px-2 py-2 text-center font-medium sm:table-cell">D</th>
							<th class="hidden px-2 py-2 text-center font-medium sm:table-cell">L</th>
							<th class="px-2 py-2 text-center font-medium">GD</th>
							<th class="px-2 py-2 text-center font-semibold text-ink">Pts</th>
							<th class="hidden px-2 py-2 pr-4 text-right font-medium md:table-cell">Form</th>
						</tr>
					</thead>
					<tbody>
						{#each res.data.table as r (r.team.id)}
							<tr class="border-t border-border/60 transition-colors hover:bg-surface">
								<td class="py-2.5 pl-4 pr-2">
									<span
										class="grid h-6 w-6 place-items-center rounded-md text-xs font-bold {r.position <=
										4
											? 'bg-primary/12 text-primary'
											: r.position > n - 3
												? 'bg-loss/12 text-loss'
												: 'text-muted'}">{r.position}</span
									>
								</td>
								<td class="px-2 py-2.5">
									<span class="flex items-center gap-2.5">
										<Crest url={r.team.crest} name={r.team.name} />
										<span class="font-medium">{r.team.shortName ?? r.team.name}</span>
									</span>
								</td>
								<td class="px-2 py-2.5 text-center text-muted">{r.playedGames}</td>
								<td class="hidden px-2 py-2.5 text-center text-muted sm:table-cell">{r.won}</td>
								<td class="hidden px-2 py-2.5 text-center text-muted sm:table-cell">{r.draw}</td>
								<td class="hidden px-2 py-2.5 text-center text-muted sm:table-cell">{r.lost}</td>
								<td class="px-2 py-2.5 text-center text-muted">
									{r.goalDifference > 0 ? '+' : ''}{r.goalDifference}
								</td>
								<td class="px-2 py-2.5 text-center font-bold">{r.points}</td>
								<td class="hidden px-2 py-2.5 pr-4 md:table-cell">
									<span class="flex justify-end"><FormBadge form={form(r.form)} /></span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<p class="flex flex-wrap gap-x-4 gap-y-1 px-1 text-xs text-muted">
			<span><span class="mr-1 inline-block h-2 w-2 rounded-sm bg-primary/60"></span>Top 4</span>
			<span><span class="mr-1 inline-block h-2 w-2 rounded-sm bg-loss/60"></span>Relegation</span>
		</p>
	{/if}
</div>
