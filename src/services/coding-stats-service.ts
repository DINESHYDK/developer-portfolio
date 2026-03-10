import type { CodingPlatform, CodingStatsData } from "@/types";
import type {
  LeetCodeRawStats,
  LeetCodeRawContest,
  CodeforcesRawUserInfoResponse,
  CodeforcesRawStatusResponse,
  CodeforcesRawRatingResponse,
  CodeChefRawResponse,
} from "@/types/api-responses";
import { CP_API_ENDPOINTS, CP_USERNAMES, CP_CACHE_TTL } from "@/config/coding-platforms";
import { CODING_STATS } from "@/data/coding-stats";

/**
 * Coding Stats Service
 *
 * Fetches live stats from LeetCode, Codeforces, and CodeChef APIs.
 * Falls back to mock data (data/coding-stats.ts) if any API fails.
 *
 * To add a new platform:
 * 1. Add raw response type in types/api-responses.ts
 * 2. Add API endpoint in config/coding-platforms.ts
 * 3. Write a fetcher + mapper below
 * 4. Register in PLATFORM_FETCHERS
 * 5. Done — zero UI changes needed
 */

type PlatformFetcher = (username: string) => Promise<CodingPlatform | null>;

/* ============================================================
   In-memory cache to avoid hammering APIs on every mount
   ============================================================ */
interface CacheEntry {
  data: CodingPlatform;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

const getCached = (key: string): CodingPlatform | null => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CP_CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
};

const setCache = (key: string, data: CodingPlatform) => {
  cache.set(key, { data, timestamp: Date.now() });
};

/* ============================================================
   Helper: safe JSON fetch with timeout
   ============================================================ */
const safeFetch = async <T>(url: string, timeoutMs = 10_000): Promise<T> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
};

/* ============================================================
   LeetCode Fetcher + Mapper
   ============================================================ */
const fetchLeetCodeStats: PlatformFetcher = async (username) => {
  const cached = getCached("leetcode");
  if (cached) return cached;

  const endpoints = CP_API_ENDPOINTS.leetcode;

  // Fetch stats + contest data in parallel
  const [statsRaw, contestRaw] = await Promise.all([
    safeFetch<LeetCodeRawStats>(endpoints.stats(username)),
    safeFetch<LeetCodeRawContest>(endpoints.contests(username)).catch(() => null),
  ]);

  const platform: CodingPlatform = {
    id: "leetcode",
    name: "LeetCode",
    username,
    profileUrl: `https://leetcode.com/u/${username}`,
    accentColor: "#FFA116",
    totalSolved: statsRaw.totalSolved,
    totalProblems: statsRaw.totalQuestions,
    rating: contestRaw?.contestRating ? Math.round(contestRaw.contestRating) : undefined,
    globalRanking: contestRaw?.contestGlobalRanking ?? statsRaw.ranking,
    contestsAttended: contestRaw?.contestAttend ?? 0,
    breakdown: [
      { label: "Easy", solved: statsRaw.easySolved, total: statsRaw.totalEasy, color: "#00B8A3" },
      { label: "Medium", solved: statsRaw.mediumSolved, total: statsRaw.totalMedium, color: "#FFC01E" },
      { label: "Hard", solved: statsRaw.hardSolved, total: statsRaw.totalHard, color: "#EF4743" },
    ],
  };

  setCache("leetcode", platform);
  return platform;
};

/* ============================================================
   Codeforces Fetcher + Mapper
   ============================================================ */
