import { MetadataRoute } from "next";

const BASE_URL = "https://www.bloodtestinlucknow.com";

// AI search / LLM crawlers we explicitly welcome (for AI-search visibility)
const AI_CRAWLERS = [
  "GPTBot", // OpenAI search crawler
  "ChatGPT-User", // OpenAI user-facing fetcher
  "OAI-SearchBot", // OpenAI search bot
  "ClaudeBot", // Anthropic crawler
  "anthropic-ai",
  "PerplexityBot", // Perplexity AI
  "Google-Extended", // Google AI training (does not affect ranking)
  "BingBot", // Bing (powers Copilot answers)
  "Applebot-Extended", // Apple Intelligence
  "Bytespider", // ByteDance AI
  "CCBot", // Common Crawl (used to train many models)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      // Explicitly allow AI crawlers on all public pages (blocks nothing extra)
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/admin/"],
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
