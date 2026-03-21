import Link from "next/link";
import { LogoMark } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[28rem] px-5 py-32 text-center">
      <div className="text-accent/20 mb-6 flex justify-center">
        <LogoMark size={80} />
      </div>
      <h1 className="text-5xl font-bold tracking-tight mb-3">
        <span className="text-accent">404</span>
      </h1>
      <p className="text-text-secondary text-[15px] mb-8 leading-relaxed">
        This plot is empty. The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}
