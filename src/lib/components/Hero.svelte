<script lang="ts">
	let { repoUrl }: { repoUrl: string } = $props();
</script>

<header class="hero relative overflow-hidden bg-night text-night-ink">
	<!-- Floodlight glows -->
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<div
			class="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
			style="background: radial-gradient(closest-side, var(--color-primary), transparent 70%)"
		></div>
		<div
			class="absolute -right-40 top-20 h-96 w-96 rounded-full opacity-40 blur-3xl"
			style="background: radial-gradient(closest-side, var(--color-accent), transparent 70%)"
		></div>
	</div>

	<!-- Faint pitch markings -->
	<svg
		class="pointer-events-none absolute inset-x-0 bottom-0 h-72 w-full opacity-[0.12]"
		viewBox="0 0 1200 300"
		fill="none"
		preserveAspectRatio="xMidYMax slice"
		aria-hidden="true"
	>
		<g stroke="var(--color-night-ink)" stroke-width="1.5">
			<circle cx="600" cy="300" r="120" />
			<line x1="0" y1="300" x2="1200" y2="300" />
			<rect x="450" y="300" width="300" height="160" />
			<rect x="540" y="300" width="120" height="70" />
		</g>
	</svg>

	<div class="relative mx-auto max-w-6xl px-6 pb-24 pt-8 sm:pb-32 sm:pt-10">
		<nav class="flex items-center justify-between">
			<span class="flex items-center gap-2 font-display text-lg tracking-tight">
				<span class="grid h-7 w-7 place-items-center rounded-full bg-night-ink text-night"
					>⚽</span
				>matchday<span class="text-night-muted">·mcp</span>
			</span>
			<a
				href={repoUrl}
				class="rounded-lg border border-night-border px-3 py-1.5 text-sm font-medium text-night-ink transition-colors hover:bg-white/5"
				>GitHub ↗</a
			>
		</nav>

		<div class="mt-16 max-w-3xl sm:mt-24">
			<span
				class="reveal inline-flex items-center gap-2 rounded-full border border-night-border px-3 py-1 text-xs font-medium text-night-muted"
			>
				<span class="relative flex h-2 w-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-win opacity-75"
					></span>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-win"></span>
				</span>
				Live data · Model Context Protocol
			</span>

			<h1 class="reveal font-display mt-6 text-5xl leading-[0.95] sm:text-7xl">
				Give your AI<br />the matchday.
			</h1>

			<p class="reveal mt-6 max-w-xl text-lg leading-relaxed text-night-muted">
				An open-source <strong class="font-semibold text-night-ink">MCP server</strong> that streams
				live football data — standings, fixtures, form and scorers — straight into Claude and any
				MCP client. Built with TypeScript &amp; Zod.
			</p>

			<div class="reveal mt-9 flex flex-wrap items-center gap-3">
				<a
					href="#demo"
					class="rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
					>Try the live demo</a
				>
				<a
					href="#install"
					class="rounded-xl border border-night-border px-5 py-3 font-semibold text-night-ink transition-colors hover:bg-white/5"
					>Install in Claude</a
				>
			</div>
		</div>
	</div>
</header>

<style>
	.reveal {
		animation: rise 0.7s var(--ease-out-quint) backwards;
	}
	.reveal:nth-child(1) {
		animation-delay: 0.05s;
	}
	.reveal:nth-child(2) {
		animation-delay: 0.15s;
	}
	.reveal:nth-child(3) {
		animation-delay: 0.25s;
	}
	.reveal:nth-child(4) {
		animation-delay: 0.35s;
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(1rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal {
			animation: none;
		}
	}
</style>
