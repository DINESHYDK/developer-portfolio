import type { ReactNode } from "react";
import { CodingStatsContext, useCodingStats } from "@/hooks/use-coding-stats";

/**
 * CodingStatsProvider
 *
 * Provides ONE shared instance of useCodingStats to the whole app.
 * Previously IdCard and CodingStatsSection each ran their own hook,
 * which duplicated every platform API call on page load and let the
 * two views drift out of sync (e.g. refresh only updated the section).
 */
export const CodingStatsProvider = ({ children }: { children: ReactNode }) => {
  const value = useCodingStats();
  return (
    <CodingStatsContext.Provider value={value}>
      {children}
    </CodingStatsContext.Provider>
  );
};
