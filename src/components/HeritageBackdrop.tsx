"use client";

import React from "react";

/**
 * Handcrafted Bengal Nakshi Kantha Stitch Medallion (Shoto-Dol Padma & Songbird)
 * Drawn purely as fine etched embroidery stitches directly onto the canvas (zero square cloth boxes).
 */
function PadmaKanthaMedallion({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 260"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Outer dashed circular phor ring */}
      <circle cx="130" cy="130" r="118" stroke="#9E3B24" strokeOpacity="0.16" strokeWidth="1.2" strokeDasharray="4 4" />
      <circle cx="130" cy="130" r="110" stroke="#B85D19" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="2 5" />

      {/* Outer alternating sage diamonds + stitched arcs */}
      {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => (
        <g key={deg} transform={`rotate(${deg} 130 130)`}>
          <path
            d="M130,22 C137,35 137,46 130,54 C123,46 123,35 130,22Z"
            stroke="#9E3B24"
            strokeOpacity="0.20"
            strokeWidth="1.35"
            strokeDasharray="3.2 2"
          />
          <path
            d="M130,30 L130,48"
            stroke="#2D5A3C"
            strokeOpacity="0.18"
            strokeWidth="1.1"
            strokeDasharray="2 2"
          />
          <circle cx="130" cy="16" r="2" fill="#B85D19" fillOpacity="0.22" />
        </g>
      ))}

      {/* Inner 16-petal lotus crown & kalka seed stippling */}
      {Array.from({ length: 16 }, (_, i) => i * 22.5).map((deg) => (
        <g key={deg} transform={`rotate(${deg} 130 130)`}>
          <path
            d="M130,64 C135,74 135,84 130,90 C125,84 125,74 130,64Z"
            stroke="#B85D19"
            strokeOpacity="0.22"
            strokeWidth="1.25"
            strokeDasharray="2.5 2"
          />
        </g>
      ))}

      <circle cx="130" cy="130" r="34" stroke="#2D5A3C" strokeOpacity="0.20" strokeWidth="1.3" strokeDasharray="3 3" />
      <circle cx="130" cy="130" r="24" stroke="#9E3B24" strokeOpacity="0.22" strokeWidth="1.2" strokeDasharray="2 2.5" />
      <circle cx="130" cy="130" r="10" stroke="#B85D19" strokeOpacity="0.25" strokeWidth="1.35" />
      <circle cx="130" cy="130" r="3.5" fill="#9E3B24" fillOpacity="0.22" />
    </svg>
  );
}

/**
 * Etched Nakshi Kantha River Boat, Kalka & Khejur Vine Corner Motif
 * Rendered directly in fine running-stitch thread outlines on the parchment surface.
 */
