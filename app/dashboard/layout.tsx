import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

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
