import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { builds } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminBuildsPage() {
  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  const allBuilds = await db
    .select({
      id: builds.id,
      slug: builds.slug,
      title: builds.title,
      biome: builds.biome,
      houseSize: builds.houseSize,
      status: builds.status,
      likeCount: builds.likeCount,
      viewCount: builds.viewCount,
      createdAt: builds.createdAt,
    })
    .from(builds)
    .orderBy(desc(builds.createdAt))
    .limit(100);

  return (
    <div className="mx-auto max-w-[64rem] px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Admin: <span className="text-accent">Builds</span>
        </h1>
        <Link
          href="/admin/builds/new"
          className="rounded-lg bg-accent hover:bg-accent-hover text-bg-primary font-semibold px-5 py-2.5 text-sm transition-colors"
        >
          + New Build
        </Link>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg-secondary text-text-muted text-left">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Biome</th>
              <th className="px-4 py-3 font-medium">Size</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Likes</th>
              <th className="px-4 py-3 font-medium text-right">Views</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {allBuilds.map((build) => (
              <tr key={build.id} className="hover:bg-bg-card transition-colors">
                <td className="px-4 py-3">
                  <Link
                    href={`/gallery/${build.slug}`}
                    className="text-accent hover:underline font-medium"
                  >
                    {build.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-text-secondary capitalize">
                  {build.biome?.replace("-", " ")}
                </td>
                <td className="px-4 py-3 text-text-secondary capitalize">
                  {build.houseSize}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                      build.status === "published"
                        ? "bg-wow-green/10 text-wow-green"
                        : build.status === "pending"
                          ? "bg-wow-orange/10 text-wow-orange"
                          : "bg-bg-tertiary text-text-muted"
                    }`}
                  >
                    {build.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-text-secondary">
                  {build.likeCount}
                </td>
                <td className="px-4 py-3 text-right text-text-secondary">
                  {build.viewCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-text-muted">
        {allBuilds.length} builds total
      </p>
    </div>
  );
}