function VillageBoatKanthaEtch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 260"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Concentric scalloped kantha ripple aura */}
      <circle cx="130" cy="130" r="116" stroke="#1E435A" strokeOpacity="0.14" strokeWidth="1.2" strokeDasharray="4 4" />
      <circle cx="130" cy="130" r="105" stroke="#9E3B24" strokeOpacity="0.13" strokeWidth="1" strokeDasharray="2 5" />

      {/* Traditional Bengali Paltola Nouka in indigo + terracotta threadwork */}
      <path
        d="M58,154 Q130,174 202,152 Q184,174 130,176 Q76,174 58,154 Z"
        stroke="#1E435A"
        strokeOpacity="0.24"
        strokeWidth="1.6"
        strokeDasharray="4 2.5"
      />
      {/* Boat Chhai (Bamboo Hood) & Sail */}
      <path
        d="M100,156 C104,132 136,132 142,156"
        stroke="#9E3B24"
        strokeOpacity="0.22"
        strokeWidth="1.4"
        strokeDasharray="3 2"
      />
      <path d="M126,136 L126,68" stroke="#1E435A" strokeOpacity="0.22" strokeWidth="1.6" />
      <path
        d="M126,74 C166,80 176,118 128,130 Z"
        stroke="#B85D19"
        strokeOpacity="0.24"
        strokeWidth="1.5"
        strokeDasharray="3.5 2.5"
      />
      <path d="M134,88 L156,92 M134,100 L158,104 M134,112 L152,115" stroke="#9E3B24" strokeOpacity="0.16" strokeWidth="1.1" strokeDasharray="2 3" />

      {/* River Waves with Dotted Water Kantha Stitches */}
      <path d="M46,184 Q72,176 98,184 T150,184 T208,184" stroke="#1E435A" strokeOpacity="0.18" strokeWidth="1.25" strokeDasharray="4 3" />
      <path d="M58,196 Q86,189 114,196 T170,196 T214,196" stroke="#2D5A3C" strokeOpacity="0.16" strokeWidth="1.1" strokeDasharray="2.5 3.5" />

      {/* Curling Corner Floral Vine & Songbird Perch */}
      <path
        d="M72,130 C52,110 56,74 88,58 M66,94 Q48,88 46,72 M78,76 Q74,56 90,46"
        stroke="#2D5A3C"
        strokeOpacity="0.18"
        strokeWidth="1.3"
        strokeDasharray="3 2.5"
      />
      <circle cx="88" cy="58" r="7" stroke="#9E3B24" strokeOpacity="0.20" strokeWidth="1.2" strokeDasharray="2 2" />
      <path
        d="M172,72 C194,88 198,118 184,136 M184,96 Q204,92 210,76"
        stroke="#2D5A3C"
        strokeOpacity="0.16"
        strokeWidth="1.25"
        strokeDasharray="3 2.5"
      />
    </svg>
  );
}

/**
 * Etched Nakshi Kantha Kalka & Ros-Hari Scene (Khejur Palms + Earthen Pot)
 */
function KhejurHariKanthaEtch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 260"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Ornate Kalka Flame Border */}
      <path
        d="M130,24 C178,24 226,64 226,130 C226,196 178,236 130,236 C82,236 34,196 34,130 C34,64 82,24 130,24 Z"
        stroke="#2D5A3C"
        strokeOpacity="0.16"
        strokeWidth="1.4"
        strokeDasharray="4 3"
      />
      <path
        d="M130,36 C172,36 214,72 214,130 C214,188 172,224 130,224 C88,224 46,188 46,130 C46,72 88,36 130,36 Z"
        stroke="#9E3B24"
        strokeOpacity="0.14"
        strokeWidth="1.1"
        strokeDasharray="2 4"
      />

      {/* Central Date Palm Silhouette in stitched khadi strokes */}
      <path
        d="M130,192 Q126,144 130,96"
        stroke="#8F4322"
        strokeOpacity="0.24"
        strokeWidth="2.2"
        strokeDasharray="4 2.5"
      />
      {/* Lush Arching Palm Fronds */}
      <path d="M130,98 Q96,72 68,86 M130,98 Q88,92 64,114 M130,98 Q104,58 84,54 M130,98 Q164,72 192,86 M130,98 Q172,92 196,114 M130,98 Q156,58 176,54" stroke="#2D5A3C" strokeOpacity="0.22" strokeWidth="1.4" strokeDasharray="3 2" />

      {/* Hanging Ras-Hari Clay Pot on Trunk */}
      <ellipse cx="110" cy="118" rx="9" ry="3" stroke="#9E3B24" strokeOpacity="0.24" strokeWidth="1.2" />
      <path
        d="M102,120 C94,126 94,142 110,144 C126,142 126,126 118,120"
        stroke="#9E3B24"
        strokeOpacity="0.24"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />

      {/* Pair of Corner Kalka Paisleys */}
      <path
        d="M72,174 C58,166 56,148 68,142 C80,138 86,154 78,166"
        stroke="#B85D19"
        strokeOpacity="0.18"
        strokeWidth="1.2"
        strokeDasharray="2.5 2"
      />
      <path
        d="M188,174 C202,166 204,148 192,142 C180,138 174,154 182,166"
        stroke="#B85D19"
        strokeOpacity="0.18"
        strokeWidth="1.2"
        strokeDasharray="2.5 2"
      />
    </svg>
  );
}

