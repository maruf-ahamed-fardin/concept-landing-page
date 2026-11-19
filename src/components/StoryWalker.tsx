"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven gachi who walks the story path from step to step.
 * - The path is the same stretched SVG path the glow uses (viewBox 0 0 100 500, preserveAspectRatio none),
 *   resampled into real pixels so steps and footprints are evenly spaced at every width.
 * - He rests in the free gaps between story rows (never on top of card text), looks toward the card being read,
 *   and walks to the next gap as the reader scrolls. Footprints appear behind him.
 * - Only transforms/opacity change on scroll; one rAF loop eases his position so the walk stays smooth.
 */

const SPRITE = "/images/walker/gachi-walker.webp"; // 4 frames side by side (186×320 each)
const FRAME_RATIO = 186 / 320;
const FOOT_GAP = 20; // px between footprints
const STRIDE = 11; // px of travel per animation frame

type Pt = { x: number; y: number; nx: number; ny: number; a: number };
type Layout = {
  pts: { x: number; y: number }[];
  cum: number[];
  total: number;
  stations: { d: number; y: number }[];
  cards: { cy: number; cx: number }[];
  w: number;
  h: number;
};

function smooth(u: number) {
  const v = Math.min(1, Math.max(0, u));
  return v * v * (3 - 2 * v);
}

