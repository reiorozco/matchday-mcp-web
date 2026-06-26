<script lang="ts">
	const config = `{
  "mcpServers": {
    "matchday": {
      "command": "npx",
      "args": ["-y", "matchday-mcp"],
      "env": { "FOOTBALL_DATA_TOKEN": "your_free_token" }
    }
  }
}`;

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	async function copy() {
		try {
			await navigator.clipboard.writeText(config);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 1800);
		} catch {
			/* clipboard unavailable */
		}
	}
</script>

<div class="overflow-hidden rounded-2xl border border-night-border bg-night text-night-ink">
	<div class="flex items-center justify-between border-b border-night-border px-4 py-2.5">
		<span class="font-mono text-xs text-night-muted">claude_desktop_config.json</span>
		<button
			type="button"
			onclick={copy}
			class="rounded-md border border-night-border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-white/5"
			aria-live="polite"
		>
			{copied ? 'Copied ✓' : 'Copy'}
		</button>
	</div>
	<pre class="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed"><code>{config}</code></pre>
</div>
