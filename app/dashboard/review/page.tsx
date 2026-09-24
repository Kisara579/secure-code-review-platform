"use client";

import { useState } from "react";

export default function ReviewPage() {
  const [repository, setRepository] = useState("");
  const [branch, setBranch] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!repository.trim() || !branch.trim()) {
      setError("Please enter both repository URL and branch.");
      return;
    }

    try {
      const url = new URL(repository);
      const pathParts = url.pathname.split("/").filter(Boolean);

      if (url.hostname !== "github.com" && url.hostname !== "gitlab.com") {
        setError("Please enter a GitHub or GitLab repository URL.");
        return;
      }

      if (pathParts.length !== 2) {
        setError("Please enter a valid repository URL.");
        return;
      }
    } catch {
      setError("Please enter a valid repository URL.");
      return;
    }

    setError("");
  };

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-white">Start Code Review</h1>

        <p className="mt-2 text-slate-400">
          Provide your repository information to begin a secure code review.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="repository"
              className="block text-sm font-medium text-white"
            >
              Repository URL
            </label>

            <input
              id="repository"
              name="repository"
              type="url"
              placeholder="https://github.com/username/repository"
              value={repository}
              onChange={(event) => setRepository(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <div>
            <label
              htmlFor="branch"
              className="block text-sm font-medium text-white"
            >
              Branch
            </label>

            <input
              id="branch"
              name="branch"
              type="text"
              placeholder="main"
              value={branch}
              onChange={(event) => setBranch(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="rounded-full bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
          >
            Start Review
          </button>
        </form>
      </div>
    </main>
  );
}
