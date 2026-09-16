let ctx: AudioContext | null = null;
let unlocked = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

export function unlockAudio() {
  const c = getCtx();
  if (!c || unlocked) return;
  void c.resume();
  unlocked = true;
}

function noiseBuffer(c: AudioContext, seconds: number) {
  const n = Math.floor(c.sampleRate * seconds);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < n; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function envGain(
  c: AudioContext,
  t: number,
  attack: number,
  decay: number,
  peak: number,
) {
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  return g;
}

export function playRustle(intensity = 0.5) {
  const c = getCtx();
  if (!c || c.state !== "running") return;
  const t = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.18);
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1400 + intensity * 900;
  bp.Q.value = 0.7;
  const g = envGain(c, t, 0.008, 0.12 + intensity * 0.08, 0.045 * intensity);
  src.connect(bp);
  bp.connect(g);
  g.connect(c.destination);
  src.start(t);
  src.stop(t + 0.22);
}

export function playPin() {
  const c = getCtx();
  if (!c || c.state !== "running") return;
  const t = c.currentTime;
  const o = c.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(420, t);
  o.frequency.exponentialRampToValueAtTime(180, t + 0.07);
  const g = envGain(c, t, 0.002, 0.09, 0.07);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + 0.1);

  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.05);
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 1800;
  const ng = envGain(c, t, 0.001, 0.04, 0.03);
  src.connect(hp);
  hp.connect(ng);
  ng.connect(c.destination);
  src.start(t);
  src.stop(t + 0.05);
}

export function playUnpin() {
  const c = getCtx();
  if (!c || c.state !== "running") return;
  const t = c.currentTime;
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(260, t);
  o.frequency.exponentialRampToValueAtTime(90, t + 0.14);
  const g = envGain(c, t, 0.004, 0.16, 0.05);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + 0.16);
  playRustle(0.7);
}

export function playGust() {
  const c = getCtx();
  if (!c || c.state !== "running") return;
  const t = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.55);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(800, t);
  lp.frequency.exponentialRampToValueAtTime(280, t + 0.5);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.045, t + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.52);
  src.connect(lp);
  lp.connect(g);
  g.connect(c.destination);
  src.start(t);
  src.stop(t + 0.55);
}

export function playWhoosh(dir = 1) {
  const c = getCtx();
  if (!c || c.state !== "running") return;
  const t = c.currentTime;
  const o = c.createOscillator();
  o.type = "sine";
  const start = dir > 0 ? 220 : 360;
  const end = dir > 0 ? 360 : 180;
  o.frequency.setValueAtTime(start, t);
  o.frequency.exponentialRampToValueAtTime(end, t + 0.18);
  const g = envGain(c, t, 0.01, 0.18, 0.02);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + 0.2);
}

export function playPaperTap(intensity = 0.4) {
  const c = getCtx();
  if (!c || c.state !== "running") return;
  const t = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 0.06);
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 700 + intensity * 400;
  bp.Q.value = 1.2;
  const g = envGain(c, t, 0.001, 0.05, 0.04 * intensity);
  src.connect(bp);
  bp.connect(g);
  g.connect(c.destination);
  src.start(t);
  src.stop(t + 0.07);
}

export function blowLine(dir = 1) {
  unlockAudio();
  playGust();
  playWhoosh(dir);
  window.dispatchEvent(new CustomEvent("maccu:gust", { detail: { dir } }));
}
