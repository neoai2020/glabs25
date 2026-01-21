# G-Labs 95

Dark, purple-neon, glassy creator OS to turn AI-generated images into income (Pinterest, Instagram assist, Stock). Built to stay “always-guided” for older/low-tech users, with dopamine-positive surfaces and clear guardrails.

## Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind v4 (utility-first, minimal config)
- Supabase client ready (auth/storage placeholders)
- Icons: lucide-react
- Styling: glassmorphism + custom globals, Geist font

## App structure (routes)
- `/` Command Center dashboard (banner, checklist, quick actions, stats, social rail)
- `/image-forge` Guided AI image generation flow (preset styles, batch ≤8, affiliate-ready toggle, skeleton states)
- `/monetization/library` Asset library with filters, link status, caption assist/export CTAs
- `/monetization/link-vault` Affiliate link table CRUD surface (default flag, copy)
- `/launchpad` Publishing/scheduling for Pinterest, Instagram (assisted), Stock, manual export; batch cap 5; review + warnings; status widget
- `/scheduler` Queue + history with retry/cancel and IG “prepared” status
- `/social-proof` Live feed, milestones, earnings-range cards with disclaimers
- `/academy` Short trainings + embedded CTA
- `/docs-help` Mini-docs, anti-spam do/don’t, inline guide CTA
- `/account` Profile, API keys, plan block, logout CTA

## Data + mocks
- Types in `src/lib/types.ts`
- Mock data in `src/lib/mockData.ts` powering UI placeholders
- Supabase client stub in `src/lib/supabaseClient.ts` (warns when env vars missing)

## Quickstart
```bash
npm install
npm run dev
# visit http://localhost:3000
```

## Environment
Set before running/building:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RAPIDAPI_KEY`
- `PINTEREST_TOKEN`
- `INSTAGRAM_TOKEN` (optional if assisted flow only)
- `STOCK_API_KEY`
- `NEXT_PUBLIC_APP_URL`

## Deployment
- Vercel-ready: `npm run build` then `vercel deploy` (or any Next-compatible host)
- Remote images allowlist configured for Unsplash placeholders (`next.config.ts`)

## Next steps (backlog)
- Wire Supabase tables: users, profiles, assets, link_vault, publishes, analytics_events, social_proof, docs_tooltips, settings (RLS on user_id; service role for jobs)
- Replace mocks with Supabase queries and mutations
- Integrate RapidAPI (DALL·E/image gen, background remover, ChatGPT caption assist) with bounded CFG/steps
- Implement Pinterest publish + IG assisted packaging + Stock adapter; add retries/backoff
- Add validation + guardrails (URL validation, banned terms, hashtag length, batch caps)
