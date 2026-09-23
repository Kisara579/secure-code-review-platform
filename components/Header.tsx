import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-950 px-4 py-4 sm:px-6 border-b border-slate-800 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-white hover:text-cyan-300">
          SecureReview AI
        </h1>
      </div>

      <nav className="rounded-md border border-transparent px-3 py-2 text-sm text-white hover:border-cyan-300 hover:text-cyan-300">
        <Link href="/documentation">Documentation</Link>
      </nav>
    </header>
  );
}
