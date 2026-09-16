export type HangDrawing = {
  id: string;
  src: string;
  title: string;
  t: number;
  w: number;
  featured?: boolean;
  /** A photographed drawing that needs a paper sheet around it. */
  photo?: boolean;
};

export type GrabKind = "pin" | "body" | "corner";
export type Mode = "hero" | "line";

export type PaperBody = {
  id: string;
  restT: number;
  pinT: number;
  theta: number;
  omega: number;
  unpinned: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  rotV: number;
  w: number;
  h: number;
  mass: number;
  z: number;
  fold: number;
  foldCorner: "bl" | "br";
  stretch: number;
  squash: number;
  incoming: number;
  featured: boolean;
  grabbed: GrabKind | null;
  grabX: number;
  grabY: number;
  grabOffX: number;
  grabOffY: number;
  lastTapAt: number;
  pointerId: number | null;
  pinOpen: number;
  catchLock: number;
  floorSince: number;
  /** Where the drawing hung before it was pulled off; its peg returns here if it isn't re-hung. */
  homeT: number;
};

export type RopeImpulse = {
  x: number;
  amp: number;
  born: number;
  sigma: number;
};

export type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  r: number;
};

export type Pointer = {
  id: number;
  x: number;
  y: number;
  px: number;
  py: number;
  sx: number;
  sy: number;
  psx: number;
  psy: number;
  t: number;
  downT: number;
  downX: number;
  downY: number;
  downSx: number;
  downSy: number;
  moved: boolean;
  kind: "paper" | "pan" | "wind" | "none";
  paperId: string | null;
};

export type World = {
  viewW: number;
  viewH: number;
  /** Desktop layout unit in px (`--u` in globals.css). */
  unit: number;
  /**
   * How far the rope has been pulled along, in line fractions. A drawing at
   * rope position t hangs at screen fraction t - scroll, so dragging the rope
   * slides every drawing along it like a conveyor.
   */
  scroll: number;
  scrollV: number;
  prevScroll: number;
  scrollMax: number;
  ropeMin: number;
  ropeMax: number;
  camX: number;
  camVX: number;
  lineY: number;
  sag: number;
  slope: number;
  lineW: number;
  margin: number;
  wind: number;
  gust: number;
  gustX: number;
  time: number;
  reduced: boolean;
  mode: Mode;
  drawings: HangDrawing[];
  papers: PaperBody[];
  rope: RopeImpulse[];
  motes: Mote[];
  pointers: Map<number, Pointer>;
  floorY: number;
  nextZ: number;
  lastCollideAt: number;
  events: Array<{ type: "pin" | "unpin" | "tap" | "collide"; id?: string }>;
};

export type Hit = {
  paperId: string;
  kind: GrabKind;
};

export type PaperRender = {
  x: number;
  y: number;
  rot: number;
  originY: number;
  scaleX: number;
  scaleY: number;
  z: number;
  fold: number;
  foldCorner: "bl" | "br";
  unpinned: boolean;
  pinLift: number;
  pinOpen: number;
  pinX: number;
  pinY: number;
  pinRot: number;
  /** 0–1; drawings fade out where the rope climbs off the top of the page. */
  fade: number;
  shadowX: number;
  shadowY: number;
  shadowRot: number;
  shadowScale: number;
  shadowOpacity: number;
  incoming: number;
};

const G = 2100;
const ANG_DAMP = 2.15;
const LIN_DAMP = 1.35;
const MAX_THETA = 1.35;
const PIN_HIT = 28;
const CORNER_HIT = 42;
const SPRING_T = 14;
const BODY_SPRING = 48;
const FOLD_SPRING = 18;
/** Seconds a dropped drawing rests on the floor before it flies back to its pin. */
const REHANG_AFTER = 2.2;
const Z_BASE = 30;

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function expDamp(current: number, target: number, lambda: number, dt: number) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

/** Rope height at screen fraction v, continued along its tangent past either end. */
function curveY(world: World, v: number): number {
  if (v < 0) return curveY(world, 0) + curveSlope(world, 0) * v;
  if (v > 1) return curveY(world, 1) + curveSlope(world, 1) * (v - 1);
  const u = 1 - v;
  if (world.viewW < 768) return world.lineY + world.slope * v + world.sag * 4 * v * u;
  const s = world.unit / 7.8;
  // Sags like a real rope: steepening towards its low point behind the phone,
  // then easing back up to the right edge (after the main reference).
  return world.lineY + (3 * u * u * v * 55 + 3 * u * v * v * 150 + v * v * v * 100) * s;
}

