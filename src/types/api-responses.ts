/**
 * Raw API Response Types
 *
 * These interfaces match the exact JSON structures returned by the
 * third-party APIs. They are NEVER used directly in UI components —
 * we always map them to our internal CodingPlatform type first.
 */

/* ===========================
   LeetCode (leetcode-stats.tashif.codes)
   =========================== */

export interface LeetCodeRawStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
}

export interface LeetCodeRawContest {
  contestAttend: number;
  contestRating: number;
  contestGlobalRanking: number;
  totalParticipants: number;
  contestTopPercentage: number;
  contestBadges: { name: string; icon: string }[];
  contestHistory: {
    attended: boolean;
    rating: number;
    ranking: number;
    contest: {
      title: string;
      startTime: number;
    };
  }[];
}

/* ===========================
   Codeforces (Official API)
   =========================== */

export interface CodeforcesRawUser {
  handle: string;
  email?: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contribution: number;
  friendOfCount: number;
  titlePhoto: string;
  avatar: string;
  registrationTimeSeconds: number;
  lastOnlineTimeSeconds: number;
}

export interface CodeforcesRawUserInfoResponse {
  status: string;
  result: CodeforcesRawUser[];
}

export interface CodeforcesRawSubmission {
  id: number;
  contestId?: number;
  problem: {
    contestId?: number;
    index: string;
    name: string;
    rating?: number;
    tags: string[];
  };
  verdict?: string;
  programmingLanguage: string;
  creationTimeSeconds: number;
}

export interface CodeforcesRawStatusResponse {
  status: string;
  result: CodeforcesRawSubmission[];
}

export interface CodeforcesRawRatingChange {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

export interface CodeforcesRawRatingResponse {
  status: string;
  result: CodeforcesRawRatingChange[];
}

/* ===========================
   CodeChef (hades.strawhats.tech/api/codechef/user)
   =========================== */

export interface CodeChefRawResponse {
  status: number;
  data: {
    username: string;
    country: string;
    problemSolved: string;
    rating: {
      currentRatingNumber: string;
      ratingStar: string;
      highestRating: string;
      globalRank: string;
      countryRank: string;
    };
    contests: {
      name: string;
      problems?: string[];
    }[];
  };
}

