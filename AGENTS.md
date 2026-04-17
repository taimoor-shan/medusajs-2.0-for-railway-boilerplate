# MedusaJS Boilerplate Project Context

> **Last updated:** 2026-04-17
> **Framework:** MedusaJS 2.12.1 + Next.js 15.3.9

## Repository Overview

This project is a **MedusaJS 2.0 monorepo** containing a pre-configured backend and a modern Next.js storefront. It is designed to be easily deployed on Railway.

The monorepo structure is as follows:
```
medus-amono/
├── backend/          # Medusa 2.12.1 Server
└── storefront/       # Next.js 15 App Router Frontend
```

---

## 1. Backend

**Path:** `/backend`

The backend uses the newly released MedusaJS 2.0 architecture (@medusajs/framework, @medusajs/medusa). It uses PostgreSQL for the primary database, Redis (or simulated Redis) for events/queues, MinIO for storage, and Meilisearch for search capabilities.

### Tech Stack & Integrations

- **Framework:** Medusa 2.12.1
- **Database ORM:** MikroORM (PostgreSQL) `6.4.16`
- **File Storage:** MinIO integration. Replaces local file storage and automatically creates a 'medusa-media' bucket.
- **Email:** Resend integration (`@medusajs/email-notifications`) with react-email.
- **Search:** Meilisearch (`@rokmohar/medusa-plugin-meilisearch`).
- **Payments:** Stripe integration.
- **Node Version Engine:** `>=20`
- **Package Manager:** yarn (v3.6.4 in backend, v4.12.0 in storefront)

### Commands

| Command | Action |
|---------|--------|
| `yarn ib` | Initialize Backend - runs migrations and seeds the database |
| `yarn dev`| Start backend and admin dashboard dynamically |
| `yarn build` | Compile the internal medusa project |

### Important Locations
- **`backend/.env`**: Needs `DATABASE_URL` for Postgres.
- **`backend/src/modules/minio-file/`**: Custom storage implementation.
- **`backend/src/modules/email-notifications/`**: Custom email implementation via Resend.
- **Admin Dashboard**: Hosted alongside the backend locally on `localhost:9000/app`

---

## 2. Storefront

**Path:** `/storefront`

The frontend is built with Next.js 15.3.9 App Router using Turbopack for development. It integrates tightly with the Medusa v2 APIs using the `@medusajs/js-sdk`.

### Tech Stack

- **Framework:** Next.js 15.3.9 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Radix UI Primitives + `@medusajs/ui`
- **Icons:** `lucide-react` + `@medusajs/icons`
- **Payment Processing:** `@stripe/stripe-js` & `@stripe/react-stripe-js`
- **React:** 19.0.4

### Architecture Notes
- The storefront relies entirely on the Medusa Backend running on port `9000`. Product data, cart management, and checkout pipelines are piped through the backend API.
- Search indexing utilizes Meilisearch, integrated to power product discovery features within the storefront components.
- Uses `turbopack` locally via `next dev --turbopack`. Default port is `8000`.

### Commands

| Command | Action |
|---------|--------|
| `yarn dev` | Start Next.js with Turbopack on port 8000 (usually) |
| `yarn build` | Compile the Next.js storefront |

### Environment Variables
- Ensure `.env.local` accurately points `NEXT_PUBLIC_MEDUSA_BACKEND_URL` (or equivalent) to the local backend `http://localhost:9000` during local dev.

---

## Agent Usage & Best Practices

1. **Monorepo Awareness:** Always specify whether you are working in the `backend/` or `storefront/` directory when modifying code, running scripts, or accessing environment variables.
2. **Medusa V2 Differences:** This project specifically utilizes Medusa Version `2.x`. Avoid referencing guides or structures from Medusa 1.x. For example, migrations are handled explicitly through MikroORM with specific project configurations rather than older TypeORM standards.
3. **Storefront Next.js Features:** This project uses Next.js 15 with App Router. Avoid using older `pages/` directory conventions (`getServerSideProps`, `getStaticProps`, etc.).
