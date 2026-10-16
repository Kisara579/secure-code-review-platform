"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { User, LogOut, ChevronDown, Loader2 } from "lucide-react";

type UserProfileMenuProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function UserProfileMenu({ user }: UserProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);
    try {
      const { error } = await authClient.signOut();
      if (error) {
        console.error("Failed to log out:", error);
        setLogoutError("We couldn't log you out. Please try again.");
        return;
      }

      setIsOpen(false);
      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Failed to log out:", error);
      setLogoutError("We couldn't log you out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setLogoutError(null);
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="group flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-1.5 pr-3 text-sm transition-all hover:border-slate-700 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
      >
        {/* Avatar circle */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 font-semibold text-white shadow-sm shadow-cyan-500/20">
          {user.name ? initial : <User className="h-4 w-4" />}
        </div>

        {/* User name on larger screens */}
        {user.name && (
          <span className="hidden max-w-30 truncate text-xs font-medium text-slate-200 sm:inline-block">
            {user.name}
          </span>
        )}

        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-cyan-400" : "group-hover:text-slate-300"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 origin-top-right rounded-2xl border border-slate-800/90 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150 z-50">
          {/* User info section */}
          <div className="border-b border-slate-800/80 px-3 py-2.5">
            <p className="text-sm font-semibold text-white truncate">
              {user.name ?? "User"}
            </p>
            {user.email && (
              <p className="text-xs text-slate-400 truncate mt-0.5 font-mono">
                {user.email}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-1.5">
            {logoutError && (
              <p role="alert" className="px-3 pb-2 text-xs text-red-400">
                {logoutError}
              </p>
            )}
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing out…</span>
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
