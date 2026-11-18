import React from "react";

export function SvgSprites() {
  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="g-gur" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F7C964" />
            <stop offset=".5" stopColor="#DE8F2C" />
            <stop offset="1" stopColor="#9A4613" />
          </linearGradient>
          <linearGradient id="g-gurv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F6C55E" />
            <stop offset=".55" stopColor="#DA8B2A" />
            <stop offset="1" stopColor="#B35A18" />
          </linearGradient>
          <linearGradient id="g-gurh" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#C46A1E" />
            <stop offset=".5" stopColor="#F2B44A" />
            <stop offset="1" stopColor="#C46A1E" />
          </linearGradient>
          <linearGradient id="g-gurtext" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FCD77A" />
            <stop offset=".5" stopColor="#E89A34" />
            <stop offset="1" stopColor="#A04A12" />
          </linearGradient>
          <linearGradient id="g-gurflat" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#B8601C" />
            <stop offset=".35" stopColor="#E9A23C" />
            <stop offset=".55" stopColor="#F4BF5E" />
            <stop offset="1" stopColor="#C8741F" />
          </linearGradient>
          <linearGradient id="g-clay" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#CB7449" />
            <stop offset=".6" stopColor="#9E3B24" />
            <stop offset="1" stopColor="#6E2614" />
          </linearGradient>
          <linearGradient id="g-wood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#C08A57" />
            <stop offset="1" stopColor="#7A4A26" />
          </linearGradient>
          <radialGradient id="g-brass" cx=".5" cy=".35" r=".75">
            <stop offset="0" stopColor="#F7DA86" />
            <stop offset=".55" stopColor="#D3A23C" />
            <stop offset="1" stopColor="#8F6519" />
          </radialGradient>
          <radialGradient id="g-pitha" cx=".42" cy=".3" r=".8">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset=".6" stopColor="#F7EFE0" />
            <stop offset="1" stopColor="#E3D2B4" />
          </radialGradient>
          <radialGradient id="g-patali" cx=".4" cy=".35" r=".8">
            <stop offset="0" stopColor="#DB9A4C" />
            <stop offset=".6" stopColor="#A85E22" />
            <stop offset="1" stopColor="#7A3A12" />
          </radialGradient>
          <linearGradient id="g-foil" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F4F6F8" />
            <stop offset=".45" stopColor="#B9C0C7" />
            <stop offset=".7" stopColor="#E9EDF0" />
            <stop offset="1" stopColor="#9AA3AC" />
          </linearGradient>
          <radialGradient id="g-lamp" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#FFD27A" stopOpacity=".95" />
            <stop offset="1" stopColor="#FFD27A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g-fire" cx=".5" cy=".6" r=".5">
            <stop offset="0" stopColor="#FFB347" stopOpacity=".95" />
            <stop offset="1" stopColor="#FF7A1A" stopOpacity="0" />
          </radialGradient>
          <pattern id="g-weave" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="#D8B06A" />
            <path d="M0,2.5H10M0,7.5H10" stroke="#B98C46" strokeWidth="2.4" />
            <path d="M2.5,0V5M7.5,5V10" stroke="#E6C88A" strokeWidth="2" />
          </pattern>
          <pattern id="g-grain" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="#7A3E12" />
            <circle cx="4.5" cy="4" r=".9" fill="#E0A55A" />
          </pattern>
          <pattern id="g-band" width="32" height="28" patternUnits="userSpaceOnUse">
            <rect width="32" height="28" fill="#9E3B24" />
            <path
              d="M0,4.5 H32 M0,23.5 H32"
              stroke="#F4E9D8"
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />
            <path d="M16,7 L23,14 L16,21 L9,14Z" fill="#F2B44A" />
            <path d="M16,10.5 L19.5,14 L16,17.5 L12.5,14Z" fill="#9E3B24" />
            <circle cx="0" cy="14" r="2" fill="#F4E9D8" />
            <circle cx="32" cy="14" r="2" fill="#F4E9D8" />
          </pattern>
          <path id="pt-big" d="M0,-10 C7,-18 7,-30 0,-38 C-7,-30 -7,-18 0,-10Z" />
          <path id="pt-sm" d="M0,-12 C4,-17 4,-24 0,-28 C-4,-24 -4,-17 0,-12Z" />
          <circle id="pt-dot" cx="0" cy="-43.5" r="1.7" />
        </defs>

        {/* আলপনা lotus mandala */}
        <symbol id="s-alpona" viewBox="-50 -50 100 100">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle r="47.5" />
            <circle r="40" strokeDasharray="1.5 3" />
            <use href="#pt-big" />
            <use href="#pt-big" transform="rotate(45)" />
            <use href="#pt-big" transform="rotate(90)" />
            <use href="#pt-big" transform="rotate(135)" />
            <use href="#pt-big" transform="rotate(180)" />
            <use href="#pt-big" transform="rotate(225)" />
            <use href="#pt-big" transform="rotate(270)" />
            <use href="#pt-big" transform="rotate(315)" />
            <use href="#pt-sm" transform="rotate(22.5)" />
            <use href="#pt-sm" transform="rotate(67.5)" />
            <use href="#pt-sm" transform="rotate(112.5)" />
            <use href="#pt-sm" transform="rotate(157.5)" />
            <use href="#pt-sm" transform="rotate(202.5)" />
            <use href="#pt-sm" transform="rotate(247.5)" />
            <use href="#pt-sm" transform="rotate(292.5)" />
            <use href="#pt-sm" transform="rotate(337.5)" />
            <circle r="10" />
            <circle r="5.5" />
          </g>
          <g fill="currentColor">
            <circle r="2" />
            <use href="#pt-dot" />
            <use href="#pt-dot" transform="rotate(22.5)" />
            <use href="#pt-dot" transform="rotate(45)" />
            <use href="#pt-dot" transform="rotate(67.5)" />
            <use href="#pt-dot" transform="rotate(90)" />
            <use href="#pt-dot" transform="rotate(112.5)" />
            <use href="#pt-dot" transform="rotate(135)" />
            <use href="#pt-dot" transform="rotate(157.5)" />
            <use href="#pt-dot" transform="rotate(180)" />
            <use href="#pt-dot" transform="rotate(202.5)" />
            <use href="#pt-dot" transform="rotate(225)" />
            <use href="#pt-dot" transform="rotate(247.5)" />
            <use href="#pt-dot" transform="rotate(270)" />
            <use href="#pt-dot" transform="rotate(292.5)" />
            <use href="#pt-dot" transform="rotate(315)" />
            <use href="#pt-dot" transform="rotate(337.5)" />
          </g>
        </symbol>

        {/* মাটির রসের হাঁড়ি */}
        <symbol id="s-hari" viewBox="0 0 100 100">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <ellipse cx="50" cy="20" rx="20" ry="5" />
            <path d="M34,22 L36,30 C14,38 10,70 26,84 C38,94 62,94 74,84 C90,70 86,38 64,30 L66,22" />
            <path d="M36,30 Q50,34 64,30" />
            <path d="M20,50 Q50,61 80,50" strokeDasharray="3 3" />
            <path d="M17,64 Q50,75 83,64" />
            <path d="M40,26 L30,6 M60,26 L70,6 M30,6 Q50,-2 70,6" />
          </g>
        </symbol>

        {/* খেজুর পাতা */}
        <symbol id="s-khejur" viewBox="0 0 100 100">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8,96 Q46,58 94,6" strokeWidth="2.6" />
            <path d="M19.6,84.3 l-7,-20 M19.6,84.3 l20,7 M27.6,76.1 l-7,-21 M27.6,76.1 l21,7 M35.8,67.7 l-7,-20 M35.8,67.7 l20,7 M44.2,59 l-6,-19 M44.2,59 l19,6 M52.8,50 l-6,-17 M52.8,50 l17,6 M61.6,40.7 l-5,-15 M61.6,40.7 l15,5 M70.6,31.1 l-4,-13 M70.6,31.1 l13,4 M79.8,21.3 l-3,-10 M79.8,21.3 l10,3 M87.3,13.2 l-2,-7 M87.3,13.2 l7,2" />
          </g>
        </symbol>

        {/* বাঁশের কুলা */}
        <symbol id="s-kula" viewBox="0 0 100 100">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M10,30 Q50,16 90,30 L96,72 Q50,100 4,72Z" strokeWidth="2.6" />
            <path
              d="M9,42 Q50,30 91,42 M7,54 Q50,44 93,54 M6,64 Q50,58 94,64 M8,75 Q50,76 92,75"
              strokeWidth="1.2"
            />
            <path
              d="M24,24 L18,82 M38,20 L34,88 M50,18 V90 M62,20 L66,88 M76,24 L82,82"
              strokeWidth="1.2"
            />
          </g>
        </symbol>

        {/* কাঁসার থালা */}
        <symbol id="s-thala" viewBox="-50 -50 100 100">
          <g fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle r="47" />
            <circle r="40" />
            <circle r="31" strokeDasharray="2 3" />
            <circle r="8" />
            <use href="#pt-sm" transform="rotate(0)" />
            <use href="#pt-sm" transform="rotate(45)" />
            <use href="#pt-sm" transform="rotate(90)" />
            <use href="#pt-sm" transform="rotate(135)" />
            <use href="#pt-sm" transform="rotate(180)" />
            <use href="#pt-sm" transform="rotate(225)" />
            <use href="#pt-sm" transform="rotate(270)" />
            <use href="#pt-sm" transform="rotate(315)" />
          </g>
        </symbol>

        {/* নকশী লতা (MUST match 3rd image chapter cover) */}
        <symbol id="s-vine" viewBox="0 0 30 300">
          <path
            d="M15,0 C2,30 28,60 15,90 C2,120 28,150 15,180 C2,210 28,240 15,270 C10,282 15,300 15,300"
            fill="none"
            stroke="#2D5A3C"
            strokeWidth="1.6"
          />
          <g fill="#2D5A3C" opacity=".85">
            <path d="M9,30 q-9,-6 -8,-16 q8,4 8,16Z" />
            <path d="M21,62 q9,-6 8,-16 q-8,4 -8,16Z" />
            <path d="M9,120 q-9,-6 -8,-16 q8,4 8,16Z" />
            <path d="M21,152 q9,-6 8,-16 q-8,4 -8,16Z" />
            <path d="M9,210 q-9,-6 -8,-16 q8,4 8,16Z" />
            <path d="M21,242 q9,-6 8,-16 q-8,4 -8,16Z" />
          </g>
          <g fill="#B85D19">
            <circle cx="15" cy="90" r="3.4" />
            <circle cx="15" cy="180" r="3.4" />
            <circle cx="15" cy="270" r="3.4" />
          </g>
          <g fill="#F2B44A">
            <circle cx="15" cy="90" r="1.3" />
            <circle cx="15" cy="180" r="1.3" />
            <circle cx="15" cy="270" r="1.3" />
          </g>
        </symbol>
      </svg>

      {/* Desktop-only ambient folk watermarks */}
      <svg
        className="wm hidden lg:block"
        style={{ position: "fixed", left: "3vw", top: "12vh", width: 260, height: 260 }}
      >
        <use href="#s-alpona" />
      </svg>
      <svg
        className="wm alt hidden lg:block"
        style={{ position: "fixed", right: "4vw", bottom: "14vh", width: 240, height: 240 }}
      >
        <use href="#s-khejur" />
      </svg>
      <svg
        className="wm hidden lg:block"
        style={{ position: "fixed", right: "6vw", top: "10vh", width: 180, height: 180 }}
      >
        <use href="#s-hari" />
      </svg>
      <svg
        className="wm alt hidden lg:block"
        style={{ position: "fixed", left: "6vw", bottom: "10vh", width: 200, height: 200 }}
      >
        <use href="#s-kula" />
      </svg>
    </>
  );
}
