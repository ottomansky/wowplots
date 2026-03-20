"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BIOMES, HOUSE_SIZES, STYLE_TAGS } from "@/lib/constants";

export default function NewBuildPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const data = {
      title: form.get("title") as string,
      description: form.get("description") as string,
      biome: form.get("biome") as string,
      houseSize: form.get("houseSize") as string,
      roomCount: Number(form.get("roomCount")) || undefined,
      itemCount: Number(form.get("itemCount")) || undefined,
      layoutCode: form.get("layoutCode") as string || undefined,
      tags: (form.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean),
      imageUrls: (form.get("imageUrls") as string).split("\n").map((u) => u.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/admin/builds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errBody: { error?: string } = await res.json();
        throw new Error(errBody.error || "Failed to create build");
      }

      const result: { slug: string } = await res.json();
      router.push(`/gallery/${result.slug}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        New <span className="text-accent">Build</span>
      </h1>

      {error && (
        <div className="mb-6 rounded-lg border border-wow-red/30 bg-wow-red/5 p-4 text-wow-red text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Title *
          </label>
          <input
            name="title"
            required
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
            placeholder="The Enchanted Library"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none"
            placeholder="A beautiful build set in..."
          />
        </div>

        {/* Biome + Size */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Biome *
            </label>
            <select
              name="biome"
              required
              className="w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
            >
              <option value="">Select biome</option>
              {BIOMES.map((b) => (
                <option key={b.slug} value={b.slug}>{b.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              House Size *
            </label>
            <select
              name="houseSize"
              required
              className="w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
            >
              <option value="">Select size</option>
              {HOUSE_SIZES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Room/Item counts */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Room Count
            </label>
            <input
              name="roomCount"
              type="number"
              min={1}
              max={10}
              className="w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Item Count
            </label>
            <input
              name="itemCount"
              type="number"
              min={1}
              max={500}
              className="w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-primary focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Tags (comma-separated)
          </label>
          <input
            name="tags"
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
            placeholder="cozy, library, elegant"
          />
          <p className="mt-1 text-xs text-text-muted">
            Available: {STYLE_TAGS.join(", ")}
          </p>
        </div>

        {/* Image URLs */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Image URLs (one per line, first = primary)
          </label>
          <textarea
            name="imageUrls"
            rows={4}
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none font-mono"
            placeholder="https://example.com/screenshot1.jpg&#10;https://example.com/screenshot2.jpg"
          />
        </div>

        {/* Layout Code */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            Layout Code
          </label>
          <textarea
            name="layoutCode"
            rows={3}
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none resize-none font-mono"
            placeholder="Paste the in-game layout export code..."
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-accent hover:bg-accent-hover text-bg-primary font-semibold py-3 text-sm transition-colors disabled:opacity-50"
        >
          {saving ? "Creating..." : "Create Build"}
        </button>
      </form>
    </div>
  );
}
