import { memo } from "react";
import { motion } from "framer-motion";
import type { Skill } from "../../types";
import { skills, skillCategories } from "../../data/skills";
import { Card } from "../ui/Card";
import { SectionHeader } from "../ui/SectionHeader";

interface SkillsSectionProps {
  searchQuery: string;
  onSkillSelect: (skill: Skill) => void;
}

export const SkillsSection = memo(function SkillsSection({ searchQuery, onSkillSelect }: SkillsSectionProps) {
  const q = searchQuery.toLowerCase().trim();

  return (
    <div>
      <SectionHeader
        title="Teknik Yetenekler"
        description="Detayları ve ilgili projeleri görmek için kartlara tıklayın."
      />

      <div className="space-y-10">
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
              <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-[var(--color-text-disabled)]">
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {categorySkills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} onClick={() => onSkillSelect(skill)} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
});

const SkillCard = memo(function SkillCard({
  skill,
  index,
  onClick,
}: {
  skill: Skill;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      onClick={onClick}
      className="text-left w-full"
    >
      <Card hover padding="sm" className="flex flex-col items-center text-center h-full">
        <span className="text-2xl mb-2" aria-hidden="true">
          {skill.icon}
        </span>
        <span className="text-sm font-medium text-[var(--color-text-primary)]">{skill.name}</span>
      </Card>
    </motion.button>
  );
});
