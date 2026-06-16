 /**
 * Coding Platform API Configuration
 *
 * Central config for all competitive programming platform API endpoints
 * and usernames. Update usernames here — everything else auto-updates.
 */

export const CP_USERNAMES = {
  leetcode: "dineshydk",
  codeforces: "dineshkrishnayeturi",
  codechef: "dinesh_ydk",
  tuf: "dineshydk", // TUF is static data — username kept for consistency
} as const;

export const CP_API_ENDPOINTS = {
  leetcode: {
    stats: (u: string) => `https://leetcode-stats.tashif.codes/${u}`,
    contests: (u: string) => `https://leetcode-stats.tashif.codes/${u}/contests`,
    profile: (u: string) => `https://leetcode-stats.tashif.codes/${u}/profile`,
  },
  codeforces: {
    user: (u: string) => `/api/codeforces/${u}`,
  },
  codechef: {
    // Primary:  VITE_CODECHEF_API_URL → Reference/codechef-proxy/ deployed on Railway/Render
    // Fallback: /api/codechef/:u    → Vercel serverless function (may be Cloudflare-blocked)
    user: (u: string) => {
      const base = import.meta.env.VITE_CODECHEF_API_URL as string | undefined;
      return base ? `${base}/api/codechef/user/${u}` : `/api/codechef/${u}`;
    },
  },
  // TUF is static — no API endpoint
  tuf: null,
} as const;

/** How long to cache API responses (in milliseconds) */
export const CP_CACHE_TTL = 30 * 60 * 1000; // 30 minutes

