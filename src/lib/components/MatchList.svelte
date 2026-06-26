<script lang="ts">
	import Crest from './Crest.svelte';
	import { matchDate, matchDateTime } from '$lib/api';
	import type { Match } from '$lib/types';

	let { matches }: { matches: Match[] } = $props();

	function winner(m: Match): 'home' | 'away' | 'draw' | null {
		const { home, away } = m.score.fullTime;
		if (home == null || away == null) return null;
		return home > away ? 'home' : away > home ? 'away' : 'draw';
	}
</script>

<ul class="divide-y divide-border/60">
	{#each matches as m (m.id)}
		{@const w = winner(m)}
		{@const done = m.status === 'FINISHED'}
		<li class="flex items-center gap-3 py-2.5 text-sm">
			<span class="w-20 shrink-0 font-mono text-xs text-muted">
				{done ? matchDate(m.utcDate) : matchDateTime(m.utcDate)}
			</span>
			<span class="flex flex-1 items-center justify-end gap-2 text-right">
				<span class={w === 'home' ? 'font-semibold' : ''}>{m.homeTeam.shortName ?? m.homeTeam.name}</span>
				<Crest url={m.homeTeam.crest} name={m.homeTeam.name} size={20} />
			</span>
			{#if done}
				<span class="shrink-0 rounded-md bg-surface-2 px-2 py-0.5 font-mono text-sm font-bold tabular-nums">
					{m.score.fullTime.home}–{m.score.fullTime.away}
				</span>
			{:else}
				<span class="shrink-0 rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">vs</span>
			{/if}
			<span class="flex flex-1 items-center gap-2">
				<Crest url={m.awayTeam.crest} name={m.awayTeam.name} size={20} />
				<span class={w === 'away' ? 'font-semibold' : ''}>{m.awayTeam.shortName ?? m.awayTeam.name}</span>
			</span>
		</li>
	{/each}
</ul>
