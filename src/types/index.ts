export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  liveUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  challenges?: string[];
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface SiteMetadata {
  name: string;
  title: string;
  description: string;
  role: string;
  email: string;
  github: string;
  linkedin: string;
}

/* ===========================
   Coding Platform Types
   =========================== */
export interface PlatformProblemBreakdown {
  label: string;
  solved: number;
  total: number;
  color: string;
}

export interface IndexDistribution {
  index: string;
  count: number;
  color: string;
}

export interface CodingPlatform {
  id: string;
  name: string;
  username: string;
  profileUrl: string;
  accentColor: string;
  totalSolved: number;
  totalProblems?: number;
  rating?: number;
  rank?: string;
  globalRanking?: number;
  contestsAttended?: number;

  // LeetCode specific
  breakdown?: PlatformProblemBreakdown[];

  // Codeforces specific
  maxRating?: number;
  indexDistribution?: IndexDistribution[];

  // CodeChef specific
  division?: number;
  stars?: number;
  certificates?: string[];
  maxStreak?: number;

  // GeeksforGeeks specific
  codingScore?: number;
  potdStreak?: number;
  instituteRank?: number;
}

export interface CodingStatsData {
  platforms: CodingPlatform[];
  lastUpdated: string;
}
