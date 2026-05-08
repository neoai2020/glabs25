# G-Labs 95

Dark, glassy AI image creation and publishing studio. Generate images with AI, organize them in a library, attach affiliate links, and publish to Pinterest, Instagram (assisted), and stock platforms.

## Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind v4 (utility-first, minimal config)
- Supabase client ready (auth/storage placeholders)
- Icons: lucide-react
- Styling: glassmorphism + custom globals, Geist font

## App structure (routes)
- `/` Dashboard with quick links to every feature
- `/image-forge` Guided AI image generation (presets, niches, prompts)
- `/monetization/library` Image library with filters and link status
- `/monetization/link-vault` Affiliate link manager (CRUD + default flag + copy)
- `/launchpad` Publishing instructions for Pinterest, Instagram, TikTok, Facebook
- `/scheduler` Publish queue and history with retry/cancel
- `/training` Tutorial videos and FAQs for every feature
- `/docs-help` Help center with FAQs, tips, and support contacts
- `/account` Profile, membership, and sign-out

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
- Wire Supabase tables: users, profiles, assets, link_vault, publishes (RLS on user_id; service role for jobs)
- Replace mocks with Supabase queries and mutations
- Integrate RapidAPI (image generation, background remover, caption assist) with bounded CFG/steps
- Implement Pinterest publish + IG assisted packaging + Stock adapter; add retries/backoff
- Add validation + guardrails (URL validation, banned terms, hashtag length, batch caps)
