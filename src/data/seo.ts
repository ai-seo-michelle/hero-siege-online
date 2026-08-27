import type { SeoPageConfig } from "../types/seo";
import { guidePages } from "./guidePages";
import keywordData from "./keywords.json";
import { pageMatrix } from "./pageMatrix";

const defaultStructuredDataTypes: SeoPageConfig["structuredDataTypes"] = [
  "WebPage",
  "BreadcrumbList"
];

export const siteSeo = {
  siteName: "Hero Siege Guide",
  canonicalBaseUrl: "https://herosiege.online",
  defaultTitle: "Hero Siege Guide - Season 10 Progression, Quests and Systems",
  defaultDescription:
    "Independent fan-made Hero Siege Season 10 progression, quest, system, and troubleshooting guide.",
  titleTemplate: "%s | Hero Siege Guide",
  focusAreas: [
    "Season 10",
    "Progression",
    "Quests",
    "Systems",
    "Current-version answers"
  ],
  avoidedPositioning: [
    "Official Hero Siege website",
    "Full Hero Siege Wiki",
    "Build database",
    "Tier list database"
  ],
  keywordCategories: keywordData.categories
} as const;

const publishedRoutes = new Set(guidePages.map((page) => page.route));

const matrixSeoPages = pageMatrix
  .filter((entry) => publishedRoutes.has(entry.route))
  .map((entry) => ({
    page: entry.page,
    title: `${entry.page} | Hero Siege Guide`,
    description: entry.userQuestion,
    canonicalPath: entry.route,
    primaryKeyword: entry.keyword,
    relatedKeywords: [entry.keyword],
    pageType: entry.pageType,
    structuredDataTypes: defaultStructuredDataTypes,
    sourcePriority: entry.sourcePriority,
    priority: entry.priority,
    launchDecision: entry.launchDecision
  }));

export const seoPages = [
  {
    page: "Hero Siege Guide Home",
    title: siteSeo.defaultTitle,
    description: siteSeo.defaultDescription,
    canonicalPath: "/",
    primaryKeyword: "hero siege season 10",
    relatedKeywords: ["hero siege guide"],
    pageType: "Guide Home",
    structuredDataTypes: defaultStructuredDataTypes
  },
  ...matrixSeoPages
] satisfies SeoPageConfig[];
