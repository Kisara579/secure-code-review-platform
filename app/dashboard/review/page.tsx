"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/components/LoadingAnimation";
import {
  ArrowLeft,
  GitBranch,
  Globe,
  AlertCircle,
  RefreshCw,
  LockKeyhole,
  Globe2,
  Check,
  Search,
  BookMarked,
  ExternalLink,
  Send,
  Link2,
  Pencil,
} from "lucide-react";

interface GitHubRepository {
  id: number;
  name: string;
  fullName: string;
  owner: string;
  private: boolean;
  defaultBranch: string | null;
  htmlUrl: string;
  pushedAt: string | null;
}

/* ── GitHub / GitLab logo SVGs ────────────────────────────── */

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.467-1.11-1.467-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.089 2.91.833.091-.647.35-1.09.636-1.34-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.339 4.695-4.566 4.944.359.31.678.921.678 1.856 0 1.34-.012 2.42-.012 2.75 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
      />
    </svg>
  );
}

function GitLabIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="m23.6 9.593-.033-.086L20.3.98a.851.851 0 0 0-.336-.393.865.865 0 0 0-.997.063.874.874 0 0 0-.29.38l-2.208 6.755H7.53L5.323 1.03a.857.857 0 0 0-.29-.381.865.865 0 0 0-.997-.063.854.854 0 0 0-.337.394L.433 9.502l-.032.087a6.07 6.07 0 0 0 2.012 7.01l.012.008.03.023 4.984 3.73 2.466 1.866 1.502 1.135a1.014 1.014 0 0 0 1.226 0l1.502-1.135 2.466-1.866 5.013-3.753.013-.01a6.073 6.073 0 0 0 2.009-7.004Z" />
    </svg>
  );
}

