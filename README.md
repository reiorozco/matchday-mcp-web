# matchday-mcp-web

The live playground for **[matchday-mcp](https://github.com/reiorozco/matchday-mcp)** — an
open-source [Model Context Protocol](https://modelcontextprotocol.io) server that streams live
football data to AI assistants.

🔗 **Live:** https://matchday-mcp-web.vercel.app

The page presents the MCP server and proves it works with a real, interactive dashboard
(standings, team form, head-to-head comparison, top scorers) — all powered by the **same data
layer the server uses**, fetched live from [football-data.org](https://www.football-data.org).

## Stack

- **SvelteKit** + **Svelte 5** (runes)
- **Tailwind CSS v4**
- `@sveltejs/adapter-vercel`
- TypeScript, `svelte-check` clean

## How it works

The football-data.org token is server-only. SvelteKit server endpoints under `/api/*`
(`standings`, `team`, `compare`, `scorers`) call football-data.org with the token and return
shaped JSON; the browser never sees the key. The data client in `src/lib/server/footballdata.ts`
is vendored from the [matchday-mcp](https://github.com/reiorozco/matchday-mcp) package so the
playground and the MCP server share identical logic (caching, 429 backoff, team-name index).

## Development

```bash
npm install
echo "FOOTBALL_DATA_TOKEN=your_free_token" > .env   # free at football-data.org
npm run dev
```

| Variable | Required | Description |
|----------|----------|-------------|
| `FOOTBALL_DATA_TOKEN` | yes | Free token from football-data.org (server-side only). |

## Deploy

Deploys to Vercel as a SvelteKit project. Set `FOOTBALL_DATA_TOKEN` in the Vercel project's
Environment Variables.

## License

[MIT](./LICENSE) © Reinaldo Orozco · Data by [football-data.org](https://www.football-data.org)
