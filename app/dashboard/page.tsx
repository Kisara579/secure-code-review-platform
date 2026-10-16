import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  PackageSearch,
  ArrowRight,
  Plus,
} from "lucide-react";

const stats = [
  {
    title: "Code Reviews",
    value: "0",
    subtitle: "Total reviews",
    icon: ShieldCheck,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Security Issues",
    value: "0",
    subtitle: "Issues detected",
    icon: AlertTriangle,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Dependencies",
    value: "0",
    subtitle: "Vulnerabilities found",
    icon: PackageSearch,
    gradient: "from-violet-500 to-purple-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="mt-2 text-slate-400">
              Welcome to SecureReview AI. Start a secure code review or monitor
              your project activity.
            </p>
          </div>
          <Link
            href="/dashboard/review"
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            New Review
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur transition-all duration-300 hover:border-slate-700"
              >
                {/* Hover glow */}
                <div
                  className={`absolute -inset-px rounded-2xl bg-linear-to-r ${stat.gradient} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-10`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-slate-400">
                      {stat.title}
                    </h2>
                    <div
                      className={`inline-flex rounded-lg bg-linear-to-br ${stat.gradient} p-2`}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <p className="mt-3 text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{stat.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/dashboard/review"
              className="group flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/50 p-6 transition-all hover:border-slate-700 hover:bg-slate-900/80"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white">
                    Start Code Review
                  </p>
                  <p className="text-sm text-slate-400">
                    Submit a repository URL and branch to run automated SAST and
                    dependency analysis
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
