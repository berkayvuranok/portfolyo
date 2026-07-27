import { memo } from "react";
import type { Skill } from "../../types";
import { skills, skillCategories } from "../../data/skills";
import { SectionHeader } from "../ui/SectionHeader";
import { SpotlightCard } from "../motion/SpotlightCard";

interface SkillsSectionProps {
  searchQuery: string;
  onSkillSelect: (skill: Skill) => void;
}

export const SkillsSection = memo(function SkillsSection({ searchQuery, onSkillSelect }: SkillsSectionProps) {
  const q = searchQuery.toLowerCase().trim();

  return (
    <div>
      <SectionHeader
        eyebrow="Toolkit"
        title="Yetenekler"
        description="Kartlara tıklayarak detay ve ilgili projeleri gör."
      />

      <div className="space-y-14">
        {skillCategories.map((category) => {
          const categorySkills = skills.filter((skill) => {
            if (skill.category !== category) return false;
            if (!q) return true;
            return (
              skill.name.toLowerCase().includes(q) ||
              skill.category.toLowerCase().includes(q) ||
              skill.description.toLowerCase().includes(q)
            );
          });
          if (categorySkills.length === 0) return null;

          return (
            <section key={category}>
              <div className="mb-5 flex items-center gap-4">
                <h3 className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-text-disabled)]">
                  {category}
                </h3>
                <div className="h-px flex-1 bg-[var(--color-border)]" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {categorySkills.map((skill, i) => (
                  <SpotlightCard
                    key={skill.name}
                    onClick={() => onSkillSelect(skill)}
                    cursorLabel="Detail"
                    index={i}
                    className="w-full p-5 text-left"
                  >
                    <span className="text-2xl mb-3 block transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                      {skill.icon}
                    </span>
                    <span className="block text-sm font-medium text-[var(--color-text-primary)]">{skill.name}</span>
                    <span className="mt-1 block text-[10px] text-[var(--color-text-disabled)] line-clamp-1">
                      {skill.category}
                    </span>
                  </SpotlightCard>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
});
