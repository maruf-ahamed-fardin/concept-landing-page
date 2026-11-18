"use client";

import React, { useEffect, useState } from "react";

interface WinterFogPreloaderProps {
  onBreezeStart?: () => void;
}

export function WinterFogPreloader({
  onBreezeStart,
}: WinterFogPreloaderProps) {
  const [stage, setStage] = useState<"mist" | "breeze" | "hidden">("mist");

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      onBreezeStart?.();
      setStage("hidden");
      return;
    }

    setStage("mist");

    const breezeTimer = setTimeout(() => {
      setStage("breeze");
      onBreezeStart?.();
    }, 260);

    const hideTimer = setTimeout(() => {
      setStage("hidden");
    }, 1950);

    return () => {
      clearTimeout(breezeTimer);
      clearTimeout(hideTimer);
    };
  }, [onBreezeStart]);

  if (stage === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className={`preloader-stage ${stage === "breeze" ? "is-breeze" : ""}`}
    >
      <div className="mist-base" />
      <div className="mist-layer mist-layer-1">
        <div className="mist-tex mist-tex-1" />
      </div>
      <div className="mist-layer mist-layer-2">
        <div className="mist-tex mist-tex-2" />
      </div>
      <div className="mist-layer mist-layer-3">
        <div className="mist-tex mist-tex-3" />
      </div>
    </div>
  );
}
