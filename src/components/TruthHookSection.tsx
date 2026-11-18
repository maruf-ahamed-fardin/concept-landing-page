"use client";

import React from "react";

interface ArtPlate {
  id: string;
  num: string;
  title: string;
  medium: string;
  img?: string;
  alt?: string;
}

const ART_PLATES: ArtPlate[] = [
  {
    id: "kantha",
    num: "০১",
    title: "খেজুর ভোর ও রসের হাঁড়ি",
    medium: "নকশিকাঁথা সূচি-শিল্প",
    img: "/images/art/kantha-palm.webp",
    alt: "হাতে বোনা লাল-সবুজ-সোনালি সুতার নকশিকাঁথায় ভোরের খেজুরগাছ ও রসের হাঁড়ি",
  },
  {
    id: "alpona",
    num: "০২",
    title: "পদ্ম-আলপনা ও গ্রাম্য গাথা",
    medium: "ঐতিহ্যবাহী লোকনকশা",
  },
  {
    id: "terracotta",
    num: "০৩",
    title: "বাঁক কাঁধে গাছি ও খেজুরবন",
    medium: "পোড়ামাটির টেরাকোটা ফলক",
    img: "/images/art/terracotta-gachi.webp",
    alt: "প্রাচীন বাংলার পোড়ামাটির ফলকে কাঁধে বাঁক ও রসের হাঁড়ি নিয়ে হাঁটছেন গ্রাম্য গাছি",
  },
  {
    id: "folklore",
    num: "০৪",
    title: "মাটির চুলা ও পৌষের উঠোন",
    medium: "বাংলার পট-চিত্রকলা",
  },
];

