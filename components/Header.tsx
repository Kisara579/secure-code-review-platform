import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-slate-950 px-4 py-4 sm:px-6 border-b border-slate-800 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="SecureReview AI Logo"
          width={32}
          height={32}
          priority
        />
        <h1 className="text-xl font-semibold text-white hover:text-cyan-300">
          SecureReview AI
        </h1>
      </Link>

      <nav className="rounded-md border border-transparent px-3 py-2 text-sm text-white hover:border-cyan-300 hover:text-cyan-300">
        <Link href="/documentation">Documentation</Link>
      </nav>
    </header>
  );
}
