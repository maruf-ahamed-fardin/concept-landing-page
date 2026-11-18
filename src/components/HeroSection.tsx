"use client";

import React from "react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-4 pb-24 pt-5">
      {/* Subtle Background Folk Watermarks */}
      <svg
        className="wm"
        style={{ right: -70, top: -10, width: 200, height: 200 }}
        aria-hidden="true"
      >
        <use href="#s-alpona" />
      </svg>
      <svg
        className="wm alt"
        style={{ left: -60, bottom: 30, width: 170, height: 170 }}
        aria-hidden="true"
      >
        <use href="#s-khejur" />
      </svg>

      {/* 1. CLEAN BRAND & PRODUCT TITLE (No Navbar, No Clutter) */}
      <div className="relative z-10 text-center">
        <p className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.14em] text-gur uppercase">
          <span className="h-[1px] w-5 bg-gur/45" aria-hidden="true" />
          <span>শাহিন ই মার্ট · রাজশাহী</span>
          <span className="h-[1px] w-5 bg-gur/45" aria-hidden="true" />
        </p>

        <h1 className="serif mt-1.5 text-[36px] font-black leading-[1.24] tracking-tight text-ink sm:text-[42px]">
          খাঁটি খেজুরের{" "}
          <span className="gurtext relative inline-block">
            গুড়
          </span>
        </h1>

        <p className="mt-1.5 text-[14px] font-semibold text-ink/70">
          ভোর ৪টার প্রথম রস ·{" "}
          <span className="text-clay">০% চিনি ও হাইড্রোজ</span>
        </p>
      </div>

      {/* 2. HIGHLIGHTED HERO GIF / VIDEO SHOWCASE (Clean & Uncluttered) */}
      <div className="relative z-10 my-3">
        <figure
          className="gifvid relative aspect-[4/4.2] w-full rounded-[28px] border border-[#E5C999] shadow-[0_26px_54px_-26px_rgba(59,31,14,0.68)]"
          data-gif
        >
          {/* Optional real video/GIF slot (auto-plays seamlessly over SVG fallback when src is added) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            data-src=""
          />

          {/* Minimal single subtle badge */}
          <span className="gifpill">
            <i />
            LIVE · তাজা তাফালের গুড়
          </span>

          {/* Highlighted Animated SVG Cinemagraph Scene */}
          <svg
            className="scene"
            viewBox="0 0 400 420"
            role="img"
            aria-label="মাটির হাঁড়ি থেকে সোনালি ঝোলা গুড় গড়িয়ে পড়ছে ধোঁয়া ওঠা ভাপা ও চিতই পিঠায়"
          >
            <defs>
              <linearGradient id="h-bg-clean" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FDF1DC" />
                <stop offset=".6" stopColor="#F6E1C0" />
                <stop offset="1" stopColor="#E9C796" />
              </linearGradient>
              <radialGradient id="h-sun-clean" cx=".85" cy=".1" r=".55">
                <stop offset="0" stopColor="#FFE3A0" />
                <stop offset="1" stopColor="#FFE3A0" stopOpacity="0" />
              </radialGradient>
              <clipPath id="h-txtclip-clean">
                <text
                  x="215"
                  y="246"
                  textAnchor="middle"
                  fontFamily="'Noto Serif Bengali', serif"
                  fontWeight="800"
                  fontSize="132"
                >
                  গুড়
                </text>
              </clipPath>
            </defs>

            <rect width="400" height="420" fill="url(#h-bg-clean)" />
            <rect width="400" height="420" fill="url(#h-sun-clean)" />
            <use
              href="#s-khejur"
              x="290"
              y="-14"
              width="135"
              height="135"
              style={{ color: "#2D5A3C" }}
              opacity=".2"
            />
            <use
              href="#s-alpona"
              x="295"
              y="225"
              width="125"
              height="125"
              style={{ color: "#B85D19" }}
              opacity=".1"
            />
            <ellipse className="fog" cx="120" cy="48" rx="145" ry="15" fill="#fff" opacity=".45" />
            <ellipse
              className="fog fog-b"
              cx="315"
              cy="128"
              rx="108"
              ry="12"
              fill="#fff"
              opacity=".35"
            />

            {/* Brass Thala */}
            <ellipse cx="215" cy="396" rx="168" ry="26" fill="#3B1F0E" opacity=".12" />
            <ellipse cx="215" cy="382" rx="162" ry="32" fill="url(#g-brass)" />
            <ellipse cx="215" cy="380" rx="140" ry="24" fill="#E9C46E" />
            <ellipse
              cx="215"
              cy="380"
              rx="124"
              ry="20"
              fill="none"
              stroke="#B88A2E"
              strokeWidth="1.5"
              strokeDasharray="3 4"
            />

            {/* Chitoi Pitha */}
            <ellipse cx="124" cy="368" rx="48" ry="12" fill="#E3CCA3" />
            <ellipse cx="124" cy="365.5" rx="48" ry="11" fill="#F4E6CB" />
            <ellipse cx="168" cy="382" rx="54" ry="13" fill="#E3CCA3" />
            <ellipse cx="168" cy="379.5" rx="54" ry="12" fill="#F7EBD4" />
            <path
              d="M128,379 q10,-7 20,0 t20,0 t20,0"
              stroke="url(#g-gurh)"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Bhapa Pitha */}
            <ellipse cx="298" cy="368" rx="52" ry="14" fill="#E2D0AE" />
            <path d="M246,366 C250,324 346,324 350,366 Z" fill="url(#g-pitha)" />
            <path
              className="pool"
              d="M270,338 C282,326 316,326 328,338 C322,346 310,340 304,353 C298,344 290,348 286,357 C282,346 274,346 270,338Z"
              fill="url(#g-gur)"
            />
            <ellipse cx="290" cy="333" rx="9" ry="2.4" fill="#FFE6A8" opacity=".75" />

            {/* Steam */}
            <g fill="none" stroke="#fff" strokeWidth="4.8" strokeLinecap="round">
              <path className="steam" d="M274,326 c-8,-12 8,-20 0,-34 c-6,-10 6,-18 0,-28" />
              <path className="steam s2" d="M322,328 c-8,-12 8,-20 0,-34 c-6,-10 6,-18 0,-28" />
              <path className="steam s3" d="M124,354 c-7,-10 7,-17 0,-29 c-5,-9 5,-15 0,-24" />
            </g>

            {/* Wooden Spoon */}
            <path
              d="M238,292 L88,320"
              stroke="url(#g-wood)"
              strokeWidth="9.5"
              strokeLinecap="round"
            />
            <g transform="rotate(-8 264 286)">
              <ellipse cx="264" cy="286" rx="30" ry="10.5" fill="#8A5A30" />
              <ellipse className="pool" cx="264" cy="284" rx="25" ry="7" fill="url(#g-gur)" />
            </g>

            {/* Spoon to Bhapa Stream */}
            <path
              d="M290,283 C300,295 304,314 300,334"
              stroke="url(#g-gurv)"
              strokeWidth="6.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              className="flow"
              d="M290,284 C300,295 304,314 300,333"
              stroke="#FFE3A0"
              strokeWidth="2"
              opacity=".85"
              fill="none"
              strokeLinecap="round"
            />

            {/* গুড় Lettering */}
            <text
              x="219"
              y="252"
              textAnchor="middle"
              fontFamily="'Noto Serif Bengali', serif"
              fontWeight="800"
              fontSize="132"
              fill="#3B1F0E"
              opacity=".14"
            >
              গুড়
            </text>
            <text
              x="215"
              y="246"
              textAnchor="middle"
              fontFamily="'Noto Serif Bengali', serif"
              fontWeight="800"
              fontSize="132"
              fill="url(#g-gurtext)"
              stroke="#6B2E0C"
              strokeWidth="2.5"
              paintOrder="stroke"
            >
              গুড়
            </text>
            <g clipPath="url(#h-txtclip-clean)">
              <g transform="skewX(-18)">
                <rect
                  className="shine"
                  x="-40"
                  y="100"
                  width="42"
                  height="210"
                  fill="#FFF6DA"
                  opacity=".55"
                />
              </g>
            </g>
            <path
              d="M150,164 Q215,158 296,162"
              stroke="url(#g-gurh)"
              strokeWidth="6.5"
              fill="none"
              strokeLinecap="round"
              opacity=".95"
            />
            <g fill="url(#g-gur)">
              <path
                className="hang"
                d="M192,163 c3,0 4,7 4,13 c0,5 -8,5 -8,0 c0,-6 1,-13 4,-13z"
              />
              <path
                className="hang h2"
                d="M238,160 c3,0 4,8 4,15 c0,5 -8,5 -8,0 c0,-7 1,-15 4,-15z"
              />
              <path
                className="hang h3"
                d="M280,161 c3,0 4,6 4,11 c0,5 -8,5 -8,0 c0,-5 1,-11 4,-11z"
              />
            </g>

            {/* Drops Text -> Spoon */}
            <g fill="#D98A2B">
              <ellipse
                className="drop"
                cx="262"
                cy="252"
                rx="3.8"
                ry="4.8"
                style={{ ["--d" as string]: "30px" }}
              />
              <ellipse
                className="drop d2"
                cx="262"
                cy="252"
                rx="3.2"
                ry="4.2"
                style={{ ["--d" as string]: "30px" }}
              />
            </g>

            {/* Tilted Rosher Hari */}
            <g transform="translate(92,86) rotate(115) scale(0.92)">
              <g className="rock">
                <path
                  d="M-34,-40 C-64,-30 -68,22 -46,42 C-28,60 28,60 46,42 C68,22 64,-30 34,-40 Z"
                  fill="url(#g-clay)"
                />
                <path d="M-25,-40 L-27,-50 L27,-50 L25,-40 Z" fill="#8E3A1E" />
                <ellipse
                  cx="0"
                  cy="-52"
                  rx="31"
                  ry="7.5"
                  fill="#B5562F"
                  stroke="#6E2614"
                  strokeWidth="2"
                />
                <ellipse cx="0" cy="-52" rx="24" ry="4.5" fill="#7A3410" />
                <path
                  d="M-58,-4 Q0,12 58,-4"
                  stroke="#F4E9D8"
                  strokeOpacity=".55"
                  strokeWidth="2.2"
                  strokeDasharray="2 5"
                  fill="none"
                />
                <ellipse cx="22" cy="-6" rx="7" ry="22" fill="#fff" opacity=".14" />
              </g>
            </g>

            {/* Pot -> Text Stream */}
            <path
              d="M128,124 C146,132 162,144 166,164"
              stroke="url(#g-gurv)"
              strokeWidth="11"
              fill="none"
              strokeLinecap="round"
            />
            <path
              className="flow"
              d="M131,125 C147,132 161,144 164,162"
              stroke="#FFE7A8"
              strokeWidth="2.8"
              fill="none"
              strokeLinecap="round"
              opacity=".85"
            />
            <ellipse className="splash" cx="166" cy="165" rx="9" ry="2.8" fill="#F2B44A" />
          </svg>
        </figure>
      </div>

      {/* 3. CLEAN HOOK LINE + PRIMARY CTA + SCROLL CUE */}
      <div className="relative z-10 text-center">
        <p className="mx-auto max-w-[340px] text-[14.5px] font-medium leading-[1.6] text-ink/80">
          দাদি-নানির আমলের{" "}
          <b className="font-bold text-clay">আসল ঘ্রাণের গুড়</b> — সরাসরি রাজশাহীর তাফাল থেকে, পণ্য হাতে পেয়ে টাকা।
        </p>

        <div className="mt-3.5 flex items-center gap-2.5">
          <a
            href="#combo"
            className="btn-main flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl text-[16px] font-bold"
          >
            <span>গুড়ের সম্ভার দেখুন</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <a
          href="#truth-hook"
          className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-bold text-gur/90"
        >
          <span>কেন আমাদের গুড় আলাদা? নিচে দেখুন</span>
          <span className="nudge text-[14px] leading-none">⌄</span>
        </a>
      </div>
    </section>
  );
}
