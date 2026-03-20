import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <p className="text-xl text-text-secondary mb-8">
        This plot is empty. The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg bg-accent hover:bg-accent-hover text-bg-primary font-semibold px-6 py-3 text-sm transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