/**
 * Continuous Vertical Bengali Kantha Stitch Border Strip (`পাড়`) for wide desktop edges
 */
function VerticalKanthaSidePaarh({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-y-0 hidden w-[34px] opacity-[0.42] lg:block xl:w-[44px] ${
        side === "left" ? "left-3 xl:left-5" : "right-3 xl:right-5"
      }`}
    >
      <svg className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <pattern
            id={`kantha-vertical-paarh-${side}`}
            width="36"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            {/* Outer double running stitch rails */}
            <line x1="6" y1="0" x2="6" y2="72" stroke="#9E3B24" strokeOpacity="0.28" strokeWidth="1.2" strokeDasharray="4 4" />
            <line x1="30" y1="0" x2="30" y2="72" stroke="#9E3B24" strokeOpacity="0.28" strokeWidth="1.2" strokeDasharray="4 4" />
            {/* Center repeating Kantha lotus-diamond borfi motif */}
            <path
              d="M18,6 L26,18 L18,30 L10,18 Z"
              fill="none"
              stroke="#B85D19"
              strokeOpacity="0.26"
              strokeWidth="1.15"
              strokeDasharray="2.5 2"
            />
            <circle cx="18" cy="18" r="2.2" fill="#2D5A3C" fillOpacity="0.25" />
            <path
              d="M18,42 L25,54 L18,66 L11,54 Z"
              fill="none"
              stroke="#2D5A3C"
              strokeOpacity="0.24"
              strokeWidth="1.15"
              strokeDasharray="2.5 2"
            />
            <circle cx="18" cy="54" r="2" fill="#9E3B24" fillOpacity="0.26" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#kantha-vertical-paarh-${side})`} />
      </svg>
    </div>
  );
}

/**
 * Full-width atmospheric color grading, woven Bengal Tat light ribbons,
 * and integrated Silk-Thread Etched Nakshi Kantha Art (zero pasted paper squares).
 */
