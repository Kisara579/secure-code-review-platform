"use client";

import { useEffect, useState } from "react";

type CountUpProps = {
  value: number;
  duration?: number;
};

export default function CountUp({ value, duration = 900 }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      const animationFrame = requestAnimationFrame(() => setCount(value));
      return () => cancelAnimationFrame(animationFrame);
    }

    const startTime = performance.now();
    let animationFrame = 0;

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      setCount(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration, value]);

  return <>{count.toLocaleString()}</>;
}
