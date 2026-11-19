"use client";

import React, { useEffect, useRef, useState } from "react";

interface StoryStep {
  num: string;
  time: string;
  tag: string;
  title: string;
  body: React.ReactNode;
  img: string;
  video: string;
  alt: string;
}

const STORY_STEPS: StoryStep[] = [
  {
    num: "১",
    time: "ভোর ৪টা",
    tag: "গাছির কুয়াশা ভোর",
    title: "ফোঁটায় ফোঁটায় ভরে হাঁড়ি",
    body: (
      <>
        <b className="font-bold text-ink">ভোর ৪টায় উঠে</b> কুয়াশা ভেজা খেজুর
        গাছ থেকে মাটির হাঁড়িতে ফোঁটায় ফোঁটায় টাটকা রস নামানো। সূর্য ওঠার
        আগেই বাড়ি ফেরেন গাছি।
      </>
    ),
    img: "/images/story/step-1-dawn-v2.webp",
    video: "/videos/story-1-dawn-v2.mp4",
    alt: "ভোর ৪টার কুয়াশা ভেজা শীতল আবহে গাছি মাটির হাঁড়িতে নলি বেয়ে ফোঁটায় ফোঁটায় পড়া খেজুর রস সংগ্রহ করছেন",
  },
  {
    num: "২",
    time: "সকাল ৮টা",
    tag: "তাফালের ধোঁয়ায়",
    title: "টগবগে জ্বালে সোনালি ঝোলা",
    body: (
      <>
        <b className="font-bold text-ink">মাটির চুলায় বড় কড়াইয়ে</b> টগবগ
        করে রস জ্বাল ও কাঠের হাতায় সোনালি ঝোলা গুড়। ফেনা তুলতে তুলতে উঠোন
        ভরে যায় ঘ্রাণে।
      </>
    ),
    img: "/images/story/step-2-tafal-v2.webp",
    video: "/videos/story-2-tafal-v2.mp4",
    alt: "মাটির চুলায় বড় তাফাল কড়াইয়ে টগবগে রসের ওপর কাঠের হাতায় তোলা হচ্ছে সোনালি ঝোলা গুড়",
  },
  {
    num: "৩",
    time: "দুপুর ১২টা",
    tag: "কুলার রোদে",
    title: "দানা বাঁধে বীজ গুড়, জমে পাটালি",
    body: (
      <>
        ঘন জ্বালে দানা বাঁধা চকলেট বীজ গুড় এবং{" "}
        <b className="font-bold text-ink">বাঁশের কুলায় জমা মুচমুচে পাটালি</b>
        —আঙুলে চাপ দিলেই ঝুরঝুর করে ভাঙে।
      </>
    ),
    img: "/images/story/step-patali-kula.webp",
    video: "/videos/story-patali-kula.mp4",
    alt: "দুপুরের রোদে বাঁশের কুলায় সাজানো খাঁটি পাটালি ও মাটির বাটিতে দানা বাঁধা বীজ গুড়",
  },
  {
    num: "৪",
    time: "বিকেল ৩টা",
    tag: "উঠোনের কোণে",
    title: "ঢেঁকির তালে পিঠার চাল",
    body: (
      <>
        ঢেঁকির ধুপ-ধাপ শব্দে মা পা দিয়ে চাপ দেন,{" "}
        <b className="font-bold text-ink">দাদি হাত দিয়ে চাল নেড়ে দেন</b>। এই
        চালের গুঁড়োতেই হবে সন্ধ্যার ভাপা আর চিতই।
      </>
    ),
    img: "/images/story/step-3-dheki.webp",
    video: "/videos/story-3-dheki.mp4",
    alt: "গ্রামের মাটির বারান্দায় কাঠের ঢেঁকি আর কুলায় সাদা চালের গুঁড়ি",
  },
  {
    num: "৫",
    time: "সন্ধ্যা ৭টা",
    tag: "এক পাটিতে তিন প্রজন্ম",
    title: "গরম পিঠায় গুড়ের উৎসব",
    body: (
      <>
        নকশী কাঁথার পাশে বসে বাচ্চারা অপেক্ষা করে—
        <b className="font-bold text-ink">গরম ভাপা ও চিতই পিঠায়</b> ঝোলা গুড়
        পড়তেই জমে ওঠে আসর।
      </>
    ),
    img: "/images/story/step-5-evening-v2.webp",
    video: "/videos/story-5-evening-v2.mp4",
    alt: "সন্ধ্যা ৭টায় হারিকেনের আলোয় নকশী কাঁথার পাশে বসে বাচ্চা ও দাদি-মা গরম ভাপা ও চিতই পিঠায় ঝোলা গুড় ঢেলে উৎসব করছেন",
  },
];


