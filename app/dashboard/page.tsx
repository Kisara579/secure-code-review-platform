import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-slate-400">
          Welcome to SecureReview AI. Start a secure code review or monitor your
          project activity.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border-2 border-slate-800 bg-slate-900/60 p-6 hover:border-cyan-600">
            <h2 className="text-lg font-semibold text-white">Code Reviews</h2>
            <p className="mt-2 text-3xl font-bold text-cyan-400">0</p>
            <p className="mt-2 text-sm text-slate-500">Total reviews</p>
          </div>

          <div className="rounded-xl border-2 border-slate-800 bg-slate-900/60 p-6 hover:border-cyan-600">
            <h2 className="text-lg font-semibold text-white">
              Security Issues
            </h2>
            <p className="mt-2 text-3xl font-bold text-cyan-400">0</p>
            <p className="mt-2 text-sm text-slate-500">Issues detected</p>
          </div>

          <div className="rounded-xl border-2 border-slate-800 bg-slate-900/60 p-6 hover:border-cyan-600">
            <h2 className="text-lg font-semibold text-white">Dependencies</h2>
            <p className="mt-2 text-3xl font-bold text-cyan-400">0</p>
            <p className="mt-2 text-sm text-slate-500">Vulnerabilities found</p>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/dashboard/review"
            className="inline-block rounded-full bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
          >
            Start Code Review
          </Link>
        </div>
      </div>
    </main>
  );
}
