import { SITE_METADATA } from "@/config/site-metadata";

/**
 * Fallback values used only while live platform stats are loading or if
 * every API fails. Keep these in line with the resume (public/resume.pdf).
 */
export const profileData = {
  name: SITE_METADATA.name,
  handle: SITE_METADATA.handle,
  title: "Full-Stack · Competitive Programming",
  status: "Open to internships",
  college: "IIT (ISM) Dhanbad",
  stats: {
    cpRating: 2033,
    platform: "LeetCode",
    problemsSolved: 2200,
    projects: 7,
  },
  resumeUrl: SITE_METADATA.resumeUrl,
} as const;
