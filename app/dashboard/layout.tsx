import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
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
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