const fetchCodeforcesStats: PlatformFetcher = async (username) => {
  const cached = getCached("codeforces");
  if (cached) return cached;

  const endpoints = CP_API_ENDPOINTS.codeforces;

  // Fetch user info, submissions, and rating history in parallel
  const [userInfoRaw, statusRaw, ratingRaw] = await Promise.all([
    safeFetch<CodeforcesRawUserInfoResponse>(endpoints.userInfo(username)),
    safeFetch<CodeforcesRawStatusResponse>(endpoints.userStatus(username)),
    safeFetch<CodeforcesRawRatingResponse>(endpoints.userRating(username)).catch(() => null),
  ]);

  const user = userInfoRaw.result[0];
  if (!user) throw new Error("Codeforces user not found");

  // Count unique solved problems + collect ratings & tags
  const solvedSet = new Set<string>();
  const indexCounts: Record<string, number> = {};
  const ratingCounts: Record<number, number> = {};
  const tagCounts: Record<string, number> = {};

  for (const sub of statusRaw.result) {
    if (sub.verdict === "OK") {
      const key = `${sub.problem.contestId ?? "gym"}-${sub.problem.index}-${sub.problem.name}`;
      if (!solvedSet.has(key)) {
        solvedSet.add(key);
        const idx = sub.problem.index.charAt(0);
        indexCounts[idx] = (indexCounts[idx] || 0) + 1;

        // Rating distribution (bucket to nearest 100)
        if (sub.problem.rating) {
          const bucket = Math.floor(sub.problem.rating / 100) * 100;
          ratingCounts[bucket] = (ratingCounts[bucket] || 0) + 1;
        }

        // Tag distribution
        for (const tag of sub.problem.tags) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      }
    }
  }

  // Build index distribution, grouping D and above into D+
  const indexColors: Record<string, string> = {
    A: "#52C41A",
    B: "#73D13D",
    C: "#FAAD14",
    D: "#FA8C16",
    E: "#F5222D",
    F: "#CF1322",
  };

  const sortedKeys = Object.keys(indexCounts).sort();
  const indexDistribution: { index: string; count: number; color: string }[] = [];
  let dPlusCount = 0;

  for (const k of sortedKeys) {
    if (k >= "D") {
      dPlusCount += indexCounts[k];
    } else {
      indexDistribution.push({
        index: k,
        count: indexCounts[k],
        color: indexColors[k] ?? "#8884d8",
      });
    }
  }
  if (dPlusCount > 0) {
    indexDistribution.push({ index: "D+", count: dPlusCount, color: "#F5222D" });
  }

  // Build rating distribution sorted by rating bucket
  const ratingColorScale = (r: number) => {
    if (r <= 800) return "#CCCCCC";
    if (r <= 1000) return "#77FF77";
    if (r <= 1200) return "#77DDBB";
    if (r <= 1400) return "#AAAAFF";
    if (r <= 1600) return "#FF88FF";
    if (r <= 1900) return "#FFCC88";
    if (r <= 2100) return "#FFBB55";
    return "#FF7777";
  };
  const ratingDistribution = Object.entries(ratingCounts)
    .map(([r, count]) => ({
      rating: String(Number(r)),
      count,
      color: ratingColorScale(Number(r)),
    }))
    .sort((a, b) => Number(a.rating) - Number(b.rating));

  // Build tag distribution — top 18 tags sorted by count
  const TAG_COLORS = [
    "#FF6B6B", "#FF8E8E", "#CC77FF", "#AA88FF", "#7799FF",
    "#55BBFF", "#55DDDD", "#55DDAA", "#77DD77", "#AADD55",
    "#CCCC55", "#998877", "#AA9988", "#88AA88", "#77BBBB",
    "#BB99AA", "#FFAA77", "#FF8855",
  ];
  const tagDistribution = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 18)
    .map(([tag, count], i) => ({
      tag,
      count,
      color: TAG_COLORS[i % TAG_COLORS.length],
    }));

  const platform: CodingPlatform = {
    id: "codeforces",
    name: "Codeforces",
    username,
    profileUrl: `https://codeforces.com/profile/${username}`,
    accentColor: "#1890FF",
    totalSolved: solvedSet.size,
    totalProblems: 9000,
    rating: user.rating,
    rank: user.rank,
    maxRating: user.maxRating,
    contestsAttended: ratingRaw?.result?.length ?? 0,
    indexDistribution,
    ratingDistribution,
    tagDistribution,
  };

  setCache("codeforces", platform);
  return platform;
};

/* ============================================================
   CodeChef Fetcher + Mapper (hades.strawhats.tech)
   ============================================================ */
