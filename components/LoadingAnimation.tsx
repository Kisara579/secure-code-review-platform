"use client";

import { ShieldCheck } from "lucide-react";

interface LoadingAnimationProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingAnimation({
  message = "Analyzing…",
  fullScreen = false,
}: LoadingAnimationProps) {
  const content = (
    <div className="flex flex-col items-center gap-6">
      {/* Outer ring + glow + icon */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        {/* Ambient glow behind spinner */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />

        {/* Spinning gradient border ring */}
        <span className="absolute h-16 w-16 animate-spin rounded-full border-2 border-slate-800 border-t-cyan-400 border-r-blue-500" />

        {/* Pulsing security icon */}
        <ShieldCheck className="relative h-7 w-7 animate-pulse text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
      </div>

      {/* Message & subtle subtext */}
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide text-white">{message}</p>
        <p className="mt-1 text-xs text-slate-500">Security scanners running in isolated sandbox</p>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-24">{content}</div>
  );
}
