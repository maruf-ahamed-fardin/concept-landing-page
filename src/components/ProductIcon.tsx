import React from "react";

export function ProductIcon({ id }: { id: string }) {
  const shadow = (
    <ellipse cx="40" cy="66" rx="28" ry="5" fill="#3B1F0E" opacity=".12" />
  );

  switch (id) {
    case "foil":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          {shadow}
          <path d="M12,44 v12 q28,14 56,0 v-12z" fill="url(#g-foil)" />
          <ellipse cx="40" cy="44" rx="28" ry="11" fill="url(#g-foil)" />
          <path
            d="M40,34 q14,0 22,5 q-6,8 -22,9 q-10,-1 -15,-6z"
            fill="url(#g-patali)"
          />
          <path
            d="M18,41 l6,3 l-4,4 l7,2 M58,52 l-5,-2 l3,-4 M24,58 l5,-3"
            stroke="#fff"
            strokeOpacity=".85"
            fill="none"
            strokeWidth="1"
          />
          <path
            d="M25,42 q8,-10 17,-8"
            stroke="#8C949C"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      );
    case "gol":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          {shadow}
          <path d="M14,50 v8 q26,12 52,0 v-8z" fill="#6E3410" />
          <ellipse cx="40" cy="50" rx="26" ry="10" fill="url(#g-patali)" />
          <path d="M18,35 v8 q22,10 44,0 v-8z" fill="#7A3A12" />
          <ellipse cx="40" cy="35" rx="22" ry="8.5" fill="url(#g-patali)" />
          <ellipse
            cx="40"
            cy="35"
            rx="14"
            ry="5"
            fill="none"
            stroke="#F1C27A"
            strokeOpacity=".55"
            strokeDasharray="2 2"
          />
          <ellipse cx="33" cy="32" rx="6" ry="2" fill="#fff" opacity=".25" />
        </svg>
      );
    case "lomba":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          {shadow}
          <g>
            <path d="M8,50 L48,34 L66,40 L26,56Z" fill="#C98840" />
            <path d="M8,50 L26,56 L26,63 L8,57Z" fill="#7A3A12" />
            <path d="M26,56 L66,40 L66,47 L26,63Z" fill="#9A501A" />
          </g>
          <g transform="translate(4,-15)">
            <path d="M8,50 L48,34 L66,40 L26,56Z" fill="#D39448" />
            <path d="M8,50 L26,56 L26,63 L8,57Z" fill="#7A3A12" />
            <path d="M26,56 L66,40 L66,47 L26,63Z" fill="#9A501A" />
            <path
              d="M20,49 L50,37"
              stroke="#fff"
              strokeOpacity=".3"
              strokeWidth="2"
            />
          </g>
        </svg>
      );
    case "bij":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          {shadow}
          <path d="M18,42 Q24,22 40,20 Q56,22 62,42Z" fill="#4A200C" />
          <path
            d="M18,42 Q24,22 40,20 Q56,22 62,42Z"
            fill="url(#g-grain)"
            opacity=".8"
          />
          <path
            d="M12,42 h56 q-4,22 -28,22 q-24,0 -28,-22z"
            fill="url(#g-clay)"
          />
          <path d="M12,42 h56" stroke="#6E2614" strokeWidth="2" />
          <path
            d="M20,52 q20,6 40,0"
            stroke="#F4E9D8"
            strokeOpacity=".55"
            strokeDasharray="2 3"
            fill="none"
          />
        </svg>
      );
    case "jhola":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          {shadow}
          <rect x="23" y="12" width="34" height="8" rx="2" fill="#9E3B24" />
          <path
            d="M25,20 h30 q7,4 7,12 v28 q0,8 -8,8 h-28 q-8,0 -8,-8 v-28 q0,-8 7,-12z"
            fill="#FFF8EC"
            fillOpacity=".7"
            stroke="#C9A77A"
          />
          <path
            d="M18,34 h44 v26 q0,8 -8,8 h-28 q-8,0 -8,-8z"
            fill="url(#g-gur)"
          />
          <rect x="26" y="42" width="28" height="13" rx="2" fill="#F4E9D8" />
          <text
            x="40"
            y="51.5"
            fontSize="7.5"
            textAnchor="middle"
            fill="#3B1F0E"
            fontFamily="Noto Sans Bengali, sans-serif"
            fontWeight="700"
          >
            ঝোলা
          </text>
          <path d="M56,20 q3,6 1,11 q-3,-3 -1,-11z" fill="#D98A2B" />
          <rect
            x="20"
            y="36"
            width="3"
            height="22"
            rx="1.5"
            fill="#fff"
            opacity=".4"
          />
        </svg>
      );
    case "danadar":
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          {shadow}
          <path d="M10,62 Q24,28 40,24 Q56,28 70,62Z" fill="#B26E2C" />
          <path
            d="M10,62 Q24,28 40,24 Q56,28 70,62Z"
            fill="url(#g-grain)"
          />
          <path
            d="M20,58 Q30,38 40,33"
            fill="none"
            stroke="#F0B56A"
            strokeWidth="3"
            opacity=".55"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 80 80" className="h-full w-full">
          {shadow}
          <path
            d="M8,40 Q40,30 72,40 L68,60 Q40,74 12,60Z"
            fill="url(#g-weave)"
            stroke="#8E6326"
            strokeWidth="2"
          />
          <ellipse cx="28" cy="44" rx="11" ry="5" fill="url(#g-patali)" />
          <ellipse cx="50" cy="42" rx="10" ry="4.5" fill="url(#g-foil)" />
          <rect
            x="36"
            y="22"
            width="12"
            height="20"
            rx="3"
            fill="url(#g-gur)"
          />
          <path d="M52,52 Q58,44 64,52Z" fill="#4A200C" />
          <path d="M18,54 Q24,48 30,54Z" fill="#B26E2C" />
        </svg>
      );
  }
}
