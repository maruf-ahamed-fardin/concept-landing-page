"use client";

import React, { useCallback, useState } from "react";
import { SvgSprites } from "@/components/SvgSprites";
import { WinterFogPreloader } from "@/components/WinterFogPreloader";
import { HeroSection } from "@/components/HeroSection";
import { TruthHookSection } from "@/components/TruthHookSection";
import { StorySection } from "@/components/StorySection";
import { PairingReceiptSection } from "@/components/PairingReceiptSection";
import { ProductFunnelSection } from "@/components/ProductFunnelSection";
import { PRODUCTS } from "@/data/products";

export default function KhejurGurFunnelPage() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [heroClear, setHeroClear] = useState(false);

  const handleBreezeStart = useCallback(() => {
    setHeroClear(true);
  }, []);

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

  return (
    <>
      {/* Shared SVG Gradients & Folk Symbols */}
      <SvgSprites />

      {/* Cinematic Winter Morning Fog Reveal Preloader (Once per Load) */}
      <WinterFogPreloader onBreezeStart={handleBreezeStart} />

      {/* Main Mobile-First Sales Funnel Column */}
      <main className="page relative mx-auto min-h-screen w-full max-w-[480px] pb-28 lg:shadow-[0_0_60px_-20px_rgba(59,31,14,.35)]">
        {/* 1. Hero Section Revealed Smoothly As Fog Clears */}
        <div className={heroClear ? "hero-reveal is-clear" : "hero-reveal"}>
          <HeroSection />
        </div>

        {/* 2. Post-Hero Terracotta Folk Plaque */}
        <TruthHookSection />

        {/* 3. Story Section: Unchanged 3rd Image Cover + Visual-First 3-Part Story Reel */}
        <StorySection />

        {/* 4. Interactive Sweet-Shop Pairing Receipt ("কোন খাবারে কোন গুড়?") */}
        <PairingReceiptSection onQuickAdd={handleAdd} selectedQty={qty} />

        {/* 5. 6-Stop Orbital Road + Center Spotlight + FAQ + Sticky Bar */}
        <ProductFunnelSection qty={qty} onAdd={handleAdd} />
      </main>

      {/* Toast Feedback Pill */}
      <div
        className={`pointer-events-none fixed bottom-[96px] left-1/2 z-50 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-center text-[13.5px] font-semibold text-[#FFF4E2] shadow-lg transition duration-300 ${toastMsg ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
      >
        {toastMsg}
      </div>
    </>
  );
}
