import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      emailVerified: true,
      createdAt: true,
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  const createdAt = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(user.createdAt);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="mt-2 text-slate-400">
            View your account details and manage your profile.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 lg:col-span-1">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 text-3xl font-bold text-white">
              {user.name.trim().charAt(0).toUpperCase() || (
                <User className="h-8 w-8" />
              )}
            </div>

            <h2 className="mt-5 wrap-break-word text-xl font-semibold text-white">
              {user.name}
            </h2>
            <p className="mt-1 break-all text-sm text-slate-400">
              {user.email}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm">
              {user.emailVerified ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Email verified</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 text-amber-400" />
                  <span className="text-amber-400">Email not verified</span>
                </>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-white">
              Account information
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Your registered account details.
            </p>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-slate-400">Display name</p>
                  <p className="mt-1 wrap-break-word font-medium text-white">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-cyan-400" />
                <div className="min-w-0">
                  <p className="text-sm text-slate-400">Email address</p>
                  <p className="mt-1 break-all font-medium text-white">
                    {user.email}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Email changes are not available here.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-slate-400">Account created</p>
                  <p className="mt-1 font-medium text-white">{createdAt}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-slate-400">Account security</p>
                  <p className="mt-1 font-medium text-white">
                    Authenticated account
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6">
          <h2 className="text-lg font-semibold text-white">Edit profile</h2>
          <p className="mt-1 mb-6 text-sm text-slate-400">
            Update your display name. Your email address remains unchanged.
          </p>

          <ProfileForm initialName={user.name} />
        </section>
      </div>
    </div>
  );
}
