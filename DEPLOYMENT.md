# Medusa Production Deployment Context

## Project Overview

This project is contained in a **single Git repository** with two independent applications:

```
/
├── backend/      # Medusa v2 backend
└── storefront/   # Next.js storefront
```

The applications are deployed independently but communicate through the Medusa API.

The project is intentionally **not Dockerized**. Production follows a traditional Linux deployment using system services and PM2.

---

# Production Environment

## Infrastructure

* Provider: IONOS VPS
* Operating System: Ubuntu 24.04 LTS
* Node.js: 22 LTS
* Package Manager: Yarn (Corepack)
* Database: PostgreSQL 15
* Cache: Redis
* Process Manager: PM2
* Reverse Proxy: Nginx
* SSL: Let's Encrypt (Certbot)

---

# Repository Layout

```
backend/
storefront/
```

Backend and storefront are deployed from the same Git repository but run as separate Node.js applications.

---

# Backend

Runs as a PM2 process.

```
PM2 Name:
medusa-backend
```

Working directory:

```
backend/
```

Start command:

```
yarn start
```

Production URL:

```
https://infinytree.com
```

---

# Storefront

Runs as a separate PM2 process.

```
PM2 Name:
medusa-storefront
```

Working directory:

```
storefront/
```

Start command:

```
yarn start
```

Internal port:

```
3000
```

---

# Database

Database Engine

```
PostgreSQL 15
```

Database

```
webshop
```

Database User

```
medusa
```

Migrations are executed before production startup whenever schema changes occur.

---

# Redis

Local Redis instance.

Used for Medusa jobs, events and caching.

---

# PM2

Applications:

```
medusa-backend
medusa-storefront
```

PM2 is configured to start automatically after server reboot.

Useful commands:

```
pm2 list
pm2 logs
pm2 restart medusa-backend
pm2 restart medusa-storefront
pm2 save
```

---

# Nginx

Nginx provides:

* HTTPS
* Reverse proxy
* Static asset serving

Routing:

```
/app
/admin
/store
/auth
/cloud
/health
        ↓
Medusa Backend (9000)

/

        ↓
Next.js Storefront (3000)
```

Uploaded files are **NOT** served by Medusa.

Instead, Nginx serves them directly.

```
/static/*
        ↓
/srv/medusa/uploads
```

This avoids losing uploaded assets after rebuilding Medusa.

---

# Image Storage

This project intentionally does **not** store uploaded media inside the repository.

Production upload directory:

```
/srv/medusa/uploads
```

Reasons:

* survives deployments
* survives rebuilds
* independent from `.medusa/server`
* faster delivery through Nginx

Database URLs use:

```
https://infinytree.com/static/<filename>
```

Nginx maps those URLs directly to:

```
/srv/medusa/uploads/
```

Do **not** store uploaded media inside:

```
backend/static
backend/.medusa/server/static
```

These directories are considered temporary build artifacts.

---

# Git

Uploaded media is ignored.

```
backend/static/
```

is listed in `.gitignore`.

Only application source code is committed.

---

# Environment Variables

Backend uses:

```
backend/.env
```

Storefront uses:

```
storefront/.env
```

Never commit production secrets.

---

# Production Deployment

Typical deployment procedure:

```
git pull

Backend

yarn install
yarn build
pm2 restart medusa-backend

Storefront

yarn install
yarn build
pm2 restart medusa-storefront
```

---

# SSL

Managed using Certbot.

Certificates:

```
/etc/letsencrypt/
```

---

# Backups

Critical data:

* PostgreSQL database
* `/srv/medusa/uploads`

Both should be backed up regularly.

Application source remains in Git.

---

# Important Notes

* Do not introduce Docker unless there is a compelling operational reason.
* Do not serve uploaded media through Medusa in production.
* Uploaded files must always remain outside the application directory.
* Nginx is responsible for serving `/static`.
* PM2 manages application lifecycle and startup after reboot.
* Rebuilding Medusa must never affect uploaded assets.