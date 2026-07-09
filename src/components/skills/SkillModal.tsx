import { ExternalLink, FolderGit2 } from "lucide-react";
import type { Repo, Skill } from "../../types";
import { Modal } from "../ui/Modal";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

interface SkillModalProps {
  skill: Skill | null;
  relatedRepos: Repo[];
  onClose: () => void;
}

export function SkillModal({ skill, relatedRepos, onClose }: SkillModalProps) {
  return (
    <Modal open={!!skill} onClose={onClose} title={skill?.name}>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl" aria-hidden="true">
          {skill?.icon}
        </span>
        {skill && <Badge>{skill.category}</Badge>}
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-disabled)] mb-2">
          Hakkında
        </h3>
        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
          {skill?.description}
        </p>
      </div>

      <div>
        <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-disabled)] mb-4 flex items-center gap-2">
          <FolderGit2 className="h-3.5 w-3.5" />
          İlgili Projeler
        </h3>

        {relatedRepos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card hover padding="sm">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <span className="font-medium text-sm text-[var(--color-text-primary)] truncate group-hover:underline underline-offset-2">
                      {repo.name}
                    </span>
                    <ExternalLink className="h-3 w-3 shrink-0 text-[var(--color-text-disabled)]" />
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">
                    {repo.description || "Açıklama yok"}
                  </p>
                </Card>
              </a>
            ))}
          </div>
        ) : (
          <Card className="text-center py-8 border-dashed">
            <p className="text-sm text-[var(--color-text-disabled)]">
              Bu yetenekle etiketlenmiş açık kaynak proje bulunamadı.
            </p>
          </Card>
        )}
      </div>
    </Modal>
  );
}