function curveSlope(world: World, v: number) {
  const u = 1 - v;
  if (world.viewW < 768) return world.slope + world.sag * 4 * (1 - 2 * v);
  return (165 * u * u + 570 * u * v - 150 * v * v) * (world.unit / 7.8);
}

export function linePoint(world: World, t: number) {
  const tt = t - world.scroll;
  const x = world.margin + tt * world.lineW;
  const y = curveY(world, tt) + ropeDisp(world, x);
  return { x, y };
}

/** Rope position under a screen x. */
function ropeT(world: World, x: number) {
  return (x - world.margin) / world.lineW + world.scroll;
}

function ropeDisp(world: World, x: number) {
  let y = 0;
  for (const imp of world.rope) {
    const age = world.time - imp.born;
    const envelope = Math.exp(-3.2 * age);
    const wave = Math.cos(age * 14);
    const dx = x - imp.x;
    const gauss = Math.exp(-(dx * dx) / (imp.sigma * imp.sigma));
    y += imp.amp * envelope * wave * gauss;
  }
  return y;
}

export function linePathD(world: World) {
  const n = 28;
  let d = "";
  for (let i = 0; i <= n; i++) {
    const p = linePoint(world, i / n + world.scroll);
    d += i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`;
  }
  return d;
}

function lineLayout(viewW: number, viewH: number) {
  const compact = viewW < 768;
  const margin = compact ? -18 : viewW * 0.275;
  const lineW = compact ? viewW + 36 : viewW - margin + 24;
  return {
    margin,
    lineW,
    lineY: compact ? 66 : 0,
    slope: compact ? Math.min(68, viewH * 0.25) : Math.min(145, viewW * 0.14),
    sag: compact ? 22 : 42,
  };
}

function paperSize(viewW: number, unit: number, width: number) {
  const scale =
    viewW < 640
      ? 0.68
      : viewW < 1024
        ? 0.84
        : clamp(unit / 10.24, 0.7, 2);
  const w = width * scale;
  return { w, h: w * 1.06 };
}

/** Keeps a peg on the visible part of the rope. */
function clampT(world: World, t: number) {
  return clamp(t - world.scroll, 0.04, 0.96) + world.scroll;
}

/**
 * Whether drawing p could hang at rope position t without crowding another
 * drawing. Empty pegs don't count — they slide aside to make room.
 */
function isFree(world: World, p: PaperBody, t: number) {
  const x = linePoint(world, t).x;
  for (const q of world.papers) {
    if (q === p || (q.unpinned && q.incoming === 0 && !q.grabbed)) continue;
    const qt = q.unpinned ? q.restT : q.pinT;
    if (Math.abs(linePoint(world, qt).x - x) < (p.w + q.w) * 0.5 + 12) return false;
  }
  return true;
}

/** A free spot on the rope right above a carried drawing, or null. */
function freeSpot(world: World, p: PaperBody) {
  const t = ropeT(world, p.x);
  const screenT = t - world.scroll;
  if (screenT < 0.08 || screenT > 0.96) return null;
  const topY = p.y - p.h * 0.48;
  const spotY = linePoint(world, t).y;
  if (topY < spotY - 90 || topY > spotY + 70) return null;
  return isFree(world, p, t) ? t : null;
}

/** Home if it's still free, otherwise the nearest free spot on the visible rope. */
function returnSpot(world: World, p: PaperBody) {
  if (isFree(world, p, p.homeT)) return p.homeT;
  let best: number | null = null;
  for (let tt = 0.08; tt <= 0.96; tt += 0.01) {
    const t = tt + world.scroll;
    if (!isFree(world, p, t)) continue;
    if (best === null || Math.abs(t - p.homeT) < Math.abs(best - p.homeT)) best = t;
  }
  return best ?? p.homeT;
}

export function createWorld(
  viewW: number,
  viewH: number,
  mode: Mode,
  reduced: boolean,
  unit = viewW / 100,
): World {
  const line = lineLayout(viewW, viewH);
  return {
    viewW,
    viewH,
    unit,
    scroll: 0,
    scrollV: 0,
    prevScroll: 0,
    scrollMax: 0,
    ropeMin: 0.04,
    ropeMax: 0.96,
    camX: 0,
    camVX: 0,
    lineY: line.lineY,
    sag: line.sag,
    slope: line.slope,
    lineW: line.lineW,
    margin: line.margin,
    wind: 0,
    gust: 0,
    gustX: 0,
    time: 0,
    reduced,
    mode,
    drawings: [],
    papers: [],
    rope: [],
    motes: [],
    pointers: new Map(),
    floorY: viewH - 28,
    nextZ: Z_BASE,
    lastCollideAt: 0,
    events: [],
  };
}

export function resizeWorld(world: World, viewW: number, viewH: number, unit = world.unit) {
  const line = lineLayout(viewW, viewH);
  world.viewW = viewW;
  world.viewH = viewH;
  world.unit = unit;
  world.lineY = line.lineY;
  world.sag = line.sag;
  world.slope = line.slope;
  world.lineW = line.lineW;
  world.margin = line.margin;
  world.floorY = viewH - 28;
  for (const p of world.papers) {
    const drawing = world.drawings.find((item) => item.id === p.id);
    const size = paperSize(viewW, unit, drawing?.w ?? p.w);
    p.w = size.w;
    p.h = size.h;
    p.mass = (p.w * p.h) / 40000;
  }
}

export function setMode(world: World, mode: Mode) {
  world.mode = mode;
  resizeWorld(world, world.viewW, world.viewH);
  restPositions(world);
}

function restPositions(world: World) {
  const hanging = world.papers.filter((p) => !p.unpinned);
  const n = hanging.length;
  if (n === 0) return;
  hanging.forEach((p, i) => {
    const drawing = world.drawings.find((item) => item.id === p.id);
    p.restT = drawing?.t ?? (n === 1 ? 0.5 : 0.08 + (i / (n - 1)) * 0.84);
  });
}

export function syncPapers(world: World, drawings: HangDrawing[], incomingId?: string) {
  world.drawings = drawings;
  const ts = drawings.map((d) => d.t);
  const lastT = ts.length ? Math.max(...ts) : 0.5;
  world.ropeMin = Math.min(0.04, ...ts);
  world.ropeMax = Math.max(0.96, lastT + 0.08);
  world.scrollMax = Math.max(0, lastT - 0.86);
  const keep = new Set(drawings.map((d) => d.id));
  world.papers = world.papers.filter((p) => keep.has(p.id));
  const existing = new Set(world.papers.map((p) => p.id));
  for (const d of drawings) {
    if (existing.has(d.id)) continue;
    const featured = Boolean(d.featured);
    const size = paperSize(world.viewW, world.unit, d.w);
    const body: PaperBody = {
      id: d.id,
      restT: 0.5,
      pinT: 0.5,
      theta: (Math.random() - 0.5) * 0.12,
      omega: 0,
      unpinned: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      rot: 0,
      rotV: 0,
      w: size.w,
      h: size.h,
      mass: (size.w * size.h) / 40000,
      z: featured ? Z_BASE - 1 : 8 + world.papers.length,
      fold: 0,
      foldCorner: "br",
      stretch: 1,
      squash: 1,
      incoming: d.id === incomingId ? 1 : 0,
      featured,
      grabbed: null,
      grabX: 0,
      grabY: 0,
      grabOffX: 0,
      grabOffY: 0,
      lastTapAt: 0,
      pointerId: null,
      pinOpen: d.id === incomingId ? 0.7 : 0,
      catchLock: 0,
      floorSince: 0,
      homeT: 0.5,
    };
    if (d.id === incomingId) {
      body.unpinned = true;
      body.x = world.camX + world.viewW * 0.5;
      body.y = world.viewH + size.h;
      body.vy = -980;
      body.rot = (Math.random() - 0.5) * 0.4;
    }
    world.papers.push(body);
  }
  restPositions(world);
  for (const p of world.papers) {
    if (!p.unpinned && p.incoming === 0 && p.grabbed === null) {
      p.pinT = p.restT;
    }
  }
}

export function addRopeImpulse(world: World, x: number, amp: number) {
  world.rope.push({ x, amp, born: world.time, sigma: 90 + Math.abs(amp) * 1.4 });
  if (world.rope.length > 8) world.rope.shift();
}

function spawnMotes(world: World, x: number, y: number, dir: number, n: number) {
  for (let i = 0; i < n; i++) {
    world.motes.push({
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 30,
      vx: dir * (80 + Math.random() * 180) + (Math.random() - 0.5) * 40,
      vy: (Math.random() - 0.6) * 70,
      life: 1,
      max: 0.5 + Math.random() * 0.6,
      r: 1.2 + Math.random() * 2.2,
    });
  }
  if (world.motes.length > 80) world.motes.splice(0, world.motes.length - 80);
}

export function blow(world: World, vx: number, x: number) {
  const g = clamp(vx * 1.15, -1400, 1400);
  world.gust += g;
  world.gustX = x;
  addRopeImpulse(world, x, clamp(Math.abs(vx) * 0.04, 4, 18) * Math.sign(vx || 1));
  spawnMotes(world, x - world.camX, world.lineY + 40, Math.sign(vx || 1), 18);
}

export function unpinPaper(world: World, id: string, keepGrab = false) {
  const p = world.papers.find((x) => x.id === id);
  if (!p || p.unpinned) return;
  const pin = linePoint(world, p.pinT);
  const L = p.h * 0.52;
  p.unpinned = true;
  p.homeT = p.restT;
  p.x = pin.x + Math.sin(p.theta) * L;
  p.y = pin.y + Math.cos(p.theta) * L + 36;
  p.vx = p.omega * L * Math.cos(p.theta);
  p.vy = -p.omega * L * Math.sin(p.theta) + 140;
  p.rot = p.theta;
  p.rotV = p.omega;
  p.fold = 0;
  p.pinOpen = 1;
  p.catchLock = world.time + 0.45;
  if (keepGrab && p.grabbed) {
    p.grabOffX = p.x - p.grabX;
    p.grabOffY = p.y - p.grabY;
  } else {
    p.grabbed = null;
    p.pointerId = null;
  }
  addRopeImpulse(world, pin.x, 10);
  world.events.push({ type: "unpin", id: p.id });
}

function pinPaper(world: World, p: PaperBody, t: number) {
  p.unpinned = false;
  p.restT = clampT(world, t);
  p.floorSince = 0;
  p.pinT = p.restT;
  p.theta = p.rot * 0.4;
  p.omega = p.rotV * 0.3;
  p.squash = 0.86;
  p.stretch = 1.12;
  p.incoming = 0;
  p.vx = 0;
  p.vy = 0;
  p.pinOpen = 0;
  const pin = linePoint(world, p.pinT);
  addRopeImpulse(world, pin.x, 12);
  world.events.push({ type: "pin", id: p.id });
}

function tryCatch(world: World, p: PaperBody) {
  if (!p.unpinned) return false;
  if (world.time < p.catchLock) return false;
  if (p.grabbed && p.vy > 24) return false;
  const pin = linePoint(world, p.pinT);
  const topY = p.y - p.h * 0.48;
  const dx = p.x - pin.x;
  const inJaws = Math.abs(dx) < 36 && topY < pin.y + 14 && topY > pin.y - 48;
  const close = Math.hypot(dx, topY - pin.y) < 24;
  if ((inJaws || close) && (p.pinOpen > 0.5 || p.incoming > 0.2)) {
    pinPaper(world, p, p.pinT);
    p.grabbed = null;
    p.pointerId = null;
    return true;
  }
  return false;
}

function targetPinOpen(world: World, p: PaperBody) {
  const pin = linePoint(world, p.pinT);
  if (p.unpinned) {
    const topY = p.y - p.h * 0.48;
    const dist = Math.hypot(p.x - pin.x, topY - pin.y);
    const approaching = dist < 120 && topY < pin.y + 80;
    if (p.incoming > 0) return approaching ? clamp(1.25 - dist / 70, 0.28, 1) : 0.6;
    if (approaching && (p.grabbed === "body" || p.y < world.floorY - 24)) {
      return clamp(1.2 - dist / 78, 0.12, 1);
    }
    return 0.1;
  }
  if (p.grabbed === "body") {
    const L = p.h * 0.5;
    const pull = Math.hypot(p.grabX - pin.x, p.grabY - pin.y);
    const extra = clamp((pull - L) / L, 0, 1);
    return clamp((extra - 0.16) * 1.75, 0, 1);
  }
  return 0;
}

function ropeFade(world: World, t: number) {
  if (world.viewW < 768) return 1;
  return clamp((t - world.scroll - 0.06) / 0.08, 0, 1);
}

export function hitTest(world: World, sx: number, sy: number): Hit | null {
  const wx = sx + world.camX;
  const ordered = [...world.papers].sort((a, b) => b.z - a.z);
  for (const p of ordered) {
    if (p.incoming > 0.6) continue;
    if (!p.unpinned && ropeFade(world, p.pinT) < 0.5) continue;
    if (p.unpinned) {
      if (
        wx > p.x - p.w / 2 &&
        wx < p.x + p.w / 2 &&
        sy > p.y - p.h / 2 &&
        sy < p.y + p.h / 2
      ) {
        return { paperId: p.id, kind: "body" };
      }
      const pin = linePoint(world, p.pinT);
      const dx = wx - pin.x;
      const dy = sy - pin.y;
      if (dx * dx + dy * dy < PIN_HIT * PIN_HIT) {
        return { paperId: p.id, kind: "pin" };
      }
      continue;
    }
    const pin = linePoint(world, p.pinT);
    const dx = wx - pin.x;
    const dy = sy - pin.y;
    if (dx * dx + dy * dy < PIN_HIT * PIN_HIT) {
      return { paperId: p.id, kind: "pin" };
    }
    const c = Math.cos(-p.theta);
    const s = Math.sin(-p.theta);
    const lx = c * dx - s * dy;
    const ly = s * dx + c * dy;
    if (lx > -p.w / 2 && lx < p.w / 2 && ly > 8 && ly < p.h + 10) {
      const fromBottom = p.h + 10 - ly;
      const fromRight = p.w / 2 - lx;
      const fromLeft = lx + p.w / 2;
      if (fromBottom < CORNER_HIT && fromRight < CORNER_HIT) {
        return { paperId: p.id, kind: "corner" };
      }
      if (fromBottom < CORNER_HIT && fromLeft < CORNER_HIT) {
        return { paperId: p.id, kind: "corner" };
      }
      return { paperId: p.id, kind: "body" };
    }
  }
  return null;
}

export function pointerDown(world: World, pointerId: number, sx: number, sy: number, hit: Hit | null) {
  const wx = sx + world.camX;
  const ptr: Pointer = {
    id: pointerId,
    x: wx,
    y: sy,
    px: wx,
    py: sy,
    sx,
    sy,
    psx: sx,
    psy: sy,
    t: world.time,
    downT: world.time,
    downX: wx,
    downY: sy,
    downSx: sx,
    downSy: sy,
    moved: false,
    kind: hit ? "paper" : "pan",
    paperId: hit?.paperId ?? null,
  };
  world.pointers.set(pointerId, ptr);
  if (!hit) return;
  const p = world.papers.find((x) => x.id === hit.paperId);
  if (!p) return;
  p.grabbed = hit.kind;
  p.pointerId = pointerId;
  p.grabX = wx;
  p.grabY = sy;
  p.z = ++world.nextZ;
  if (hit.kind === "corner") {
    const pin = p.unpinned ? { x: p.x, y: p.y } : linePoint(world, p.pinT);
    p.foldCorner = wx > pin.x ? "br" : "bl";
  }
  if (p.unpinned && hit.kind === "body") {
    p.grabOffX = p.x - wx;
    p.grabOffY = p.y - sy;
  }
}

export function pointerMove(world: World, pointerId: number, sx: number, sy: number) {
  const ptr = world.pointers.get(pointerId);
  if (!ptr) return;
  const wx = sx + world.camX;
  ptr.px = ptr.x;
  ptr.py = ptr.y;
  ptr.psx = ptr.sx;
  ptr.psy = ptr.sy;
  ptr.x = wx;
  ptr.y = sy;
  ptr.sx = sx;
  ptr.sy = sy;
  ptr.t = world.time;
  const dist = Math.hypot(sx - ptr.downSx, sy - ptr.downSy);
  if (dist > 8) ptr.moved = true;

  if (ptr.kind === "pan" && world.mode === "hero") {
    const dx = sx - ptr.psx;
    const over = world.scroll < 0 || world.scroll > world.scrollMax;
    world.scroll -= (dx / world.lineW) * (over ? 0.35 : 1);
    world.scrollV = 0;
    if (Math.abs(dx) > 2 && world.time - world.lastCollideAt > 0.09) {
      world.lastCollideAt = world.time;
      addRopeImpulse(world, sx, clamp(dx * 0.25, -6, 6));
    }
    return;
  }

  if (ptr.kind === "pan" && world.mode === "line") {
    const dx = sx - ptr.psx;
    world.camX -= dx;
    const maxCam = Math.max(0, world.margin * 2 + world.lineW - world.viewW);
    world.camX = clamp(world.camX, 0, maxCam);
    world.camVX = 0;
    return;
  }

  const p = ptr.paperId ? world.papers.find((x) => x.id === ptr.paperId) : null;
  if (!p || p.grabbed === null) return;
  p.grabX = wx;
  p.grabY = sy;

  if (p.unpinned && p.grabbed === "pin") {
    const t = clampT(world, ropeT(world, wx));
    p.pinT = t;
    p.restT = t;
    p.homeT = t;
    return;
  }

  if (p.unpinned && p.grabbed) {
    p.x = wx + p.grabOffX;
    p.y = sy + p.grabOffY;
    p.vx = (wx - ptr.px) / Math.max(1 / 120, 1 / 60);
    p.vy = (sy - ptr.py) / Math.max(1 / 120, 1 / 60);
    // Carried over a free stretch of rope, the empty peg slides over to meet it.
    p.restT = freeSpot(world, p) ?? p.homeT;
    tryCatch(world, p);
    return;
  }

  if (p.grabbed === "pin") {
    const t = clampT(world, ropeT(world, wx));
    p.pinT = t;
    p.restT = t;
    return;
  }

  if (p.grabbed === "body") {
    const pin = linePoint(world, p.pinT);
    const L = p.h * 0.5;
    const pull = Math.hypot(wx - pin.x, sy - pin.y);
    const down = sy - ptr.downSy;
    if (down > 64 && sy > pin.y + L * 1.06 && pull > L * 1.32) {
      unpinPaper(world, p.id, true);
    }
  }
}

export type PointerUpResult = {
  inspectId?: string;
  pinned?: boolean;
  unpinned?: boolean;
  gust?: number;
};

export function pointerUp(world: World, pointerId: number, sx: number, sy: number): PointerUpResult {
  const ptr = world.pointers.get(pointerId);
  world.pointers.delete(pointerId);
  const result: PointerUpResult = {};
  if (!ptr) return result;
  const wx = sx + world.camX;
  const dt = Math.max(0.016, world.time - ptr.t);
  const vx = (sx - ptr.psx) / dt;

  if (ptr.kind === "pan" && world.mode === "hero") {
    world.scrollV = clamp(-vx / world.lineW, -3, 3);
    return result;
  }

  if (ptr.kind === "pan") {
    const hold = world.time - ptr.downT;
    if (ptr.moved && Math.abs(vx) > 420 && hold < 0.35) {
      blow(world, vx * 0.55, wx);
      result.gust = vx;
    } else if (world.mode === "line") {
      world.camVX = -vx * 0.35;
    }
    return result;
  }

  const p = ptr.paperId ? world.papers.find((x) => x.id === ptr.paperId) : null;
  if (!p) return result;

  if (!ptr.moved && world.time - ptr.downT < 0.28 && !p.unpinned && p.grabbed === "body") {
    result.inspectId = p.id;
  }

  if (p.unpinned && p.grabbed) {
    p.vx = vx;
    p.vy = (sy - ptr.py) / dt;
    if (tryCatch(world, p)) result.pinned = true;
  }

  if (!p.unpinned && p.grabbed === "body" && ptr.moved) {
    const pin = linePoint(world, p.pinT);
    const L = p.h * 0.5;
    const pull = Math.hypot(wx - pin.x, sy - pin.y);
    const vy = (sy - ptr.psy) / dt;
    const down = sy - ptr.downSy;
    if (down > 56 && (vy > 360 || pull > L * 1.42 || sy > pin.y + L * 1.22)) {
      unpinPaper(world, p.id);
      p.vx = vx;
      p.vy = Math.max(vy, 90);
      result.unpinned = true;
    }
  }

  p.grabbed = null;
  p.pointerId = null;
  return result;
}

function neighborPush(world: World, dt: number) {
  const pins = world.papers;
  for (let i = 0; i < pins.length; i++) {
    for (let j = i + 1; j < pins.length; j++) {
      const a = pins[i];
      const b = pins[j];
      const ax = linePoint(world, a.pinT).x;
      const bx = linePoint(world, b.pinT).x;
      const aw = a.unpinned ? 58 : a.w;
      const bw = b.unpinned ? 58 : b.w;
      const min = (aw + bw) * (a.unpinned && b.unpinned ? 0.3 : 0.38);
      const dx = bx - ax;
      const gap = min - Math.abs(dx);
      if (gap > 0) {
        const dir = dx === 0 ? 1 : Math.sign(dx);
        const push = (gap * 0.9) / world.lineW;
        // An empty peg gives way to a hanging drawing instead of shoving it.
        const aMoves = a.grabbed !== "pin" && (a.unpinned || !b.unpinned);
        const bMoves = b.grabbed !== "pin" && (b.unpinned || !a.unpinned);
        const share = aMoves && bMoves ? 0.5 : 1;
        const shift = (dir * push * share * dt) / (1 / 60);
        if (aMoves) {
          a.restT -= shift;
          if (a.unpinned) a.pinT = a.restT;
        }
        if (bMoves) {
          b.restT += shift;
          if (b.unpinned) b.pinT = b.restT;
        }
        // Capped so a shove makes the neighbour sway, not spin over the rope.
        const kick = Math.min(gap, 36) * 0.009;
        if (!a.unpinned) a.omega -= dir * kick;
        if (!b.unpinned) b.omega += dir * kick;
        if (gap > 8 && world.time - world.lastCollideAt > 0.12) {
          world.lastCollideAt = world.time;
          addRopeImpulse(world, (ax + bx) / 2, 3);
          world.events.push({ type: "collide" });
        }
      }
    }
  }
  for (const p of pins) {
    if (p.grabbed !== "pin") p.restT = clamp(p.restT, world.ropeMin, world.ropeMax);

  }
}

export function stepWorld(world: World, dt: number) {
  world.events.length = 0;
  const capped = Math.min(dt, 0.05);
  world.time += capped;

  const idle =
    world.reduced ? 0 : Math.sin(world.time * 0.65) * 38 + Math.sin(world.time * 1.17 + 0.7) * 22;
  world.wind = idle;
  world.gust = expDamp(world.gust, 0, 1.8, capped);

  const maxCam = Math.max(0, world.margin * 2 + world.lineW - world.viewW);
  if (world.mode === "hero") {
    world.camX = expDamp(world.camX, 0, 8, capped);
    world.camVX = 0;
    const panning = [...world.pointers.values()].some((p) => p.kind === "pan");
    if (!panning) {
      world.scroll += world.scrollV * capped;
      world.scrollV *= Math.exp(-3.4 * capped);
      const edge = world.scroll < 0 ? 0 : world.scroll > world.scrollMax ? world.scrollMax : null;
      if (edge !== null) {
        world.scroll = expDamp(world.scroll, edge, 9, capped);
        world.scrollV *= Math.exp(-12 * capped);
      }
    }
    // Drawings lag behind the moving rope and swing out.
    const moved = (world.scroll - world.prevScroll) * world.lineW;
    world.prevScroll = world.scroll;
    if (moved !== 0) {
      for (const p of world.papers) {
        if (!p.unpinned) p.omega += clamp(moved, -40, 40) * 0.05;
      }
    }
  } else {
    const dragging = [...world.pointers.values()].some((p) => p.kind === "pan");
    if (!dragging) {
      world.camX += world.camVX * capped;
      world.camVX *= Math.exp(-2.4 * capped);
    }
    world.camX = clamp(world.camX, 0, maxCam);
  }

  world.rope = world.rope.filter((r) => world.time - r.born < 2.2);

  for (const m of world.motes) {
    m.x += m.vx * capped;
    m.y += m.vy * capped;
    m.vy += 30 * capped;
    m.life -= capped / m.max;
  }
  world.motes = world.motes.filter((m) => m.life > 0);

  neighborPush(world, capped);

  for (const p of world.papers) {
    p.squash = expDamp(p.squash, 1, 10, capped);
    p.stretch = expDamp(p.stretch, 1, 10, capped);
    p.pinOpen = expDamp(p.pinOpen, targetPinOpen(world, p), 16, capped);

    if (p.unpinned) {
      if (p.grabbed !== "pin") p.pinT = expDamp(p.pinT, p.restT, 12, capped);
      if (p.grabbed) {
        p.floorSince = 0;
        p.rotV *= Math.exp(-4 * capped);
        p.rot += p.rotV * capped;
        if (p.grabbed === "body") tryCatch(world, p);
        continue;
      }
      if (p.incoming > 0) {
        if (!isFree(world, p, p.restT)) p.restT = returnSpot(world, p);
        const target = linePoint(world, p.restT);
        const comY = target.y + p.h * 0.48;
        p.x = expDamp(p.x, target.x, 5.2, capped);
        p.y = expDamp(p.y, comY, 4.4, capped);
        p.rot = expDamp(p.rot, 0, 6, capped);
        if (tryCatch(world, p)) continue;
        if (Math.hypot(p.x - target.x, p.y - comY) < 18) {
          pinPaper(world, p, p.restT);
        }
        continue;
      }
      p.vy += G * capped;
      p.vx += (world.wind + world.gust) * 0.12 * capped;
      p.vx *= Math.exp(-LIN_DAMP * 0.4 * capped);
      p.vy *= Math.exp(-0.15 * capped);
      p.x += p.vx * capped;
      p.y += p.vy * capped;
      p.rotV += (world.gust + world.wind) * 0.0004 * capped;
      p.rotV *= Math.exp(-0.6 * capped);
      p.rot += p.rotV * capped;
      const floor = world.floorY - p.h * 0.32;
      if (p.y > floor) {
        p.y = floor;
        if (p.vy > 80) p.vy *= -0.22;
        else p.vy = 0;
        p.vx *= 0.82;
        p.rotV *= 0.8;
      }
      const resting = p.y >= floor - 1 && Math.abs(p.vy) < 40;
      if (!resting) {
        p.floorSince = 0;
      } else if (!p.floorSince) {
        p.floorSince = world.time;
      } else if (world.time - p.floorSince > REHANG_AFTER) {
        p.floorSince = 0;
        p.restT = returnSpot(world, p);
        p.incoming = 1;
        p.pinOpen = 0.7;
        p.catchLock = 0;
        continue;
      }
      const minX = world.mode === "hero" ? p.w * 0.5 : world.margin + p.w * 0.2;
      const maxX =
        world.mode === "hero" ? world.viewW - p.w * 0.5 : world.margin + world.lineW - p.w * 0.2;
      if (p.x < minX) {
        p.x = minX;
        p.vx *= -0.3;
      }
      if (p.x > maxX) {
        p.x = maxX;
        p.vx *= -0.3;
      }
      tryCatch(world, p);
      continue;
    }

    if (p.grabbed !== "pin") {
      p.pinT = expDamp(p.pinT, p.restT, SPRING_T, capped);
    }

    const L = p.h * 0.5;
    const windForce = world.wind + world.gust * (1 - Math.min(1, Math.abs(p.pinT * world.lineW + world.margin - world.gustX) / 420));
    let alpha = -(G / L) * Math.sin(p.theta) + (windForce / L) * Math.cos(p.theta) * 0.55;

    if (p.grabbed === "body") {
      const pin = linePoint(world, p.pinT);
      const desired = Math.atan2(p.grabX - pin.x, Math.max(24, p.grabY - pin.y));
      alpha += BODY_SPRING * (desired - p.theta);
      alpha -= 8 * p.omega;
      const pull = Math.hypot(p.grabX - pin.x, p.grabY - pin.y);
      const extra = clamp((pull - L) / L, 0, 0.85);
      p.stretch = 1 + extra * 0.12;
      p.squash = 1 / p.stretch;
      if (extra > 0.4 && p.grabY > pin.y + L * 1.04) {
        unpinPaper(world, p.id, true);
        continue;
      }
    } else if (p.grabbed === "pin") {
      alpha -= 10 * p.omega;
    } else if (p.grabbed === "corner") {
      const target = 0.72;
      p.fold = expDamp(p.fold, target, FOLD_SPRING, capped);
    }

    if (p.grabbed !== "corner") {
      p.fold = expDamp(p.fold, 0, 10, capped);
    }

    p.omega += alpha * capped;
    p.omega *= Math.exp(-ANG_DAMP * capped);
    p.theta += p.omega * capped;
    p.theta = clamp(p.theta, -MAX_THETA, MAX_THETA);
    if (Math.abs(p.theta) === MAX_THETA) p.omega *= 0.4;
  }
}

export function paperRender(world: World, id: string): PaperRender | null {
  const p = world.papers.find((x) => x.id === id);
  if (!p) return null;
  const bend = clamp(p.omega * 0.045, -0.12, 0.12);
  const pin = linePoint(world, p.pinT);
  const pinX = pin.x - world.camX;
  const pinY = pin.y;
  const before = linePoint(world, p.pinT - 0.006);
  const after = linePoint(world, p.pinT + 0.006);
  const pinRot = clamp(Math.atan2(after.y - before.y, after.x - before.x), -0.7, 0.7);
  if (p.unpinned) {
    return {
      x: p.x - world.camX,
      y: p.y,
      rot: p.rot + bend,
      originY: 0.5,
      scaleX: p.squash,
      scaleY: p.stretch,
      z: p.z,
      fold: p.fold,
      foldCorner: p.foldCorner,
      unpinned: true,
      pinLift: 0,
      pinOpen: p.pinOpen,
      pinX,
      pinY,
      pinRot,
      fade: 1,
      shadowX: p.x - world.camX,
      shadowY: world.floorY - 8,
      shadowRot: p.rot,
      shadowScale: 0.9,
      shadowOpacity: 0.16,
      incoming: p.incoming,
    };
  }
  const lift = p.grabbed === "pin" ? 4 : 0;
  return {
    x: pin.x - world.camX,
    y: pin.y - lift,
    rot: p.theta + bend,
    originY: 0,
    scaleX: p.squash,
    scaleY: p.stretch,
    z: p.z,
    fold: p.fold,
    foldCorner: p.foldCorner,
    unpinned: false,
    pinLift: lift,
    pinOpen: p.pinOpen,
    pinX,
    pinY: pinY - lift,
    pinRot,
    fade: ropeFade(world, p.pinT),
    shadowX: pin.x - world.camX + Math.sin(p.theta) * 22,
    shadowY: pin.y + p.h * 0.72 + 8,
    shadowRot: p.theta * 0.7,
    shadowScale: 0.82,
    shadowOpacity: 0.08,
    incoming: p.incoming,
  };
}

export function hangingCount(world: World) {
  return world.papers.filter((p) => !p.unpinned).length;
}
