"use client";

import React, { useState } from "react";

interface StoryStep {
  num: string;
  tag: string;
  title: string;
  body: string;
  img: string;
  alt: string;
}

const STORY_STEPS: StoryStep[] = [
  {
    num: "১",
    tag: "গাছির প্রথম ভোর",
    title: "খেজুরগাছ থেকে টুপটাপ রস",
    body: "কুয়াশার মধ্যে গাছি হাঁড়ি ভরে রস নামাতেন। এই এক ফোঁটা রসেই শুরু হতো শীতের মিষ্টি অপেক্ষা।",
    img: "/images/story/step-1-gachi.webp",
    alt: "শীতের কুয়াশা ভোরে খেজুরগাছ থেকে মাটির হাঁড়িতে টাটকা রস সংগ্রহ করছেন গাছি",
  },
  {
    num: "২",
    tag: "মাটির উনুনে",
    title: "রস জ্বলে তৈরি হয় গুড়",
    body: "কাঠের আগুনে ধীরে ধীরে ঘন হয় রস। ধোঁয়ার সঙ্গে চারদিকে ছড়িয়ে পড়ে খেজুরের গুড়ের মিষ্টি ঘ্রাণ।",
    img: "/images/story/step-2-tafal.webp",
    alt: "গ্রামের মাটির চুলায় কাঠের জ্বালে তাফালে খেজুর রস ঘন হচ্ছে",
  },
  {
    num: "৩",
    tag: "ঢেঁকির তালে তালে",
    title: "ধান থেকে চালের গুঁড়ি",
    body: "ঢেঁকির ধুপধাপ, চাল ভানা আর নানীর পিঠার আয়োজন—কাজের ফাঁকেই গল্পে মেতে উঠত সবাই।",
    img: "/images/story/step-3-dheki.webp",
    alt: "গ্রামের মাটির বারান্দায় কাঠের ঢেঁকি আর কুলায় সাদা চালের গুঁড়ি",
  },
  {
    num: "৪",
    tag: "এক পাটিতে সবাই",
    title: "পিঠায় মিশত পরিবারের হাসি",
    body: "গরম ভাপা পিঠার ওপর গুড় ঢেলে নানু-দাদু থেকে ছোট্ট শিশুরা একই উঠোনে বসে আনন্দ ভাগ করে নিত।",
    img: "/images/story/step-4-family.webp",
    alt: "শীতল পাটিতে বসে ভাপা পিঠার ওপর খেজুরের ঝোলা গুড় দিয়ে উপভোগ করছে পরিবার",
  },
];

