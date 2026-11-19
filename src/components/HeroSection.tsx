"use client";

import React, { useEffect, useState } from "react";

export function HeroSection() {
  const [useWebpFallback, setUseWebpFallback] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent;
    const isAppleSafari =
      /Safari/i.test(ua) &&
      !/Chrome|Chromium|CriOS|Edg|EdgiOS|EdgA|Firefox|FxiOS|OPR|Android/i.test(ua);
    if (isAppleSafari) {
      setUseWebpFallback(true);
    }
  }, []);

  return (
    <section className="relative h-[100svh] max-h-[880px] min-h-[590px] w-full overflow-hidden px-4 pb-6 pt-3.5 sm:pb-9 sm:pt-4">
      <div className="relative mx-auto flex h-full w-full max-w-[480px] flex-col justify-between">
        {/* Subtle Background Folk Watermarks */}
        <svg
          className="wm alt"
          style={{ left: -60, bottom: 30, width: 170, height: 170 }}
          aria-hidden="true"
        >
          <use href="#s-khejur" />
        </svg>

        {/* 1. CLEAN BRAND & PRODUCT TITLE */}
        <div className="relative z-10 flex-none text-center">
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-[1px] w-5 bg-gur/45 sm:w-7" aria-hidden="true" />
            <span className="logo-shine">
              <img
                src="/images/brand/shahin-emart-logo.webp"
                alt="Shahin E Mart · শাহিন ই মার্ট, রাজশাহী"
                width={840}
                height={303}
                decoding="async"
                fetchPriority="high"
                className="block h-[40px] w-auto select-none sm:h-[46px]"
              />
            </span>
            <span className="h-[1px] w-5 bg-gur/45 sm:w-7" aria-hidden="true" />
          </div>

          <h1 className="font-display mt-0.5 text-[31px] font-black leading-[1.16] tracking-tight text-ink sm:text-[38px]">
            খাঁটি খেজুরের{" "}
            <span className="gurtext relative inline-block">
              গুড়
            </span>
          </h1>

          <p className="mt-1 text-[12.5px] font-medium text-ink/75 sm:text-[13.5px]">
            ভোর ৪টার প্রথম রস ·{" "}
            <span className="hl-key">০% চিনি ও হাইড্রোজ</span>
          </p>
        </div>

        {/* 2. BORDERLESS TRANSPARENT POURING VIDEO (ELASTIC 1ST-SCREEN FIT + 4-SIDE SMOKE) */}
        <div className="relative z-10 my-1 flex min-h-0 flex-1 items-center justify-center">
          {/* Alpona watermark sitting softly behind the poured গুড় lettering */}
          <div
            className="pointer-events-none absolute left-1/2 top-[47%] z-0 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 sm:h-[300px] sm:w-[300px]"
            aria-hidden="true"
          >
            <svg className="wm-center h-full w-full">
              <use href="#s-alpona" />
            </svg>
          </div>
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
            {useWebpFallback ? (
              <img
                src="/videos/hero-gur.webp"
                alt="মাটির হাঁড়ি থেকে সোনালি খেজুরের গুড় গড়িয়ে পড়ছে ভাপা ও চিতই পিঠায়"
                className="hero-video-smokey pointer-events-none block h-full w-auto max-w-full select-none object-contain"
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onError={() => setUseWebpFallback(true)}
                aria-label="মাটির হাঁড়ি থেকে সোনালি খেজুরের গুড় গড়িয়ে পড়ছে ভাপা ও চিতই পিঠায়"
                className="hero-video-smokey pointer-events-none block h-full w-auto max-w-full select-none object-contain"
              >
                <source src="/videos/hero-gur.webm" type="video/webm" />
              </video>
            )}
          </div>
        </div>

        {/* 3. SIGNATURE HIGHLIGHT + HERITAGE HOOK LINE + FLAT TWO-TONE ORDER BUTTON + SCROLL CUE */}
        <div className="relative z-10 flex-none text-center">
          <div className="mb-1.5 flex flex-wrap items-center justify-center gap-1.5 text-[12px] leading-snug sm:mb-2 sm:text-[13px]">
            <span className="hl-pill px-2.5 py-[2px]">ঝোলা গুড় ও পাটালি</span>
            <span className="font-bold text-ink">— চিনি নেই, ভেজাল নেই</span>
          </div>

          <p className="mx-auto max-w-[335px] text-[12.5px] font-medium leading-[1.54] text-ink/80 sm:text-[13.5px]">
            দাদি-নানির আমলের{" "}
            <span className="hl-mark">আসল ঘ্রাণের গুড়</span> — সরাসরি{" "}
            <b className="font-bold text-ink">রাজশাহীর তাফাল</b> থেকে,{" "}
            <b className="font-extrabold text-leaf">পণ্য হাতে পেয়ে টাকা</b>।
          </p>

          <div className="mt-2.5 flex justify-center sm:mt-3">
            <a
              id="hero-order-cta"
              href="#combo"
              className="btn-shitrongo inline-flex h-[40px] items-center justify-center px-8 text-[14.5px] font-black tracking-[-0.01em] focus:outline-none focus-visible:ring-2 focus-visible:ring-clay sm:h-[44px] sm:px-9 sm:text-[15.5px]"
            >
              <span>এখুনি অর্ডার করুন</span>
            </a>
          </div>

          <a
            href="#truth-hook"
            className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-bold text-gur sm:mt-2.5 sm:text-[12px]"
          >
            <span>কেন আমাদের গুড় আলাদা? নিচে দেখুন</span>
            <span className="nudge text-[14px] leading-none">⌄</span>
          </a>
        </div>
      </div>
    </section>
  );
}
