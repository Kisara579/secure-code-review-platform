import Link from "next/link";

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
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center">
          <h1 className="text-2xl font-bold text-white">{title}</h1>

          <p className="mt-3 text-slate-400">{message}</p>

          <Link
            href={actionHref}
            className="mt-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            {actionLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
