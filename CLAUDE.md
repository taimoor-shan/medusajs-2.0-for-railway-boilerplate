# CLAUDE.md — Medusa Monorepo (Towels Store)

## Knowledge Graph (RAG)

Both packages have pre-built knowledge graphs. Consult the relevant one before architecture-sensitive changes.

| Package | Graph | Nodes | Edges | Communities |
|---------|-------|-------|-------|-------------|
| `storefront/` | `storefront/graphify-out/` | 770 | 856 | 233 |
| `backend/` | `backend/graphify-out/` | 170 | 175 | 41 |

### When to consult a graph

- **Before touching any "god node"** — high-edge-count functions whose callers are hard to find with grep alone
- **Before refactoring data-fetching or API routes** — the "Surprising Connections" section often catches hidden callers
- **When adding a new page, route, or workflow** — check which community it belongs to and follow existing patterns
- **When debugging cross-cutting concerns** — the "Hyperedges" section shows group relationships across files

### How to consult

1. Read `<pkg>/graphify-out/GRAPH_REPORT.md` for the overview (community hubs, god nodes, hyperedges)
2. For deep dives, search `<pkg>/graphify-out/graph.json` for a community name or node key

---

## Cross-System Data Flow

```
Storefront (Next.js)                    Backend (Medusa)
─────────────────────                   ─────────────────
retrievePageBySlug()  ──GET /store/pages/[slug]──>  Page Module Service
Contact form          ──POST /store/contact──────>  Contact API Route
Cart/Checkout         ──cart/order APIs──────────>  Medusa Core
Product listings      ──product APIs─────────────>  Medusa Core
Customer auth         ──customer APIs────────────>  Medusa Core
```

Key cross-system connections:
- **CMS Pages**: Storefront `retrievePageBySlug()` depends on Backend Page module (admin CRUD via workflows, storefront delivery via store API routes)
- **Contact**: Storefront contact form posts to Backend `POST /api/store/contact`
- **Auth/Cache**: Every storefront data call wraps with `getAuthHeaders()` + `getCacheOptions()`, which hit backend Medusa APIs
- **Images**: Backend MinIO handles admin uploads; storefront consumes via product/media URLs

---

## Package Overview

### `storefront/` — Next.js Storefront
- Next.js App Router, multi-tenant by `[countryCode]`
- All data fetching through `src/lib/data/*.ts` (never call SDK directly from components)
- Core abstractions: `getAuthHeaders()` (38 edges), `getCacheOptions()` (36 edges), `retrievePageBySlug()`, `convertToLocale()`
- See `storefront/CLAUDE.md` for full architecture

### `backend/` — Medusa Backend
- Custom Page module (entity, service, workflows, admin UI, store API)
- MinIO file storage for product/media assets
- Rich text editor + image upload in admin
- OpenTelemetry observability
- See `backend/CLAUDE.md` for full architecture
