"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data: { error?: string } = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You\u2019re on the list! We\u2019ll notify you when uploads open.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div>
      {status === "success" ? (
        <div className="rounded-xl border border-wow-green/20 bg-wow-green/5 p-5 text-wow-green text-[14px]">
          {message}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2.5 max-w-[28rem] mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="input flex-1"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-primary whitespace-nowrap disabled:opacity-50"
          >
            {status === "loading" ? "Joining\u2026" : "Join Waitlist"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-3 text-wow-red text-[13px]">{message}</p>
      )}
    </div>
  );
}
