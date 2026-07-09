import type { ContentBlock, FlutterArticle } from "../data/flutterArticles";

export function estimateReadTime(blocks: ContentBlock[]): number {
  const text = blocks
    .filter((b) => b.type === "p" || b.type === "h2" || b.type === "h3" || b.type === "list" || b.type === "callout" || b.type === "quote")
    .map((b) => {
      if (b.type === "list") return b.items.join(" ");
      return b.content;
    })
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function getArticleMeta(article: FlutterArticle) {
  return {
    readTime: article.readTime ?? estimateReadTime(article.content),
    publishedAt: article.publishedAt ?? "2025-06-01",
    tags: article.tags ?? [article.category, article.topic],
    featured: article.featured ?? false,
  };
}

export function getTableOfContents(blocks: ContentBlock[]) {
  return blocks
    .map((block, index) => {
      if (block.type !== "h2" && block.type !== "h3") return null;
      return {
        id: `section-${index}`,
        content: block.content,
        level: block.type === "h2" ? 2 : 3,
      };
    })
    .filter((item): item is { id: string; content: string; level: number } => item !== null);
}

export function getRelatedArticles(article: FlutterArticle, all: FlutterArticle[], limit = 3) {
  return all
    .filter((a) => a.id !== article.id && (a.topic === article.topic || a.category === article.category))
    .slice(0, limit);
}
