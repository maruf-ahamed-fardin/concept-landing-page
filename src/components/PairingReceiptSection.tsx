"use client";

import React from "react";
import { toBn } from "@/data/products";

interface PairingItem {
  id: "pitha" | "payesh" | "cha" | "muri";
  food: string;
  gurLabel: string;
  gurId: string;
  gifSrc: string;
}

const PAIRINGS: PairingItem[] = [
  {
    id: "pitha",
    food: "ভাপা ও চিতই",
    gurLabel: "ঝোলা গুড়",
    gurId: "jhola",
    gifSrc: "/images/pairings/pitha.webp",
  },
  {
    id: "payesh",
    food: "পায়েস ও ক্ষীর",
    gurLabel: "গোল পাটালি",
    gurId: "gol",
    gifSrc: "/images/pairings/payesh.webp",
  },
  {
    id: "cha",
    food: "শীতের লাল চা",
    gurLabel: "বীজ গুড়",
    gurId: "bij",
    gifSrc: "/images/pairings/cha.webp",
  },
  {
    id: "muri",
    food: "মুড়ি ও রুটি",
    gurLabel: "ফয়েল পাটালি",
    gurId: "foil",
    gifSrc: "/images/pairings/muri.webp",
  },
];

interface PairingReceiptSectionProps {
  onQuickAdd: (id: string) => void;
  selectedQty: Record<string, number>;
}

export function PairingReceiptSection({
  onQuickAdd,
  selectedQty,
}: PairingReceiptSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 pt-8 pb-4">
      <svg
        className="wm alt"
        style={{ right: -44, top: -6, width: 138, height: 138, opacity: 0.055, color: "#2D5A3C" }}
        aria-hidden="true"
      >
        <use href="#s-khejur" />
      </svg>
      {/* Minimal Visual Header */}
      <div className="text-center">
        <h2 className="serif text-[23px] font-extrabold leading-tight text-ink sm:text-[25px]">
          কোন খাবারে কোন গুড়?
        </h2>
        <p className="mt-1 text-[12.5px] font-medium text-ink/60">
          পছন্দের জুটিতে ট্যাপ করে ঝুড়িতে নিন
        </p>
      </div>

      {/* 2x2 Realistic GIF Culinary Pairing Cards */}
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
        {PAIRINGS.map((row) => {
          const count = selectedQty[row.gurId] || 0;
          const inCart = count > 0;
          return (
            <button
              key={row.id}
              type="button"
              onClick={() => onQuickAdd(row.gurId)}
              aria-label={`${row.food} এর সাথে ${row.gurLabel} ঝুড়িতে নিন`}
              className={`group relative flex flex-col overflow-hidden rounded-[22px] border text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay active:scale-[0.98] ${
                inCart
                  ? "border-leaf/60 bg-[#F7FBF8] ring-2 ring-leaf/20 shadow-[0_14px_28px_-18px_rgba(45,90,60,0.4)]"
                  : "border-[#E6D1B1] bg-card shadow-[0_14px_28px_-20px_rgba(59,31,14,0.36)] hover:border-clay/50"
              }`}
            >
              {/* Realistic Looping Cinemagraph GIF */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
                <img
                  src={row.gifSrc}
                  alt={`${row.food} ও ${row.gurLabel}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#241005]/30 to-transparent"
                  aria-hidden="true"
                />

                {/* Subtle basket count badge only when added */}
                {inCart && (
                  <span className="absolute right-2 top-2 rounded-full bg-leaf/95 px-2 py-[3px] text-[10px] font-extrabold leading-none text-white shadow-sm backdrop-blur-sm">
                    ✓ {toBn(count)}
                  </span>
                )}
              </div>

              {/* Clean Minimal Label Footer */}
              <div className="flex w-full items-center justify-between gap-1.5 px-3 py-2.5">
                <div className="min-w-0">
                  <h3 className="serif truncate text-[15px] font-extrabold leading-[1.38] text-ink sm:text-[16px]">
                    {row.food}
                  </h3>
                  <p
                    className={`mt-0.5 truncate text-[11.5px] font-bold leading-tight ${
                      inCart ? "text-leaf" : "text-clay"
                    }`}
                  >
                    {row.gurLabel}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className={`grid h-7 w-7 flex-none place-items-center rounded-full text-[14px] font-extrabold transition-colors ${
                    inCart
                      ? "bg-leaf text-white"
                      : "bg-[#F5E7D2] text-clay group-hover:bg-clay group-hover:text-[#FFF8EE]"
                  }`}
                >
                  {inCart ? "✓" : "+"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
