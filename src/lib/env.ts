// Cloudflare Workers bindings available via getRequestContext()
export interface CloudflareEnv {
  DB: D1Database;
  IMAGES_BUCKET: R2Bucket;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
  RESEND_API_KEY: string;
  SESSION_SECRET: string;
  ADMIN_DISCORD_IDS: string;
  ENVIRONMENT: string;
}
