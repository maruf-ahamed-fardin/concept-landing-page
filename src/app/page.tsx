"use client";

import React, { useState } from "react";
import { SvgSprites } from "@/components/SvgSprites";
import { HeritageBackdrop } from "@/components/HeritageBackdrop";
import { CloudFogPreloader } from "@/components/CloudFogPreloader";
import { HeroSection } from "@/components/HeroSection";
import { TruthHookSection } from "@/components/TruthHookSection";
import { StorySection } from "@/components/StorySection";
import { PairingReceiptSection } from "@/components/PairingReceiptSection";
import { ProductFunnelSection } from "@/components/ProductFunnelSection";
import { PRODUCTS } from "@/data/products";

export default function KhejurGurFunnelPage() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 1850);
  };

  const handleAdd = (id: string) => {
    setQty((prev) => ({ ...prev, [id]: Math.min((prev[id] || 0) + 1, 20) }));
    if (byId[id]) {
      showToast(`✓ ${byId[id].name} ঝুড়িতে যোগ হয়েছে`);
    }
  };

  const handleDelta = (id: string, delta: number) => {
    setQty((prev) => {
      const next = Math.max(0, Math.min((prev[id] || 0) + delta, 20));
      return { ...prev, [id]: next };
    });
    if (delta > 0 && byId[id]) {
      showToast(`✓ ${byId[id].name} ঝুড়িতে যোগ হয়েছে`);
    }
  };

  return (
    <>
      {/* Shared SVG Gradients & Folk Symbols */}
      <SvgSprites />

      {/* 3s Cartoon Winter-Fog & Fluffy Cloud Preloader (pure CSS, removes itself) */}
      <CloudFogPreloader />

      {/* Main Full-Width Canvas (Preserving Centered Content Column & Rows As-Is) */}
      <main className="page relative min-h-screen w-full overflow-x-clip pb-[50px] sm:pb-[58px]">
        {/* Atmospheric Color-Graded Blooms, Tat Ribbons & Nakshi Kantha Art Layer */}
        <HeritageBackdrop />

        {/* 1. Hero Section Revealed Smoothly As Fog Clears */}
        <div className="relative z-10">
          <HeroSection />
        </div>

        {/* 2. Post-Hero Terracotta Folk Plaque */}
        <div className="relative z-10 band band-peach">
          <TruthHookSection />
        </div>

        {/* 3. Story Section: Unchanged 3rd Image Cover + Visual-First 3-Part Story Reel */}
        <div className="relative z-10">
          <StorySection />
        </div>

        {/* 4. Interactive Sweet-Shop Pairing Receipt ("কোন খাবারে কোন গুড়?") */}
        <div className="relative z-10 band band-terracotta">
          <PairingReceiptSection onQuickAdd={handleAdd} selectedQty={qty} />
        </div>

        {/* 5. 6-Stop Orbital Road + Center Spotlight + FAQ + Sticky Bar */}
        <div className="relative z-10 band band-haldi">
          <ProductFunnelSection qty={qty} onAdd={handleAdd} onDelta={handleDelta} />
        </div>
      </main>

      {/* Toast Feedback Pill */}
      <div
        className={`pointer-events-none fixed bottom-[96px] left-1/2 z-50 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full border border-[#DFB985]/45 bg-ink px-4 py-2 text-center text-[13.5px] font-semibold text-[#FFF4E2] transition duration-300 ${toastMsg ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
      >
        {toastMsg}
      </div>
    </>
  );
}
