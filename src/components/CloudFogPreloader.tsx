import React from "react";

/**
 * Premium 1.5-second winter-dawn fog preloader (realistic, not cartoon).
 * Pure CSS: one tiny soft fog image (~10KB, reused by three mirrored layers), so it paints on the first frame. No JS timers.
 *   0.00–0.85s  thick winter-dawn fog drifts over the page, a soft sunrise glow behind it
 *   0.85–1.50s  the fog layers part sideways and thin out, the veil dissolves and the page is revealed
 * The overlay hides itself at 1.5s and never blocks clicks.
 */

const FOG = "/images/fog-veil.webp";
const EASE = "cubic-bezier(.45,0,.2,1)";

const CSS = `
.cfp{position:fixed;inset:0;z-index:2147483000;pointer-events:none;overflow:hidden;contain:strict;
  animation:cfp-done .01s linear 1.48s forwards}
@keyframes cfp-done{to{visibility:hidden}}

/* winter-dawn veil with a soft sunrise glow behind the logo */
.cfp-veil{position:absolute;inset:0;will-change:opacity;
  background:
    radial-gradient(45% 35% at 50% 45%,rgba(255,232,190,.45) 0%,rgba(255,232,190,0) 100%),
    radial-gradient(90% 75% at 50% 48%,#EFEAE1 0%,#DCD8D0 58%,#C6C6C1 100%);
  animation:cfp-veil 1.5s ${EASE} both}
@keyframes cfp-veil{0%,58%{opacity:1}100%{opacity:0}}

/* three drifting fog layers built from one seamless texture */
.cfp-fog{position:absolute;inset:-22%;background:url('${FOG}') center/100% 100% no-repeat;will-change:transform,opacity}
.cfp-f1{opacity:.95;animation:cfp-f1 1.5s ${EASE} both}
.cfp-f2{opacity:.85;animation:cfp-f2 1.5s ${EASE} both}
.cfp-f3{opacity:.7;animation:cfp-f3 1.5s ${EASE} both}
@keyframes cfp-f1{0%{transform:translate3d(2%,0,0)}58%{opacity:.95;transform:translate3d(-3%,-1%,0)}100%{opacity:0;transform:translate3d(-28%,-3%,0) scale(1.12)}}
@keyframes cfp-f2{0%{transform:translate3d(-2%,0,0) scaleX(-1)}58%{opacity:.85;transform:translate3d(3%,1%,0) scaleX(-1)}100%{opacity:0;transform:translate3d(28%,-2%,0) scale(-1.16,1.16)}}
@keyframes cfp-f3{0%{transform:scale(1.15,-1.15)}58%{opacity:.7;transform:scale(1.2,-1.2)}100%{opacity:0;transform:scale(1.45,-1.45)}}

@media (prefers-reduced-motion:reduce){.cfp{display:none}}
`;

export function CloudFogPreloader() {
  return (
    <div className="cfp" aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="cfp-veil" />
      <div className="cfp-fog cfp-f3" />
      <div className="cfp-fog cfp-f2" />
      <div className="cfp-fog cfp-f1" />
    </div>
  );
}