export default function ReviewPage() {
  const [repository, setRepository] = useState("");
  const [activeTab, setActiveTab] = useState<"github" | "gitlab" | "manual">(
    "github",
  );
  const [branch, setBranch] = useState("");
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [selectedRepositoryId, setSelectedRepositoryId] = useState("");
  const [githubConnected, setGithubConnected] = useState(false);
  const [isLoadingRepositories, setIsLoadingRepositories] = useState(true);
  const [repositoryLoadError, setRepositoryLoadError] = useState("");
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState<"repository" | "branch" | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditingBranch, setIsEditingBranch] = useState(false);

  const router = useRouter();

  const loadRepositories = async () => {
    setIsLoadingRepositories(true);
    setRepositoryLoadError("");

    try {
      const response = await fetch("/api/github/repositories", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        setGithubConnected(false);
        setRepositories([]);

        if (response.status !== 404) {
          setRepositoryLoadError(
            data.error ?? "Unable to load GitHub repositories.",
          );
        }
        return;
      }

      setGithubConnected(true);
      const sortedRepositories = [...(data.repositories ?? [])].sort(
        (a, b) =>
          new Date(b.pushedAt ?? 0).getTime() -
          new Date(a.pushedAt ?? 0).getTime(),
      );

      setRepositories(sortedRepositories);
    } catch {
      setRepositoryLoadError(
        "Unable to load GitHub repositories. Please try again.",
      );
    } finally {
      setIsLoadingRepositories(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function fetchRepositories() {
      try {
        const response = await fetch("/api/github/repositories", {
          cache: "no-store",
        });
        const data = await response.json();

        if (cancelled) return;

        if (!response.ok) {
          setGithubConnected(false);
          setRepositories([]);

          setRepositoryLoadError(
            response.status === 404
              ? ""
              : (data.error ?? "Unable to load GitHub repositories."),
          );
          return;
        }

        setGithubConnected(true);
        setRepositories(data.repositories ?? []);
        setRepositoryLoadError("");
      } catch {
        if (!cancelled) {
          setRepositoryLoadError(
            "Unable to load GitHub repositories. Please try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingRepositories(false);
        }
      }
    }

    void fetchRepositories();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleRepositorySelect = (repositoryId: string) => {
    setSelectedRepositoryId(repositoryId);
    setError("");
    setErrorField(null);
    setIsEditingBranch(false);

    const selected = repositories.find(
      (item) => String(item.id) === repositoryId,
    );

    if (selected) {
      setRepository(selected.htmlUrl);
      setBranch(selected.defaultBranch ?? "");
    }
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    if (!repository.trim() && !branch.trim()) {
      setError("Please enter both repository URL and branch.");
      setErrorField("repository");
      return;
    }

    if (!repository.trim()) {
      setError("Please enter a repository URL.");
      setErrorField("repository");
      return;
    }

    if (!branch.trim()) {
      setError("Please enter a branch name.");
      setErrorField("branch");
      return;
    }

    try {
      const url = new URL(repository.trim());
      const pathParts = url.pathname.split("/").filter(Boolean);

      if (
        url.protocol !== "https:" ||
        (url.hostname !== "github.com" && url.hostname !== "gitlab.com")
      ) {
        setError("Please enter a valid HTTPS GitHub or GitLab repository URL.");
        setErrorField("repository");
        return;
      }

      if (pathParts.length !== 2) {
        setError(
          "Please enter a valid repository URL (e.g. https://github.com/owner/repo).",
        );
        setErrorField("repository");
        return;
      }
    } catch {
      setError(
        "Please enter a valid repository URL (e.g. https://github.com/owner/repo).",
      );
      setErrorField("repository");
      return;
    }

    setError("");
    setErrorField(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repository: repository.trim(),
          branch: branch.trim(),
          ...(activeTab === "github" && selectedRepo
            ? { githubRepositoryId: selectedRepo.id }
            : {}),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to start review.");

        if (data.reason === "REPO_NOT_FOUND") {
          setErrorField("repository");
        } else if (data.reason === "BRANCH_NOT_FOUND") {
          setErrorField("branch");
        } else {
          setErrorField(null);
        }

        setIsSubmitting(false);
        return;
      }

      const newReviewId = data.data.reviewId;
      setRepository("");
      setBranch("");
      setSelectedRepositoryId("");
      setErrorField(null);

      router.push(`/dashboard/review/${newReviewId}`);
    } catch {
      setError(
        "Something went wrong while verifying. Please check your network and try again.",
      );
      setErrorField(null);
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: "repository" | "branch") =>
    `w-full rounded-xl border bg-slate-950/80 py-3 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-600 disabled:opacity-50 ${
      errorField === field
        ? "border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
        : "border-slate-700/80 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
    }`;

  /* ── Filtered repositories for search ─────────────────────── */
  const filteredRepositories = [...repositories]
    .sort((a, b) => {
      // Repositories selected or updated most recently should appear first.
      return 0;
    })
    .filter(
      (item) =>
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  const selectedRepo = repositories.find(
    (item) => String(item.id) === selectedRepositoryId,
  );

  /* ── Provider Panel (shared between GitHub & GitLab) ────── */
  const renderProviderPanel = (provider: "github" | "gitlab") => {
    const isGitHub = provider === "github";
    const isConnected = isGitHub ? githubConnected : false;
    const isDisabled = !isGitHub; // GitLab disabled for now

    return (
      <div
        role="tabpanel"
        id={`${provider}-panel`}
        aria-labelledby={`${provider}-tab`}
        className="space-y-5"
      >
        {/* Provider header card */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                isGitHub ? "bg-slate-800" : "bg-orange-950/40"
              }`}
            >
              {isGitHub ? (
                <GitHubIcon className="h-6 w-6 text-white" />
              ) : (
                <GitLabIcon className="h-6 w-6 text-orange-400" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white">
                {isGitHub ? "GitHub" : "GitLab"}
              </h3>
              <p className="text-sm text-slate-400">
                {isDisabled
                  ? "GitLab integration coming soon."
                  : "Connect your account to access repositories."}
              </p>
            </div>

            <span
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                isDisabled
                  ? "border border-slate-700 text-slate-500"
                  : isConnected
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "border border-slate-700 text-slate-500"
              }`}
            >
              {isDisabled ? (
                "Coming soon"
              ) : isConnected ? (
                <>
                  <Check className="h-3 w-3" />
                  Connected
                </>
              ) : (
                "Not connected"
              )}
            </span>
          </div>

          {/* Connect / Manage button */}
          {isGitHub ? (
            <a
              href="/api/github/install"
              aria-disabled={isSubmitting}
              onClick={(event) => {
                if (isSubmitting) {
                  event.preventDefault();
                }
              }}
              className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-3 text-sm font-medium text-white transition-colors hover:border-cyan-500 hover:bg-slate-800 ${
                isSubmitting ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <GitHubIcon className="h-4 w-4" />
              {isConnected ? "Manage GitHub Installation" : "Connect GitHub"}
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-3 text-sm font-medium text-slate-500 opacity-50 cursor-not-allowed"
            >
              <GitLabIcon className="h-4 w-4" />
              Connect GitLab
            </button>
          )}

          {/* Connected status bar (GitHub only) */}
          {isGitHub && isConnected && (
            <div className="mt-4 flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Check className="h-3.5 w-3.5" />
                GitHub installation detected
              </span>

              <button
                type="button"
                onClick={() => void loadRepositories()}
                disabled={isLoadingRepositories || isSubmitting}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isLoadingRepositories ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </button>
            </div>
          )}
        </div>

        {/* ── Repository list ──────────────────────────────── */}
        {isGitHub && isConnected && (
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
            <div className="flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                <BookMarked className="h-4 w-4 text-cyan-400" />
                Your Repositories
              </h4>
              {repositories.length > 0 && (
                <p className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <LockKeyhole className="h-3 w-3" />
                    {repositories.filter((item) => item.private).length} private
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe2 className="h-3 w-3" />
                    {repositories.filter((item) => !item.private).length} public
                  </span>
                </p>
              )}
            </div>

            {/* Search */}
            {repositories.length > 3 && (
              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search repositories…"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 py-2.5 pl-9 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            )}

            {/* Repository list */}
            {isLoadingRepositories ? (
              <div className="mt-4 flex items-center justify-center py-8">
                <RefreshCw className="h-5 w-5 animate-spin text-slate-500" />
                <span className="ml-2 text-sm text-slate-500">
                  Loading repositories…
                </span>
              </div>
            ) : repositories.length === 0 ? (
              <div className="mt-4 rounded-lg border border-dashed border-slate-700 py-8 text-center">
                <BookMarked className="mx-auto h-8 w-8 text-slate-600" />
                <p className="mt-2 text-sm text-slate-500">
                  No accessible repositories found.
                </p>
              </div>
            ) : (
              <div className="mt-4 max-h-80 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
                {filteredRepositories.length === 0 ? (
                  <div className="py-6 text-center">
                    <Search className="mx-auto h-6 w-6 text-slate-600" />
                    <p className="mt-2 text-sm text-slate-500">
                      No repositories match &quot;{searchQuery}&quot;
                    </p>
                  </div>
                ) : (
                  filteredRepositories.map((item) => {
                    const isSelected = String(item.id) === selectedRepositoryId;

                    return (
                      <div
                        key={item.id}
                        className={`group flex items-center gap-3 rounded-lg border px-4 py-3 transition-all ${
                          isSelected
                            ? "border-cyan-500/40 bg-cyan-500/5"
                            : "border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/60"
                        }`}
                      >
                        {/* Repo icon */}
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                            isSelected
                              ? "bg-cyan-500/15 text-cyan-400"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {item.private ? (
                            <LockKeyhole className="h-3.5 w-3.5" />
                          ) : (
                            <BookMarked className="h-3.5 w-3.5" />
                          )}
                        </div>

                        {/* Repo info */}
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm font-medium ${
                              isSelected ? "text-cyan-300" : "text-white"
                            }`}
                          >
                            {item.fullName}
                          </p>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              {item.private ? (
                                <>
                                  <LockKeyhole className="h-3 w-3" />
                                  Private
                                </>
                              ) : (
                                <>
                                  <Globe2 className="h-3 w-3" />
                                  Public
                                </>
                              )}
                            </span>
                            {item.defaultBranch && (
                              <span className="flex items-center gap-1">
                                <GitBranch className="h-3 w-3" />
                                {item.defaultBranch}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Select / Selected button */}
                        {isSelected ? (
                          <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-cyan-500/15 px-3 py-1.5 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/30">
                            <Check className="h-3 w-3" />
                            Selected
                          </span>
                        ) : (
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() =>
                              handleRepositorySelect(String(item.id))
                            }
                            className="shrink-0 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 disabled:opacity-50"
                          >
                            Select
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {repositoryLoadError && (
              <p role="alert" className="mt-3 text-sm text-amber-400">
                {repositoryLoadError}
              </p>
            )}
          </div>
        )}

        {/* GitLab – not connected placeholder (shown when on GitLab tab) */}
        {!isGitHub && (
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/30 p-6 text-center">
            <GitLabIcon className="mx-auto h-10 w-10 text-slate-600" />
            <p className="mt-3 text-sm text-slate-500">
              GitLab repository listing will be available once the integration
              is implemented. You can use the <strong>Manual URL</strong> tab in
              the meantime.
            </p>
          </div>
        )}

        {/* GitHub not-connected placeholder */}
        {isGitHub && !isConnected && !isLoadingRepositories && (
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/30 p-6 text-center">
            <GitHubIcon className="mx-auto h-10 w-10 text-slate-600" />
            <p className="mt-3 text-sm text-slate-500">
              Connect your GitHub account above to see your repositories here.
            </p>
          </div>
        )}

        {/* ── Selected repo + Submit button ────────────────── */}
        {isGitHub && selectedRepo && (
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
              <Check className="h-4 w-4" />
              Ready to Review
            </h4>

            {/* Repository info */}
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3">
              <BookMarked className="h-4 w-4 shrink-0 text-cyan-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {selectedRepo.fullName}
                </p>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    {selectedRepo.private ? (
                      <>
                        <LockKeyhole className="h-3 w-3" />
                        Private
                      </>
                    ) : (
                      <>
                        <Globe2 className="h-3 w-3" />
                        Public
                      </>
                    )}
                  </span>
                </div>
              </div>
              <a
                href={selectedRepo.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-slate-500 hover:text-slate-300"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Branch selector */}
            <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="provider-branch"
                  className="flex items-center gap-2 text-xs font-medium text-slate-400"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  Branch
                </label>
                {!isEditingBranch && (
                  <button
                    type="button"
                    onClick={() => setIsEditingBranch(true)}
                    className="flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-cyan-400"
                  >
                    <Pencil className="h-3 w-3" />
                    Change
                  </button>
                )}
              </div>

              {isEditingBranch ? (
                <div className="mt-2 flex items-center gap-2">
                  <div className="relative flex-1">
                    <GitBranch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                    <input
                      id="provider-branch"
                      type="text"
                      value={branch}
                      onChange={(event) => {
                        setBranch(event.target.value);
                        if (errorField === "branch") {
                          setErrorField(null);
                          setError("");
                        }
                      }}
                      placeholder="e.g. main, develop, feature/xyz"
                      disabled={isSubmitting}
                      className="w-full rounded-lg border border-slate-700/80 bg-slate-950/80 py-2 pl-8 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingBranch(false)}
                    className="shrink-0 rounded-lg bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/30 transition-colors hover:bg-cyan-500/20"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <p className="mt-1 text-sm font-medium text-white">
                  {branch || selectedRepo.defaultBranch || "main"}
                </p>
              )}
            </div>

            {error && (
              <div
                role="alert"
                className="mt-3 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => void handleSubmit()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-lg disabled:hover:brightness-100"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Verifying & Starting…" : "Submit Review"}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isSubmitting && (
        <LoadingAnimation
          message="Verifying repository and branch… Please wait."
          fullScreen
        />
      )}

      <div className="px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="group mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Dashboard
          </button>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 backdrop-blur-sm">
            <h1 className="text-2xl font-bold text-white">Start Code Review</h1>
            <p className="mt-2 text-slate-400">
              Connect a provider and select a repository, or enter its URL
              manually.
            </p>

            <section className="mt-8 space-y-5">
              <h2 className="text-sm font-semibold text-slate-200">
                Choose a repository source
              </h2>

              <div
                role="tablist"
                aria-label="Repository source"
                className="grid grid-cols-3 gap-2 rounded-xl border border-slate-800 bg-slate-950/70 p-1.5"
              >
                {(
                  [
                    {
                      id: "github",
                      label: "GitHub",
                      icon: <GitHubIcon className="h-4 w-4" />,
                    },
                    {
                      id: "gitlab",
                      label: "GitLab",
                      icon: <GitLabIcon className="h-4 w-4" />,
                    },
                    {
                      id: "manual",
                      label: "Manual URL",
                      icon: <Link2 className="h-4 w-4" />,
                    },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`${tab.id}-tab`}
                    aria-selected={activeTab === tab.id}
                    aria-controls={`${tab.id}-panel`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setError("");
                      setErrorField(null);
                    }}
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/40"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ── GitHub Tab ──────────────────────────────── */}
              {activeTab === "github" && renderProviderPanel("github")}

              {/* ── GitLab Tab ──────────────────────────────── */}
              {activeTab === "gitlab" && renderProviderPanel("gitlab")}

              {/* ── Manual Tab ─────────────────────────────── */}
              {activeTab === "manual" && (
                <div
                  role="tabpanel"
                  id="manual-panel"
                  aria-labelledby="manual-tab"
                  className="rounded-xl border border-slate-800 bg-slate-950/40 p-5"
                >
                  <h3 className="flex items-center gap-2 font-semibold text-white">
                    <Link2 className="h-4 w-4 text-cyan-400" />
                    Enter Repository Details
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Enter a public repository URL and the branch you want to
                    review.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                      <label
                        htmlFor="repository"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        Repository URL
                      </label>
                      <div className="relative">
                        <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                          id="repository"
                          name="repository"
                          type="url"
                          placeholder="https://github.com/username/repository"
                          value={repository}
                          onChange={(event) => {
                            setRepository(event.target.value);
                            setSelectedRepositoryId("");
                            if (errorField === "repository") {
                              setErrorField(null);
                              setError("");
                            }
                          }}
                          disabled={isSubmitting}
                          className={inputClass("repository")}
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        Enter a GitHub or GitLab repository URL.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="branch"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        Branch
                      </label>
                      <div className="relative">
                        <GitBranch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                          id="branch"
                          name="branch"
                          type="text"
                          placeholder="main"
                          value={branch}
                          onChange={(event) => {
                            setBranch(event.target.value);
                            if (errorField === "branch") {
                              setErrorField(null);
                              setError("");
                            }
                          }}
                          disabled={isSubmitting}
                          className={inputClass("branch")}
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
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-lg disabled:hover:brightness-100"
                    >
                      <Send className="h-4 w-4" />
                      {isSubmitting ? "Verifying & Starting…" : "Start Review"}
                    </button>
                  </form>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
