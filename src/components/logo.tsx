interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 20, text: "text-sm" },
  md: { icon: 28, text: "text-xl" },
  lg: { icon: 40, text: "text-3xl" },
  xl: { icon: 56, text: "text-5xl" },
};

/**
 * WoWPlots logo — an abstract plot/house mark.
 * A stylized golden archway/portal shape suggesting a doorway into a home,
 * with a subtle grid element at the base suggesting housing plots.
 */
export function Logo({ size = "md", showWordmark = true, className = "" }: LogoProps) {
  const s = sizes[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        {/* Outer archway — the portal/doorway */}
        <path
          d="M6 28V14C6 8.477 10.477 4 16 4C21.523 4 26 8.477 26 14V28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Inner arch — depth/warmth */}
        <path
          d="M11 28V16C11 13.239 13.239 11 16 11C18.761 11 21 13.239 21 16V28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Base grid — plot markers */}
        <line x1="6" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="13" y1="28" x2="13" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <line x1="19" y1="28" x2="19" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        {/* Keystone detail */}
        <circle cx="16" cy="7" r="1.5" fill="currentColor" opacity="0.6" />
      </svg>
      {showWordmark && (
        <span className={`${s.text} font-bold tracking-tight leading-none`}>
          <span className="text-current">Wow</span>
          <span className="opacity-60">Plots</span>
        </span>
      )}
    </span>
  );
}

/** Standalone mark for favicon / small contexts */
export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 28V14C6 8.477 10.477 4 16 4C21.523 4 26 8.477 26 14V28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M11 28V16C11 13.239 13.239 11 16 11C18.761 11 21 13.239 21 16V28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line x1="6" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="13" y1="28" x2="13" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="19" y1="28" x2="19" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <circle cx="16" cy="7" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
