import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-6 py-16 text-center sm:py-20 md:py-24">
      <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        AI-Powered Secure Code Review
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg md:text-xl">
        SecureReview AI helps DevSecOps teams detect security issues, dependency
        vulnerabilities, and technical debt automatically.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/dashboard"
          className="rounded-full bg-cyan-500 px-8 sm:px-5 py-3 font-medium text-slate-950 hover:bg-cyan-400 "
        >
          Get Started
        </Link>
        <Link
          href="/documentation"
          className="rounded-full border-2 border-slate-700 px-5 py-3 font-medium text-white hover:border-cyan-400 hover:text-cyan-300"
        >
          Documentation
        </Link>
      </div>
    </section>
  );
}