export function HeritageBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Seasonal Atmospheric Color-Grading Ambient Blooms (Serakhabar Inspired Depth, Original Gur Tones) */}
      <div
        className="absolute -left-24 -top-24 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(176, 208, 193, 0.44) 0%, rgba(176, 208, 193, 0) 70%)",
        }}
      />
      <div
        className="absolute -right-24 top-[60px] h-[540px] w-[540px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(242, 184, 78, 0.28) 0%, rgba(242, 184, 78, 0) 70%)",
        }}
      />
      <div
        className="absolute -left-20 top-[34%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(184, 93, 25, 0.14) 0%, rgba(184, 93, 25, 0) 70%)",
        }}
      />
      <div
        className="absolute -right-24 top-[48%] h-[560px] w-[560px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(169, 200, 179, 0.28) 0%, rgba(169, 200, 179, 0) 70%)",
        }}
      />
      <div
        className="absolute -left-16 top-[74%] h-[580px] w-[580px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(235, 172, 82, 0.24) 0%, rgba(235, 172, 82, 0) 72%)",
        }}
      />
      <div
        className="absolute -right-20 bottom-10 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(158, 59, 36, 0.14) 0%, rgba(158, 59, 36, 0) 72%)",
        }}
      />

      {/* 2. Subtle Woven Taant / Nakshi Light Ribbons */}
      <svg
        viewBox="0 0 1440 3200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.44]"
      >
        <g fill="none">
          <g transform="rotate(-19 720 420)">
            <rect x="-260" y="340" width="1960" height="58" fill="#2D5A3C" fillOpacity="0.065" />
            <rect x="-260" y="398" width="1960" height="22" fill="#B85D19" fillOpacity="0.065" />
            <line
              x1="-260"
              y1="350"
              x2="1700"
              y2="350"
              stroke="#FFF8EE"
              strokeOpacity="0.55"
              strokeWidth="2"
              strokeDasharray="6 9"
            />
            <line
              x1="-260"
              y1="388"
              x2="1700"
              y2="388"
              stroke="#9E3B24"
              strokeOpacity="0.18"
              strokeWidth="1.5"
              strokeDasharray="3 8"
            />
          </g>

          <g transform="rotate(14 720 1520)">
            <rect x="-260" y="1460" width="1960" height="66" fill="#C9802B" fillOpacity="0.06" />
            <rect x="-260" y="1526" width="1960" height="16" fill="#2D5A3C" fillOpacity="0.05" />
            <line
              x1="-260"
              y1="1474"
              x2="1700"
              y2="1474"
              stroke="#FFFDF9"
              strokeOpacity="0.6"
              strokeWidth="2.5"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          </g>

          <g transform="rotate(-15 720 2560)">
            <rect x="-260" y="2500" width="1960" height="56" fill="#9E3B24" fillOpacity="0.055" />
            <rect x="-260" y="2556" width="1960" height="20" fill="#1F334F" fillOpacity="0.045" />
            <line
              x1="-260"
              y1="2528"
              x2="1700"
              y2="2528"
              stroke="#F4C35E"
              strokeOpacity="0.32"
              strokeWidth="1.8"
              strokeDasharray="5 9"
            />
          </g>
        </g>
      </svg>

      {/* 3. Authentic Silk-Thread Side Paarh Borders (Desktop Outer Margins) */}
      <VerticalKanthaSidePaarh side="left" />
      <VerticalKanthaSidePaarh side="right" />

      {/* 4. Seamless Canvas-Etched Nakshi Kantha Needlepoint Artworks (No Rectangular Boxes!) */}
      {/* Desktop Top-Left Wing (Hero Band): Stitched Lotus Mandala */}
      <div
        className="kantha-etch-fade absolute top-[68px] hidden w-[290px] lg:block xl:w-[340px]"
        style={{ right: "calc(50% + 260px)" }}
      >
        <PadmaKanthaMedallion className="h-auto w-full" />
      </div>

      {/* Desktop Top-Right Wing (Hero Band): Stitched Paltola Boat & Creeper */}
      <div
        className="kantha-etch-fade absolute top-[210px] hidden w-[290px] lg:block xl:w-[340px]"
        style={{ left: "calc(50% + 260px)" }}
      >
        <VillageBoatKanthaEtch className="h-auto w-full" />
      </div>

      {/* Desktop Mid-Left Wing (Story Band): Stitched Khejur Palm & Ros-Hari */}
      <div
        className="kantha-etch-fade absolute top-[1160px] hidden w-[300px] lg:block xl:w-[350px]"
        style={{ right: "calc(50% + 265px)" }}
      >
        <KhejurHariKanthaEtch className="h-auto w-full" />
      </div>

      {/* Desktop Mid-Right Wing (Story / Receipt Band): Lotus Medallion */}
      <div
        className="kantha-etch-fade absolute top-[1560px] hidden w-[280px] rotate-12 lg:block xl:w-[330px]"
        style={{ left: "calc(50% + 270px)" }}
      >
        <PadmaKanthaMedallion className="h-auto w-full" />
      </div>

      {/* Desktop Lower-Left & Right Wings (Combo & FAQ Band) */}
      <div
        className="kantha-etch-fade absolute top-[2680px] hidden w-[290px] lg:block xl:w-[340px]"
        style={{ left: "calc(50% + 265px)" }}
      >
        <KhejurHariKanthaEtch className="h-auto w-full" />
      </div>
      <div
        className="kantha-etch-fade absolute top-[2960px] hidden w-[285px] -rotate-6 lg:block xl:w-[330px]"
        style={{ right: "calc(50% + 265px)" }}
      >
        <VillageBoatKanthaEtch className="h-auto w-full" />
      </div>
    </div>
  );
}