const fetchCodeChefStats: PlatformFetcher = async (username) => {
  const cached = getCached("codechef");
  if (cached) return cached;

  const endpoints = CP_API_ENDPOINTS.codechef;

  const raw = await safeFetch<CodeChefRawResponse>(endpoints.user(username));

  if (raw.status !== 200 || !raw.data) throw new Error("CodeChef user not found");

  const d = raw.data;

  // Parse star count from string like "3★"
  const starCount = parseInt(d.rating.ratingStar?.replace(/[^\d]/g, "") || "0", 10);
  const division = starCount >= 5 ? 1 : starCount >= 3 ? 2 : 3;
  const currentRating = parseInt(d.rating.currentRatingNumber, 10) || 0;
  const highestRating = parseInt(d.rating.highestRating, 10) || currentRating;
  const globalRank = parseInt(d.rating.globalRank, 10) || undefined;
  const countryRank = parseInt(d.rating.countryRank, 10) || undefined;
  const problemsSolved = parseInt(d.problemSolved, 10) || 0;

  const platform: CodingPlatform = {
    id: "codechef",
    name: "CodeChef",
    username,
    profileUrl: `https://www.codechef.com/users/${username}`,
    accentColor: "#5B4638",
    totalSolved: problemsSolved,
    totalProblems: 5000,
    rating: currentRating,
    highestRating,
    division,
    stars: starCount,
    contestsAttended: d.contests?.length ?? 0,
    globalRank,
    countryRank,
  };

  // Merge static fields from mock data (certificates, streaks — not available via API)
  const mockCodechef = CODING_STATS.platforms.find((p) => p.id === "codechef");
  if (mockCodechef) {
    platform.certificates = mockCodechef.certificates;
    platform.maxStreak = mockCodechef.maxStreak;
    platform.currentStreak = mockCodechef.currentStreak;
  }

  setCache("codechef", platform);
  return platform;
};

/* ============================================================
   TUF Fetcher (Static data — no public API)
   ============================================================ */
const fetchTufStats: PlatformFetcher = async (_username) => {
  // TUF (Striver's A2Z sheet) has no public API.
  // Returns static data from data/coding-stats.ts.
  // Update the data file manually each week.
  return CODING_STATS.platforms.find((p) => p.id === "tuf") ?? null;
};

/* ============================================================
   Platform Fetcher Registry
   Add new platforms here — the UI auto-renders them
   ============================================================ */
const PLATFORM_FETCHERS: Record<string, PlatformFetcher> = {
  leetcode: fetchLeetCodeStats,
  codeforces: fetchCodeforcesStats,
  codechef: fetchCodeChefStats,
  tuf: fetchTufStats,
};

/* ============================================================
   Fallback helper — returns mock data for a given platform
   ============================================================ */
const getMockPlatform = (id: string): CodingPlatform | null =>
  CODING_STATS.platforms.find((p) => p.id === id) ?? null;

/* ============================================================
   Public API
   ============================================================ */

/**
 * Fetch stats for all registered platforms.
 * Each platform fetch is independent — a failure in one
 * doesn't block others. Failed platforms fall back to mock data.
 */
export const fetchAllCodingStats = async (): Promise<CodingStatsData> => {
  const platformConfigs = CODING_STATS.platforms;

  const results = await Promise.allSettled(
    platformConfigs.map(async (config) => {
      const fetcher = PLATFORM_FETCHERS[config.id];
      if (!fetcher) return config;

      try {
        const result = await fetcher(
          CP_USERNAMES[config.id as keyof typeof CP_USERNAMES] ?? config.username
        );
        return result ?? config;
      } catch (err) {
        console.warn(`[CodingStats] ${config.id} API failed, using fallback:`, err);
        return config;
      }
    })
  );

  const platforms = results
    .filter(
      (r): r is PromiseFulfilledResult<CodingPlatform> =>
        r.status === "fulfilled" && r.value !== null
    )
    .map((r) => r.value);

  return {
    platforms,
    lastUpdated: new Date().toISOString().split("T")[0],
  };
};

/**
 * Fetch stats for a single platform (with fallback).
 */
export const fetchPlatformStats = async (
  platformId: string,
  username?: string
): Promise<CodingPlatform | null> => {
  const fetcher = PLATFORM_FETCHERS[platformId];
  if (!fetcher) return getMockPlatform(platformId);

  const handle =
    username ??
    CP_USERNAMES[platformId as keyof typeof CP_USERNAMES] ??
    "dineshydk";

  try {
    return await fetcher(handle);
  } catch (err) {
    console.warn(`[CodingStats] ${platformId} failed, using fallback:`, err);
    return getMockPlatform(platformId);
  }
};

/**
 * Get the list of supported platform IDs.
 */
export const getSupportedPlatforms = (): string[] =>
  Object.keys(PLATFORM_FETCHERS);

/**
 * Clear the in-memory cache (useful for manual refresh).
 */
export const clearStatsCache = () => cache.clear();
