import Link from "next/link";
import { SearchX, ArrowRight } from "lucide-react";

type NotFoundProps = {
  title?: string;
  message?: string;
  actionHref?: string;
  actionLabel?: string;
};

export default function NotFound({
  title = "Review Not Found",
  message = "We couldn't find a security review with this ID. It may not exist or may have been deleted.",
  actionHref = "/dashboard/review",
  actionLabel = "Start a New Review",
}: NotFoundProps) {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl backdrop-blur-sm">
          <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 blur-xl" />
          <SearchX className="relative h-10 w-10 text-cyan-400" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>

        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-slate-400">
          {message}
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href={actionHref}
            className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/30 hover:brightness-110"
          >
            {actionLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
