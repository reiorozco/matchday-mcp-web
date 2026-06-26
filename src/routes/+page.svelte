<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Dashboard from '$lib/components/Dashboard.svelte';
	import InstallBlock from '$lib/components/InstallBlock.svelte';

	const repoUrl = 'https://github.com/reiorozco/matchday-mcp';
	const npmUrl = 'https://www.npmjs.com/package/matchday-mcp';
	const siteUrl = 'https://matchday-mcp-web.vercel.app';
	const title = 'matchday-mcp — live football data for your AI';
	const description =
		'An open-source Model Context Protocol (MCP) server that streams live football data — standings, fixtures, form and top scorers — into Claude and any MCP client. TypeScript + Zod.';

	const TOOLS = [
		{ name: 'get_standings', desc: 'Full league table for any of 12 top competitions.' },
		{ name: 'get_matches', desc: 'Fixtures and results, filtered by matchday or status.' },
		{ name: 'get_top_scorers', desc: 'The Golden Boot race for a competition.' },
		{ name: 'find_team', desc: 'Look up any club — country, stadium, founding year.' },
		{ name: 'get_team_matches', desc: "A club's recent form and upcoming fixtures." },
		{ name: 'compare_teams', desc: 'Head-to-head on recent form and W/D/L.' }
	];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={siteUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{siteUrl}/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{siteUrl}/og.png" />
</svelte:head>

<Hero {repoUrl} />

<Dashboard />

<!-- Tools -->
<section class="border-t border-border bg-surface">
	<div class="mx-auto max-w-5xl px-6 py-20 sm:py-28">
		<div class="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
			<div>
				<h2 class="font-display text-3xl sm:text-4xl">Six tools<br />your AI can call</h2>
				<p class="mt-4 max-w-md text-lg leading-relaxed text-muted">
					Each tool has a typed, Zod-validated schema, so the model knows exactly how to call it —
					and gets clean, readable results back.
				</p>
				<div class="mt-6 flex flex-wrap gap-3">
					<a href={repoUrl} class="font-semibold text-primary-strong hover:underline">GitHub ↗</a>
					<a href={npmUrl} class="font-semibold text-primary-strong hover:underline">npm ↗</a>
				</div>
			</div>

			<dl class="rounded-2xl border border-border bg-bg">
				{#each TOOLS as t, i (t.name)}
					<div
						class="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(150px,auto)_1fr] sm:gap-4 {i > 0
							? 'border-t border-border/70'
							: ''}"
					>
						<dt class="font-mono text-sm font-semibold text-primary-strong">{t.name}</dt>
						<dd class="text-sm text-muted">{t.desc}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<!-- Install -->
<section id="install" class="scroll-mt-8 border-t border-border">
	<div class="mx-auto max-w-3xl px-6 py-20 sm:py-28">
		<h2 class="font-display text-3xl sm:text-4xl">Install in under a minute</h2>
		<ol class="mt-8 space-y-6">
			<li class="flex gap-4">
				<span
					class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/12 font-mono text-sm font-bold text-primary-strong"
					>1</span
				>
				<p class="pt-1 text-lg leading-relaxed">
					Grab a free API token at
					<a
						href="https://www.football-data.org/client/register"
						class="font-semibold text-primary-strong hover:underline">football-data.org</a
					> (about a minute).
				</p>
			</li>
			<li class="flex gap-4">
				<span
					class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/12 font-mono text-sm font-bold text-primary-strong"
					>2</span
				>
				<div class="min-w-0 flex-1 space-y-3">
					<p class="pt-1 text-lg leading-relaxed">Add the server to your Claude Desktop config:</p>
					<InstallBlock />
				</div>
			</li>
			<li class="flex gap-4">
				<span
					class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/12 font-mono text-sm font-bold text-primary-strong"
					>3</span
				>
				<p class="pt-1 text-lg leading-relaxed">
					Restart Claude and ask: <em class="text-ink">"How's Real Madrid doing this season?"</em>
				</p>
			</li>
		</ol>
		<p class="mt-8 text-sm text-muted">
			Works in any MCP client. In Claude Code:
			<code class="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[13px]"
				>claude mcp add matchday -e FOOTBALL_DATA_TOKEN=… -- npx -y matchday-mcp</code
			>
		</p>
	</div>
</section>

<footer class="border-t border-border bg-night text-night-muted">
	<div
		class="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between"
	>
		<p class="text-sm">
			<span class="font-display text-night-ink">matchday·mcp</span> — built by
			<a href={repoUrl} class="text-night-ink hover:underline">Reinaldo Orozco</a>
		</p>
		<p class="text-sm">
			Data by
			<a href="https://www.football-data.org" class="text-night-ink hover:underline"
				>football-data.org</a
			>
			· <a href={repoUrl} class="hover:underline">GitHub</a> ·
			<a href={npmUrl} class="hover:underline">npm</a> · MIT
		</p>
	</div>
</footer>
