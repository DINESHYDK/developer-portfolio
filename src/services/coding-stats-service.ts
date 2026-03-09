import type { CodingPlatform, CodingStatsData } from "@/types";
import { CODING_STATS } from "@/data/coding-stats";

/**
 * Coding Platforms Service
 *
 * Extensible service for fetching coding stats from multiple platforms.
 * Currently returns mock data, structured to easily swap to real API calls.
 *
 * To add a new platform:
 * 1. Add the platform config to CODING_STATS in data/coding-stats.ts
 * 2. Add a fetch function here (e.g., fetchHackerRankStats)
 * 3. Register it in the PLATFORM_FETCHERS map
 * 4. That's it — the UI auto-renders any platform in the data
 */

type PlatformFetcher = (username: string) => Promise<CodingPlatform | null>;

/* ===========================
   Individual Platform Fetchers
   (Replace mock with real API calls)
   =========================== */

const fetchLeetCodeStats: PlatformFetcher = async (_username) => {
  // TODO: Replace with real API call
  // const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
  // const data = await res.json();
  // return mapLeetCodeResponse(data);
  return CODING_STATS.platforms.find((p) => p.id === "leetcode") ?? null;
};

const fetchCodeforcesStats: PlatformFetcher = async (_username) => {
  // TODO: Replace with real API call
  // const res = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
  // const data = await res.json();
  // return mapCodeforcesResponse(data);
  return CODING_STATS.platforms.find((p) => p.id === "codeforces") ?? null;
};

const fetchCodeChefStats: PlatformFetcher = async (_username) => {
  // TODO: Replace with real API call
  // const res = await fetch(`https://codechef-api.vercel.app/${username}`);
  // const data = await res.json();
  // return mapCodeChefResponse(data);
  return CODING_STATS.platforms.find((p) => p.id === "codechef") ?? null;
};

const fetchGeeksforGeeksStats: PlatformFetcher = async (_username) => {
  // TODO: Replace with real API call
  return CODING_STATS.platforms.find((p) => p.id === "geeksforgeeks") ?? null;
};

/* ===========================
   Platform Fetcher Registry
   Add new platforms here
   =========================== */

const PLATFORM_FETCHERS: Record<string, PlatformFetcher> = {
  leetcode: fetchLeetCodeStats,
  codeforces: fetchCodeforcesStats,
  codechef: fetchCodeChefStats,
  geeksforgeeks: fetchGeeksforGeeksStats,
  // Add more platforms here:
  // hackerrank: fetchHackerRankStats,
  // hackerearth: fetchHackerEarthStats,
};

/* ===========================
   Public API
   =========================== */

/**
 * Fetch stats for all registered platforms.
 */
export const fetchAllCodingStats = async (): Promise<CodingStatsData> => {
  const platformConfigs = CODING_STATS.platforms;

  const results = await Promise.allSettled(
    platformConfigs.map(async (config) => {
      const fetcher = PLATFORM_FETCHERS[config.id];
      if (!fetcher) return config; // fallback to mock data
      const result = await fetcher(config.username);
      return result ?? config;
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
 * Fetch stats for a single platform.
 */
export const fetchPlatformStats = async (
  platformId: string,
  username: string
): Promise<CodingPlatform | null> => {
  const fetcher = PLATFORM_FETCHERS[platformId];
  if (!fetcher) return null;
  return fetcher(username);
};

/**
 * Get the list of supported platform IDs.
 */
export const getSupportedPlatforms = (): string[] => {
  return Object.keys(PLATFORM_FETCHERS);
};

