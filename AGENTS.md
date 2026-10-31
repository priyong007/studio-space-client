<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# studio-space

A Next.js App Router application built on React 19, Tailwind CSS v4, and shadcn/ui components. The UI is currently the create-next-app placeholder; the component library and tooling are already in place for building real screens.

## Stack

| Area       | Choice                                                              |
| ---------- | ------------------------------------------------------------------- |
| Framework  | Next.js 16.4.3 (App Router, Turbopack, React Compiler)              |
| React      | 19.3                                                                |
| Language   | TypeScript 5, `strict: true`                                        |
| Styling    | Tailwind CSS v4 (CSS-first, no config file)                         |
| Components | shadcn `base-nova` style on Base UI (`@base-ui/react`)              |
| Icons      | `lucide-react`                                                      |
| Extras     | `shiki` code highlighting, `recharts`, `embla-carousel`, `cmdk`     |
| Package manager | npm (`package-lock.json`)                                      |

## Commands

```bash
npm run dev        # start the dev server (Turbopack)
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (flat config)
npx tsc --noEmit   # typecheck — there is no dedicated script yet
```

There is no test runner configured. Do not add one unless the task calls for it.

## Repository layout

```txt
src/
├── app/               # routes, root layout, globals.css
├── components/ui/     # shadcn-generated primitives
├── hooks/             # shared client hooks
└── lib/               # utilities and framework-agnostic helpers
public/                # static assets
```

- Import from the source tree with the `@/*` alias (`@/components/ui/button`, `@/lib/utils`).
- `src/lib/utils.ts` re-exports `cn`; it is not the usual `clsx` + `tailwind-merge` helper.

## Next.js 16 rules

- Read the bundled, version-matched docs in `node_modules/next/dist/docs/` before changing framework behavior. Do not rely on memory of older Next.js versions.
- Server Components are the default. Add `"use client"` only to files that need state, effects, refs, event handlers, or browser APIs, and keep the boundary as low as possible.
- `cacheComponents: true` is enabled in `next.config.ts`. Uncached data must be read under a `<Suspense>` boundary or wrapped with `"use cache"`. When the dev server or build reports a blocking-prerender error, follow the suggested `[stream]`, `[cache]`, or `[block]` fix rather than disabling the feature.
- `partialPrefetching` and `reactCompiler` are enabled. The compiler handles memoization, so do not add `useMemo`/`useCallback` preemptively; add them only when profiling shows a need or a dependency requires referential stability.
- Use the generated route types (`LayoutProps<"/">`, `PageProps<...>`) instead of hand-writing `params`/`searchParams` shapes. Types come from `.next/types` and `.next/dev/types`.
- Use `next/image`, `next/font`, and `next/link` for images, fonts, and navigation respectively. Fonts are loaded in `src/app/layout.tsx` as CSS variables.
- Route handlers belong in `src/app/**/route.ts`; server actions belong in `"use server"` files or inline server functions.

## UI conventions

- Add new primitives with the shadcn CLI rather than writing them by hand. The project is configured for the `base-nova` style, RSC, and the `@/components/ui` alias (`components.json`).
- Primitives are built on Base UI (`@base-ui/react/*`), not Radix. A few components also use `@shadcn/react` extensions (for example `@shadcn/react/questionnaire`). Check an existing component before assuming a Radix API.
- Import `cn` from `"cn"` or `@/lib/utils`. Do not add `clsx`, `tailwind-merge`, or a second class-merging helper.
- Use design tokens for color, radius, and typography: `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `rounded-lg`, `font-sans`, `font-mono`. Avoid raw palette classes (`zinc-*`, `slate-*`) and hex values in new code; the placeholder page in `src/app/page.tsx` is the exception, not the pattern.
- Define variants with `class-variance-authority` (`cva`) and export the variant helper alongside the component, matching `src/components/ui/button.tsx`.
- Preserve the `data-slot` attributes on primitives and any `data-*` state hooks; other components and tests may target them.
- Use `lucide-react` icons. Size them through the component's existing `[&_svg]` rules or a `size-*` class rather than hardcoded `width`/`height`.
- Client hooks live in `src/hooks` and use the `use-*.ts` naming convention (see `use-mobile.ts`).

## Styling

- Tailwind v4 is configured entirely in `src/app/globals.css` via `@theme inline`, `:root`, and `.dark`. There is no `tailwind.config.*`; add new tokens and theme mappings there.
- Dark mode is class-based (`.dark`) through `@custom-variant dark`.
- Use the existing radius scale (`--radius-sm` through `--radius-4xl`). Do not introduce a parallel spacing or radius system.
- Keep `globals.css` limited to tokens, base layers, and global utilities. Prefer component classes for everything else.

## TypeScript and code style

- Keep `strict` mode clean: no `any`, no unchecked casts, no non-null assertions unless the invariant is obvious and documented.
- Prefer explicit return types on exported functions and typed props over `React.FC`.
- Match the file you are editing. `src/app` files use semicolons, double quotes, and trailing commas; `src/components/ui` follows the shadcn output style (no semicolons). Do not reformat unrelated lines.
- Keep imports ordered the way the surrounding file does it: framework/library imports first, then `@/` aliases, then relative imports.
- Use the `@/` alias for cross-directory imports; reserve relative paths for siblings.

## Definition of done

- `npm run lint` passes.
- `npx tsc --noEmit` passes.
- The change has been exercised against `npm run dev` (or `npm run build` for production-only behavior).
- No edits to generated or ignored files: `.next/`, `next-env.d.ts`, `*.tsbuildinfo`, `.env*`.
- The managed blocks at the top and bottom of this file are left intact. `next dev` rewrites them, and `experimental.agentFeedback` may append a `nextjs-agent-feedback` block at the end.

## Known project quirks

- `cn` comes from the `cn` npm package, re-exported by `src/lib/utils.ts`.
- `metadata` in `src/app/layout.tsx` is still the create-next-app placeholder; update it when the app gets a real name.
- `src/app/globals.css` maps `--font-sans` to itself and `--font-mono` to `--font-geist-mono`; verify font variables before changing typography.
- The only route is `src/app/page.tsx`. There are no API routes, server actions, tests, or environment variables yet.
