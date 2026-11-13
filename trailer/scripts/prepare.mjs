/**
 * 1. Copies the site assets the trailer needs into trailer/public/assets
 *    (gitignored, so the repo doesn't store duplicates).
 * 2. Synthesises the audio: a button click and a 120 BPM backing track.
 *    Everything is generated here, so there are no licensing questions.
 *    To use your own music instead, drop it at public/audio/music.wav.
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const trailerRoot = join(here, "..");
const siteRoot = join(trailerRoot, "..");
const assetsDir = join(trailerRoot, "public", "assets");
const audioDir = join(trailerRoot, "public", "audio");
mkdirSync(assetsDir, { recursive: true });
mkdirSync(audioDir, { recursive: true });

/* ── 1. assets ─────────────────────────────── */
const ASSETS = [
  ["src/public/images/profile.webp", "profile.webp"],
  ["src/public/images/IIT_(ISM)_Dhanbad_Logo.svg", "iit-logo.svg"],
  ["public/images/projects/RubiksCube.webp", "rubiks.webp"],
  ["public/images/projects/StudySync.webp", "studysync.webp"],
  ["public/images/projects/DsaVisualiser.webp", "dsa.webp"],
  ["public/images/projects/GolfGive.webp", "golfgive.webp"],
  ["public/images/projects/TrackpadWriter.webp", "trackpad.webp"],
];
for (const [from, to] of ASSETS) {
  copyFileSync(join(siteRoot, from), join(assetsDir, to));
}

/* ── 2. audio ──────────────────────────────── */
const SR = 44100;

const writeWav = (path, samples) => {
  const data = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    data.writeInt16LE(Math.round(s * 32767), i * 2);
  }
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(SR, 24);
  header.writeUInt32LE(SR * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(data.length, 40);
  writeFileSync(path, Buffer.concat([header, data]));
};

// Deterministic noise so every render sounds identical
let seed = 1234567;
const noise = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return (seed / 0x7fffffff) * 2 - 1;
};

/* Click: short noise transient + a damped 3.2 kHz ping + low thunk */
const click = new Float32Array(Math.round(SR * 0.06));
for (let i = 0; i < click.length; i++) {
  const t = i / SR;
  const transient = noise() * Math.exp(-t * 900);
  const ping = Math.sin(2 * Math.PI * 3200 * t) * Math.exp(-t * 160) * 0.5;
  const thunk = Math.sin(2 * Math.PI * 180 * t) * Math.exp(-t * 90) * 0.6;
  click[i] = (transient * 0.7 + ping + thunk) * 0.8;
}
writeWav(join(audioDir, "click.wav"), click);

/* Music: 120 BPM (1 beat = 15 frames at 30 fps), Am–F–C–G, 38 s.
   0–4 s: pad only (intro, clicks carry it). 4 s: drums + bass come in.
   Last 3 s: fade out. */
const musicPath = join(audioDir, "music.wav");
if (!existsSync(musicPath) || process.argv.includes("--force-music")) {
  const DURATION = 36; // keep equal to the composition length
  const BEAT = 0.5;
  const out = new Float32Array(SR * DURATION);
  const midi = (n) => 440 * 2 ** ((n - 69) / 12);
  // chord roots + triads (MIDI), one chord per bar (2 s)
  const CHORDS = [
    [57, 60, 64], // Am
    [53, 57, 60], // F
    [48, 52, 55], // C
    [55, 59, 62], // G
  ];

  // one-pole low-pass state for the pad
  let lp = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / SR;
    const bar = Math.floor(t / 2);
    const chord = CHORDS[bar % 4];
    const beatPos = (t % BEAT) / BEAT; // 0..1 inside a beat
    const beatIndex = Math.floor(t / BEAT);
    const drumsOn = t >= 4;

    // pad: detuned saws, low-passed, slow swell
    let pad = 0;
    for (const n of chord) {
      for (const detune of [-0.08, 0.08]) {
        const f = midi(n) * 2 ** (detune / 12);
        pad += ((t * f) % 1) * 2 - 1;
      }
    }
    pad /= 6;
    const cutoff = drumsOn ? 0.06 : 0.025 + 0.035 * (t / 4);
    lp += cutoff * (pad - lp);
    let s = lp * 0.35;

    if (drumsOn) {
      // kick on every beat: pitch sweep 110 → 45 Hz
      const kt = t % BEAT;
      const kf = 45 + 65 * Math.exp(-kt * 30);
      s += Math.sin(2 * Math.PI * kf * kt) * Math.exp(-kt * 9) * 0.55;

      // hi-hat on off-beats (8ths)
      const ht = t % (BEAT / 2);
      if (Math.floor(t / (BEAT / 2)) % 2 === 1) {
        s += noise() * Math.exp(-ht * 120) * 0.12;
      }

      // clap on beats 2 and 4
      if (beatIndex % 2 === 1) {
        s += noise() * Math.exp(-beatPos * BEAT * 40) * 0.18;
      }

      // bass: root an octave down, 8th-note pulse
      const bt = t % (BEAT / 2);
      const bf = midi(chord[0] - 12);
      s += Math.sin(2 * Math.PI * bf * t) * Math.exp(-bt * 6) * 0.28;
    }

    // master fade in/out
    const fadeIn = Math.min(1, t / 0.8);
    const fadeOut = Math.min(1, (DURATION - t) / 3);
    out[i] = Math.tanh(s * 1.2) * 0.7 * fadeIn * fadeOut;
  }
  writeWav(musicPath, out);
}

console.log("trailer assets + audio ready");
