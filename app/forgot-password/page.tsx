"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: requestError } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });

      if (requestError) {
        setError(
          requestError.message ??
            "Unable to process your request. Please try again.",
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/sign-in"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 shadow-2xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
            <Shield className="h-7 w-7 text-cyan-400" />
          </div>

          {submitted ? (
            <div role="status">
              <CheckCircle className="mb-4 h-8 w-8 text-emerald-400" />

              <h1 className="text-2xl font-bold text-white">
                Check your email
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                If an account exists for this email address, a password-reset
                link will be sent. Check your inbox and spam folder.
              </p>

              <p className="mt-3 break-all text-sm text-cyan-400">{email}</p>

              <Link
                href="/sign-in"
                className="mt-6 inline-flex w-full justify-center rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-3 font-semibold text-white transition-all hover:brightness-110"
              >
                Return to sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white">
                Forgot your password?
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter the email address associated with your account. We’ll send
                you instructions to reset your password if the account exists.
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
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 py-3 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
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
                  className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending request…" : "Send reset link"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
