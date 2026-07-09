import { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { flutterArticles, type FlutterArticle, type ContentBlock, type ArticleTopic } from "../../data/flutterArticles";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";
import {
  formatArticleDate,
  getArticleMeta,
  getRelatedArticles,
  getTableOfContents,
} from "../../utils/articles";

const TOPICS: { id: ArticleTopic | "all"; label: string }[] = [
  { id: "all", label: "Tümü" },
  { id: "Flutter", label: "Flutter" },
  { id: "AI", label: "AI" },
  { id: "Web", label: "Web" },
];

interface ArticlesSectionProps {
  selectedArticleId: string | null;
  onSelectArticle: (id: string) => void;
  onBack: () => void;
  searchQuery: string;
}

export const ArticlesSection = memo(function ArticlesSection({
  selectedArticleId,
  onSelectArticle,
  onBack,
  searchQuery,
}: ArticlesSectionProps) {
  const [topicFilter, setTopicFilter] = useState<ArticleTopic | "all">("all");

  const selectedArticle = selectedArticleId
    ? flutterArticles.find((a) => a.id === selectedArticleId)
    : null;

  if (selectedArticle) {
    return (
      <ArticleDetail
        article={selectedArticle}
        onBack={onBack}
        onSelectArticle={onSelectArticle}
      />
    );
  }

  const q = searchQuery.toLowerCase().trim();

  const filtered = useMemo(() => {
    return flutterArticles
      .filter((a) => {
        if (topicFilter !== "all" && a.topic !== topicFilter) return false;
        if (!q) return true;
        const meta = getArticleMeta(a);
        return (
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          meta.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => new Date(getArticleMeta(b).publishedAt).getTime() - new Date(getArticleMeta(a).publishedAt).getTime());
  }, [topicFilter, q]);

  const featured = filtered.find((a) => getArticleMeta(a).featured) ?? filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  return (
    <div>
      <SectionHeader
        title="Yazılarım"
        description="Teknik notlar, rehberler ve öğrenme kayıtları. Flutter, AI ve web geliştirme üzerine."
      />

      {/* Topic filters — blog category chips */}
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Konu filtreleri">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            role="tab"
            aria-selected={topicFilter === topic.id}
            onClick={() => setTopicFilter(topic.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
              topicFilter === topic.id
                ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)]"
                : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-disabled)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {topic.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="text-center py-16">
          <BookOpen className="mx-auto h-8 w-8 text-[var(--color-text-disabled)] mb-4" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            {q ? "Aramanızla eşleşen yazı bulunamadı." : "Bu kategoride henüz yazı yok."}
          </p>
        </Card>
      )}

      {/* Featured article — hero card */}
      {featured && (
        <section className="mb-10" aria-label="Öne çıkan yazı">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--color-text-disabled)]">
            Öne Çıkan
          </p>
          <FeaturedArticleCard article={featured} onClick={() => onSelectArticle(featured.id)} />
        </section>
      )}

      {/* Article grid */}
      {rest.length > 0 && (
        <section aria-label="Tüm yazılar">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-[var(--color-text-disabled)]">
            Son Yazılar
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                index={i}
                onClick={() => onSelectArticle(article.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

function ArticleMeta({ article }: { article: FlutterArticle }) {
  const meta = getArticleMeta(article);
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-disabled)]">
      <span className="inline-flex items-center gap-1">
        <Calendar className="h-3 w-3" aria-hidden="true" />
        <time dateTime={meta.publishedAt}>{formatArticleDate(meta.publishedAt)}</time>
      </span>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3 w-3" aria-hidden="true" />
        {meta.readTime} dk okuma
      </span>
      <span className="inline-flex items-center gap-1">
        <Tag className="h-3 w-3" aria-hidden="true" />
        {article.topic}
      </span>
    </div>
  );
}

const FeaturedArticleCard = memo(function FeaturedArticleCard({
  article,
  onClick,
}: {
  article: FlutterArticle;
  onClick: () => void;
}) {
  const meta = getArticleMeta(article);
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="text-left w-full group"
    >
      <Card hover padding="lg" className="relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <span className="text-4xl shrink-0" aria-hidden="true">
            {article.emoji}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge>{article.category}</Badge>
              {meta.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] group-hover:underline underline-offset-4">
              {article.title}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
              {article.excerpt}
            </p>
            <div className="mt-4">
              <ArticleMeta article={article} />
            </div>
          </div>
        </div>
      </Card>
    </motion.button>
  );
});

const ArticleCard = memo(function ArticleCard({
  article,
  index,
  onClick,
}: {
  article: FlutterArticle;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      onClick={onClick}
      className="text-left w-full group"
    >
      <Card hover className="h-full flex flex-col">
        <span className="text-xl mb-3" aria-hidden="true">
          {article.emoji}
        </span>
        <Badge>{article.category}</Badge>
        <h3 className="mt-3 font-medium text-[var(--color-text-primary)] leading-snug group-hover:underline underline-offset-2">
          {article.title}
        </h3>
        <p className="mt-2 flex-grow text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
          <ArticleMeta article={article} />
        </div>
      </Card>
    </motion.button>
  );
});

function ArticleDetail({
  article,
  onBack,
  onSelectArticle,
}: {
  article: FlutterArticle;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
}) {
  const meta = getArticleMeta(article);
  const toc = getTableOfContents(article.content);
  const related = getRelatedArticles(article, flutterArticles);

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl"
    >
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-6 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        Yazılara dön
      </Button>

      {/* Article header — blog post hero */}
      <header className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge>{article.category}</Badge>
          {meta.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] text-balance">
          {article.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
          {article.excerpt}
        </p>
        <div className="mt-6">
          <ArticleMeta article={article} />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Table of contents — sidebar like Medium/Dev.to */}
        {toc.length > 2 && (
          <aside className="lg:w-56 shrink-0">
            <nav
              className="lg:sticky lg:top-24 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4"
              aria-label="İçindekiler"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-disabled)] mb-3">
                İçindekiler
              </p>
              <ul className="space-y-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 ${
                        item.level === 3 ? "pl-3" : ""
                      }`}
                    >
                      {item.content}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* Article body */}
        <div className="flex-1 min-w-0">
          <ArticleContent blocks={article.content} />
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-[var(--color-border)]" aria-label="İlgili yazılar">
          <h2 className="text-sm font-medium uppercase tracking-wider text-[var(--color-text-disabled)] mb-6">
            İlgili Yazılar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel, i) => (
              <ArticleCard
                key={rel.id}
                article={rel}
                index={i}
                onClick={() => onSelectArticle(rel.id)}
              />
            ))}
          </div>
        </section>
      )}
    </motion.article>
  );
}

function ArticleContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-custom space-y-5">
      {blocks.map((block, i) => {
        const sectionId = block.type === "h2" || block.type === "h3" ? `section-${i}` : undefined;

        if (block.type === "h2") {
          return (
            <h2
              key={i}
              id={sectionId}
              className="text-xl font-semibold mt-10 mb-3 first:mt-0 text-[var(--color-text-primary)] tracking-tight scroll-mt-24"
            >
              {block.content}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={i}
              id={sectionId}
              className="text-lg font-medium mt-8 mb-2 text-[var(--color-text-primary)] scroll-mt-24"
            >
              {block.content}
            </h3>
          );
        }
        if (block.type === "p") {
          return (
            <p key={i} className="text-base text-[var(--color-text-secondary)] leading-[1.75]">
              {block.content}
            </p>
          );
        }
        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={i}
              className={`pl-5 space-y-2 text-base text-[var(--color-text-secondary)] leading-relaxed ${
                block.ordered ? "list-decimal" : "list-disc"
              }`}
            >
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ListTag>
          );
        }
        if (block.type === "callout") {
          const variants = {
            info: "border-[var(--color-border)] bg-[var(--color-bg-secondary)]",
            tip: "border-[var(--color-text-disabled)] bg-[var(--color-bg-secondary)]",
            warning: "border-[var(--color-warning)] bg-[var(--color-bg-secondary)]",
          };
          const labels = { info: "Bilgi", tip: "İpucu", warning: "Dikkat" };
          const variant = block.variant ?? "info";
          return (
            <aside
              key={i}
              className={`rounded-[var(--radius-md)] border-l-4 p-4 ${variants[variant]}`}
              role="note"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-disabled)] mb-1">
                {labels[variant]}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{block.content}</p>
            </aside>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-[var(--color-accent)] pl-4 py-1 italic text-[var(--color-text-secondary)]"
            >
              <p className="text-base leading-relaxed">"{block.content}"</p>
              {block.author && (
                <footer className="mt-2 text-sm not-italic text-[var(--color-text-disabled)]">
                  — {block.author}
                </footer>
              )}
            </blockquote>
          );
        }
        if (block.type === "code") {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-xs sm:text-sm font-mono text-[var(--color-text-primary)] leading-relaxed"
            >
              <code>{block.content}</code>
            </pre>
          );
        }
        return null;
      })}
    </div>
  );
}
