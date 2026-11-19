import React from "react";

/**
 * Premium 1.5-second winter-dawn fog preloader (realistic, not cartoon).
 * Pure CSS: one tiny soft fog image (~10KB, reused by three mirrored layers) + the brand logo already used by the hero,
 * so it paints on the first frame and adds no extra weight. No JS timers.
 *   0.00–0.40s  logo resolves out of the mist (blur → sharp), a warm sunrise glow sits behind it
 *   0.15–0.90s  a fine gold hairline fills under the logo, one light sweep crosses the logo
 *   0.90–1.50s  the fog layers part sideways and thin out, the veil dissolves and the page is revealed
 * The overlay hides itself at 1.5s and never blocks clicks.
 */

const LOGO = "/images/brand/shahin-emart-logo.webp";
const FOG = "/images/fog-veil.webp";
const EASE = "cubic-bezier(.45,0,.2,1)";

const CSS = `
.cfp{position:fixed;inset:0;z-index:2147483000;pointer-events:none;overflow:hidden;contain:strict;
  animation:cfp-done .01s linear 1.48s forwards}
@keyframes cfp-done{to{visibility:hidden}}

/* winter-dawn veil with a soft sunrise glow behind the logo */
.cfp-veil{position:absolute;inset:0;will-change:opacity;
  background:
    radial-gradient(38% 30% at 50% 47%,rgba(255,226,170,.55) 0%,rgba(255,226,170,0) 100%),
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

/* brand mark */
.cfp-mark{position:absolute;left:50%;top:47%;display:flex;flex-direction:column;align-items:center;gap:14px;
  transform:translate(-50%,-50%);animation:cfp-mark 1.5s ${EASE} both}
@keyframes cfp-mark{0%{opacity:0;filter:blur(8px);transform:translate(-50%,-46%) scale(.97)}
  27%{opacity:1;filter:blur(0);transform:translate(-50%,-50%) scale(1)}
  60%{opacity:1;filter:blur(0);transform:translate(-50%,-50%) scale(1)}
  88%,100%{opacity:0;filter:blur(4px);transform:translate(-50%,-54%) scale(1.04)}}
.cfp-logo{position:relative;display:block}
.cfp-logo img{display:block;height:56px;width:auto;filter:drop-shadow(0 6px 18px rgba(120,70,20,.18))}
@media (min-width:640px){.cfp-logo img{height:66px}}
.cfp-logo::after{content:"";position:absolute;inset:0;
  background:linear-gradient(105deg,rgba(255,255,255,0) 35%,rgba(255,255,255,.85) 50%,rgba(255,255,255,0) 65%) no-repeat;
  background-size:250% 100%;background-position:130% 0;
  -webkit-mask:url('${LOGO}') center/contain no-repeat;mask:url('${LOGO}') center/contain no-repeat;
  animation:cfp-shine .6s ease-in-out .3s both}
@keyframes cfp-shine{to{background-position:-30% 0}}
.cfp-line{position:relative;width:112px;height:1.5px;border-radius:2px;overflow:hidden;background:rgba(158,59,36,.14)}
.cfp-line::after{content:"";position:absolute;inset:0;transform-origin:0 50%;
  background:linear-gradient(90deg,#C98A2B,#E8B45A 55%,#B85D19);
  animation:cfp-fill .75s cubic-bezier(.3,0,.2,1) .15s both}
@keyframes cfp-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}

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
      <div className="cfp-mark">
        <span className="cfp-logo">
          <img src={LOGO} alt="" width={840} height={303} decoding="async" fetchPriority="high" />
        </span>
        <span className="cfp-line" />
      </div>
    </div>
  );
}
