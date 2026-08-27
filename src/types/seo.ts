export type StructuredDataType = "WebPage" | "FAQPage" | "BreadcrumbList" | "Article";

export interface SeoPageConfig {
  page: string;
  title: string;
  description: string;
  canonicalPath: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  pageType: string;
  structuredDataTypes: StructuredDataType[];
  sourcePriority?: string;
  priority?: "P0" | "P1" | "P2";
  launchDecision?: string;
}
