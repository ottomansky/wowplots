import { getCloudflareContext } from "@opennextjs/cloudflare";

export function isAdminConfigured(): boolean {
  try {
    const { env } = getCloudflareContext();
    const adminIds = env.ADMIN_DISCORD_IDS || "";
    return adminIds.length > 0;
  } catch {
    return false;
  }
}