function KanthaVine({ side }: { side: "left" | "right" }) {
  const isRight = side === "right";
  return (
    <svg
      viewBox="0 0 30 300"
      className={`pointer-events-none absolute top-1/2 h-[250px] w-[26px] -translate-y-1/2 opacity-85 ${
        isRight ? "right-1.5 -scale-x-100" : "left-1.5"
      }`}
      aria-hidden="true"
    >
      <g className={`vine-sway ${isRight ? "alt" : ""}`}>
        {/* Climbing emerald vine stem */}
        <path
          d="M15,0 C2,30 28,60 15,90 C2,120 28,150 15,180 C2,210 28,240 15,270 C10,282 15,300 15,300"
          fill="none"
          stroke="#2D5A3C"
          strokeWidth="1.7"
        />
        {/* Golden sunlit stitch pulse flowing along the stem */}
        <path
          d="M15,0 C2,30 28,60 15,90 C2,120 28,150 15,180 C2,210 28,240 15,270 C10,282 15,300 15,300"
          fill="none"
          stroke="#E4A33A"
          strokeOpacity="0.65"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="18 102"
          className="vine-shimmer"
        />
        {/* Animated fluttering leaves */}
        <g fill="#2D5A3C" opacity=".88">
          <path d="M9,30 q-9,-6 -8,-16 q8,4 8,16Z" className="vine-leaf" />
          <path d="M21,62 q9,-6 8,-16 q-8,4 -8,16Z" className="vine-leaf r" style={{ animationDelay: "-0.7s" }} />
          <path d="M9,120 q-9,-6 -8,-16 q8,4 8,16Z" className="vine-leaf" style={{ animationDelay: "-1.4s" }} />
          <path d="M21,152 q9,-6 8,-16 q-8,4 -8,16Z" className="vine-leaf r" style={{ animationDelay: "-2.1s" }} />
          <path d="M9,210 q-9,-6 -8,-16 q8,4 8,16Z" className="vine-leaf" style={{ animationDelay: "-2.8s" }} />
          <path d="M21,242 q9,-6 8,-16 q-8,4 -8,16Z" className="vine-leaf r" style={{ animationDelay: "-3.3s" }} />
        </g>
        {/* Blooming golden flower buds */}
        {[90, 180, 270].map((cy, idx) => (
          <g
            key={cy}
            className="vine-bud"
            style={{ animationDelay: `${idx * -1.05}s` }}
          >
            <circle cx="15" cy={cy} r="3.5" fill="#B85D19" />
            <circle cx="15" cy={cy} r="1.4" fill="#F2B44A" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function StorySection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="story"
      className="floral-bg relative px-4 pb-8 pt-7"
      style={{ overflowX: "clip" }}
    >
      {/* ================= 3RD IMAGE: CHAPTER COVER (ANIMATED VINES) ================= */}
      <div className="relative z-10">
        <div className="kantha relative overflow-hidden rounded-[28px] bg-sand text-center shadow-[0_18px_40px_-30px_rgba(59,31,14,.8)]">
          <svg className="block h-7 w-full" aria-hidden="true">
            <rect width="100%" height="100%" fill="url(#g-band)" />
          </svg>
          <KanthaVine side="left" />
          <KanthaVine side="right" />
          <div className="px-9 pb-7 pt-6">
            <p className="text-[22px] leading-none text-gur" aria-hidden="true">
              ❦
            </p>
            <p className="mt-2 text-[13px] font-bold tracking-wide text-gur">
              সকাল থেকে রাত — আমাদের গুড়ের একটি দিন
            </p>
            <h2 className="serif mt-2 text-[25px] font-extrabold leading-[1.45]">
              ভোর ৪টার খেজুর রস থেকে সন্ধ্যার পিঠার আসর
            </h2>
            <p className="serif mt-3 text-[14px] font-semibold italic text-clay">
              দাদি-নানির আমলের গ্রামবাংলার আবহে
            </p>
            <p className="mx-auto mt-2 max-w-[330px] text-[15px] leading-[1.75] text-ink/75">
              গুড় আমাদের কাছে শুধু মিষ্টি নয় — গাছির কুয়াশা ভোর, তাফালের ধোঁয়া, দাদির ঢেঁকি আর এক পাটিতে বসা পুরো পরিবারের গল্প।
            </p>
            <a
              href="#process-grid"
              className="mt-5 inline-flex flex-col items-center text-[13px] font-semibold text-gur"
            >
              <span>স্ক্রল করে গল্পে ঢুকুন</span>
              <span className="nudge mt-0.5 text-[22px] leading-none" aria-hidden="true">
                ⌄
              </span>
            </a>
          </div>
          <svg className="block h-7 w-full" aria-hidden="true">
            <rect width="100%" height="100%" fill="url(#g-band)" />
          </svg>
        </div>
      </div>

      {/* ================= MINIMAL CUSTOM VILLAGE JOURNEY (সেই দিনের গল্প) ================= */}
      <div id="process-grid" className="relative z-10 mt-8">
        {/* Minimal Editorial Heading */}
        <div className="text-center">
          <p className="text-[11px] font-bold tracking-[0.14em] text-clay">
            সেই দিনের গল্প
          </p>
          <h2 className="serif mt-1 text-[26px] font-extrabold leading-tight text-ink sm:text-[30px]">
            চলুন, ফিরে যাই গ্রামে
          </h2>
          <p className="mt-1 text-[13px] font-medium text-ink/65">
            এক ফোঁটা রস থেকে এক উঠোন আনন্দে
          </p>
          <div className="mx-auto mt-3 flex max-w-[200px] items-center gap-2.5" aria-hidden="true">
            <span className="h-px flex-1 bg-[#DCC6A6]" />
            <span className="text-[12px] leading-none text-gur">❦</span>
            <span className="h-px flex-1 bg-[#DCC6A6]" />
          </div>
        </div>

        {/* 4-Step Winding Village Footpath (100% Flat, Zero Shadows) */}
        <div className="relative mt-6">
          {/* Subtle S-Curve Dashed Footpath Behind Alternating Rows */}
          <svg
            viewBox="0 0 100 400"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M 42 42 C 74 72, 74 115, 58 145 C 42 175, 26 205, 42 248 C 58 288, 74 318, 58 358"
              fill="none"
              stroke="#C9A87C"
              strokeOpacity="0.65"
              strokeWidth="0.65"
              strokeDasharray="1.8 2.2"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative z-10 space-y-6">
            {STORY_STEPS.map((step, idx) => {
              const isReversed = idx % 2 === 1;
              const isSelected = activeStep === idx;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  aria-pressed={isSelected}
                  className="grid w-full cursor-pointer grid-cols-[112px_1fr] items-center gap-3 rounded-[20px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-clay min-[375px]:grid-cols-[128px_1fr] min-[375px]:gap-3.5 sm:grid-cols-[148px_1fr] sm:gap-4"
                >
                  {/* Custom Rural Khilan (Arch Window) Real Photo Frame */}
                  <div
                    className={`rounded-b-[14px] rounded-t-full border bg-[#FFFDF8] p-1 transition-colors duration-200 ${
                      isReversed ? "order-2" : "order-1"
                    } ${isSelected ? "border-clay" : "border-[#D8C09F]"}`}
                  >
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-b-[10px] rounded-t-full bg-sand">
                      <img
                        src={step.img}
                        alt={step.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Flat Hairline Story Card */}
                  <div
                    className={`rounded-[16px] border bg-[#FFFDF8] px-3 py-3 transition-colors duration-200 sm:px-4 sm:py-3.5 ${
                      isReversed ? "order-1" : "order-2"
                    } ${isSelected ? "border-clay" : "border-[#E3CEAF]"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`serif inline-grid h-6 w-6 flex-none place-items-center rounded-full border text-[12px] font-black leading-none transition-colors ${
                          isSelected
                            ? "border-clay bg-clay text-[#FFF8EE]"
                            : "border-[#CFAF85] bg-[#FAF3E6] text-clay"
                        }`}
                      >
                        {step.num}
                      </span>
                      <span className="truncate text-[11px] font-bold text-clay">
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="serif mt-1.5 text-[16px] font-extrabold leading-snug text-ink min-[375px]:text-[17px] sm:text-[18px]">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-[12px] leading-[1.62] text-ink/70 min-[375px]:text-[12.5px]">
                      {step.body}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Closing Stamp & Flat Trust Strip */}
        <div className="mt-6 text-center">
          <p className="text-[16px] leading-none text-gur" aria-hidden="true">
            ✻
          </p>
          <p className="mt-1 text-[12.5px] font-bold text-clay">
            গল্পটা শেষ নয়, স্মৃতিটা বেঁচে আছে
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 divide-x divide-[#E4CEAE] rounded-[16px] border border-[#E2CCA9] bg-[#FFFDF8] py-3 text-center">
          <div className="px-2">
            <p className="serif text-[19px] font-black text-clay">০%</p>
            <p className="text-[11px] font-bold text-ink/75">চিনি ও কেমিক্যাল</p>
          </div>
          <div className="px-2">
            <p className="serif text-[19px] font-black text-gur">২,৪০০+</p>
            <p className="text-[11px] font-bold text-ink/75">সন্তুষ্ট পরিবার</p>
          </div>
          <div className="px-2">
            <p className="serif text-[19px] font-black text-leaf">১০০%</p>
            <p className="text-[11px] font-bold text-ink/75">হাতে পেয়ে টাকা</p>
          </div>
        </div>
      </div>
    </section>
  );
}
