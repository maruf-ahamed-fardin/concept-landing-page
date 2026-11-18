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
}

const CYCLE_MS = 5000;
const SVG_SIZE = 400;
const SVG_CENTER = 200;
const OUTER_R_PCT = 39;
const SVG_ORBIT_R = (SVG_SIZE * OUTER_R_PCT) / 100; // 156
const ROAD_SEG_LEN = (Math.PI * SVG_ORBIT_R) / 3;

// 6 fixed positions around the orbital dial (12, 2, 4, 6, 8, 10 o'clock)
const HEX_ANGLES = [-90, -30, 30, 90, 150, 210];
const DIAL_TICKS = Array.from({ length: 24 }, (_, i) => i * 15);

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

export function ProductFunnelSection({
  qty,
  onAdd,
}: ProductFunnelSectionProps) {
  const zone: "inside" | "outside" = "inside";
  const [handoffOpen, setHandoffOpen] = useState(false);

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
        const deg = HEX_ANGLES[idxForDot] + clamped * 60;
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
    if (!isInView || isPaused || handoffOpen || prefersReducedMotion) {
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

  // Active 5-second ultra-fine path from current stop to next stop
  const startDeg = HEX_ANGLES[activeIndex];
  const endDeg = startDeg + 60;
  const startRad = (startDeg * Math.PI) / 180;
  const endRad = (endDeg * Math.PI) / 180;
  const rx1 = SVG_CENTER + SVG_ORBIT_R * Math.cos(startRad);
  const ry1 = SVG_CENTER + SVG_ORBIT_R * Math.sin(startRad);
  const rx2 = SVG_CENTER + SVG_ORBIT_R * Math.cos(endRad);
  const ry2 = SVG_CENTER + SVG_ORBIT_R * Math.sin(endRad);
  const roadSegmentPath = `M ${rx1.toFixed(2)} ${ry1.toFixed(
    2
  )} A ${SVG_ORBIT_R} ${SVG_ORBIT_R} 0 0 1 ${rx2.toFixed(2)} ${ry2.toFixed(
    2
  )}`;

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
        {/* Heritage Flanked Eyebrow & Serif Title (Matching HeroSection Theme) */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] text-gur">
            <span className="h-[1px] w-5 bg-gur/40" aria-hidden="true" />
            <span>নিজস্ব তাফালের তাজা ব্যাচ</span>
            <span className="h-[1px] w-5 bg-gur/40" aria-hidden="true" />
          </p>
          <h2 className="serif mt-1.5 text-[25px] font-black leading-tight text-ink sm:text-[28px]">
            ৬ প্রকার খাঁটি{" "}
            <span className="gurtext">খেজুর গুড়</span>
          </h2>
        </div>

        {/* BORDERLESS HERITAGE CONSTELLATION DIAL (Larger Photos + Rotating Center Highlight Crown) */}
        <div
          className="relative mx-auto mb-7 mt-4 aspect-square w-full max-w-[424px] select-none"
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
          {/* Ultra-Fine Watchmaker SVG Dial & 5s Hairline Thread */}
          <svg
            viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {/* Whisper-thin outer base track */}
            <circle
              cx={SVG_CENTER}
              cy={SVG_CENTER}
              r={SVG_ORBIT_R}
              fill="none"
              stroke="#D8BC95"
              strokeOpacity="0.55"
              strokeWidth="0.75"
              vectorEffect="non-scaling-stroke"
            />

            {/* Inward flowing focus beam from active item straight into center */}
            {HEX_ANGLES.map((deg, idx) => {
              if (idx !== activeIndex) return null;
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={`beam-${deg}`}
                  x1={(SVG_CENTER + 86 * Math.cos(rad)).toFixed(2)}
                  y1={(SVG_CENTER + 86 * Math.sin(rad)).toFixed(2)}
                  x2={(SVG_CENTER + SVG_ORBIT_R * Math.cos(rad)).toFixed(2)}
                  y2={(SVG_CENTER + SVG_ORBIT_R * Math.sin(rad)).toFixed(2)}
                  stroke="#9E3B24"
                  strokeOpacity="0.6"
                  strokeWidth="1.2"
                  strokeDasharray="3 5"
                  className="gur-beam-flow"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {/* Fine heritage dial ticks around the ring */}
            {DIAL_TICKS.map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const isMajor = deg % 60 === 30;
              const inner = isMajor ? SVG_ORBIT_R - 4 : SVG_ORBIT_R - 2;
              const outer = isMajor ? SVG_ORBIT_R + 4 : SVG_ORBIT_R + 2;
              return (
                <line
                  key={deg}
                  x1={(SVG_CENTER + inner * Math.cos(rad)).toFixed(2)}
                  y1={(SVG_CENTER + inner * Math.sin(rad)).toFixed(2)}
                  x2={(SVG_CENTER + outer * Math.cos(rad)).toFixed(2)}
                  y2={(SVG_CENTER + outer * Math.sin(rad)).toFixed(2)}
                  stroke="#B85D19"
                  strokeOpacity={isMajor ? "0.42" : "0.18"}
                  strokeWidth="0.75"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {/* Ultra-fine 5-second progress filament */}
            <path
              key={`arc-${activeIndex}`}
              ref={roadArcRef}
              d={roadSegmentPath}
              fill="none"
              stroke="#9E3B24"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeDasharray={ROAD_SEG_LEN}
              strokeDashoffset={ROAD_SEG_LEN}
              vectorEffect="non-scaling-stroke"
            />

            {/* Delicate needle-point traveler */}
            <circle
              key={`dot-${activeIndex}`}
              ref={roadDotRef}
              cx={rx1.toFixed(2)}
              cy={ry1.toFixed(2)}
              r="2.6"
              fill="#9E3B24"
            />
          </svg>

          {/* OPTICAL SPOTLIGHT & RIPPLE ILLUSION AROUND CENTER PRODUCT */}
          <div
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            aria-hidden="true"
          >
            {/* Soft figure-ground luminous depth dish making center pop forward */}
            <div
              className="absolute h-[168px] w-[168px] rounded-full min-[375px]:h-[190px] min-[375px]:w-[190px] sm:h-[222px] sm:w-[222px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,250,242,0.9) 42%, rgba(226,149,48,0.22) 62%, rgba(250,243,230,0) 76%)",
              }}
            />

            {/* Concentric Golden Aroma/Focus Waves expanding gently outward */}
            <span className="gur-ripple absolute h-[114px] w-[114px] rounded-full border border-gur/45 min-[375px]:h-[130px] min-[375px]:w-[130px] sm:h-[152px] sm:w-[152px]" />
            <span className="gur-ripple r2 absolute h-[114px] w-[114px] rounded-full border border-clay/35 min-[375px]:h-[130px] min-[375px]:w-[130px] sm:h-[152px] sm:w-[152px]" />
            <span className="gur-ripple r3 absolute h-[114px] w-[114px] rounded-full border border-gur/30 min-[375px]:h-[130px] min-[375px]:w-[130px] sm:h-[152px] sm:w-[152px]" />

            {/* Smooth Counter-Rotating Eclipse Lens Arcs (Zero Spiky Shapes) */}
            <svg
              viewBox="0 0 200 200"
              className="dial-sweep-cw absolute h-[134px] w-[134px] min-[375px]:h-[154px] min-[375px]:w-[154px] sm:h-[178px] sm:w-[178px]"
            >
              <path
                d="M 100 12 A 88 88 0 0 1 186 84"
                fill="none"
                stroke="#B85D19"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeOpacity="0.65"
              />
              <path
                d="M 100 188 A 88 88 0 0 1 14 116"
                fill="none"
                stroke="#B85D19"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeOpacity="0.55"
              />
              <circle cx="100" cy="12" r="2" fill="#9E3B24" />
              <circle cx="100" cy="188" r="2" fill="#B85D19" />
            </svg>

            <svg
              viewBox="0 0 200 200"
              className="dial-sweep-ccw absolute h-[126px] w-[126px] min-[375px]:h-[144px] min-[375px]:w-[144px] sm:h-[168px] sm:w-[168px]"
            >
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="#9E3B24"
                strokeOpacity="0.22"
                strokeWidth="0.75"
                strokeDasharray="3 6"
              />
            </svg>
          </div>

          {/* 6 BORDERLESS DEPTH-RECESSED OUTER PRODUCT MEDALLIONS */}
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
                  {/* Depth-contrast circular cutout (recessed when inactive so center dominates) */}
                  <span
                    className={`block h-[60px] w-[60px] overflow-hidden rounded-full transition-all duration-300 active:scale-95 min-[375px]:h-[70px] min-[375px]:w-[70px] sm:h-[80px] sm:w-[80px] ${
                      isActive
                        ? "scale-105 opacity-100"
                        : "scale-90 opacity-65 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  >
                    <img
                      src={PRODUCT_PHOTOS[product.id]}
                      alt={product.name}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </span>

                  {/* Clean Floating Label */}
                  <span
                    className={`mt-1 whitespace-nowrap rounded-full bg-[#FAF1E2]/90 px-1.5 py-[1px] text-[10px] leading-tight backdrop-blur-[2px] transition-colors min-[375px]:text-[11px] ${isActive
                      ? "font-extrabold text-clay"
                      : inBasket
                        ? "font-bold text-leaf"
                        : "font-semibold text-ink/70"
                      }`}
                  >
                    {inBasket ? "✓ " : ""}
                    {SHORT_NAMES[product.id] || product.name}
                  </span>

                  <span
                    className={`mt-0.5 h-[3px] w-[3px] rounded-full transition-opacity duration-300 ${isActive ? "bg-clay opacity-100" : "opacity-0"
                      }`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            );
          })}

          {/* UNOBSTRUCTED 3D DEPTH-BREATHING CENTERPIECE WITH SUNLIGHT SHEEN */}
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
            <button
              type="button"
              onClick={() => onAdd(activeProduct.id)}
              aria-label={`${activeProduct.name} ঝুড়িতে নিন`}
              className="pointer-events-auto gur-center-breathe group relative h-[114px] w-[114px] overflow-hidden rounded-full transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay min-[375px]:h-[130px] min-[375px]:w-[130px] sm:h-[152px] sm:w-[152px]"
            >
              <div
                key={activeProduct.id}
                className="gur-spotlight-enter relative h-full w-full overflow-hidden rounded-full"
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
            </button>
          </div>
        </div>

        {/* CONVERSION-FOCUSED BORDERLESS SHOWCASE BELOW DIAL */}
        <div className="mx-auto mt-5 flex w-full max-w-[360px] flex-col items-center text-center">
          {/* Index + Unit + Badge + Prev/Next Controls */}
          <div className="flex items-center gap-3 text-[11.5px] font-bold tracking-wider text-gur">
            <button
              type="button"
              onClick={() => selectIndex(activeIndex - 1)}
              aria-label="আগের গুড়"
              className="px-2 py-1 text-[15px] leading-none text-ink/55 transition-colors hover:text-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              ‹
            </button>
            <span>
              {padBn(activeIndex + 1)} / ০৬ · {activeProduct.unit}
              {activeProduct.badge ? ` · ${activeProduct.badge}` : ""}
            </span>
            <button
              type="button"
              onClick={() => selectIndex(activeIndex + 1)}
              aria-label="পরের গুড়"
              className="px-2 py-1 text-[15px] leading-none text-ink/55 transition-colors hover:text-clay focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              ›
            </button>
          </div>

          <div
            key={`info-${activeProduct.id}`}
            className="gur-spotlight-enter mt-1 px-2"
          >
            <h3 className="serif text-[21px] font-extrabold leading-snug text-ink sm:text-[23px]">
              {activeProduct.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-ink/70">
              {activeProduct.sensoryHook}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onAdd(activeProduct.id)}
            className={`mt-4 rounded-full px-7 py-2.5 text-[13.5px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-clay active:scale-95 ${
              isInCart
                ? "bg-leaf text-white hover:bg-[#234A30]"
                : "bg-ink text-[#FFF6E8] hover:bg-clay"
            }`}
          >
            {isInCart
              ? `✓ ঝুড়িতে আছে (${toBn(activeInCartCount)}) · আরও নিন (${toTk(activeProduct.price)})`
              : `${toTk(activeProduct.price)} · + ঝুড়িতে নিন`}
          </button>
        </div>
      </section>

      {/* ================= FAQ & FOOTER ================= */}
      <section className="relative overflow-hidden px-4 pb-10 pt-8">
        <svg
          className="wm"
          style={{ right: -36, bottom: 18, width: 130, height: 130, opacity: 0.05 }}
          aria-hidden="true"
        >
          <use href="#s-hari" />
        </svg>
        <div className="space-y-2">
          <details className="kantha-sm rounded-2xl bg-card px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14.5px] font-bold">
              <span>অগ্রিম ১ টাকাও দিতে হবে কি?</span>
              <span className="chev text-[20px] text-gur transition">+</span>
            </summary>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/75">
              না। সম্পূর্ণ ক্যাশ অন ডেলিভারি — ডেলিভারি ম্যানের কাছ থেকে পণ্য বুঝে নিয়ে টাকা পরিশোধ করবেন।
            </p>
          </details>
          <details className="kantha-sm rounded-2xl bg-card px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14.5px] font-bold">
              <span>খাঁটি গুড়ের রং গাঢ় বাদামি কেন?</span>
              <span className="chev text-[20px] text-gur transition">+</span>
            </summary>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/75">
              কাঠের জ্বালে রস ঘন হলে প্রাকৃতিকভাবেই গাঢ় বাদামি রং আসে। ঝকঝকে সাদাটে বা হালকা হলুদ রং মূলত হাইড্রোজ ও চিনি মেশানোর লক্ষণ।
            </p>
          </details>
          <details className="kantha-sm rounded-2xl bg-card px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14.5px] font-bold">
              <span>গুড় কতদিন ভালো থাকবে ও কীভাবে রাখব?</span>
              <span className="chev text-[20px] text-gur transition">+</span>
            </summary>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/75">
              পাটালি ও দানাদার গুড় এয়ারটাইট পাত্রে শুকনো জায়গায় এবং ঝোলা ও বীজ গুড় নরমাল ফ্রিজে রাখলে ৬–১২ মাস পর্যন্ত স্বাদ ও ঘ্রাণ অটুট থাকে।
            </p>
          </details>
        </div>

        <footer className="mt-7 text-center text-[12.5px] leading-relaxed text-ink/60">
          <p className="font-bold text-ink/80">
            শাহিন ই মার্ট · প্রকৃতির আসল স্বাদ পৌঁছে দিই আপনার হাতে
          </p>
          <p className="mt-0.5">
            হটলাইন / WhatsApp:{" "}
            <a href={`tel:${PHONE}`} className="font-extrabold text-clay">
              ০৯৬১১৯০১১৭০
            </a>
          </p>
        </footer>
      </section>

      {/* ================= STICKY MOBILE CONVERSION BAR ================= */}
      <div
        className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,246,238,0), rgba(251,246,238,.96) 30%)",
        }}
      >
        <div className="kantha-sm flex items-center gap-2 rounded-[22px] border border-[#E6CFAE] bg-card p-2 pl-4 shadow-[0_-8px_30px_-12px_rgba(59,31,14,.45)]">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold leading-tight text-ink/60">
              {totalCount > 0
                ? `${toBn(totalCount)}টি পণ্য · ডেলিভারি সহ`
                : `${activeProduct.name} · ${activeProduct.unit}`}
            </p>
            <p className="serif text-[21px] font-extrabold leading-tight text-clay">
              {totalCount > 0 ? toTk(grandTotal) : toTk(activeProduct.price)}
            </p>
          </div>
          <a
            href={`tel:${PHONE}`}
            className="grid h-[48px] w-[48px] flex-none place-items-center rounded-2xl bg-sand text-[19px]"
            aria-label="কল করুন ০৯৬১১৯০১১৭০"
          >
            📞
          </a>
          <button
            type="button"
            onClick={() => handleProceedToCheckout()}
            className="btn-main h-[48px] flex-none rounded-2xl px-4 text-[15px] font-bold"
          >
            অর্ডার করুন →
          </button>
        </div>
      </div>

      {/* ================= CHECKOUT HANDOFF MODAL ================= */}
      {handoffOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/55 p-3 sm:items-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="kantha w-full max-w-[450px] rounded-[26px] bg-card p-5 shadow-2xl">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-leaf text-[22px] text-white">
              🛒
            </div>
            <h3 className="serif mt-2.5 text-center text-[21px] font-extrabold text-ink">
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
