import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  cursorLabel?: string;
  index?: number;
}

export function SpotlightCard({
  children,
  className = "",
  href,
  onClick,
  cursorLabel,
  index = 0,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const background = useMotionTemplate`radial-gradient(420px circle at ${springX}px ${springY}px, color-mix(in srgb, var(--color-text-primary) 9%, transparent), transparent 55%)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const inner = (
    <>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </>
  );

  const shellClass = `group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        onMouseMove={onMove}
        data-cursor="hover"
        data-cursor-label={cursorLabel}
        className={shellClass}
      >
        <div ref={ref} className="contents">
          {inner}
        </div>
      </motion.a>
    );
  }

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        onMouseMove={onMove}
        data-cursor="hover"
        data-cursor-label={cursorLabel}
        className={`${shellClass} text-left w-full`}
      >
        <div ref={ref} className="contents">
          {inner}
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      onMouseMove={onMove}
      data-cursor="hover"
      data-cursor-label={cursorLabel}
      className={shellClass}
    >
      {inner}
    </motion.div>
  );
}
