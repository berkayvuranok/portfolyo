import { memo } from "react";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import type { Repo } from "../../types";
import { Badge } from "../ui/Badge";
import { SectionHeader } from "../ui/SectionHeader";
import { RepoCardSkeleton } from "../ui/Skeleton";
import { SpotlightCard } from "../motion/SpotlightCard";

interface ProjectsSectionProps {
  repos: Repo[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export const ProjectsSection = memo(function ProjectsSection({
  repos,
  loading,
  error,
  searchQuery,
}: ProjectsSectionProps) {
  const filtered = repos.filter((repo) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      repo.name.toLowerCase().includes(q) ||
      (repo.description?.toLowerCase().includes(q) ?? false) ||
      (repo.language?.toLowerCase().includes(q) ?? false)
    );
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div>
      <SectionHeader
        eyebrow="Selected Work"
        title="Projeler"
        description="GitHub’daki açık kaynak çalışmalarım ve deneylerim."
      />

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <RepoCardSkeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] py-20 text-center">
          <FolderGit2 className="mx-auto h-8 w-8 text-[var(--color-text-disabled)] mb-4" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            {searchQuery ? "Aramanızla eşleşen proje yok." : "Henüz proje yok."}
          </p>
        </div>
      )}

      {!loading && !error && featured && (
        <div className="space-y-4">
          <SpotlightCard
            href={featured.html_url}
            cursorLabel="Open"
            index={0}
            className="block p-8 sm:p-10 lg:p-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-disabled)] mb-4">
                  Featured · 01
                </p>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
                  {featured.name}
                </h3>
                <p className="mt-4 max-w-2xl text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {featured.description || "Açıklama bulunmuyor."}
                </p>
                {featured.language && (
                  <div className="mt-6">
                    <Badge>{featured.language}</Badge>
                  </div>
                )}
              </div>
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] transition-transform duration-300 group-hover:rotate-45 group-hover:bg-[var(--color-text-primary)] group-hover:text-[var(--color-bg-primary)]">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </SpotlightCard>

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

const RepoCard = memo(function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  return (
    <SpotlightCard href={repo.html_url} cursorLabel="Open" index={index} className="block p-6 h-full">
      <div className="flex items-start justify-between gap-3 mb-5">
        <span className="text-[10px] tabular-nums tracking-wider text-[var(--color-text-disabled)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--color-text-disabled)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-text-primary)]" />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)] truncate pr-2">
        {repo.name}
      </h3>
      {repo.language && (
        <div className="mt-3 mb-4">
          <Badge>{repo.language}</Badge>
        </div>
      )}
      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed min-h-[2.75rem]">
        {repo.description || "Açıklama bulunmuyor."}
      </p>
    </SpotlightCard>
  );
});
