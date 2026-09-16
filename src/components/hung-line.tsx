"use client";

import { Clothespin } from "@/components/clothespin";
import {
  playGust,
  playPaperTap,
  playPin,
  playRustle,
  playUnpin,
  playWhoosh,
  unlockAudio,
} from "@/lib/audio";
import {
  blow,
  createWorld,
  hitTest,
  linePathD,
  paperRender,
  pointerDown,
  pointerMove,
  pointerUp,
  resizeWorld,
  stepWorld,
  syncPapers,
  type HangDrawing,
  type World,
} from "@/lib/hung-line-physics";
import { useEffect, useId, useRef } from "react";

// Evenly spaced with room between them; the rest wait further along the rope.
const GAP = 0.24;

const ITEMS: HangDrawing[] = [
  { id: "sun", src: "/art/cut/drawing-sun.png", title: "Sunshine", t: 0.14, w: 132 },
  {
    id: "elephant",
    src: "/art/cut/drawing-elephant.png",
    title: "Elephant with a flower",
    t: 0.14 + GAP,
    w: 138,
    featured: true,
  },
  { id: "rainbow", src: "/art/cut/drawing-rainbow.png", title: "Rainbow", t: 0.14 + GAP * 2, w: 134 },
  {
    id: "house",
    src: "/art/cut/drawing-house.png",
    title: "A little house under a rainbow",
    t: 0.14 + GAP * 3,
    w: 136,
  },
  { id: "cat", src: "/drawings/cat.jpg", title: "The cat", t: 0.14 + GAP * 4, w: 128, photo: true },
  { id: "rocket", src: "/drawings/rocket.jpg", title: "Rocket to the moon", t: 0.14 + GAP * 5, w: 134, photo: true },
  { id: "dino", src: "/drawings/dino.jpg", title: "Dinosaur", t: 0.14 + GAP * 6, w: 140, photo: true },
  { id: "rainbow-2", src: "/drawings/rainbow.jpg", title: "After the rain", t: 0.14 + GAP * 7, w: 134, photo: true },
];

/** Matches `--u` in globals.css: min(1vw, 20px). */
function layoutUnit() {
  return Math.min(document.documentElement.clientWidth / 100, 20);
}

