/**
 * haptic — lightweight wrapper around navigator.vibrate
 *
 * Silently does nothing on desktop (API not present) or when
 * the browser/OS has vibration disabled.
 *
 * Usage:
 *   haptic("tap")          — 8ms, general tap
 *   haptic("tick")         — 6ms, very light (ring snap, icon tap)
 *   haptic("flip")         — 12ms, satisfying medium pulse (ID card flip)
 *   haptic("confirm")      — [10,50,10], double pulse (form submit)
 *   haptic([20, 80, 20])   — pass a raw pattern for custom use
 */

type HapticPreset = "tap" | "tick" | "flip" | "confirm";
type HapticPattern = number | number[];

const PRESETS: Record<HapticPreset, HapticPattern> = {
  tick:    6,
  tap:     8,
  flip:    12,
  confirm: [10, 50, 10],
};

export function haptic(input: HapticPreset | HapticPattern = "tap"): void {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;

  const pattern =
    typeof input === "string"
      ? PRESETS[input]
      : input;

  try {
    navigator.vibrate(pattern);
  } catch {
    // Some browsers throw if vibration is restricted — swallow silently
  }
}