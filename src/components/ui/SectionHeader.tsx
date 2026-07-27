import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export function SectionHeader({ title, description, eyebrow }: SectionHeaderProps) {
  return (
    <header className="mb-12 sm:mb-16 relative">
      {eyebrow && (
        <motion.p
          className="text-[10px] font-medium uppercase tracking-[0.32em] text-[var(--color-text-disabled)] mb-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {eyebrow}
        </motion.p>
      )}
      <div className="overflow-hidden">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] leading-[1.05]"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
      </div>
      {description && (
        <motion.p
          className="mt-5 max-w-xl text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {description}
        </motion.p>
      )}
      <motion.div
        className="mt-8 h-px w-full bg-[var(--color-border)] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </header>
  );
}
