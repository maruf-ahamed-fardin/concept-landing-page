"use client";

import React from "react";
import { PHONE, toBn } from "@/data/products";

interface PairingRow {
  id: string;
  num: string;
  food: string;
  gurLabel: string;
  gurId: string;
}

const PAIRING_ROWS: PairingRow[] = [
  {
    id: "pitha",
    num: "১",
    food: "ভাপা ও চিতই পিঠা",
    gurLabel: "ঝোলা গুড়",
    gurId: "jhola",
  },
  {
    id: "cha",
    num: "২",
    food: "শীতের কড়া লাল চা",
    gurLabel: "বীজ গুড়",
    gurId: "bij",
  },
  {
    id: "payesh",
    num: "৩",
    food: "দুধের পায়েস ও ক্ষীর",
    gurLabel: "গোল পাটালি",
    gurId: "gol",
  },
  {
    id: "muri",
    num: "৪",
    food: "মুড়ি ও চিড়া মাখা",
    gurLabel: "লম্বা পাটালি",
    gurId: "lomba",
  },
  {
    id: "ruti",
    num: "৫",
    food: "গরম রুটি ও পরোটা",
    gurLabel: "দানাদার গুড়",
    gurId: "danadar",
  },
  {
    id: "direct",
    num: "৬",
    food: "এমনি মুখে কাটা চাক",
    gurLabel: "ফয়েল পাটালি",
    gurId: "foil",
  },
];

function PothiCornerKalka({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 42 42"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4,34 L4,10 Q4,4 10,4 L34,4" stroke="#9E3B24" strokeOpacity="0.6" strokeWidth="1.4" />
      <path d="M9,26 C9,14 14,9 26,9" stroke="#B85D19" strokeOpacity="0.55" strokeWidth="1.15" strokeDasharray="2.5 2" />
      <path d="M12,18 C12,13 18,12 18,15 C18,18 14,20 12,18Z" fill="#9E3B24" fillOpacity="0.22" stroke="#9E3B24" strokeOpacity="0.65" strokeWidth="1" />
      <circle cx="10" cy="10" r="2" fill="#2D5A3C" fillOpacity="0.7" />
    </svg>
  );
}

interface PairingReceiptSectionProps {
  onQuickAdd: (id: string) => void;
  selectedQty: Record<string, number>;
}