function HeritagePlateArt({ id }: { id: string }) {
  if (id === "alpona") {
    return (
      <svg
        viewBox="0 0 330 220"
        className="h-full w-full"
        role="img"
        aria-label="বাংলার চিরন্তন পদ্ম-আলপনা, কাস্তে-চাঁদ ও লোকনকশার বুনন"
      >
        <rect width="330" height="220" fill="#F6E9D2" />
        {/* Outer Kantha stitched borders */}
        <rect x="8" y="8" width="314" height="204" rx="4" fill="none" stroke="#9E3B24" strokeWidth="1.4" strokeDasharray="5 3" />
        <rect x="14" y="14" width="302" height="192" rx="2" fill="none" stroke="#2D5A3C" strokeWidth="1" strokeDasharray="2 3" />
        <rect x="20" y="20" width="290" height="180" fill="#FBF3E4" stroke="#C59A63" strokeWidth="1" />

        {/* Corner Kantha Half-Suns (Shukni/Lotus corners) */}
        {[
          "translate(20,20)",
          "translate(310,20) scale(-1,1)",
          "translate(20,200) scale(1,-1)",
          "translate(310,200) scale(-1,-1)",
        ].map((tf, i) => (
          <g key={i} transform={tf} fill="none">
            <path d="M0,40 A40,40 0 0 0 40,0" stroke="#9E3B24" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M0,28 A28,28 0 0 0 28,0" stroke="#B85D19" strokeWidth="1.2" />
            <path d="M0,16 A16,16 0 0 0 16,0" stroke="#2D5A3C" strokeWidth="1.4" />
            <circle cx="10" cy="10" r="2.2" fill="#9E3B24" />
          </g>
        ))}

        {/* Traditional Crescent Boats & River Waves along bottom */}
        <path
          d="M28,176 Q46,168 64,176 T100,176 T136,176 T172,176 T208,176 T244,176 T280,176 T302,176"
          fill="none"
          stroke="#2D5A3C"
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />
        <path d="M52,170 Q76,182 100,170 L92,163 H60 Z" fill="#9E3B24" fillOpacity="0.85" />
        <path d="M76,163 V146 L90,160 Z" fill="#D48B36" fillOpacity="0.9" />
        <path d="M230,170 Q254,182 278,170 L270,163 H238 Z" fill="#9E3B24" fillOpacity="0.85" />
        <path d="M254,163 V146 L240,160 Z" fill="#2D5A3C" fillOpacity="0.85" />

        {/* Central Intricate 16-Petal Padma Alpona Medallion */}
        <g transform="translate(165, 102)">
          <circle r="54" fill="none" stroke="#9E3B24" strokeWidth="1.2" strokeDasharray="2.5 3" />
          <circle r="46" fill="none" stroke="#B85D19" strokeWidth="0.9" />
          {Array.from({ length: 12 }, (_, idx) => idx * 30).map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <path
                d="M0,-14 C6,-24 6,-38 0,-46 C-6,-38 -6,-24 0,-14 Z"
                fill={deg % 60 === 0 ? "#9E3B24" : "#D68E35"}
                fillOpacity={deg % 60 === 0 ? "0.18" : "0.22"}
                stroke={deg % 60 === 0 ? "#9E3B24" : "#2D5A3C"}
                strokeWidth="1.1"
              />
              <circle cx="0" cy="-50" r="1.6" fill="#9E3B24" />
            </g>
          ))}
          <circle r="14" fill="#F6E9D2" stroke="#9E3B24" strokeWidth="1.5" />
          <circle r="7" fill="#2D5A3C" />
          <circle r="2.5" fill="#FBF3E4" />
        </g>

        {/* Side Folk Peacock / Leaf Motifs */}
        <g stroke="#2D5A3C" fill="none" strokeWidth="1.3">
          <path d="M48,108 C48,88 64,74 78,86 C70,96 60,104 48,108 Z" fill="#2D5A3C" fillOpacity="0.14" />
          <path d="M48,108 C62,108 78,102 82,92" />
          <path d="M282,108 C282,88 266,74 252,86 C260,96 270,104 282,108 Z" fill="#2D5A3C" fillOpacity="0.14" />
          <path d="M282,108 C268,108 252,102 248,92" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 330 220"
      className="h-full w-full"
      role="img"
      aria-label="পৌষের উঠোনে মাটির ঘর, তাফালে গুড় জ্বাল ও খেজুর বনের পটচিত্র"
    >
      <defs>
        <linearGradient id="pat-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFE1C6" />
          <stop offset="100%" stopColor="#F9EFE0" />
        </linearGradient>
      </defs>
      <rect width="330" height="220" fill="url(#pat-sky)" />
      {/* Manuscript Arch Frame (Pata Border) */}
      <rect x="8" y="8" width="314" height="204" rx="4" fill="none" stroke="#7A2E1B" strokeWidth="1.6" />
      <rect x="13" y="13" width="304" height="194" rx="2" fill="none" stroke="#C47E35" strokeWidth="1" strokeDasharray="4 3" />

      {/* Winter Crescent Moon & Sun */}
      <circle cx="272" cy="46" r="14" fill="#DDA046" fillOpacity="0.45" />
      <path d="M268,36 A11,11 0 1 0 280,52 A8.5,8.5 0 1 1 268,36 Z" fill="#9E3B24" />
      <circle cx="242" cy="36" r="1.4" fill="#9E3B24" />
      <circle cx="295" cy="60" r="1.4" fill="#9E3B24" />

      {/* Distant Layered Date Palms */}
      <g stroke="#2D5A3C" strokeLinecap="round" fill="none">
        <path d="M54,166 Q58,118 52,72" strokeWidth="4.2" stroke="#6E3B1D" />
        <path d="M52,72 Q30,62 18,74 M52,72 Q36,50 24,52 M52,72 Q68,50 82,56 M52,72 Q74,64 88,78 M52,72 Q52,46 56,42" strokeWidth="2.4" />
        <ellipse cx="59" cy="84" rx="5.5" ry="6.5" fill="#9E3B24" stroke="#5A2212" strokeWidth="1" />
      </g>

      {/* Traditional Bengali Do-Chala Thatched Village Cottage */}
      <g>
        <path d="M188,162 V118 L244,100 L300,118 V162 Z" fill="#EBD3AC" stroke="#5D2D16" strokeWidth="1.4" />
        {/* Curved Bangla Roof (Chala) */}
        <path d="M174,122 Q244,86 312,122 Q296,100 244,82 Q192,100 174,122 Z" fill="#B5652D" stroke="#4D210E" strokeWidth="1.5" />
        <rect x="233" y="130" width="22" height="32" rx="2" fill="#6B3219" />
        <path d="M196,154 H292" stroke="#9E3B24" strokeWidth="1.2" strokeDasharray="3 2" />
      </g>

      {/* Courtyard Hearth Ground & Earthen Tafal Boiling Pot */}
      <path d="M14,162 Q165,154 316,162 V206 H14 Z" fill="#E5CBA0" stroke="#8E5629" strokeWidth="1.2" />
      <g transform="translate(132, 166)">
        {/* Earthen Woodstove */}
        <path d="M-26,18 L-20,-4 H20 L26,18 Z" fill="#9E4A29" stroke="#4D1E0E" strokeWidth="1.3" />
        <path d="M-9,18 V8 Q0,0 9,8 V18 Z" fill="#3B1A0C" />
        <path d="M-3,17 C-5,11 0,6 1,1 C5,7 6,12 3,17 Z" fill="#E59834" />
        {/* Shallow Tafal Pan */}
        <ellipse cx="0" cy="-5" rx="30" ry="7" fill="#5A331C" stroke="#3B1F0E" strokeWidth="1.2" />
        <ellipse cx="0" cy="-5.5" rx="26" ry="5" fill="#D5822A" />
        {/* Ethereal Folk Steam Scrolls */}
        <path d="M-10,-14 C-14,-21 -6,-26 -10,-34 M2,-16 C-2,-24 6,-30 2,-38 M12,-14 C8,-21 16,-26 12,-33" stroke="#9E3B24" strokeOpacity="0.55" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>

      {/* Foreground Clay Rosher Harhi + Pitha Basket */}
      <g transform="translate(210, 174)">
        <ellipse cx="0" cy="0" rx="14" ry="4" fill="#B5652D" stroke="#4D1E0E" strokeWidth="1.1" />
        <path d="M-11,2 C-17,12 -14,22 0,24 C14,22 17,12 11,2 Z" fill="#8E381D" stroke="#4D1E0E" strokeWidth="1.1" />
      </g>

      {/* Decorative Bottom Folk Scallop Trim */}
      <path
        d="M22,196 Q38,188 54,196 T86,196 T118,196 T150,196 T182,196 T214,196 T246,196 T278,196 T308,196"
        fill="none"
        stroke="#9E3B24"
        strokeOpacity="0.6"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function TruthHookSection() {
  return (
    <section
      id="truth-hook"
      className="relative overflow-hidden px-4 pb-7 pt-6"
    >
      {/* Alpona Ornamental Divider */}
      <div className="mb-5 px-4" aria-hidden="true">
        <svg viewBox="0 0 320 36" className="mx-auto block w-full max-w-[300px]">
          <path
            d="M8,18 H124 M196,18 H312"
            stroke="#B85D19"
            strokeOpacity=".45"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <path
            d="M132,14 L136,18 L132,22 L128,18Z M188,14 L192,18 L188,22 L184,18Z"
            fill="#9E3B24"
          />
          <use
            href="#s-alpona"
            x="142"
            y="0"
            width="36"
            height="36"
            style={{ color: "#B85D19" }}
          />
        </svg>
      </div>

      {/* ================= HISTORICAL & FOLK ART GALLERY (AUTO-SCROLLING EXHIBITION) ================= */}
      <div className="relative overflow-hidden rounded-[22px] border border-[#DFC49B] bg-[#FFFDF8] p-3.5 sm:p-4">
        {/* Archival Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
          <p className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] text-clay">
            <span aria-hidden="true">❖</span>
            <span>বাংলা লোকশিল্প ও লোককথা পটচিত্র</span>
          </p>
          <span className="text-[11px] font-bold text-leaf">
            রাজশাহী · শীত ১৪৩৩
          </span>
        </div>

        {/* Continuous Auto-Scrolling Historical Art Strip */}
        <div className="art-marquee-wrap relative overflow-hidden">
          {/* Soft side fade curtains for museum gallery edges */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-[#FFFDF8] to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-[#FFFDF8] to-transparent"
            aria-hidden="true"
          />

          <div className="art-marquee-track">
            {[0, 1].map((dupIdx) => (
              <div
                key={dupIdx}
                className="flex shrink-0"
                aria-hidden={dupIdx === 1 ? "true" : undefined}
              >
                {ART_PLATES.map((plate) => (
                  <figure
                    key={`${dupIdx}-${plate.id}`}
                    className="w-[220px] flex-none pr-3 sm:w-[242px]"
                  >
                    <div className="aspect-[3/2] w-full overflow-hidden rounded-[12px] border border-[#E2C8A2] bg-sand">
                      {plate.img ? (
                        <img
                          src={plate.img}
                          alt={dupIdx === 0 ? plate.alt : ""}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <HeritagePlateArt id={plate.id} />
                      )}
                    </div>
                    <figcaption className="mt-2 px-0.5">
                      <p className="text-[10px] font-bold tracking-wide text-gur">
                        <span className="serif text-clay">{plate.num}</span> · {plate.medium}
                      </p>
                      <p className="mt-0.5 text-[12px] font-bold leading-snug text-ink">
                        {plate.title}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Poetic Heritage Couplet */}
        <div className="mt-3.5 border-t border-dashed border-[#E3CAA5] pt-3 text-center">
          <p className="serif text-[16.5px] font-extrabold leading-[1.45] text-clay sm:text-[18px]">
            “কুয়াশার কোলে ভোরের শিশির, খেজুরের গুড়ে বাঙালির নীড়”
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-ink/70">
            শহরের যান্ত্রিক জীবনে গ্রামের সেই হারানো শীতের সকাল আবার ফিরে আসুক আপনার ঘরে
          </p>
        </div>
      </div>
    </section>
  );
}
