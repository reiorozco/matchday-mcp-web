<script lang="ts">
	import { LEAGUES } from '$lib/types';

	let { value = $bindable() }: { value: string } = $props();
</script>

<div class="flex flex-wrap gap-2" role="group" aria-label="Choose a league">
	{#each LEAGUES as l (l.code)}
		<button
			type="button"
			aria-pressed={value === l.code}
			onclick={() => (value = l.code)}
			class="rounded-full border px-3.5 py-2 text-sm font-medium transition-colors {value === l.code
				? 'border-primary bg-primary text-white'
				: 'border-border bg-bg text-muted hover:border-primary/40 hover:text-ink'}"
		>
			{l.name}
		</button>
	{/each}
</div>
