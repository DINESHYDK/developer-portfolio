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
    userInfo: (u: string) => `https://codeforces.com/api/user.info?handles=${u}`,
    userStatus: (u: string) => `https://codeforces.com/api/user.status?handle=${u}&from=1&count=10000`,
    userRating: (u: string) => `https://codeforces.com/api/user.rating?handle=${u}`,
  },
  codechef: {
    // Local Vercel serverless function — scrapes CodeChef profile server-side (no CORS)
    user: (u: string) => `/api/codechef/${u}`,
  },
  // TUF is static — no API endpoint
  tuf: null,
} as const;

/** How long to cache API responses (in milliseconds) */
export const CP_CACHE_TTL = 30 * 60 * 1000; // 30 minutes

