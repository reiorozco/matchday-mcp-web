<script lang="ts">
	let {
		url,
		name,
		size = 24
	}: { url?: string | null; name: string; size?: number } = $props();

	let failed = $state(false);
	const initials = $derived(
		name
			.replace(/\b(FC|CF|AFC|SC|AC|CA)\b/g, '')
			.trim()
			.split(/\s+/)
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase()
	);
</script>

{#if url && !failed}
	<img
		src={url}
		alt=""
		width={size}
		height={size}
		loading="lazy"
		class="inline-block object-contain"
		style="width:{size}px;height:{size}px"
		onerror={() => (failed = true)}
	/>
{:else}
	<span
		class="inline-grid place-items-center rounded-full bg-surface-2 font-mono text-[10px] font-bold text-muted"
		style="width:{size}px;height:{size}px"
		aria-hidden="true">{initials}</span
	>
{/if}
