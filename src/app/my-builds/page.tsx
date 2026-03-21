import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { builds } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Builds",
};

export default async function MyBuildsPage() {
  const h = await headers();
  const user = await getSession(h.get("cookie"));
  if (!user) redirect("/api/auth/discord?return=/my-builds");

  const { env } = getCloudflareContext();
  const db = getDb(env.DB);

  const myBuilds = await db
    .select()
    .from(builds)
    .where(eq(builds.userId, user.id))
    .orderBy(desc(builds.createdAt));

  return (
    <div className="mx-auto max-w-[64rem] px-5 py-12">
      <Breadcrumbs items={[{ label: "My Builds" }]} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          My <span className="text-accent">Builds</span>
        </h1>
        <Link href="/submit" className="btn btn-primary">
          + Submit Build
        </Link>
      </div>

      {myBuilds.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-text-secondary text-[15px] mb-4">
            You haven&apos;t submitted any builds yet.
          </p>
          <Link href="/submit" className="btn btn-primary">
            Submit Your First Build
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {myBuilds.map((build) => (
            <div
              key={build.id}
              className="card flex items-center justify-between p-4"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={build.status === "published" ? `/gallery/${build.slug}` : "#"}
                  className="text-[15px] font-medium hover:text-accent transition-colors"
                >
                  {build.title}
                </Link>
                <div className="flex items-center gap-3 mt-1 text-[12px] text-text-muted">
                  <span className="capitalize">{build.biome?.replace("-", " ")}</span>
                  <span>&middot;</span>
                  <span className="capitalize">{build.houseSize}</span>
                  <span>&middot;</span>
                  <span>{formatDate(build.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <span
                  className={`badge ${
                    build.status === "published"
                      ? "badge-gold"
                      : build.status === "pending"
                        ? "bg-wow-orange/10 text-wow-orange border border-wow-orange/20"
                        : "badge-muted"
                  }`}
                >
                  {build.status}
                </span>
                {build.status === "published" && (
                  <span className="text-[12px] text-text-muted">
                    {build.likeCount} likes &middot; {build.viewCount} views
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