export function HungLine() {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
  const ropeShadowRef = useRef<SVGPathElement>(null);
  const worldRef = useRef<World | null>(null);
  const paperMap = useRef(new Map<string, HTMLElement>());
  const pinMap = useRef(new Map<string, HTMLElement>());
  const moteLayer = useRef<HTMLDivElement>(null);
  const ropeHitRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const sceneNode = rootRef.current;
    if (!sceneNode) return;
    const scene: HTMLDivElement = sceneNode;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = scene.getBoundingClientRect();
    const world = createWorld(rect.width, rect.height, "hero", reduced, layoutUnit());
    worldRef.current = world;

    syncPapers(world, ITEMS);

    let last = performance.now();
    let raf = 0;
    let lastRustle = 0;
    let airX = 0;
    let airT = 0;
    const motePool: HTMLSpanElement[] = [];

    function ensureMotes(n: number) {
      const layer = moteLayer.current;
      if (!layer) return;
      while (motePool.length < n) {
        const el = document.createElement("span");
        el.className = "mote";
        layer.appendChild(el);
        motePool.push(el);
      }
    }

    function applyPaper(id: string) {
      const el = paperMap.current.get(id);
      const activeWorld = worldRef.current;
      if (!el || !activeWorld) return;
      const render = paperRender(activeWorld, id);
      const paper = activeWorld.papers.find((item) => item.id === id);
      if (!render || !paper) return;

      el.style.width = `${paper.w}px`;
      el.style.height = `${paper.h}px`;
      el.style.zIndex = String(render.z * 2);
      el.style.opacity = String(render.fade);
      el.style.visibility = render.fade === 0 ? "hidden" : "";
      const originX = paper.w / 2;
      const originY = render.unpinned ? paper.h / 2 : 8;
      el.style.transformOrigin = `${originX}px ${originY}px`;
      el.style.transform = `translate3d(${render.x - originX}px, ${render.y - originY}px, 0) rotate(${render.rot}rad) scale(${render.scaleX}, ${render.scaleY})`;

      const fold = el.querySelector<HTMLElement>("[data-fold]");
      if (fold) {
        fold.style.opacity = String(render.fold);
        fold.dataset.corner = render.foldCorner;
      }

      el.classList.toggle("is-unpinned", render.unpinned);
      el.classList.toggle("is-held", Boolean(paper.grabbed));
    }

    function applyPin(id: string) {
      const el = pinMap.current.get(id);
      const activeWorld = worldRef.current;
      if (!el || !activeWorld) return;
      const render = paperRender(activeWorld, id);
      if (!render) return;

      const scale = 1 + render.pinOpen * 0.05;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      el.style.transform = `translate3d(${render.pinX - w / 2}px, ${render.pinY - h * 0.345}px, 0) rotate(${render.pinRot}rad) scale(${scale})`;
      el.style.setProperty("--pin-open", String(render.pinOpen));
      // Each pin sits just above its own drawing, so a drawing lifted to the
      // front also covers the pins of the drawings behind it.
      el.style.zIndex = String(render.z * 2 + 1);
      el.style.opacity = String(render.fade);
      el.style.visibility = render.fade === 0 ? "hidden" : "";
      el.classList.toggle("is-empty", render.unpinned);
      el.classList.toggle("is-open", render.pinOpen > 0.35);
    }

    function apply() {
      const activeWorld = worldRef.current;
      if (!activeWorld) return;
      const path = linePathD(activeWorld);
      ropeRef.current?.setAttribute("d", path);
      ropeShadowRef.current?.setAttribute("d", path);
      ropeHitRef.current?.setAttribute("d", path);

      for (const paper of activeWorld.papers) {
        applyPaper(paper.id);
        applyPin(paper.id);
      }

      ensureMotes(activeWorld.motes.length);
      for (let i = 0; i < motePool.length; i++) {
        const mote = activeWorld.motes[i];
        const el = motePool[i];
        if (!mote) {
          el.style.opacity = "0";
          continue;
        }
        el.style.opacity = String(Math.max(0, mote.life) * 0.55);
        el.style.width = `${mote.r * 2}px`;
        el.style.height = `${mote.r * 2}px`;
        el.style.transform = `translate3d(${mote.x}px, ${mote.y}px, 0)`;
      }
    }

    function tick(now: number) {
      const activeWorld = worldRef.current;
      if (!activeWorld) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      stepWorld(activeWorld, dt);
      apply();

      for (const event of activeWorld.events) {
        if (event.type === "pin") playPin();
        else if (event.type === "unpin") playUnpin();
        else if (event.type === "collide") playPaperTap(0.45);
      }

      raf = requestAnimationFrame(tick);
    }

    apply();
    if (!reduced) {
      blow(world, 360, world.margin + world.lineW * 0.42);
    }
    raf = requestAnimationFrame(tick);

    const resizeObserver = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box) return;
      resizeWorld(world, box.width, box.height, layoutUnit());
      apply();
    });
    resizeObserver.observe(scene);

    function local(event: PointerEvent) {
      const box = scene.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top };
    }

    function onDown(event: PointerEvent) {
      const point = local(event);
      const hit = hitTest(world, point.x, point.y);
      const onRope = event.target instanceof Element && event.target.closest("[data-rope]");
      if (!hit && !onRope) return;
      unlockAudio();
      pointerDown(world, event.pointerId, point.x, point.y, hit);
      playRustle(0.35);
      scene.setPointerCapture(event.pointerId);
      event.preventDefault();
    }

    function onMove(event: PointerEvent) {
      if (!world.pointers.has(event.pointerId)) return;
      const point = local(event);
      pointerMove(world, event.pointerId, point.x, point.y);
      const now = performance.now();
      if (now - lastRustle > 90) {
        playRustle(0.24);
        lastRustle = now;
      }
    }

    function onUp(event: PointerEvent) {
      if (!world.pointers.has(event.pointerId)) return;
      const point = local(event);
      const result = pointerUp(world, event.pointerId, point.x, point.y);
      if (result.gust) {
        playGust();
        playWhoosh(Math.sign(result.gust));
      }
    }

    function onAirMove(event: PointerEvent) {
      if (world.pointers.size > 0) return;
      const box = scene.getBoundingClientRect();
      if (
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom
      ) {
        airT = 0;
        return;
      }
      const now = performance.now();
      if (airT) {
        const elapsed = now - airT;
        const velocity = ((event.clientX - airX) / Math.max(16, elapsed)) * 1000;
        if (elapsed < 90 && Math.abs(velocity) > 980) {
          unlockAudio();
          blow(world, velocity * 0.45, event.clientX - box.left);
          playGust();
          playWhoosh(Math.sign(velocity));
          airT = 0;
          return;
        }
      }
      airX = event.clientX;
      airT = now;
    }

    function onGust(event: Event) {
      const direction = (event as CustomEvent<{ dir?: number }>).detail?.dir ?? 1;
      blow(world, direction * 720, world.margin + world.lineW * 0.55);
    }

    scene.addEventListener("pointerdown", onDown, { passive: false });
    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerup", onUp);
    scene.addEventListener("pointercancel", onUp);
    window.addEventListener("pointermove", onAirMove);
    window.addEventListener("maccu:gust", onGust);
    window.addEventListener("pointerdown", unlockAudio);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      scene.removeEventListener("pointerdown", onDown);
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerup", onUp);
      scene.removeEventListener("pointercancel", onUp);
      window.removeEventListener("pointermove", onAirMove);
      window.removeEventListener("maccu:gust", onGust);
      window.removeEventListener("pointerdown", unlockAudio);
      worldRef.current = null;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="clothesline pointer-events-none absolute inset-x-0 top-0 h-[34rem] w-full overflow-visible sm:h-[38rem] lg:h-[calc(var(--u)*80)]"
      aria-label="Interactive clothesline. Drag the rope to see more drawings, move the pegs, or pull a drawing down."
    >
      <svg
        className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <pattern
            id={`twinePat-${uid}`}
            patternUnits="userSpaceOnUse"
            width="42"
            height="7"
          >
            <image
              href="/textures/twine.png"
              width="42"
              height="7"
              preserveAspectRatio="none"
            />
          </pattern>
          <filter
            id={`ropeFiber-${uid}`}
            x="-8%"
            y="-120%"
            width="116%"
            height="340%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7 0.18"
              numOctaves="2"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <path
          ref={ropeHitRef}
          data-rope
          d="M 0 0"
          fill="none"
          stroke="transparent"
          strokeWidth="36"
          strokeLinecap="round"
          pointerEvents="stroke"
          className="rope-grab"
        />
        <g filter={`url(#ropeFiber-${uid})`} pointerEvents="none">
          <path
            ref={ropeShadowRef}
            d="M 0 0"
            fill="none"
            stroke="#7a2e18"
            strokeLinecap="round"
            opacity="0.35"
            transform="translate(0 1.4)"
            className="rope-shadow-stroke"
          />
          <path
            ref={ropeRef}
            d="M 0 0"
            fill="none"
            stroke={`url(#twinePat-${uid})`}
            strokeLinecap="round"
            className="rope-stroke"
          />
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-0 z-[38]">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            data-paper={item.id}
            className="paper-root absolute top-0 left-0"
            aria-label={`${item.title}, hung on the line`}
            onDragStart={(event) => event.preventDefault()}
            ref={(el) => {
              if (el) paperMap.current.set(item.id, el);
              else paperMap.current.delete(item.id);
            }}
          >
            <div className="sheet">
              {item.photo ? (
                <div className="sheet-paper">
                  {/* eslint-disable-next-line @next/next/no-img-element -- transformed every frame by the physics loop */}
                  <img src={item.src} alt="" draggable={false} />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- transformed every frame by the physics loop
                <img src={item.src} alt="" draggable={false} className="sheet-art" />
              )}
              <div data-fold className="sheet-fold" />
            </div>
          </button>
        ))}

        {ITEMS.map((item) => (
          <div
            key={`pin-${item.id}`}
            className="line-pin"
            ref={(el) => {
              if (el) pinMap.current.set(item.id, el);
              else pinMap.current.delete(item.id);
            }}
          >
            <Clothespin pinId={item.id} />
          </div>
        ))}

        <div ref={moteLayer} className="pointer-events-none absolute inset-0 overflow-hidden" />
      </div>
    </div>
  );
}
