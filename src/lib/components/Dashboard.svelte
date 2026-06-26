<script lang="ts">
	import Standings from './Standings.svelte';
	import TeamForm from './TeamForm.svelte';
	import Compare from './Compare.svelte';
	import Scorers from './Scorers.svelte';

	const TABS = [
		{ id: 'standings', label: 'Standings', tool: 'get_standings' },
		{ id: 'team', label: 'Team form', tool: 'get_team_matches' },
		{ id: 'compare', label: 'Compare', tool: 'compare_teams' },
		{ id: 'scorers', label: 'Top scorers', tool: 'get_top_scorers' }
	] as const;
	type TabId = (typeof TABS)[number]['id'];

	let active = $state<TabId>('standings');
	const current = $derived(TABS.find((t) => t.id === active)!);
	let tablistEl: HTMLDivElement;

	function focusTab(id: TabId) {
		active = id;
		tablistEl?.querySelector<HTMLButtonElement>(`#tab-${id}`)?.focus();
	}

	function onKeydown(e: KeyboardEvent) {
		const i = TABS.findIndex((t) => t.id === active);
		const last = TABS.length - 1;
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			focusTab(TABS[i === last ? 0 : i + 1].id);
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			focusTab(TABS[i === 0 ? last : i - 1].id);
		} else if (e.key === 'Home') {
			e.preventDefault();
			focusTab(TABS[0].id);
		} else if (e.key === 'End') {
			e.preventDefault();
			focusTab(TABS[last].id);
		}
	}
</script>

<section id="demo" class="mx-auto max-w-5xl scroll-mt-8 px-6 py-20 sm:py-28">
	<div class="max-w-2xl">
		<h2 class="font-display text-3xl sm:text-4xl">See it live</h2>
		<p class="mt-3 text-lg leading-relaxed text-muted">
			Every figure below is fetched in real time through the same data layer the MCP server exposes —
			no mock data. Each tab maps to a tool an AI assistant can call.
		</p>
	</div>

	<div
		bind:this={tablistEl}
		role="tablist"
		aria-label="Demo tools"
		tabindex="-1"
		onkeydown={onKeydown}
		class="mt-8 flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-surface p-1.5"
	>
		{#each TABS as t (t.id)}
			<button
				role="tab"
				id="tab-{t.id}"
				aria-selected={active === t.id}
				aria-controls="panel-{t.id}"
				tabindex={active === t.id ? 0 : -1}
				onclick={() => (active = t.id)}
				class="rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors {active === t.id
					? 'bg-bg text-ink shadow-sm'
					: 'text-muted hover:text-ink'}"
			>
				{t.label}
			</button>
		{/each}
	</div>

	<p class="mt-3 px-1 font-mono text-xs text-muted">
		tool: <span class="text-primary-strong">{current.tool}</span>
	</p>

	<div id="panel-{active}" role="tabpanel" aria-labelledby="tab-{active}" class="mt-5">
		{#if active === 'standings'}
			<Standings />
		{:else if active === 'team'}
			<TeamForm />
		{:else if active === 'compare'}
			<Compare />
		{:else if active === 'scorers'}
			<Scorers />
		{/if}
	</div>
</section>