export function PairingReceiptSection({
  onQuickAdd,
  selectedQty,
}: PairingReceiptSectionProps) {
  const totalSelected = PAIRING_ROWS.reduce(
    (sum, r) => sum + (selectedQty[r.gurId] || 0),
    0
  );

  return (
    <section
      aria-labelledby="pairing-receipt-heading"
      className="relative mx-auto w-full max-w-[480px] overflow-x-clip px-3.5 pb-6 pt-2.5 sm:px-4"
    >
      {/* Heritage Hand-Inked Bengal Folklore Pothi Manuscript Sheet (Compact 8px Frame) */}
      <div
        className="kantha relative overflow-hidden rounded-[8px] border-[1.5px] border-[#B67A4B]/70 px-3.5 pb-3.5 pt-3.5 sm:px-5 sm:pb-4 sm:pt-4"
        style={{
          background: "linear-gradient(180deg, #FFFDF6 0%, #FAF0DB 100%)",
        }}
      >
        {/* Symmetrical Carved Pothi Kalka Corners */}
        <PothiCornerKalka className="pointer-events-none absolute left-2 top-2 h-7 w-7" />
        <PothiCornerKalka className="pointer-events-none absolute right-2 top-2 h-7 w-7 -scale-x-100" />
        <PothiCornerKalka className="pointer-events-none absolute bottom-2 left-2 h-7 w-7 -scale-y-100" />
        <PothiCornerKalka className="pointer-events-none absolute bottom-2 right-2 h-7 w-7 -scale-x-100 -scale-y-100" />

        {/* 1. Pothi Foliation Eyebrow */}
        <div className="relative z-10 text-center">
          <p className="inline-flex items-center gap-1.5 text-[10.5px] font-bold tracking-[0.08em] text-leaf">
            <span aria-hidden="true">❖</span>
            <span>গ্রামবাংলার হেঁশেল কথা</span>
            <span aria-hidden="true">❖</span>
          </p>
        </div>

        {/* 2. Authentic Battala Woodblock Trio Artwork */}
        <div className="relative z-10 mx-auto mt-1.5 max-w-[260px] sm:max-w-[288px]">
          <img
            src="/images/art/folk-pitha-trio.webp"
            alt="মাটির ভাঁড়ে লাল চা, কলাপাতায় ভাপা পিঠায় ঝোলা গুড় ও খেজুর পাটালির কাঠখোদাই চিত্র"
            loading="lazy"
            decoding="async"
            className="mx-auto block h-auto w-full select-none mix-blend-multiply"
          />
        </div>

        {/* Hairline Lotus Divider */}
        <div
          className="relative z-10 mx-auto mt-0.5 flex max-w-[200px] items-center gap-2"
          aria-hidden="true"
        >
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C38C58]/70" />
          <span className="text-[11px] text-clay">❀</span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C38C58]/70" />
        </div>

        {/* 3. Storytelling Heading in Traditional Folklore Woodblock Serif */}
        <div className="story-cover-legacy relative z-10 mt-1 text-center">
          <h2
            id="pairing-receipt-heading"
            className="serif text-[20px] font-extrabold leading-snug text-[#7A2816] sm:text-[23px]"
          >
            কোন খাবারে জমে কোন গুড়?
          </h2>
          <p className="mt-0.5 text-[13px] font-semibold text-[#8C4D22] sm:text-[13.5px]">
            কোন খাবারের সাথে কোন গুড় সবচেয়ে ভালো জমে
          </p>
        </div>

        {/* 4. Open Compact Hand-Ruled Pothi Ledger Rows */}
        <div
          className="relative z-10 mt-2.5 rounded-[8px] px-1 py-1 sm:px-1.5"
          style={{
            background:
              "radial-gradient(ellipse 96% 92% at 50% 50%, rgba(235, 189, 122, 0.16) 0%, rgba(255, 252, 244, 0) 100%)",
          }}
        >
          <ul className="divide-y divide-dashed divide-[#D9B68B]/65">
            {PAIRING_ROWS.map((row) => (
              <li
                key={row.id}
                className="flex w-full items-center gap-2 px-1.5 py-[6px] text-left"
              >
                {/* Handwritten Bengali Numeral Coin */}
                <span className="serif grid h-5 w-5 flex-none place-items-center rounded-full border border-[#C98E5B] bg-[#FFF8EA] text-[11px] font-black leading-none text-clay">
                  {row.num}
                </span>

                {/* Dish Label in Warm Heritage Serif */}
                <span className="serif shrink-0 text-[13.5px] font-bold text-ink sm:text-[14.5px]">
                  {row.food}
                </span>

                {/* Dotted Pothi Ink Leader */}
                <span
                  aria-hidden="true"
                  className="mx-1 h-[1px] min-w-[10px] flex-1 translate-y-[2px] border-b-[1.5px] border-dotted border-[#A9714B]/55"
                />

                {/* Ink-Stamped Gur Pairing Label */}
                <span className="shrink-0 text-[12px] font-extrabold text-[#8F2E19] sm:text-[12.5px]">
                  {row.gurLabel}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. Compact Manuscript Colophon Footer */}
        <div className="relative z-10 mt-2 border-t border-dashed border-[#D3AE81] pt-2 text-center">
          <p className="font-artisan text-[16px] leading-snug text-clay sm:text-[17px]">
            রসে-গুড়ে ভরে উঠুক শীতের আসর
          </p>
          <div className="mt-1 flex items-center justify-center gap-2.5 text-[10.5px] font-bold text-ink/70">
            <a
              href={`tel:${PHONE}`}
              className="underline decoration-[#B85D19]/45 underline-offset-2 hover:text-clay"
            >
              কল: ০৯৬১১৯০১১৭০
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
