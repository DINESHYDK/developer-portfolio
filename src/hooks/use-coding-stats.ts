import { useState, useEffect, useCallback } from "react";
import type { CodingStatsData } from "@/types";
import { fetchAllCodingStats, clearStatsCache } from "@/services/coding-stats-service";
import { CODING_STATS } from "@/data/coding-stats";

/**
 * useCodingStats
 *
 * React hook that fetches live coding stats from all platform APIs.
 *
 * - Shows mock data immediately (zero loading delay)
 * - Fetches real data in the background
 * - Merges live data once available
 * - Gracefully falls back to mock on failure
 * - Provides manual refresh capability
 */
interface UseCodingStatsReturn {
  /** The current stats data (mock or live) */
  data: CodingStatsData;
  /** True while the initial API fetch is in progress */
  isLoading: boolean;
  /** True once live data has been fetched at least once */
  isLive: boolean;
  /** Error message if all APIs failed (individual failures are silent) */
  error: string | null;
  /** Manually refetch all platform stats (clears cache first) */
  refresh: () => void;
}

export const useCodingStats = (): UseCodingStatsReturn => {
  const [data, setData] = useState<CodingStatsData>(CODING_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const liveData = await fetchAllCodingStats();

      if (liveData.platforms.length > 0) {
        setData(liveData);
        setIsLive(true);
      }
    } catch (err) {
      console.warn("[useCodingStats] Failed to fetch live stats:", err);
      setError("Could not fetch live stats. Showing cached data.");
      // data stays as mock — no crash
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const refresh = useCallback(() => {
    clearStatsCache();
    loadStats();
  }, [loadStats]);

  return { data, isLoading, isLive, error, refresh };
};

