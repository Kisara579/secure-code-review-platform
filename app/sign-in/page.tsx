"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  ArrowLeft,
  Mail,
  Lock,
  AlertCircle,
  Shield,
  Zap,
  Eye,
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } = await authClient.signIn.email({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message ?? "Unable to sign in.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch {
      setError("Unable to sign in with Google. Please try again.");
    }
  }

  async function handleGitHubSignIn() {
    setError("");

    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    } catch {
      setError("Unable to sign in with GitHub. Please try again.");
    }
  }

  async function handleGitLabSignIn() {
    setError("");

    try {
      await authClient.signIn.social({
        provider: "gitlab",
        callbackURL: "/dashboard",
      });
    } catch {
      setError("Unable to sign in with GitLab. Please try again.");
    }
  }

  return (
    <main className="flex min-h-screen bg-slate-950">
      {/* Left decorative panel - hidden on mobile */}
      <div className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-cyan-950/30 to-slate-950" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-16 text-4xl font-mono font-bold text-cyan-500/10 animate-pulse">
          {"</>"}
        </div>
        <div
          className="absolute top-40 right-20 text-3xl font-mono font-bold text-blue-500/10"
          style={{ animation: "pulse 3s ease-in-out infinite 1s" }}
        >
          {"{ }"}
        </div>
        <div
          className="absolute bottom-40 left-24 text-2xl font-mono font-bold text-violet-500/10"
          style={{ animation: "pulse 3s ease-in-out infinite 2s" }}
        >
          {"//"}
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-16">
          <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
            <Shield className="h-7 w-7 text-white" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            SecureReview AI
          </h1>
          <p className="mt-3 max-w-sm text-lg text-slate-400">
            Your intelligent security companion for modern code review and
            vulnerability detection.
          </p>

          <div className="mt-12 space-y-5">
            {[
              {
                icon: Shield,
                title: "Enterprise Security",
                desc: "Bank-grade encryption & compliance",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Results in seconds, not hours",
              },
              {
                icon: Eye,
                title: "Deep Analysis",
                desc: "AI-powered vulnerability detection",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80">
                  <item.icon className="h-5 w-5 text-cyan-400" />
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
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="mt-2 text-slate-400">
              Sign in to continue to SecureReview AI.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 py-3 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Enter your password"
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
                    Signing in…
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="mt-5 space-y-3">
              <div className="relative mb-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-slate-900 px-3 text-slate-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google - first row */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 font-medium text-white transition-colors hover:bg-slate-800"
              >
                {/* Keep your existing Google SVG here */}
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.22Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.6c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.6Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.54 13.69A5.86 5.86 0 0 1 6.23 12c0-.59.11-1.16.31-1.69V7.78H3.3A9.73 9.73 0 0 0 2.25 12c0 1.53.37 2.98 1.05 4.22l3.24-2.53Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.28c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.38 14.63 2.4 12 2.4a9.75 9.75 0 0 0-8.7 5.38l3.24 2.53C7.31 8 9.46 6.28 12 6.28Z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* GitHub and GitLab - second row */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleGitHubSignIn}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 font-medium text-white transition-colors hover:bg-slate-800"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.467-1.11-1.467-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.089 2.91.833.091-.647.35-1.09.636-1.34-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.339 4.695-4.566 4.944.359.31.678.921.678 1.856 0 1.34-.012 2.42-.012 2.75 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
                    />
                  </svg>
                  <span className="text-sm">GitHub</span>
                </button>

                <button
                  type="button"
                  onClick={handleGitLabSignIn}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 font-medium text-white transition-colors hover:bg-slate-800"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0"
                  >
                    <path fill="#E24329" d="m12 21.5 4.42-13.6H7.58L12 21.5Z" />
                    <path fill="#FC6D26" d="m12 21.5-4.42-13.6H1.4L12 21.5Z" />
                    <path
                      fill="#FCA326"
                      d="M1.4 7.9.06 12.02a.9.9 0 0 0 .33 1l11.61 8.48L1.4 7.9Z"
                    />
                    <path
                      fill="#E24329"
                      d="M1.4 7.9h6.18L5.02 1.3a.46.46 0 0 0-.88 0L1.4 7.9Z"
                    />
                    <path fill="#FC6D26" d="M12 21.5 16.42 7.9h6.18L12 21.5Z" />
                    <path
                      fill="#FCA326"
                      d="m22.6 7.9 1.34 4.12a.9.9 0 0 1-.33 1L12 21.5 22.6 7.9Z"
                    />
                    <path
                      fill="#E24329"
                      d="M22.6 7.9h-6.18l2.56-6.6a.46.46 0 0 1 .88 0l2.74 6.6Z"
                    />
                  </svg>
                  <span className="text-sm">GitLab</span>
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              Need an account?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
              >
                Create one →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
