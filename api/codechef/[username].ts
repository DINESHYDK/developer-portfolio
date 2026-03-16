import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as cheerio from "cheerio";
import axios from "axios";

/**
 * Vercel Serverless Function — CodeChef Scraper
 *
 * Mirrors the logic from Reference/hades/src/app/api/codechef/user/[username]/route.ts
 * but runs as a Vercel serverless function inside this portfolio project.
 *
 * Route: /api/codechef/:username
 * Returns: CodeChefRawResponse (matches types/api-responses.ts)
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { username } = req.query;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ status: 400, message: "Username is required" });
  }

  try {
    const url = `https://www.codechef.com/users/${username}`;

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 10_000,
    });

    const $ = cheerio.load(data);
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
      username: $(".m-username--link").first().text().trim(),
      country: $(".user-country-name").text().trim(),
      problemSolved: $(".problems-solved h3").eq(3).text().trim().split(" ")[3] ?? "0",
      rating: {
        currentRatingNumber: $(".rating-number").text().trim(),
        ratingStar: $(".rating-star").text().trim(),
        highestRating:
          $(".rating-header small").text().trim().split(" ")[2]?.replace(")", "") ?? "0",
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
