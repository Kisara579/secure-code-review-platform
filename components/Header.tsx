export default function Header() {
  return (
    <header className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-white hover:text-cyan-300">
          SecureReview AI
        </h1>
      </div>

      <nav className="text-white text-sm  hover:border-2 border-cyan-300 px-2 py-2 rounded-md">
        <a href="/documentation">Documentation</a>
      </nav>
    </header>
  );
}
