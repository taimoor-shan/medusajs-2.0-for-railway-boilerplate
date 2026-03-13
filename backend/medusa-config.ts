import { loadEnv, defineConfig, Modules } from '@medusajs/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const backendUrl =
  process.env.BACKEND_PUBLIC_URL ||
  process.env.RAILWAY_PUBLIC_DOMAIN_VALUE ||
  'http://localhost:9000'

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: process.env.NODE_ENV === 'production'
      ? { ssl: { rejectUnauthorized: false } }
      : { ssl: false },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: [
    {
      key: Modules.FILE,
      resolve: '@medusajs/file',
      options: {
        providers: [
          ...(process.env.MINIO_ENDPOINT &&
          process.env.MINIO_ACCESS_KEY &&
          process.env.MINIO_SECRET_KEY
            ? [
                {
                  resolve: './src/modules/minio-file',
                  id: 'minio',
                  options: {
                    endPoint: process.env.MINIO_ENDPOINT,
                    accessKey: process.env.MINIO_ACCESS_KEY,
                    secretKey: process.env.MINIO_SECRET_KEY,
                    bucket: process.env.MINIO_BUCKET,
                  },
                },
              ]
            : [
                {
                  resolve: '@medusajs/file-local',
                  id: 'local',
                  options: {
                    upload_dir: 'static',
                    backend_url: `${backendUrl}/static`,
                  },
                },
              ]),
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/notification-sendgrid",
            id: "sendgrid",
            options: {
              channels: ["email"],
              api_key: process.env.SENDGRID_API_KEY,
              from: process.env.SENDGRID_FROM,
            },
          },
        ],
      },
    },
    {
      resolve: "./src/modules/page",
    },
  ],
  admin: {
    vite: () => {
      return {
        server: {
          host: '0.0.0.0',
          // Allow all hosts when running in Docker (development mode)
          // In production, this should be more restrictive
          allowedHosts: 'all',
          hmr: {
            // HMR websocket port inside container
            port: 5173,
            // Port browser connects to (exposed in docker-compose.yml)
            clientPort: 5173,
          },
        },
      }
    },
  },
})
