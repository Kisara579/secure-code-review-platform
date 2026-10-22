import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import UserProfileMenu from "@/components/UserProfileMenu";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 px-6 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/dashboard" className="group flex items-center gap-3">
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

          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                href="/dashboard"
                className="group relative rounded-xl px-3.5 py-2 text-sm font-medium text-slate-300 border border-transparent transition-all duration-300  hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.18)]"
              >
                Dashboard
                <span className="pointer-events-none absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-3/4 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </Link>
              <Link
                href="/dashboard/review"
                className="group relative rounded-xl px-3.5 py-2 text-sm font-medium text-slate-300 border border-transparent transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.18)]"
              >
                New Review
                <span className="pointer-events-none absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-3/4 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </Link>
              <Link
                href="/dashboard/review/history"
                className="group relative rounded-xl px-3.5 py-2 text-sm font-medium text-slate-300 border border-transparent transition-all duration-300  hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.18)]"
              >
                Review History
                <span className="pointer-events-none absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-3/4 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </Link>
            </nav>

            <div className="h-5 w-px bg-slate-800 hidden sm:block" />

            <UserProfileMenu user={session.user} />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
