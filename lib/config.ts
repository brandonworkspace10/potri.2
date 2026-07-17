/**
 * Single source of truth for the booking destination.
 * Replace with the real Calendly (or other scheduler) URL — every CTA reads from here.
 */
export const BOOKING_URL = "#book";

export const SITE_NAME = "Potri";

/**
 * Canonical origin. Drives metadataBase, sitemap, robots, OG/Twitter URLs and
 * JSON-LD @ids.
 *
 * potri.com is aftermarket (~$3k) and owned by a third party — it must never
 * be the canonical. potri.ai was confirmed available ($160/2yr) on 2026-07-16;
 * buy before deploying, or change this one line if a different domain wins.
 */
export const SITE_URL = "https://potri.ai";

/** Flat monthly price for the full three-agent team. */
export const TEAM_PRICE = 5200;

/**
 * Current promo: hire any 2 agents, the 3rd is free for the first 6 months,
 * then it moves to its normal listed price. Single source of truth — pricing
 * copy, FAQ, and llms.txt all read from this so the terms can't drift.
 */
export const PROMO = {
  active: true,
  headline: "Hire 2 agents. Get the 3rd free.",
  detail: "Free for your first 6 months, then it moves to its normal monthly price.",
};

/** Hours per week each option covers. */
export const HUMAN_HOURS_PER_WEEK = 40;
export const POTRI_HOURS_PER_WEEK = 168;
