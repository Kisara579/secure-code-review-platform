import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/60 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="SecureReview AI Logo"
            width={32}
            height={32}
            priority
          />
          <span className="text-lg font-semibold text-white transition-colors group-hover:text-cyan-400">
            SecureReview AI
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/documentation"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Documentation
          </Link>
          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:brightness-110"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
