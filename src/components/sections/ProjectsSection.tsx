import { memo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import type { Repo } from "../../types";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { SectionHeader } from "../ui/SectionHeader";
import { RepoCardSkeleton } from "../ui/Skeleton";

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

  return (
    <div>
      <SectionHeader
        title="GitHub Projelerim"
        description="Açık kaynak projelerim ve katkılarım."
      />

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <RepoCardSkeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <Card className="text-center py-12">
          <p className="text-sm text-[var(--color-error)]">{error}</p>
        </Card>
      )}

      {!loading && !error && filtered.length === 0 && (
        <Card className="text-center py-16">
          <FolderGit2 className="mx-auto h-8 w-8 text-[var(--color-text-disabled)] mb-4" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            {searchQuery ? "Aramanızla eşleşen proje bulunamadı." : "Henüz proje bulunamadı."}
          </p>
        </Card>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((repo, i) => (
            <RepoCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
      )}
    </div>
  );
});

const RepoCard = memo(function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="group block"
    >
      <Card hover className="h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-medium text-[var(--color-text-primary)] truncate group-hover:underline underline-offset-2">
            {repo.name}
          </h3>
          {repo.language && <Badge>{repo.language}</Badge>}
        </div>
        <p className="flex-grow text-sm text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
          {repo.description || "Açıklama bulunmuyor."}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-[var(--color-text-disabled)]">
          <span>Görüntüle</span>
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </div>
      </Card>
    </motion.a>
  );
});