/**
 * Cinemagraph video that only downloads + plays when it comes near the viewport
 * (poster shows instantly), and pauses again when scrolled away — keeps first load light.
 */
function LazyLoopVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (typeof IntersectionObserver === "undefined") { setNear(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); v.play().catch(() => {}); }
      else if (!v.paused) v.pause();
    }, { rootMargin: "200px 0px" });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      autoPlay={near}
      loop
      muted
      playsInline
      preload={near ? "auto" : "none"}
      poster={poster}
      aria-label={label}
      className={className}
      src={near ? src : undefined}
    />
  );
}

function KanthaVine({ side }: { side: "left" | "right" }) {
  const isRight = side === "right";
  return (
    <svg
      viewBox="0 0 30 300"
      className={`pointer-events-none absolute top-1/2 h-[250px] w-[26px] -translate-y-1/2 opacity-85 ${isRight ? "right-1.5 -scale-x-100" : "left-1.5"
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
      className="floral-bg relative mx-auto w-full max-w-[480px] px-4 pb-8 pt-7"
      style={{ overflowX: "clip" }}
    >
      {/* ================= PROTECTED SECTION 1: CHAPTER COVER (LEGACY FONTS LOCKED) ================= */}
      <div className="relative z-10">
        <div className="story-cover-legacy kantha relative overflow-hidden rounded-none bg-sand text-center">
          <svg className="block h-6 w-full" aria-hidden="true">
            <rect width="100%" height="100%" fill="url(#g-band)" />
          </svg>
          <KanthaVine side="left" />
          <KanthaVine side="right" />
          <div className="px-7 pb-4 pt-4">
            <p className="text-[18px] leading-none text-gur" aria-hidden="true">
              ❦
            </p>
            <p className="mt-1.5 text-[12px] font-bold tracking-wide text-gur">
              সকাল থেকে রাত — আমাদের গুড়ের একটি দিন
            </p>
            <h2 className="serif mt-1.5 text-[21px] font-extrabold leading-[1.32] sm:text-[23px]">
              ভোর ৪টার খেজুর রস থেকে সন্ধ্যার পিঠার আসর
            </h2>
            <p className="serif mt-1.5 text-[13px] font-semibold italic text-clay">
              দাদি-নানির আমলের গ্রামবাংলার আবহে
            </p>
            <p className="mx-auto mt-1.5 max-w-[330px] text-[13.5px] leading-[1.6] text-ink/75">
              গুড় আমাদের কাছে শুধু মিষ্টি নয় — গাছির কুয়াশা ভোর, তাফালের ধোঁয়া, দাদির ঢেঁকি আর এক পাটিতে বসা পুরো পরিবারের গল্প।
            </p>
            <a
              href="#process-grid"
              className="mt-2.5 inline-flex flex-col items-center text-[12px] font-semibold text-gur"
            >
              <span>স্ক্রল করে গল্পে ঢুকুন</span>
              <span className="nudge text-[18px] leading-none" aria-hidden="true">
                ⌄
              </span>
            </a>
          </div>
          <svg className="block h-6 w-full" aria-hidden="true">
            <rect width="100%" height="100%" fill="url(#g-band)" />
          </svg>
        </div>
      </div>

      {/* ================= CONCEPT-STYLE PAVED VILLAGE ROAD STORYTELLING WITH LIVING VIDEOS ================= */}
      <div id="process-grid" className="relative z-10 mt-8">
        {/* Storybook Editorial Heading */}
        <div className="text-center">
          <p className="text-[12px] font-bold tracking-wide text-leaf">
            সেই দিনের গল্প
          </p>
          <h2 className="serif mt-0.5 text-[27px] font-black leading-tight text-[#6E2A12] sm:text-[31px]">
            চলুন, ফিরে যাই গ্রামে
          </h2>
          <p className="mt-1 text-[13.5px] font-medium text-[#8B532B]">
            ভোর ৪টার প্রথম রস থেকে সন্ধ্যা ৭টার পিঠার আসরে
          </p>
        </div>

        {/* Dawn-to-Night Gramin Kantha Thread & Khejur-Lata Vine Trail (Zero Highway Road) */}
        <div className="relative mt-6 pb-2 pt-3">
          {/* Whisper-Light Alpona Floral Canvas Texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{ color: "#B85D19" }}
            aria-hidden="true"
          >
            <svg className="h-full w-full">
              <defs>
                <pattern id="story-road-alpona" width="120" height="120" patternUnits="userSpaceOnUse">
                  <use href="#s-alpona" x="12" y="12" width="96" height="96" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#story-road-alpona)" />
            </svg>
          </div>

          {/* Soft sunlight glow along the story path (no line): blurred in screen space so it stays round at every width */}
          <svg
            viewBox="0 0 100 500"
            preserveAspectRatio="none"
            className="story-sun-glow pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="story-sun-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F2C46B" />
                <stop offset="50%" stopColor="#EBA445" />
                <stop offset="100%" stopColor="#D98A4A" />
              </linearGradient>
            </defs>
            <path
              d="M 42 12 C 66 34, 68 72, 54 110 C 38 150, 34 182, 46 214 C 64 248, 68 282, 54 322 C 38 362, 34 402, 46 444 C 54 470, 52 484, 46 492"
              fill="none"
              stroke="url(#story-sun-grad)"
              strokeOpacity="0.62"
              strokeWidth="22"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 42 12 C 66 34, 68 72, 54 110 C 38 150, 34 182, 46 214 C 64 248, 68 282, 54 322 C 38 362, 34 402, 46 444 C 54 470, 52 484, 46 492"
              fill="none"
              stroke="#FFF4DA"
              strokeOpacity="0.85"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="relative z-10 space-y-6">
            {STORY_STEPS.map((step, idx) => {
              const isReversed = idx % 2 === 1;
              const isSelected = activeStep === idx;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveStep(idx);
                    }
                  }}
                  aria-pressed={isSelected}
                  className={`grid w-full cursor-pointer items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-clay min-[375px]:gap-3 sm:gap-3.5 ${isReversed
                    ? "grid-cols-[1fr_156px] min-[375px]:grid-cols-[1fr_170px] sm:grid-cols-[1fr_184px]"
                    : "grid-cols-[156px_1fr] min-[375px]:grid-cols-[170px_1fr] sm:grid-cols-[184px_1fr]"
                    }`}
                >
                  {/* Bengal Khilan Arch Portal (খিলান-পট) Living Cinemagraph Video Stage */}
                  <div
                    className={`relative pt-2.5 ${isReversed ? "order-2" : "order-1"}`}
                  >
                    {/* Tiny Centered Alpona Lotus-Drop Crown Finial */}
                    <svg
                      viewBox="0 0 28 12"
                      className="pointer-events-none mx-auto -mb-1 h-3 w-7"
                      aria-hidden="true"
                    >
                      <path
                        d="M14,1 C16,5 18,8 14,11 C10,8 12,5 14,1Z"
                        fill="#9E3B24"
                      />
                      <path
                        d="M14,10 Q8,6 5,9 Q9,12 14,10Z M14,10 Q20,6 23,9 Q19,12 14,10Z"
                        fill="#2D5A3C"
                      />
                    </svg>

                    <div
                      className={`story-khilan-arch p-[4px] transition-colors duration-200 ${
                        isSelected ? "border-[#B85D19] bg-[#F7E5C4]" : ""
                      }`}
                    >
                      <div className="story-khilan-inner relative aspect-[6/7] w-full overflow-hidden bg-sand/70">
                        <LazyLoopVideo
                          src={step.video}
                          poster={step.img}
                          label={step.alt}
                          className="pointer-events-none block h-full w-full scale-[1.02] object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stitched Heritage .rd-card + Flat Prohor Crest .rd-node */}
                  <div
                    className={`relative pt-4 ${isReversed ? "order-1" : "order-2"}`}
                  >
                    {/* Terracotta Prohor Seal Perched Along Vine Path */}
                    <div
                      className={`rd-node lit absolute left-1/2 top-0 z-20 -translate-x-1/2 ${
                        isSelected ? "scale-[1.1] ring-2 ring-[#E68E16]/70" : ""
                      }`}
                    >
                      {step.num}
                    </div>

                    <div
                      className={`rd-card rounded-[6px] px-3 pb-3 pt-5 text-center transition-colors duration-200 ${
                        isSelected ? "border-[#C66C24]" : ""
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-center gap-1">
                        <span className="rounded bg-[#F4E3C3] px-1.5 py-0.5 text-[10px] font-extrabold tracking-wide text-[#7E3114]">
                          {step.time}
                        </span>
                        <span className="text-[10.5px] font-extrabold tracking-wide text-leaf">
                          · {step.tag}
                        </span>
                      </div>

                      <h3 className="serif mt-1 text-[14.5px] font-black leading-[1.3] text-[#6E2A12] min-[375px]:text-[15px] sm:text-[16px]">
                        {step.title}
                      </h3>

                      <p className="mt-1 text-[11px] font-medium leading-[1.5] text-ink/75 min-[375px]:text-[11.5px]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closing Stamp */}
        <div className="mt-6 text-center">
          <p className="text-[16px] leading-none text-gur" aria-hidden="true">
            ✻
          </p>
          <p className="font-artisan mt-1 text-[15px] text-clay">
            গল্পটা শেষ নয়, স্মৃতিটা বেঁচে আছে
          </p>
        </div>
      </div>
    </section>
  );
}
