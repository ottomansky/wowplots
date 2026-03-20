import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-accent font-bold text-lg mb-3">{SITE_NAME}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              The Pinterest of WoW Housing. Discover, showcase, and get inspired
              by World of Warcraft player housing builds.
            </p>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/gallery"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Guides & Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold mb-3">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://discord.gg/wowplots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://reddit.com/r/wowhousing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors"
                >
                  Reddit
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-text-muted">
          <p>
            {SITE_NAME} is a fan site and is not affiliated with or endorsed by
            Blizzard Entertainment.
          </p>
          <p className="mt-1">
            World of Warcraft and related marks are trademarks of Blizzard
            Entertainment, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
