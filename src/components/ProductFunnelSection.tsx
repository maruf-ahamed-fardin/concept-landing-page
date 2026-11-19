"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  PHONE,
  ProductItem,
  PRODUCTS,
  toBn,
  toTk,
  WA_NUMBER,
} from "@/data/products";

interface ProductFunnelSectionProps {
  qty: Record<string, number>;
  onAdd: (id: string) => void;
  onDelta?: (id: string, delta: number) => void;
}

const CYCLE_MS = 5000;
const SVG_SIZE = 400;
const SVG_CENTER = 200;
const OUTER_R_PCT = 40.5;
const SVG_ORBIT_R = (SVG_SIZE * OUTER_R_PCT) / 100; // 162
const ARC_PAD_DEG = 18; // Clean clearance around each outer medallion collar
const ARC_SPAN_DEG = 60 - ARC_PAD_DEG * 2; // 24deg open gap strictly between medallions
const ROAD_SEG_LEN = (ARC_SPAN_DEG * Math.PI * SVG_ORBIT_R) / 180;

// 6 fixed positions around the orbital dial (12, 2, 4, 6, 8, 10 o'clock)
const HEX_ANGLES = [-90, -30, 30, 90, 150, 210];
const polarToSvg = (deg: number, r = SVG_ORBIT_R) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x: SVG_CENTER + r * Math.cos(rad),
    y: SVG_CENTER + r * Math.sin(rad),
  };
};
const arcBetween = (startDeg: number, endDeg: number, r = SVG_ORBIT_R) => {
  const p1 = polarToSvg(startDeg, r);
  const p2 = polarToSvg(endDeg, r);
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
};

const SHORT_NAMES: Record<string, string> = {
  jhola: "ঝোলা গুড়",
  bij: "বীজ গুড়",
  gol: "গোল পাটালি",
  foil: "ফয়েল পাটালি",
  danadar: "দানাদার",
  lomba: "লম্বা পাটালি",
};

const PRODUCT_PHOTOS: Record<string, string> = {
  jhola: "/images/products/jhola.webp",
  bij: "/images/products/bij.webp",
  gol: "/images/products/gol.webp",
  foil: "/images/products/foil.webp",
  danadar: "/images/products/danadar.webp",
  lomba: "/images/products/lomba.webp",
};

const padBn = (num: number) => toBn(String(num).padStart(2, "0"));

const FAQ_ITEMS: { q: string; a: React.ReactNode }[] = [
  {
    q: "অগ্রিম ১ টাকাও দিতে হবে কি?",
    a: (
      <>
        না।{" "}
        <span className="hl-mark">সম্পূর্ণ ক্যাশ অন ডেলিভারি</span> — ডেলিভারি
        ম্যানের কাছ থেকে পণ্য বুঝে নিয়ে টাকা পরিশোধ করবেন।
      </>
    ),
  },
  {
    q: "খাঁটি গুড়ের রং গাঢ় বাদামি কেন?",
    a: (
      <>
        কাঠের জ্বালে রস ঘন হলে{" "}
        <b className="font-bold text-ink">প্রাকৃতিকভাবেই গাঢ় বাদামি</b> রং
        আসে। ঝকঝকে সাদাটে বা হালকা হলুদ রং মূলত{" "}
        <span className="hl-key">হাইড্রোজ ও চিনি</span> মেশানোর লক্ষণ।
      </>
    ),
  },
  {
    q: "গুড় কতদিন ভালো থাকবে ও কীভাবে রাখব?",
    a: (
      <>
        পাটালি ও দানাদার গুড় এয়ারটাইট পাত্রে শুকনো জায়গায় এবং ঝোলা ও বীজ
        গুড় নরমাল ফ্রিজে রাখলে{" "}
        <b className="hl-key text-leaf">৬–১২ মাস পর্যন্ত</b> স্বাদ ও ঘ্রাণ
        অটুট থাকে।
      </>
    ),
  },
];

