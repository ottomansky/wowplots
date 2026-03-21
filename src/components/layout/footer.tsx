import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary/40 mt-auto">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-accent mb-4">
              <Logo size="sm" />
            </div>
            <p className="text-text-muted text-[13px] leading-relaxed max-w-[240px]">
              The community gallery for WoW player housing. Discover, showcase,
              and get inspired.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-widest text-text-muted mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/gallery", label: "Gallery" },
                { href: "/blog", label: "Guides" },
                { href: "/biomes", label: "Biomes" },
                { href: "/styles", label: "Styles" },
                { href: "/sizes", label: "Sizes" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-widest text-text-muted mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/blog/wow-housing-beginners-guide", label: "Beginner\u2019s Guide" },
                { href: "/blog/wow-housing-faq", label: "FAQ" },
                { href: "/blog/wow-housing-layout-import-export", label: "Layout Import/Export" },
                { href: "/feed.xml", label: "RSS Feed" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-widest text-text-muted mb-4">
              Community
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://discord.gg/mUKzQRbb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-text-secondary hover:text-accent transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[13px] text-text-secondary hover:text-accent transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-text-muted">
          <p>&copy; {new Date().getFullYear()} WoWPlots. Not affiliated with Blizzard Entertainment.</p>
          <p>World of Warcraft is a trademark of Blizzard Entertainment, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
