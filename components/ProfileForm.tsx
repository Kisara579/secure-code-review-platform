
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Check, Loader2, Save } from "lucide-react";

type ProfileFormProps = {
  initialName: string;
};

export default function ProfileForm({ initialName }: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Name cannot be empty.");
      setSuccess("");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const { error: updateError } = await authClient.updateUser({
        name: trimmedName,
      });

      if (updateError) {
        setError(updateError.message || "Unable to update your profile.");
        return;
      }

      setName(trimmedName);
      setSuccess("Your profile has been updated.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="profile-name"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Display name
        </label>

        <input
          id="profile-name"
          type="text"
          autoComplete="name"
          maxLength={100}
          required
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
            setSuccess("");
          }}
          disabled={isSaving}
          className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-60"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="flex items-center gap-2 text-sm text-emerald-400">
          <Check className="h-4 w-4" />
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={isSaving || !name.trim() || name.trim() === initialName}
        className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            Save changes
          </>
        )}
      </button>
    </form>
  );
}
