import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as cheerio from "cheerio";
import axios from "axios";

/**
 * Vercel Serverless Function — CodeChef Scraper (fallback path)
 *
 * Primary:  VITE_CODECHEF_API_URL env var → Reference/codechef-proxy/ deployed on Railway/Render
 * Fallback: this function on Vercel (may be blocked by Cloudflare from Vercel IPs)
 *
 * Route: /api/codechef/:username
 * Returns: CodeChefRawResponse (matches src/types/api-responses.ts)
 */

// Full browser header set — maximises Cloudflare bypass chance
const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Cache-Control": "max-age=0",
  Connection: "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "sec-ch-ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  DNT: "1",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { username } = req.query;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ status: 400, message: "Username is required" });
  }

  try {
    const { data: html } = await axios.get(
      `https://www.codechef.com/users/${username}`,
      {
        headers: BROWSER_HEADERS,
        timeout: 20_000,
        decompress: true,
        responseType: "text",
      }
    );

    const $ = cheerio.load(html);
    const contests: { name: string; problems?: string[] }[] = [];

    $(".problems-solved .content").each((idx) => {
      const contestName = $(".problems-solved .content h5").eq(idx).text();
      const rawText = $(".problems-solved .content p").eq(idx).text().trim();
      const normalized = rawText.replace(/\u00a0/g, " ").replace(/\s+/g, " ");
      const problems = normalized
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      contests.push({ name: contestName, problems });
    });

    const profile = {
      username: $(".m-username--link").first().text().trim() || username,
      country: $(".user-country-name").text().trim(),
      // "Fully Solved: N" → last token is the number
      problemSolved:
        $(".problems-solved h3").eq(3).text().trim().split(" ").at(-1) ?? "0",
      rating: {
        currentRatingNumber: $(".rating-number").text().trim(),
        ratingStar: $(".rating-star").text().trim(),
        // Highest rating appears as "(1652)" — strip the paren
        highestRating:
          $(".rating-header small")
            .text()
            .trim()
            .split(" ")
            .find((t: string) => /^\d+\)$/.test(t))
            ?.replace(")", "") ?? "0",
        globalRank: $(".rating-ranks strong").first().text().trim(),
        countryRank: $(".rating-ranks strong").last().text().trim(),
      },
      contests,
    };

    return res.status(200).json({ status: 200, data: profile });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch CodeChef data",
      error: String(err),
    });
  }
}
