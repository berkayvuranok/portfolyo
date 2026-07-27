import { motion } from "framer-motion";

interface HoverSweepProps {
  items: { year: string; title: string; detail: string }[];
}

export function HoverSweep({ items }: HoverSweepProps) {
  return (
    <ul className="divide-y divide-[var(--color-border)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
      {items.map((item, i) => (
        <motion.li
          key={item.year + item.title}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            data-cursor="hover"
            data-cursor-label="View"
            className="group relative flex w-full items-center gap-4 sm:gap-6 px-5 sm:px-7 py-5 text-left overflow-hidden"
          >
            <span
              className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[var(--color-text-primary)] transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              aria-hidden="true"
            />
            <span className="relative z-10 w-14 shrink-0 text-[10px] font-medium uppercase tracking-wider tabular-nums text-[var(--color-text-disabled)] group-hover:text-[var(--color-bg-primary)]/70 transition-colors duration-300">
              {item.year}
            </span>
            <span className="relative z-10 min-w-0 flex-1">
              <span className="block text-sm sm:text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-bg-primary)] transition-colors duration-300">
                {item.title}
              </span>
              <span className="mt-0.5 block text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-bg-primary)]/70 transition-colors duration-300">
                {item.detail}
              </span>
            </span>
            <span className="relative z-10 text-[var(--color-text-disabled)] group-hover:text-[var(--color-bg-primary)]/80 transition-all duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.li>
      ))}
    </ul>
  );
}
