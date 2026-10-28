"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  AlertCircle,
  Shield,
  Scan,
  Users,
} from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message ?? "Unable to create your account.");
        return;
      }

      setRegistrationComplete(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen bg-slate-950">
      {/* Left decorative panel - hidden on mobile */}
      <div className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-950/30 to-slate-950" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-16 text-4xl font-mono font-bold text-blue-500/10 animate-pulse">
          {"</>"}
        </div>
        <div
          className="absolute top-40 right-20 text-3xl font-mono font-bold text-cyan-500/10"
          style={{ animation: "pulse 3s ease-in-out infinite 1s" }}
        >
          {"{ }"}
        </div>
        <div
          className="absolute bottom-40 left-24 text-2xl font-mono font-bold text-emerald-500/10"
          style={{ animation: "pulse 3s ease-in-out infinite 2s" }}
        >
          {"//"}
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-16">
          <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/20">
            <Shield className="h-7 w-7 text-white" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Start Securing
            <br />
            Your Code Today
          </h1>
          <p className="mt-3 max-w-sm text-lg text-slate-400">
            Join thousands of developers who trust SecureReview AI to keep their
            codebase safe and secure.
          </p>

          <div className="mt-12 space-y-5">
            {[
              {
                icon: Shield,
                title: "AI-Powered Analysis",
                desc: "Smart vulnerability detection",
              },
              {
                icon: Scan,
                title: "Real-time Scanning",
                desc: "Continuous security monitoring",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                desc: "Built for DevSecOps teams",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80">
                  <item.icon className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-sm">
            {registrationComplete ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10">
                  <Mail className="h-7 w-7 text-cyan-400" />
                </div>

                <h1 className="mt-5 text-2xl font-bold text-white">
                  Check your email
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  We&apos;ve created your account. If the verification email was
                  sent successfully, you&apos;ll receive a link at{" "}
                  <span className="font-medium text-white">{email}</span>. Open
                  that link to verify your email address before signing in.
                </p>

                <Link
                  href="/sign-in"
                  className="mt-6 inline-flex w-full justify-center rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-3 font-semibold text-white transition-all hover:brightness-110"
                >
                  Go to sign in
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-white">
                  Create your account
                </h1>
                <p className="mt-2 text-slate-400">
                  Sign up to start reviewing your code securely.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Full name
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 py-3 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 py-3 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        minLength={8}
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 py-3 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                        placeholder="At least 8 characters"
                      />
                    </div>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-lg disabled:hover:brightness-100"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Creating account…
                      </span>
                    ) : (
                      "Create account"
                    )}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-400">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                  >
                    Sign in →
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
