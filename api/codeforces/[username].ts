import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

/**
 * Vercel Serverless Function — Codeforces Proxy
 *
 * Proxies requests to Codeforces API server-side to bypass CORS issues.
 *
 * Route: /api/codeforces/:username
 * Returns: CodeforcesProxyResponse (matches src/types/api-responses.ts)
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { username } = req.query;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ status: 400, message: "Username is required" });
  }

  try {
    const userInfoUrl = `https://codeforces.com/api/user.info?handles=${username}`;
    const statusUrl = `https://codeforces.com/api/user.status?handle=${username}&from=1&count=10000`;
    const ratingUrl = `https://codeforces.com/api/user.rating?handle=${username}`;

    // Fetch user info, status, and rating in parallel
    const [userInfoRes, statusRes, ratingRes] = await Promise.all([
      axios.get(userInfoUrl, { timeout: 10_000 }),
      axios.get(statusUrl, { timeout: 15_000 }),
      axios.get(ratingUrl, { timeout: 10_000 }).catch(() => null),
    ]);

    return res.status(200).json({
      status: 200,
      data: {
        userInfo: userInfoRes.data,
        userStatus: statusRes.data,
        userRating: ratingRes ? ratingRes.data : null,
      },
    });
  } catch (err: any) {
    console.error(`[Codeforces Proxy] Error fetching user ${username}:`, err.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch Codeforces data",
      error: err.message || String(err),
    });
  }
}
