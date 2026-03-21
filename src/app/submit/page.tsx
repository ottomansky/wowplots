/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BIOMES, HOUSE_SIZES, STYLE_TAGS } from "@/lib/constants";
import type { SessionUser } from "@/lib/auth";
import { Breadcrumbs } from "@/components/breadcrumbs";

type Step = 1 | 2 | 3 | 4;

export default function SubmitBuildPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [step, setStep] = useState<Step>(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [biome, setBiome] = useState("");
  const [houseSize, setHouseSize] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [layoutCode, setLayoutCode] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => d as { user: SessionUser | null })
      .then((d) => {
        setUser(d.user);
        setAuthLoading(false);
        if (!d.user) {
          window.location.href = `/api/auth/discord?return=/submit`;
        }
      })
      .catch(() => setAuthLoading(false));
  }, []);

  function addImageUrl() {
    const url = imageInput.trim();
    if (url && imageUrls.length < 10) {
      setImageUrls([...imageUrls, url]);
      setImageInput("");
    }
  }

  function removeImage(index: number) {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  async function handleSubmit() {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/builds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          biome,
          houseSize,
          roomCount: roomCount ? Number(roomCount) : undefined,
          itemCount: itemCount ? Number(itemCount) : undefined,
          tags: selectedTags,
          layoutCode: layoutCode || undefined,
          imageUrls,
        }),
      });

      if (!res.ok) {
        const d: { error?: string } = await res.json();
        throw new Error(d.error || "Failed to submit");
      }

      const d = (await res.json()) as { slug: string };
      router.push(`/gallery/${d.slug}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setSaving(false);
    }
  }

  if (authLoading) {
    return (
      <div className="mx-auto max-w-[42rem] px-5 py-16 text-center">
        <div className="w-8 h-8 skeleton rounded-full mx-auto mb-4" />
        <p className="text-text-muted text-[13px]">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const canAdvance: Record<Step, boolean> = {
    1: imageUrls.length >= 1,
    2: title.length > 0 && biome.length > 0 && houseSize.length > 0,
    3: true,
    4: true,
  };

  return (
    <div className="mx-auto max-w-[42rem] px-5 py-12">
      <Breadcrumbs items={[{ label: "Submit Build" }]} />

      <h1 className="text-3xl font-bold mb-2">
        Submit a <span className="text-accent">Build</span>
      </h1>
      <p className="text-text-secondary text-[14px] mb-8">
        Share your housing creation with the community.
      </p>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {([1, 2, 3, 4] as Step[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => s < step && setStep(s)}
              className={`w-8 h-8 rounded-full text-[12px] font-bold flex items-center justify-center transition-colors ${
                s === step
                  ? "bg-accent text-bg-primary"
                  : s < step
                    ? "bg-accent/20 text-accent cursor-pointer"
                    : "bg-bg-tertiary text-text-muted"
              }`}
            >
              {s}
            </button>
            {s < 4 && (
              <div
                className={`w-8 h-px ${s < step ? "bg-accent/40" : "bg-border"}`}
              />
            )}
          </div>
        ))}
        <span className="text-[12px] text-text-muted ml-2">
          {step === 1 ? "Screenshots" : step === 2 ? "Details" : step === 3 ? "Tags & Layout" : "Preview"}
        </span>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-wow-red/30 bg-wow-red/5 p-4 text-wow-red text-[13px]">
          {error}
        </div>
      )}

      {/* Step 1: Images */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Add Screenshots</h2>
          <p className="text-text-secondary text-[13px]">
            Add image URLs for your build screenshots. The first image will be the primary cover image.
          </p>
          <div className="flex gap-2">
            <input
              type="url"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="https://example.com/screenshot.jpg"
              className="input flex-1"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImageUrl())}
            />
            <button
              onClick={addImageUrl}
              disabled={!imageInput.trim() || imageUrls.length >= 10}
              className="btn btn-secondary px-4 disabled:opacity-40"
            >
              Add
            </button>
          </div>
          {imageUrls.length > 0 && (
            <div className="space-y-2">
              {imageUrls.map((url, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-border bg-bg-card p-3"
                >
                  <div className="w-16 h-10 rounded bg-bg-tertiary overflow-hidden flex-shrink-0">
                    <img
                      src={url}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <span className="text-[12px] text-text-muted truncate flex-1">
                    {i === 0 && <span className="text-accent mr-1">Primary</span>}
                    {url}
                  </span>
                  <button
                    onClick={() => removeImage(i)}
                    className="text-text-muted hover:text-wow-red transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          <p className="text-text-muted text-[11px]">
            {imageUrls.length}/10 images added. Min 1 required.
          </p>
        </div>
      )}

      {/* Step 2: Build Info */}
      {step === 2 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold">Build Details</h2>
          <div>
            <label className="block text-[13px] font-medium mb-1.5">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder="The Enchanted Library"
              className="input"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={2000}
              rows={4}
              placeholder="Tell us about your build..."
              className="input resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium mb-1.5">Biome *</label>
              <select value={biome} onChange={(e) => setBiome(e.target.value)} className="input select">
                <option value="">Select biome</option>
                {BIOMES.map((b) => (
                  <option key={b.slug} value={b.slug}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1.5">House Size *</label>
              <select value={houseSize} onChange={(e) => setHouseSize(e.target.value)} className="input select">
                <option value="">Select size</option>
                {HOUSE_SIZES.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium mb-1.5">Rooms</label>
              <input type="number" value={roomCount} onChange={(e) => setRoomCount(e.target.value)} min={1} max={10} className="input" placeholder="e.g. 3" />
            </div>
            <div>
              <label className="block text-[13px] font-medium mb-1.5">Items</label>
              <input type="number" value={itemCount} onChange={(e) => setItemCount(e.target.value)} min={1} max={500} className="input" placeholder="e.g. 250" />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Tags & Layout */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold">Tags & Layout Code</h2>
          <div>
            <label className="block text-[13px] font-medium mb-2">Style Tags</label>
            <div className="flex flex-wrap gap-2">
              {STYLE_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-[12px] rounded-lg px-3 py-1.5 border transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-accent/15 text-accent border-accent/30"
                      : "bg-bg-card text-text-secondary border-border hover:border-border-light"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1.5">Layout Code (optional)</label>
            <textarea
              value={layoutCode}
              onChange={(e) => setLayoutCode(e.target.value)}
              rows={5}
              placeholder="Paste your in-game layout export code here..."
              className="input resize-none font-mono text-[12px]"
            />
            <p className="text-text-muted text-[11px] mt-1">
              Open Housing menu → Layout Manager → Export to get the code.
            </p>
          </div>
        </div>
      )}

      {/* Step 4: Preview */}
      {step === 4 && (
        <div className="space-y-5">
          <h2 className="text-lg font-semibold">Preview & Submit</h2>
          <div className="card p-5 space-y-3">
            {imageUrls[0] && (
              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-bg-tertiary">
                <img src={imageUrls[0]} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <h3 className="text-xl font-bold">{title}</h3>
            <div className="flex flex-wrap gap-2">
              {biome && <span className="badge badge-gold capitalize">{biome.replace("-", " ")}</span>}
              {houseSize && <span className="badge badge-muted capitalize">{houseSize}</span>}
            </div>
            {description && (
              <p className="text-text-secondary text-[14px] leading-relaxed">{description}</p>
            )}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedTags.map((tag) => (
                  <span key={tag} className="text-[11px] bg-bg-tertiary text-text-muted rounded px-2 py-0.5">{tag}</span>
                ))}
              </div>
            )}
            <p className="text-text-muted text-[12px] border-t border-border pt-3">
              Your build will be reviewed before appearing in the gallery.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        {step > 1 ? (
          <button
            onClick={() => setStep((step - 1) as Step)}
            className="btn btn-ghost"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}
        {step < 4 ? (
          <button
            onClick={() => setStep((step + 1) as Step)}
            disabled={!canAdvance[step]}
            className="btn btn-primary disabled:opacity-40"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="btn btn-primary disabled:opacity-40"
          >
            {saving ? "Submitting..." : "Submit for Review"}
          </button>
        )}
      </div>
    </div>
  );
}