export function StoryWalker({ pathD, onStep }: { pathD: string; onStep: (idx: number) => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const walkerRef = useRef<HTMLDivElement | null>(null);
  const spriteRef = useRef<HTMLDivElement | null>(null);
  const footRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layoutRef = useRef<Layout | null>(null);
  const [feet, setFeet] = useState<(Pt & { d: number })[]>([]);
  const [size, setSize] = useState({ w: 50, h: 86 });
  const onStepRef = useRef(onStep);
  onStepRef.current = onStep;

  useEffect(() => {
    const root = rootRef.current;
    const box = root?.parentElement;
    if (!root || !box) return;

    const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
    probe.setAttribute("d", pathD);
    const ghost = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    ghost.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
    ghost.appendChild(probe);
    document.body.appendChild(ghost);

    let cur = -1; // eased distance currently drawn
    let target = 0;
    let raf = 0;
    let lit = 0;
    let lastStep = -1;
    let facingLeft = false;

    const pointAt = (L: Layout, d: number) => {
      const { cum, pts } = L;
      let lo = 0;
      let hi = cum.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (cum[mid] < d) lo = mid + 1;
        else hi = mid;
      }
      const i = Math.max(1, lo);
      const seg = cum[i] - cum[i - 1] || 1;
      const u = Math.min(1, Math.max(0, (d - cum[i - 1]) / seg));
      const a = pts[i - 1];
      const b = pts[i];
      return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u, dx: b.x - a.x };
    };

    const build = () => {
      const W = box.clientWidth;
      const H = box.clientHeight;
      if (!W || !H) return;
      const w = W < 400 ? 46 : 54;
      const h = Math.round(w / FRAME_RATIO);
      const Lv = probe.getTotalLength();
      const N = 700;
      const pts: { x: number; y: number }[] = [];
      const cum: number[] = [];
      for (let i = 0; i <= N; i++) {
        const p = probe.getPointAtLength((Lv * i) / N);
        const q = { x: (p.x / 100) * W, y: (p.y / 500) * H };
        cum.push(i ? cum[i - 1] + Math.hypot(q.x - pts[i - 1].x, q.y - pts[i - 1].y) : 0);
        pts.push(q);
      }
      const total = cum[N];

      // resting stations: centre of the free gap between consecutive cards
      const top = box.getBoundingClientRect().top;
      const cardEls = Array.from(box.querySelectorAll<HTMLElement>(".rd-card"));
      const rects = cardEls.map((c) => c.getBoundingClientRect());
      const cards = rects.map((r) => ({ cy: r.top - top + r.height / 2, cx: r.left - box.getBoundingClientRect().left + r.width / 2 }));
      const stations: { d: number; y: number }[] = [];
      for (let i = 0; i < rects.length - 1; i++) {
        const zoneTop = rects[i].bottom - top;
        const zoneBottom = rects[i + 1].top - top;
        const footY = Math.min(zoneBottom - 4, (zoneTop + zoneBottom) / 2 + h / 2 - 6);
        let best = 0;
        let bd = Infinity;
        pts.forEach((p, k) => {
          const dd = Math.abs(p.y - footY);
          if (dd < bd) {
            bd = dd;
            best = k;
          }
        });
        stations.push({ d: cum[best], y: pts[best].y });
      }
      if (!stations.length) stations.push({ d: 0, y: pts[0].y });

      // footprints from the top of the path down to the last station
      const end = stations[stations.length - 1].d;
      const fp: (Pt & { d: number })[] = [];
      let side = 1;
      for (let d = 8; d <= end; d += FOOT_GAP) {
        const a = pointAt({ pts, cum } as Layout, d);
        const b = pointAt({ pts, cum } as Layout, d + 1);
        const tx = b.x - a.x;
        const ty = b.y - a.y;
        const m = Math.hypot(tx, ty) || 1;
        const nx = -ty / m;
        const ny = tx / m;
        fp.push({ x: a.x + nx * 3.4 * side, y: a.y + ny * 3.4 * side, nx, ny, a: (Math.atan2(ty, tx) * 180) / Math.PI, d });
        side = -side;
      }

      layoutRef.current = { pts, cum, total, stations, cards, w, h };
      lit = 0;
      setSize({ w, h });
      setFeet(fp);
      update();
    };

    const draw = () => {
      raf = 0;
      const L = layoutRef.current;
      const walker = walkerRef.current;
      const sprite = spriteRef.current;
      if (!L || !walker || !sprite) return;
      if (cur < 0) cur = target;
      const diff = target - cur;
      const moving = Math.abs(diff) > 0.6;
      cur = moving ? cur + diff * 0.14 : target;
      const p = pointAt(L, cur);
      walker.style.transform = `translate3d(${(p.x - L.w / 2).toFixed(1)}px, ${(p.y - L.h).toFixed(1)}px, 0)`;
      walker.style.opacity = "1";

      // face the way he walks; when resting, look at the card being read
      if (moving) {
        const dir = Math.sign(p.dx * Math.sign(diff));
        if (dir) facingLeft = dir < 0;
      } else if (lastStep >= 0 && L.cards[lastStep]) {
        facingLeft = L.cards[lastStep].cx < p.x;
      }
      sprite.style.transform = facingLeft ? "scaleX(-1)" : "none";
      sprite.style.backgroundPosition = `${moving ? (Math.floor(cur / STRIDE) % 4) * 33.3333 : 33.3333}% 0`;
      walker.classList.toggle("is-walking", moving);

      // light footprints behind him
      const feetEls = footRefs.current;
      let n = 0;
      while (n < feetEls.length && feetEls[n] && Number(feetEls[n]!.dataset.d) <= cur - 12) n++;
      if (n !== lit) {
        for (let i = Math.min(n, lit); i < Math.max(n, lit); i++) feetEls[i]?.classList.toggle("on", i < n);
        lit = n;
      }
      if (moving) raf = requestAnimationFrame(draw);
    };

    const update = () => {
      const L = layoutRef.current;
      if (!L) return;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const anchorY = vh * 0.58 - r.top; // reading line inside the story box

      // which card is being read
      let step = 0;
      let bd = Infinity;
      L.cards.forEach((c, i) => {
        const dd = Math.abs(c.cy - anchorY);
        if (dd < bd) {
          bd = dd;
          step = i;
        }
      });
      if (step !== lastStep) {
        lastStep = step;
        onStepRef.current(step);
      }

      // walk between stations, resting in each gap (dwell while 0–35% and 65–100% of a leg)
      const S = L.stations;
      const ty = anchorY + L.h * 0.4;
      let d = S[0].d;
      if (ty >= S[S.length - 1].y) d = S[S.length - 1].d;
      else {
        for (let i = 0; i < S.length - 1; i++) {
          if (ty >= S[i].y && ty < S[i + 1].y) {
            const u = (ty - S[i].y) / (S[i + 1].y - S[i].y || 1);
            d = S[i].d + (S[i + 1].d - S[i].d) * smooth((u - 0.32) / 0.36);
            break;
          }
        }
      }
      target = d;
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onScroll = () => update();
    build();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => build()) : null;
    ro?.observe(box);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", build);
    return () => {
      ro?.disconnect();
      window.removeEventListener("scroll", onScroll, { capture: true } as EventListenerOptions);
      window.removeEventListener("resize", build);
      if (raf) cancelAnimationFrame(raf);
      ghost.remove();
    };
  }, [pathD]);

  return (
    <>
      {/* footprints sit under the cards, like the path */}
      <div ref={rootRef} className="story-feet pointer-events-none absolute inset-0 z-[6]" aria-hidden="true">
        {feet.map((f, i) => (
          <div
            key={i}
            ref={(el) => {
              footRefs.current[i] = el;
            }}
            data-d={f.d}
            className="story-foot"
            style={{ left: f.x, top: f.y, transform: `rotate(${f.a.toFixed(1)}deg)` }}
          />
        ))}
      </div>
      {/* the gachi walks above everything while moving, rests in the gaps */}
      <div className="pointer-events-none absolute inset-0 z-[25]" aria-hidden="true">
        <div ref={walkerRef} className="story-walker" style={{ width: size.w, height: size.h }}>
          <div className="story-walker-body">
            <div ref={spriteRef} className="story-walker-sprite" style={{ backgroundImage: `url('${SPRITE}')` }} />
          </div>
        </div>
      </div>
    </>
  );
}
