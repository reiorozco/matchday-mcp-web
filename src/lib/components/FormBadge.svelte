<script lang="ts">
	import type { Outcome } from '$lib/types';

	let { form, size = 'sm' }: { form: Outcome[]; size?: 'sm' | 'md' } = $props();

	const label: Record<Outcome, string> = { W: 'Win', D: 'Draw', L: 'Loss', '?': 'Unknown' };
	const tone: Record<Outcome, string> = {
		W: 'bg-win/15 text-win',
		D: 'bg-draw/15 text-draw',
		L: 'bg-loss/15 text-loss',
		'?': 'bg-surface-2 text-muted'
	};
	const box = $derived(size === 'md' ? 'h-7 w-7 text-sm' : 'h-5 w-5 text-[11px]');
</script>

{#if form.length}
	<span class="inline-flex gap-1" aria-label="Recent form (most recent last)">
		{#each form as o, i (i)}
			<span
				class="inline-grid place-items-center rounded font-mono font-bold {box} {tone[o]}"
				title={label[o]}
			>
				{o}
			</span>
		{/each}
	</span>
{:else}
	<span class="text-sm text-muted">No recent form</span>
{/if}
