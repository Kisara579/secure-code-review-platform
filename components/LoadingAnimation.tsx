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
      {/* Outer ring + icon */}
      <div className="relative flex items-center justify-center">
        {/* Spinning ring */}
        <span className="absolute h-16 w-16 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" />

        {/* Pulsing icon */}
        <ShieldCheck className="h-7 w-7 animate-pulse text-cyan-400" />
      </div>

      {/* Message */}
      <p className="text-sm font-medium text-slate-400">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-20">{content}</div>
  );
}
