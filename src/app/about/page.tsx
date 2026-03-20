import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "WoWPlots is the community gallery for World of Warcraft player housing. Learn about our mission and how to get involved.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">
        About <span className="text-accent">{SITE_NAME}</span>
      </h1>

      <div className="space-y-6 text-text-secondary leading-relaxed">
        <p>
          <strong className="text-text-primary">{SITE_NAME}</strong> is the
          community gallery for World of Warcraft player housing. Think of it as
          the <strong className="text-text-primary">Pinterest of WoW Housing</strong> — a
          visual-first platform where builders showcase their creations and
          decorators find inspiration.
        </p>

        <p>
          WoW player housing launched with The Midnight expansion on March 2,
          2026. With 2,659+ decor items, six unique biomes, and both basic and
          advanced building modes, the creative possibilities are enormous. But
          there was no dedicated place to browse and discover the incredible
          builds the community was creating.
        </p>

        <p>That&apos;s why we built {SITE_NAME}.</p>

        <h2 className="text-2xl font-bold text-text-primary pt-4">
          What We&apos;re <span className="text-accent">Not</span>
        </h2>

        <p>
          We&apos;re not a database or a tooling site. Sites like{" "}
          <strong className="text-text-primary">housing.wowdb.com</strong>{" "}
          already do an amazing job with floorplan builders, vendor trackers, and
          collection sync. <strong className="text-text-primary">Wowhead</strong>{" "}
          has the definitive item database and guides.
        </p>

        <p>
          {SITE_NAME} is complementary — we&apos;re the place you come to{" "}
          <strong className="text-text-primary">see what&apos;s possible</strong> and
          get inspired to build something amazing yourself.
        </p>

        <h2 className="text-2xl font-bold text-text-primary pt-4">
          Get <span className="text-accent">Involved</span>
        </h2>

        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">&#9679;</span>
            <span>
              <strong className="text-text-primary">Join our Discord</strong> —
              share screenshots, get feedback, stay updated on new features
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">&#9679;</span>
            <span>
              <strong className="text-text-primary">
                Submit your builds
              </strong>{" "}
              — community uploads are opening soon.{" "}
              <Link href="/#waitlist" className="text-accent hover:underline">
                Join the waitlist
              </Link>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent mt-1">&#9679;</span>
            <span>
              <strong className="text-text-primary">Spread the word</strong> —
              share your favorite builds with friends and guildmates
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
