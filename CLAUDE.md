# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit application called "liquid-glass" that appears to be a content management system with Sanity CMS integration. It features posts, categories, and user submissions.

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Start development server
pnpm run dev
# or with browser auto-open
pnpm run dev -- --open

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Type checking
pnpm run check
# or watch mode
pnpm run check:watch
```

## Architecture

### Tech Stack
- **Frontend Framework**: SvelteKit with Svelte 5
- **Styling**: TailwindCSS v4 with Vite plugin
- **CMS**: Sanity v3 with visual editing support
- **UI Components**: Custom components with bits-ui, lucide-svelte icons
- **Type Safety**: TypeScript with strict mode
- **Form Validation**: Zod

### Project Structure
- `/src/routes/` - SvelteKit pages and server endpoints
  - `+page.server.ts` files handle server-side data loading
  - `/category/[slug]/` - Dynamic category pages
  - `/detail/[slug]/` - Post detail pages
  - `/submit/` - User submission form with Sanity write integration
  - `/sitemap.xml/` - Dynamic sitemap generation

- `/src/lib/` - Shared code
  - `/sanity/` - Sanity client configuration and GROQ queries
  - `/server/sanity/` - Server-side Sanity client
  - `/components/` - Reusable Svelte components
  - `/components/ui/` - UI primitives (button, input, textarea, badge)
  - `/store/` - Svelte stores (sidebar state)

### Key Patterns

1. **Data Loading**: Uses SvelteKit's load functions with Sanity's loader pattern
   - Server-side loads use `event.locals.loadQuery` (configured in hooks.server.ts)
   - Pagination is handled via URL params (`page`, `pageSize`)

2. **Sanity Integration**:
   - Read operations use public client with CDN
   - Write operations require `SANITY_API_WRITE_TOKEN` environment variable
   - Visual editing support enabled via `@sanity/svelte-loader`

3. **Environment Variables** (required):
   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET`
   - `PUBLIC_SANITY_API_VERSION` (optional, defaults to "2024-03-15")
   - `PUBLIC_SANITY_STUDIO_URL` (optional, defaults to "http://localhost:3333")
   - `SANITY_API_WRITE_TOKEN` (private, for write operations)

### Content Types
- **Post**: Main content type with title, slug, excerpt, tags, mainImage, body (Portable Text), and category reference
- **Category**: Taxonomy with title, slug, and excerpt
- **UserSubmit**: User-submitted content with URL and excerpt fields