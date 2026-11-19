import React from "react";

/**
 * Premium 1.5-second heavy winter-fog preloader.
 * A thick, milky winter-morning fog covers the page; it drifts, then parts to the left and right and thins away,
 * revealing the page from the centre outwards.
 * Pure CSS + one ~10KB soft fog image (reused by four mirrored/flipped layers), preloaded. No JS timers.
 *   0.00–0.65s  dense fog: four overlapping layers drift slowly over a pale misty veil
 *   0.65–1.45s  two layers sweep left and two sweep right while swelling and thinning; the veil dissolves
 * The overlay hides itself at 1.5s and never blocks clicks.
 */

const FOG = "/images/fog-veil.webp";
const PART = "cubic-bezier(.6,0,.3,1)";
const SOFT = "cubic-bezier(.45,0,.2,1)";

const CSS = `
.cfp{position:fixed;inset:0;z-index:2147483000;pointer-events:none;overflow:hidden;contain:strict;
  animation:cfp-done .01s linear 1.48s forwards}
@keyframes cfp-done{to{visibility:hidden}}

/* pale, milky veil under the fog */
.cfp-veil{position:absolute;inset:0;will-change:opacity;
  background:
    radial-gradient(55% 45% at 50% 50%,rgba(255,255,255,.45) 0%,rgba(255,255,255,0) 100%),
    radial-gradient(95% 80% at 50% 50%,#E6E5E1 0%,#D2D3D0 60%,#BFC2C1 100%);
  animation:cfp-veil 1.5s ${SOFT} both}
@keyframes cfp-veil{0%,48%{opacity:1}94%,100%{opacity:0}}

/* four dense fog layers from one soft texture */
.cfp-fog{position:absolute;inset:-25%;background:url('${FOG}') center/100% 100% no-repeat;will-change:transform,opacity}
.cfp-f1{animation:cfp-f1 1.5s ${PART} both}
.cfp-f2{animation:cfp-f2 1.5s ${PART} both}
.cfp-f3{animation:cfp-f3 1.5s ${PART} both}
.cfp-f4{animation:cfp-f4 1.5s ${PART} both}
@keyframes cfp-f1{0%{opacity:1;transform:translate3d(3%,0,0)}45%{opacity:1;transform:translate3d(-2%,-1%,0)}100%{opacity:0;transform:translate3d(-42%,-3%,0) scale(1.2)}}
@keyframes cfp-f2{0%{opacity:.95;transform:translate3d(-3%,0,0) scaleX(-1)}45%{opacity:.95;transform:translate3d(2%,1%,0) scaleX(-1)}100%{opacity:0;transform:translate3d(42%,-2%,0) scale(-1.2,1.2)}}
@keyframes cfp-f3{0%{opacity:.9;transform:translate3d(0,2%,0) scale(1.2,-1.2)}45%{opacity:.9;transform:translate3d(-1%,0,0) scale(1.24,-1.24)}100%{opacity:0;transform:translate3d(-30%,0,0) scale(1.45,-1.45)}}
@keyframes cfp-f4{0%{opacity:.85;transform:translate3d(0,-2%,0) scale(-1.3,-1.3)}45%{opacity:.85;transform:translate3d(1%,0,0) scale(-1.34,-1.34)}100%{opacity:0;transform:translate3d(30%,0,0) scale(-1.55,-1.55)}}

@media (prefers-reduced-motion:reduce){.cfp{display:none}}
`;

export function CloudFogPreloader() {
  return (
    <div className="cfp" aria-hidden="true">
      <link rel="preload" as="image" href={FOG} fetchPriority="high" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cfp-veil" />
      <div className="cfp-fog cfp-f4" />
      <div className="cfp-fog cfp-f3" />
      <div className="cfp-fog cfp-f2" />
      <div className="cfp-fog cfp-f1" />
    </div>
  );
}
