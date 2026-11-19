"use client";

import React from "react";

interface TerracottaReliefPlate {
  id: string;
  src: string;
  alt: string;
}

const RELIEF_PLATES: TerracottaReliefPlate[] = [
  {
    id: "gachi",
    src: "/images/art/terracotta-gachi.webp",
    alt: "বাংলার টেরাকোটা ফলকে বাঁক কাঁধে গাছি ও খেজুরগাছে রসের হাঁড়ি",
  },
  {
    id: "tafal",
    src: "/images/art/terracotta-tafal.webp",
    alt: "টেরাকোটা ভাস্কর্যে গ্রামের মাটির চুলায় তাফালে খেজুরের রস জ্বাল দেওয়ার দৃশ্য",
  },
  {
    id: "pitha",
    src: "/images/art/terracotta-pitha.webp",
    alt: "টেরাকোটা শিল্পকর্মে শীতের ভাপা পিঠা, ঢেঁকি ও খেজুরের গুড় পরিবেশনের উঠোন",
  },
  {
    id: "river",
    src: "/images/art/terracotta-river.webp",
    alt: "বাংলার টেরাকোটা ফলকে নদী, খেজুরবন, পালতোলা নৌকা ও পদ্ম সূর্য",
  },
];

export function TruthHookSection() {
  return (
    <section
      id="truth-hook"
      aria-label="বাংলার ঐতিহ্য ও টেরাকোটা লোকশিল্প"
      className="relative mx-auto w-full max-w-[480px] overflow-x-clip px-4 pb-6 pt-0"
    >
      {/* 1. Original Editorial Heritage Couplet (High-Contrast Ink + Warm Amber Glow — Zero Multi-Color Copy Feel) */}
      <div className="relative z-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf/25 bg-[#EAF3EC]/85 px-3 py-[3px] text-[11px] font-extrabold tracking-[0.06em] text-leaf">
          <span aria-hidden="true">❖</span>
          <span>গ্রামবাংলার অমলিন শীত</span>
        </span>

        <h2
          aria-label="কুয়াশা ঢাকা শীতের ভোর, খাঁটি গুড়ে মিষ্টি ঘর।"
          className="serif mx-auto mt-2.5 max-w-[400px] text-[22px] font-black leading-[1.4] tracking-[-0.01em] text-ink min-[390px]:text-[24px] sm:text-[26px]"
        >
          <span className="block">
            কুয়াশা ঢাকা{" "}
            <span className="hl-mark font-black">শীতের ভোর,</span>
          </span>
          <span className="mt-0.5 block">
            খাঁটি গুড়ে{" "}
            <span className="gurtext font-black">মিষ্টি ঘর।</span>
          </span>
        </h2>

        <p className="mt-2 inline-flex items-center gap-2 text-[11.5px] font-bold tracking-[0.05em] text-[#7D4A28]">
          <span className="h-px w-6 bg-[#C89B6B]/70" aria-hidden="true" />
          <span>বাঘা, রাজশাহী · বংশপরম্পরার স্বাদ</span>
          <span className="h-px w-6 bg-[#C89B6B]/70" aria-hidden="true" />
        </p>
      </div>

      {/* 2. Continuous Auto-Scrolling Carved Terracotta Temple Relief Frieze (Architectural Bronze Cornice) */}
      <div className="art-marquee-wrap relative -mx-4 mt-4 overflow-hidden">
        <div className="art-frieze-smokey relative border-y border-[#B56E38]/45 bg-[#4A1C0F]/10 py-[2px]">
          <div className="art-marquee-track items-stretch">
            {[0, 1].map((dupIdx) => (
              <div
                key={dupIdx}
                className="flex shrink-0 items-stretch"
                aria-hidden={dupIdx === 1 ? "true" : undefined}
              >
                {RELIEF_PLATES.map((plate) => (
                  <figure
                    key={`${dupIdx}-${plate.id}`}
                    className="relative aspect-[3/2] w-[224px] flex-none overflow-hidden border-r-[2px] border-[#5D2411]/85 sm:w-[252px]"
                  >
                    <img
                      src={plate.src}
                      alt={dupIdx === 0 ? plate.alt : ""}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover contrast-[1.03] saturate-[1.04]"
                    />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Authentic Nostalgic Sub-Copy & Tactile Centerline Divider Ornament */}
      <p className="relative z-10 mx-auto mt-3.5 max-w-[345px] text-center text-[12.5px] font-medium leading-[1.68] text-ink/75">
        শহরের ব্যস্ত সকালে হারিয়ে যাওয়া{" "}
        <b className="font-bold text-ink">দাদি-নানির উঠোনের ঘ্রাণ</b> — খাঁটি
        তাফালের মিষ্টিতে ফিরে আসুক{" "}
        <span className="hl-key font-extrabold">আপনার ঘরের পাতে</span>।
      </p>

      <div
        className="mx-auto mt-4 flex max-w-[240px] items-center gap-2.5"
        aria-hidden="true"
      >
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C6925D]/70 to-[#9E3B24]/60" />
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#B85D19]/40 bg-[#FFFBF2] text-[11px] text-clay">
          ❖
        </span>
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C6925D]/70 to-[#9E3B24]/60" />
      </div>
    </section>
  );
}
