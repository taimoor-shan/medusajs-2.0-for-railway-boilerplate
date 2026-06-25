# Medusa Production Deployment Requirements

## Project Overview

The project is contained in **a single Git repository** with two separate applications:

* **Medusa Backend** (`/backend`)
* **Storefront** (`/storefront`)

The backend and storefront communicate through environment variables. The local development environment is **not Dockerized**, and I would like the production deployment to follow a similar architecture rather than introducing Docker at this stage.

## VPS Environment

* **Provider:** IONOS VPS
* **Operating System:** Ubuntu 24.04.4 LTS
* **Current Node Version:** v23.11.0 (prefer Node.js 22 LTS)
* **Package Manager:** Yarn 3.6.4 (via Corepack preferred)
* **Database:** PostgreSQL 15
* **SSH Access:** Root access available

## Deployment Stack

Please deploy using:

* Node.js 22 LTS
* Yarn (Corepack)
* PostgreSQL
* Redis
* PM2
* Nginx
* Let's Encrypt SSL (Certbot)

Please avoid Docker unless there is a strong technical justification.

## Requirements

* Clone and deploy the single repository.
* Configure separate production `.env` files for the backend and storefront.
* Create a production PostgreSQL database and dedicated database user.
* Install dependencies and build both applications.
* Run backend and storefront as separate PM2 processes with automatic startup on reboot.
* Configure Nginx as a reverse proxy (storefront and backend/API).
* Configure HTTPS using Let's Encrypt.
* Configure the firewall appropriately.
* Ensure uploaded assets and the PostgreSQL database are persistent.
* Set up a basic PostgreSQL backup strategy.

## Deliverables

The completed deployment should include:

* Fully functional Medusa backend
* Fully functional storefront connected to the backend
* Production-ready PostgreSQL and Redis
* PM2 process configuration
* Nginx configuration
* SSL-enabled production environment
* Database migration and initialization
* Production environment variable configuration
* Brief documentation describing the deployment structure and the commands required for future updates, deployments, restarts, and log access.