export function ProductFunnelSection({
  qty,
  onAdd,
  onDelta,
}: ProductFunnelSectionProps) {
  const zone: "inside" | "outside" = "inside";
  const [handoffOpen, setHandoffOpen] = useState(false);
  // Sticky order dock appears only after the hero's main CTA has scrolled out of view (above the fold)
  const [showDock, setShowDock] = useState(false);
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let tries = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const attach = () => {
      const cta = document.getElementById("hero-order-cta");
      if (!cta) {
        if (++tries < 40) timer = setTimeout(attach, 150);
        else setShowDock(true);
        return;
      }
      if (typeof IntersectionObserver === "undefined") { setShowDock(true); return; }
      io = new IntersectionObserver(([entry]) => {
        setShowDock(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      });
      io.observe(cta);
    };
    attach();
    return () => { io?.disconnect(); if (timer) clearTimeout(timer); };
  }, []);
  const [detailOpen, setDetailOpen] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});

  const sixProducts = PRODUCTS.filter((p) => p.id !== "combo");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const roadArcRef = useRef<SVGPathElement | null>(null);
  const roadDotRef = useRef<SVGCircleElement | null>(null);
  const elapsedRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);

  const activeProduct = sixProducts[activeIndex] || sixProducts[0];
  const getQty = (id: string) => qty[id] || 0;

  const selectedLines = PRODUCTS.filter((p) => getQty(p.id) > 0).map((p) => ({
    product: p,
    count: getQty(p.id),
    lineTotal: getQty(p.id) * p.price,
  }));

  const subTotal = selectedLines.reduce((acc, item) => acc + item.lineTotal, 0);
  const deliveryFee = subTotal > 0 ? (zone === "inside" ? 70 : 120) : 0;
  const grandTotal = subTotal + deliveryFee;
  const totalCount = selectedLines.reduce((acc, item) => acc + item.count, 0);

  const whatsappMessage = [
    "🛒 *নতুন অর্ডার — শাহিন ই মার্ট*",
    "",
    ...selectedLines.map(
      (l) =>
        `• ${l.product.name} (${l.product.unit}) × ${toBn(l.count)} = ${toTk(
          l.lineTotal || 0
        )}`
    ),
    "",
    `সাবটোটাল: ${toTk(subTotal)}`,
    `ডেলিভারি (${zone === "inside" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"}): ${toTk(
      deliveryFee
    )}`,
    `সর্বমোট: ${toTk(grandTotal)} (ক্যাশ অন ডেলিভারি)`,
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const syncProgressVisuals = useCallback(
    (ratio: number, idxForDot = activeIndex) => {
      const clamped = Math.max(0, Math.min(1, ratio));
      const dashOffset = String(ROAD_SEG_LEN * (1 - clamped));

      if (roadArcRef.current) {
        roadArcRef.current.setAttribute("stroke-dashoffset", dashOffset);
      }
      if (roadDotRef.current) {
        const deg = HEX_ANGLES[idxForDot] + ARC_PAD_DEG + clamped * ARC_SPAN_DEG;
        const rad = (deg * Math.PI) / 180;
        roadDotRef.current.setAttribute(
          "cx",
          (SVG_CENTER + SVG_ORBIT_R * Math.cos(rad)).toFixed(2)
        );
        roadDotRef.current.setAttribute(
          "cy",
          (SVG_CENTER + SVG_ORBIT_R * Math.sin(rad)).toFixed(2)
        );
      }
    },
    [activeIndex]
  );

  const selectIndex = useCallback(
    (nextIdx: number) => {
      const normalized =
        ((nextIdx % sixProducts.length) + sixProducts.length) %
        sixProducts.length;
      elapsedRef.current = 0;
      syncProgressVisuals(0, normalized);
      setActiveIndex(normalized);
    },
    [sixProducts.length, syncProgressVisuals]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!detailOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDetailOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [detailOpen]);

  useEffect(() => {
    if (!isInView || isPaused || handoffOpen || detailOpen || prefersReducedMotion) {
      return;
    }
    let rafId = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;
      elapsedRef.current += dt;

      if (elapsedRef.current >= CYCLE_MS) {
        elapsedRef.current = 0;
        const nextIdx = (activeIndex + 1) % sixProducts.length;
        syncProgressVisuals(0, nextIdx);
        setActiveIndex(nextIdx);
        return;
      }

      syncProgressVisuals(elapsedRef.current / CYCLE_MS, activeIndex);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [
    activeIndex,
    detailOpen,
    handoffOpen,
    isInView,
    isPaused,
    prefersReducedMotion,
    sixProducts.length,
    syncProgressVisuals,
  ]);

  const handleProceedToCheckout = (ensureProduct?: ProductItem) => {
    const productToEnsure =
      ensureProduct ?? (totalCount === 0 ? activeProduct : undefined);
    const shouldAdd = Boolean(
      productToEnsure && getQty(productToEnsure.id) === 0
    );

    if (shouldAdd && productToEnsure) {
      onAdd(productToEnsure.id);
    }

    const nextLines =
      shouldAdd && productToEnsure
        ? [
          ...selectedLines,
          {
            product: productToEnsure,
            count: 1,
            lineTotal: productToEnsure.price,
          },
        ]
        : selectedLines;
    const nextSubTotal = nextLines.reduce((acc, item) => acc + item.lineTotal, 0);
    const nextDeliveryFee =
      nextSubTotal > 0 ? (zone === "inside" ? 70 : 120) : 0;
    const nextGrandTotal = nextSubTotal + nextDeliveryFee;

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("shahin:proceed-to-checkout", {
          detail: {
            items: nextLines,
            zone,
            subTotal: nextSubTotal,
            deliveryFee: nextDeliveryFee,
            grandTotal: nextGrandTotal,
          },
        })
      );
    }
    setHandoffOpen(true);
  };

  // Active 5-second progress path strictly inside open 24deg corridor between medallions
  const arcStartDeg = HEX_ANGLES[activeIndex] + ARC_PAD_DEG;
  const arcEndDeg = arcStartDeg + ARC_SPAN_DEG;
  const arcStartPt = polarToSvg(arcStartDeg, SVG_ORBIT_R);
  const roadSegmentPath = arcBetween(arcStartDeg, arcEndDeg, SVG_ORBIT_R);

  const activeInCartCount = getQty(activeProduct.id);
  const isInCart = activeInCartCount > 0;

  return (
    <>
      {/* ================= BORDERLESS HERITAGE 6-PRODUCT EDITORIAL DIAL ================= */}
      <section
        id="combo"
        ref={sectionRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        className="relative mt-4 w-full overflow-hidden px-3 py-8 sm:px-5 sm:py-10"
      >
        <div className="relative mx-auto w-full max-w-[480px]">
        {/* Mirrored Side Khejur & Alpona Heritage Corner Art Framing the Showcase */}
        <svg
          className="pointer-events-none absolute -left-8 top-1/2 h-[220px] w-[110px] -translate-y-1/2 opacity-[0.14]"
          viewBox="0 0 110 220"
          aria-hidden="true"
        >
          <g fill="none" stroke="#9E3B24" strokeWidth="1.2">
            <circle cx="0" cy="110" r="88" strokeDasharray="3 4" />
            <circle cx="0" cy="110" r="70" />
            <path d="M0,48 C28,62 34,90 22,110 C34,130 28,158 0,172" stroke="#B85D19" />
            <path d="M12,74 Q42,66 48,46 M18,92 Q48,88 58,72 M18,128 Q48,132 58,148 M12,146 Q42,154 48,174" stroke="#2D5A3C" strokeLinecap="round" />
            <circle cx="70" cy="110" r="3" fill="#B85D19" />
          </g>
        </svg>
        <svg
          className="pointer-events-none absolute -right-8 top-1/2 h-[220px] w-[110px] -translate-y-1/2 -scale-x-100 opacity-[0.14]"
          viewBox="0 0 110 220"
          aria-hidden="true"
        >
          <g fill="none" stroke="#9E3B24" strokeWidth="1.2">
            <circle cx="0" cy="110" r="88" strokeDasharray="3 4" />
            <circle cx="0" cy="110" r="70" />
            <path d="M0,48 C28,62 34,90 22,110 C34,130 28,158 0,172" stroke="#B85D19" />
            <path d="M12,74 Q42,66 48,46 M18,92 Q48,88 58,72 M18,128 Q48,132 58,148 M12,146 Q42,154 48,174" stroke="#2D5A3C" strokeLinecap="round" />
            <circle cx="70" cy="110" r="3" fill="#B85D19" />
          </g>
        </svg>

        {/* Heritage Flanked Eyebrow & Bold Editorial Title */}
        <div className="relative z-10 text-center">
          <p className="inline-flex items-center gap-2 text-[11.5px] font-extrabold tracking-[0.1em] text-gur">
            <span className="h-[1px] w-5 bg-gur/40" aria-hidden="true" />
            <span>নিজস্ব তাফালের তাজা ব্যাচ</span>
            <span className="h-[1px] w-5 bg-gur/40" aria-hidden="true" />
          </p>
          <h2 className="font-display mt-1.5 text-[27px] font-black leading-tight text-ink sm:text-[31px]">
            ৬ প্রকার খাঁটি{" "}
            <span className="gurtext">খেজুর গুড়</span>
          </h2>
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-[12.5px]">
            <span className="hl-pill text-[11.5px]">সরাসরি রাজশাহী</span>
            <span className="font-bold text-ink/90">— চিনি নেই, ভেজাল নেই</span>
          </div>
        </div>

        {/* BORDERLESS HERITAGE CONSTELLATION DIAL (Zero Line Overlap + Royal Highlight Centerpiece) */}
        <div
          className="relative z-10 mx-auto mb-7 mt-5 aspect-square w-full max-w-[424px] select-none"
          onTouchStart={(e) => {
            touchStartXRef.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartXRef.current === null) return;
            const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
            const dx = endX - touchStartXRef.current;
            touchStartXRef.current = null;
            if (Math.abs(dx) > 40) {
              selectIndex(dx < 0 ? activeIndex + 1 : activeIndex - 1);
            }
          }}
        >
          {/* Segmented Watchmaker Dial (Drawn strictly in open gaps between photos — zero overlap) */}
          <svg
            viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            aria-hidden="true"
          >
            {/* 6 discrete track arcs strictly in the open corridors between stops */}
            {HEX_ANGLES.map((deg) => {
              const s = deg + ARC_PAD_DEG;
              const e = deg + 60 - ARC_PAD_DEG;
              const p1 = polarToSvg(s, SVG_ORBIT_R);
              const p2 = polarToSvg(e, SVG_ORBIT_R);
              const midTickInner = polarToSvg((s + e) / 2, SVG_ORBIT_R - 4);
              const midTickOuter = polarToSvg((s + e) / 2, SVG_ORBIT_R + 4);
              return (
                <g key={`gap-${deg}`}>
                  <path
                    d={arcBetween(s, e, SVG_ORBIT_R)}
                    fill="none"
                    stroke="#CFA97A"
                    strokeOpacity="0.58"
                    strokeWidth="0.9"
                    vectorEffect="non-scaling-stroke"
                  />
                  <line
                    x1={midTickInner.x.toFixed(2)}
                    y1={midTickInner.y.toFixed(2)}
                    x2={midTickOuter.x.toFixed(2)}
                    y2={midTickOuter.y.toFixed(2)}
                    stroke="#B85D19"
                    strokeOpacity="0.38"
                    strokeWidth="0.85"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx={p1.x.toFixed(2)} cy={p1.y.toFixed(2)} r="1.4" fill="#CFA97A" opacity="0.7" />
                  <circle cx={p2.x.toFixed(2)} cy={p2.y.toFixed(2)} r="1.4" fill="#CFA97A" opacity="0.7" />
                </g>
              );
            })}

            {/* Ultra-fine 5-second progress filament cleanly inside current open gap */}
            <path
              key={`arc-${activeIndex}`}
              ref={roadArcRef}
              d={roadSegmentPath}
              fill="none"
              stroke="#9E3B24"
              strokeWidth="1.45"
              strokeLinecap="round"
              strokeDasharray={ROAD_SEG_LEN}
              strokeDashoffset={ROAD_SEG_LEN}
              vectorEffect="non-scaling-stroke"
            />

            {/* Delicate needle-point traveler strictly between medallions */}
            <circle
              key={`dot-${activeIndex}`}
              ref={roadDotRef}
              cx={arcStartPt.x.toFixed(2)}
              cy={arcStartPt.y.toFixed(2)}
              r="2.8"
              fill="#9E3B24"
            />
          </svg>

          {/* ROYAL HERITAGE SPOTLIGHT PEDESTAL & BENGALI ALPONA CREST AROUND CENTER PRODUCT */}
          <div
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            aria-hidden="true"
          >
            {/* Warm Golden-Terracotta Radial Ambient Halo separating Center Product from Canvas */}
            <div
              className="absolute h-[196px] w-[196px] rounded-full min-[375px]:h-[218px] min-[375px]:w-[218px] sm:h-[246px] sm:w-[246px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(158,59,36,0.22) 34%, rgba(226,149,48,0.28) 54%, rgba(242,180,74,0.08) 68%, rgba(250,243,230,0) 78%)",
              }}
            />

            {/* Concentric Golden Aroma Waves */}
            <span className="gur-ripple absolute h-[126px] w-[126px] rounded-full border border-gur/45 min-[375px]:h-[144px] min-[375px]:w-[144px] sm:h-[168px] sm:w-[168px]" />
            <span className="gur-ripple r2 absolute h-[126px] w-[126px] rounded-full border border-clay/35 min-[375px]:h-[144px] min-[375px]:w-[144px] sm:h-[168px] sm:w-[168px]" />

            {/* Bengali Alpona Lotus-Mandala Royal Ring & Flanking Side Scrolls (Static Wing Frame + Gentle Spinning Beaded Crown) */}
            <svg
              viewBox="0 0 240 240"
              className="absolute h-[174px] w-[174px] min-[375px]:h-[196px] min-[375px]:w-[196px] sm:h-[224px] sm:w-[224px]"
            >
              {/* Symmetrical Left & Right Decorative Alpona Botanical Side Flourishes */}
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Left palm & lotus wing */}
                <path d="M 38 92 C 20 96, 12 110, 12 120 C 12 130, 20 144, 38 148" stroke="#9E3B24" strokeOpacity="0.58" strokeWidth="1.35" />
                <path d="M 34 102 C 24 106, 20 113, 20 120 C 20 127, 24 134, 34 138" stroke="#2D5A3C" strokeOpacity="0.62" strokeWidth="1.2" />
                <path d="M 12 120 L 4 120" stroke="#B85D19" strokeWidth="1.4" />
                <circle cx="4" cy="120" r="2.2" fill="#9E3B24" />
                {/* Right palm & lotus wing */}
                <path d="M 202 92 C 220 96, 228 110, 228 120 C 228 130, 220 144, 202 148" stroke="#9E3B24" strokeOpacity="0.58" strokeWidth="1.35" />
                <path d="M 206 102 C 216 106, 220 113, 220 120 C 220 127, 216 134, 206 138" stroke="#2D5A3C" strokeOpacity="0.62" strokeWidth="1.2" />
                <path d="M 228 120 L 236 120" stroke="#B85D19" strokeWidth="1.4" />
                <circle cx="236" cy="120" r="2.2" fill="#9E3B24" />
              </g>
            </svg>

            {/* Slowly Rotating Royal Brass Alpona Scallop Wreath */}
            <svg
              viewBox="0 0 220 220"
              className="dial-sweep-cw absolute h-[150px] w-[150px] min-[375px]:h-[170px] min-[375px]:w-[170px] sm:h-[196px] sm:w-[196px]"
            >
              <circle
                cx="110"
                cy="110"
                r="98"
                fill="none"
                stroke="#B85D19"
                strokeOpacity="0.48"
                strokeWidth="1"
                strokeDasharray="2 5"
              />
              {Array.from({ length: 16 }, (_, idx) => idx * 22.5).map((deg) => (
                <g key={deg} transform={`rotate(${deg} 110 110)`}>
                  <path
                    d="M110,16 C113,22 113,28 110,32 C107,28 107,22 110,16Z"
                    fill={deg % 45 === 0 ? "#9E3B24" : "#D68E35"}
                    fillOpacity={deg % 45 === 0 ? "0.62" : "0.52"}
                  />
                  <circle cx="110" cy="11.5" r="1.4" fill="#8A2E19" opacity="0.7" />
                </g>
              ))}
            </svg>

            {/* Counter-Rotating Fine Inner Gold Thread */}
            <svg
              viewBox="0 0 200 200"
              className="dial-sweep-ccw absolute h-[132px] w-[132px] min-[375px]:h-[150px] min-[375px]:w-[150px] sm:h-[174px] sm:w-[174px]"
            >
              <circle
                cx="100"
                cy="100"
                r="94"
                fill="none"
                stroke="#7A2E1B"
                strokeOpacity="0.32"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* 6 OPAQUE HERITAGE OUTER PRODUCT MEDALLIONS (Zero SVG Bleed-Through) */}
          {sixProducts.map((product, idx) => {
            const deg = HEX_ANGLES[idx];
            const rad = (deg * Math.PI) / 180;
            const leftPct = 50 + OUTER_R_PCT * Math.cos(rad);
            const topPct = 50 + OUTER_R_PCT * Math.sin(rad);
            const isActive = idx === activeIndex;
            const inBasket = getQty(product.id) > 0;

            return (
              <div
                key={product.id}
                style={{
                  left: `${leftPct.toFixed(2)}%`,
                  top: `${topPct.toFixed(2)}%`,
                }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  type="button"
                  onClick={() => selectIndex(idx)}
                  aria-label={`${product.name} — দেখুন`}
                  aria-current={isActive ? "step" : undefined}
                  className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                >
                  {/* Solid opaque #FAF3E6 halo bezel blocks background lines cleanly */}
                  <span
                    className={`block h-[56px] w-[56px] overflow-hidden rounded-full bg-[#FAF3E6] p-[3px] transition-all duration-300 active:scale-95 min-[375px]:h-[64px] min-[375px]:w-[64px] sm:h-[74px] sm:w-[74px] ${
                      isActive
                        ? "scale-105 ring-2 ring-clay"
                        : "scale-95 ring-1 ring-[#DFC49C] group-hover:scale-100 group-hover:ring-gur/70"
                    }`}
                  >
                    <span className="block h-full w-full overflow-hidden rounded-full bg-sand">
                      <img
                        src={PRODUCT_PHOTOS[product.id]}
                        alt={product.name}
                        decoding="async"
                        className={`h-full w-full object-cover transition-all duration-300 ${
                          isActive
                            ? "brightness-105 contrast-[1.03]"
                            : "brightness-[0.95] saturate-[0.88] group-hover:brightness-100 group-hover:saturate-100"
                        }`}
                      />
                    </span>
                  </span>

                  {/* Clean Floating Label */}
                  <span
                    className={`mt-1 whitespace-nowrap rounded-full px-1.5 py-[1px] text-[10px] leading-tight transition-colors min-[375px]:text-[11px] ${isActive
                      ? "bg-[#F6DFD2] font-extrabold text-clay"
                      : inBasket
                        ? "bg-[#E9F5EE] font-bold text-leaf"
                        : "bg-[#FAF3E6]/95 font-semibold text-ink/75"
                      }`}
                  >
                    {inBasket ? "✓ " : ""}
                    {SHORT_NAMES[product.id] || product.name}
                  </span>
                </button>
              </div>
            );
          })}

          {/* ROYAL HIGH-CONTRAST JEWEL CENTERPIECE (Tap Photo -> Opens Heritage Product Details Popup) */}
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
            {/* Scalloped terracotta rosette frame (clay petals + cream collar + scattered alpona dots) */}
            <svg
              viewBox="-120 -120 240 240"
              className="pointer-events-none absolute h-[180px] w-[180px] min-[375px]:h-[207px] min-[375px]:w-[207px] sm:h-[240px] sm:w-[240px]"
              aria-hidden="true"
            >
              <g fill="#B4472A">
                <circle r="89.5" />
                <circle cx="91.00" cy="0.00" r="5.6" /><circle cx="89.25" cy="17.75" r="5.6" /><circle cx="84.07" cy="34.82" r="5.6" /><circle cx="75.66" cy="50.56" r="5.6" /><circle cx="64.35" cy="64.35" r="5.6" /><circle cx="50.56" cy="75.66" r="5.6" /><circle cx="34.82" cy="84.07" r="5.6" /><circle cx="17.75" cy="89.25" r="5.6" /><circle cx="0.00" cy="91.00" r="5.6" /><circle cx="-17.75" cy="89.25" r="5.6" /><circle cx="-34.82" cy="84.07" r="5.6" /><circle cx="-50.56" cy="75.66" r="5.6" /><circle cx="-64.35" cy="64.35" r="5.6" /><circle cx="-75.66" cy="50.56" r="5.6" /><circle cx="-84.07" cy="34.82" r="5.6" /><circle cx="-89.25" cy="17.75" r="5.6" /><circle cx="-91.00" cy="0.00" r="5.6" /><circle cx="-89.25" cy="-17.75" r="5.6" /><circle cx="-84.07" cy="-34.82" r="5.6" /><circle cx="-75.66" cy="-50.56" r="5.6" /><circle cx="-64.35" cy="-64.35" r="5.6" /><circle cx="-50.56" cy="-75.66" r="5.6" /><circle cx="-34.82" cy="-84.07" r="5.6" /><circle cx="-17.75" cy="-89.25" r="5.6" /><circle cx="-0.00" cy="-91.00" r="5.6" /><circle cx="17.75" cy="-89.25" r="5.6" /><circle cx="34.82" cy="-84.07" r="5.6" /><circle cx="50.56" cy="-75.66" r="5.6" /><circle cx="64.35" cy="-64.35" r="5.6" /><circle cx="75.66" cy="-50.56" r="5.6" /><circle cx="84.07" cy="-34.82" r="5.6" /><circle cx="89.25" cy="-17.75" r="5.6" />
              </g>
              <circle r="87.5" fill="#FFF8EC" />
              <circle r="84.5" fill="none" stroke="#B4472A" strokeWidth="1" />
              <g fill="#B4472A" fillOpacity="0.75">
                <circle cx="106.00" cy="9.27" r="1.31" /><circle cx="106.64" cy="28.57" r="1.53" /><circle cx="94.98" cy="44.29" r="1.08" /><circle cx="89.12" cy="62.41" r="1.40" /><circle cx="78.91" cy="78.91" r="0.95" /><circle cx="61.72" cy="88.14" r="1.67" /><circle cx="46.32" cy="99.33" r="1.22" /><circle cx="27.33" cy="102.00" r="1.17" /><circle cx="9.45" cy="107.99" r="1.62" /><circle cx="-9.10" cy="104.00" r="0.99" /><circle cx="-28.68" cy="107.02" r="1.44" /><circle cx="-45.14" cy="96.79" r="1.75" /><circle cx="-61.03" cy="87.16" r="1.31" /><circle cx="-78.06" cy="78.06" r="1.53" /><circle cx="-85.85" cy="60.11" r="1.08" /><circle cx="-98.61" cy="45.98" r="1.40" /><circle cx="-107.80" cy="28.88" r="0.95" /><circle cx="-107.19" cy="9.38" r="1.67" /><circle cx="-109.18" cy="-9.55" r="1.22" /><circle cx="-102.00" cy="-27.33" r="1.17" /><circle cx="-98.24" cy="-45.81" r="1.62" /><circle cx="-85.52" cy="-59.88" r="0.99" /><circle cx="-78.35" cy="-78.35" r="1.44" /><circle cx="-61.26" cy="-87.49" r="1.75" /><circle cx="-44.97" cy="-96.43" r="1.31" /><circle cx="-28.57" cy="-106.64" r="1.53" /><circle cx="-9.13" cy="-104.40" r="1.08" /><circle cx="9.48" cy="-108.39" r="1.40" /><circle cx="28.88" cy="-107.80" r="0.95" /><circle cx="45.47" cy="-97.52" r="1.67" /><circle cx="62.86" cy="-89.78" r="1.22" /><circle cx="74.67" cy="-74.67" r="1.17" /><circle cx="88.80" cy="-62.18" r="1.62" /><circle cx="94.62" cy="-44.12" r="0.99" /><circle cx="107.02" cy="-28.68" r="1.44" /><circle cx="106.39" cy="-9.31" r="1.75" />
              </g>
            </svg>
            <button
              type="button"
              onClick={() => setDetailOpen(true)}
              aria-label={`${activeProduct.name} — বিস্তারিত কার্ড দেখুন`}
              className="pointer-events-auto gur-center-breathe group relative h-[120px] w-[120px] cursor-pointer rounded-full bg-[#B4472A] p-[1.25px] transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay min-[375px]:h-[138px] min-[375px]:w-[138px] sm:h-[160px] sm:w-[160px]"
            >
              <span className="block h-full w-full overflow-hidden rounded-full bg-[#FFFDF8] p-[2.5px]">
                <div
                  key={activeProduct.id}
                  className="gur-spotlight-enter relative h-full w-full overflow-hidden rounded-full bg-sand"
                >
                  <img
                    src={PRODUCT_PHOTOS[activeProduct.id]}
                    alt={activeProduct.name}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Moving diagonal liquid sunlight shimmer across the gur */}
                  <span
                    aria-hidden="true"
                    className="gur-sheen pointer-events-none absolute inset-y-0 left-0 w-1/2"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,248,228,0.45) 50%, transparent 100%)",
                    }}
                  />
                </div>
              </span>
              {/* Subtle heirloom tap-to-inspect cue at bottom brass collar */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#D49A52] bg-[#FFFDF7] px-2.5 py-[1.5px] text-[9.5px] font-extrabold text-clay transition-colors group-hover:border-clay group-hover:bg-clay group-hover:text-white"
              >
                বিস্তারিত ↗
              </span>
            </button>
          </div>
        </div>

        {/* CONVERSION-FOCUSED BORDERLESS SHOWCASE BELOW DIAL */}
        <div className="mx-auto mt-5 flex w-full max-w-[360px] flex-col items-center text-center">
          {/* Index + Unit + Badge + Prev/Next Controls */}
          <div className="flex items-center gap-2.5 text-[12px] font-bold tracking-wider text-gur">
            <button
              type="button"
              onClick={() => selectIndex(activeIndex - 1)}
              aria-label="আগের গুড়"
              className="px-2 py-1 text-[16px] leading-none text-ink/55 transition-colors hover:text-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              ‹
            </button>
            <span className="inline-flex flex-wrap items-center justify-center gap-1.5">
              <span>{padBn(activeIndex + 1)} / ০৬ · {activeProduct.unit}</span>
              {activeProduct.badge && (
                <span className="hl-pill px-2.5 py-[1px] text-[10.5px]">
                  {activeProduct.badge}
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => selectIndex(activeIndex + 1)}
              aria-label="পরের গুড়"
              className="px-2 py-1 text-[16px] leading-none text-ink/55 transition-colors hover:text-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              ›
            </button>
          </div>

          <div
            key={`info-${activeProduct.id}`}
            className="gur-spotlight-enter mt-1.5 px-2"
          >
            <h3 className="font-display text-[22px] font-black leading-snug text-ink sm:text-[24px]">
              <button
                type="button"
                onClick={() => setDetailOpen(true)}
                className="transition-colors hover:text-clay focus:outline-none focus-visible:underline"
              >
                {activeProduct.name}
              </button>
            </h3>
            <p className="mt-1.5 line-clamp-2 text-[13px] font-medium leading-[1.62] text-ink/75">
              {activeProduct.sensoryHook}
            </p>
          </div>

        </div>
        </div>
      </section>

      {/* ================= FAQ & FOOTER ================= */}
      <section className="relative w-full overflow-hidden px-4 pb-10 pt-8">
        <div className="relative mx-auto w-full max-w-[480px]">
        <svg
          className="wm"
          style={{ right: -36, bottom: 18, width: 130, height: 130, opacity: 0.05 }}
          aria-hidden="true"
        >
          <use href="#s-hari" />
        </svg>
        <div className="mb-4 text-center">
          <span className="hl-pill text-[11.5px]">জিজ্ঞাসা ও নিশ্চয়তা</span>
          <h2 className="font-display mt-1.5 text-[23px] font-black leading-tight text-ink sm:text-[26px]">
            অর্ডার করার আগে <span className="text-clay">জেনে নিন</span>
          </h2>
        </div>
        <div className="space-y-2.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = Boolean(openFaqs[idx]);
            const panelId = `faq-panel-${idx}`;
            return (
              <div
                key={item.q}
                className={`kantha-sm rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-clay/35 bg-[#FFFDF9]"
                    : "border-transparent bg-card"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }))
                  }
                  className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left text-[15px] font-extrabold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                >
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className={`inline-block flex-none text-[20px] leading-none text-gur transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "rotate-45 text-clay" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`px-4 pb-3.5 pt-0.5 text-[13.5px] font-medium leading-relaxed text-ink/75 transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "translate-y-0" : "-translate-y-1.5"
                      }`}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <footer className="mt-7 text-center text-[12.5px] font-medium leading-relaxed text-ink/65">
          <p className="font-artisan text-[16px] text-clay">
            শীতের আসল স্বাদ পৌঁছে দিই আপনার ঘরে
          </p>
          <p className="mt-1 font-bold text-ink/85">
            শাহিন ই মার্ট · রাজশাহী
          </p>
          <p className="mt-0.5">
            হটলাইন / WhatsApp:{" "}
            <a href={`tel:${PHONE}`} className="font-black text-clay">
              ০৯৬১১৯০১১৭০
            </a>
          </p>
        </footer>
        </div>
      </section>

      {/* ================= ORIGINAL BENGAL HERITAGE FLOATING CONVERSION DOCK ================= */}
      <div
        aria-hidden={!showDock}
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 px-2.5 pb-[max(10px,env(safe-area-inset-bottom))] pt-3 transition-[transform,opacity] duration-300 ease-out ${showDock ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
        style={{
          background:
            "linear-gradient(180deg, rgba(250,243,230,0) 0%, rgba(250,243,230,0.82) 55%, rgba(250,243,230,0.96) 100%)",
        }}
      >
        <div className={`sticky-dock relative ${showDock ? "pointer-events-auto" : "pointer-events-none"} mx-auto flex w-full max-w-[480px] items-center gap-2 overflow-hidden rounded-[14px] p-1.5 sm:p-2`}>
          {/* Thin Woven Shitalpati-Tricolor Accent Line Along Top Lip */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-[2.5px]"
            style={{
              background:
                "linear-gradient(90deg, #2D5A3C 0%, #D48A28 48%, #9E3B24 100%)",
            }}
            aria-hidden="true"
          />

          {/* Left: Tappable Heritage Price Slate -> Smooth Scroll to #combo Showcase */}
          <a
            href="#combo"
            aria-label="সব ৬ রকম খাঁটি খেজুরের গুড় দেখুন"
            className="flex min-w-0 flex-1 items-center gap-2.5 rounded-[10px] border border-[#E5CFA9] bg-[#FAF0DC]/90 px-2 py-1.5 transition-colors hover:border-clay/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
          >
            {/* Larger Crisp Solid-Etched Clay Ras-Hari Pot + Date Frond Emblem */}
            <span
              className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-gradient-to-br from-[#FFF9ED] to-[#F3DEC0] ring-1 ring-[#C99B6B]/60 sm:h-11 sm:w-11"
              aria-hidden="true"
            >
              <svg viewBox="0 0 36 36" className="h-[30px] w-[30px] sm:h-[32px] sm:w-[32px]" fill="none">
                {/* Fresh Date Palm Fronds */}
                <path
                  d="M18 11 C13 7 8 7.5 5.5 10.5 C9.5 10 13.5 11.2 16 13.5 M18 11 C23 7 28 7.5 30.5 10.5 C26.5 10 22.5 11.2 20 13.5"
                  stroke="#2D5A3C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Earthen Ras Hari Clay Pot */}
                <ellipse cx="18" cy="13.5" rx="6" ry="2" fill="#B85232" stroke="#6E2111" strokeWidth="1.2" />
                <path
                  d="M12.5 14.8 C8.2 17.5 8 26.8 12.2 29.8 C14.4 31.4 21.6 31.4 23.8 29.8 C28 26.8 27.8 17.5 23.5 14.8 Z"
                  fill="#9E3B24"
                  stroke="#6E2111"
                  strokeWidth="1.2"
                />
                {/* Golden Molasses Drip & Band */}
                <path
                  d="M13 15.2 C14.5 18.8 16 21 17 17.5 C18 20.5 19.8 22.5 20.5 16.5"
                  stroke="#F4C152"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.8 23.5 Q18 26.2 25.2 23.5"
                  stroke="#F6D58E"
                  strokeOpacity="0.65"
                  strokeWidth="1.4"
                  strokeDasharray="2.5 2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-[10px] font-extrabold tracking-wide text-leaf sm:text-[10.5px]">
                {totalCount > 0
                  ? `✓ ঝুড়িতে ${toBn(totalCount)}টি · ডেলিভারি সহ`
                  : "৬ রকম খাঁটি গুড় · রাজশাহী"}
              </span>
              <span className="font-display mt-0.5 flex items-baseline gap-1 text-[17px] font-black leading-none text-[#7A2816] sm:text-[18.5px]">
                <span>{totalCount > 0 ? toTk(grandTotal) : "৳৪০০"}</span>
                {totalCount === 0 && (
                  <span className="text-[10.5px] font-bold text-ink/60">
                    থেকে
                  </span>
                )}
              </span>
            </span>
          </a>

          {/* Right: BornoBazar Shitrongo-Inspired Diagonal Two-Tone Flat Pill Button */}
          <button
            type="button"
            onClick={() => handleProceedToCheckout()}
            className="btn-shitrongo relative flex h-[44px] flex-none items-center justify-center px-4 text-[13.5px] font-black tracking-[-0.01em] focus:outline-none focus-visible:ring-2 focus-visible:ring-clay sm:h-[46px] sm:px-5 sm:text-[14.5px]"
          >
            <span className="relative z-10 whitespace-nowrap">এখুনি অর্ডার করুন</span>
          </button>
        </div>
      </div>

      {/* ================= MINIMAL GRAMIN LOKOKOTHA PRODUCT DETAILS POPUP ================= */}
      {detailOpen && (
        <div
          className="fixed inset-0 z-[65] flex items-center justify-center bg-[#281207]/60 p-3.5 backdrop-blur-[4px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gur-detail-modal-title"
          onClick={() => setDetailOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-card-enter relative w-full max-w-[410px] overflow-hidden rounded-[12px] border-[1.5px] border-[#C99B63]"
            style={{
              background: "linear-gradient(180deg, #FFFDF8 0%, #FAF0DD 100%)",
            }}
          >
            {/* Subtle Woven Top Tricolor Heritage Thread Accent */}
            <div
              className="h-[3px] w-full"
              style={{
                background:
                  "linear-gradient(90deg, #2D5A3C 0%, #D48A28 50%, #9E3B24 100%)",
              }}
              aria-hidden="true"
            />

            {/* Delicate Inner Gramin Paper Stitch Frame */}
            <div
              className="pointer-events-none absolute inset-[7px] rounded-[7px] border border-dashed border-[#B85D19]/30"
              aria-hidden="true"
            />

            {/* Close Stamp Medallion */}
            <button
              type="button"
              onClick={() => setDetailOpen(false)}
              aria-label="বিস্তারিত বন্ধ করুন"
              className="absolute right-3 top-3.5 z-20 grid h-8 w-8 place-items-center rounded-full border border-[#D7B385] bg-[#FFFDF8] text-[14px] font-bold text-[#6E2A12] transition-colors hover:border-clay hover:bg-clay hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              ✕
            </button>

            <div className="relative z-10 flex flex-col items-center px-5 pb-5 pt-7 text-center sm:px-6">
              {/* Heirloom Porcelain Ringed Photo */}
              <div className="relative h-[150px] w-[150px] flex-none rounded-full bg-gradient-to-br from-[#9E3B24] via-[#6E2513] to-[#C87D28] p-[3px] sm:h-[164px] sm:w-[164px]">
                <div className="h-full w-full overflow-hidden rounded-full bg-[#FFFDF8] p-[2px]">
                  <img
                    src={PRODUCT_PHOTOS[activeProduct.id]}
                    alt={activeProduct.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Product Title */}
              <h3
                id="gur-detail-modal-title"
                className="serif mt-3.5 text-[22px] font-black leading-[1.26] text-[#5C1F0E] sm:text-[24px]"
              >
                {activeProduct.name}
              </h3>

              {/* Price + Weight */}
              <div className="mt-1.5 flex items-baseline justify-center gap-1.5">
                <span className="font-display text-[26px] font-black leading-none text-clay sm:text-[28px]">
                  {toTk(activeProduct.price)}
                </span>
                <span className="text-[13px] font-bold text-ink/65">
                  / {activeProduct.unit}
                </span>
              </div>

              {/* Order Now */}
              <button
                type="button"
                onClick={() => {
                  setDetailOpen(false);
                  handleProceedToCheckout(activeProduct);
                }}
                className="btn-shitrongo relative mt-4 flex h-12 w-full items-center justify-center px-6 text-[15px] font-black sm:text-[16px]"
              >
                <span>এখুনি অর্ডার করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CHECKOUT HANDOFF MODAL ================= */}
      {handoffOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/55 p-3 sm:items-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="kantha w-full max-w-[450px] rounded-[26px] border border-[#C99B63] bg-card p-5">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-leaf text-[22px] text-white">
              🛒
            </div>
            <h3 className="font-display mt-2.5 text-center text-[21px] font-black text-ink">
              আপনার অর্ডার সামারি প্রস্তুত
            </h3>
            <p className="mt-1 text-center text-[13.5px] leading-relaxed text-ink/75">
              পরবর্তী চেকআউট ধাপে যুক্ত করার জন্য আপনার ঝুড়ি লক করা হয়েছে। চাইলে এখনই ১ ক্লিকে WhatsApp বা কলের মাধ্যমেও অর্ডার সম্পন্ন করতে পারেন:
            </p>
            <pre className="mt-3.5 max-h-[30vh] overflow-auto whitespace-pre-wrap rounded-2xl bg-sand p-3 font-body text-[13px] leading-relaxed text-ink">
              {whatsappMessage}
            </pre>
            <div className="mt-4 grid gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-leaf flex min-h-[52px] items-center justify-center rounded-2xl text-[15.5px] font-bold"
              >
                💬 WhatsApp-এ অর্ডার কনফার্ম করুন
              </a>
              <a
                href={`tel:${PHONE}`}
                className="flex min-h-[48px] items-center justify-center rounded-2xl border-[1.5px] border-[#E2CBA8] text-[14.5px] font-bold"
              >
                📞 ০৯৬১১৯০১১৭০ নম্বরে সরাসরি কল করুন
              </a>
              <button
                type="button"
                onClick={() => setHandoffOpen(false)}
                className="min-h-[40px] text-[13.5px] font-semibold text-ink/60"
              >
                ফিরে যান
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
