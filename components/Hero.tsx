import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative px-6 py-24 text-center sm:py-32 md:py-40">
      {/* Grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Heading */}
      <h2 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="bg-linear-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
          Secure Code Review
        </span>
        <br />
        <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Powered by AI
        </span>
      </h2>

      {/* Subtitle */}
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
        SecureReview AI helps DevSecOps teams detect security issues, dependency
        vulnerabilities, and technical debt automatically.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/sign-up"
          className="group relative inline-flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110"
        >
          Get Started Free
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
        <Link
          href="/documentation"
          className="rounded-full border border-slate-700 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:border-slate-500 hover:bg-white/10"
        >
          Read Documentation
        </Link>
      </div>
    </section>
  );
}
