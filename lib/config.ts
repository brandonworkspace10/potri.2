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

/** Hours per week each option covers. */
export const HUMAN_HOURS_PER_WEEK = 40;
export const POTRI_HOURS_PER_WEEK = 168;
