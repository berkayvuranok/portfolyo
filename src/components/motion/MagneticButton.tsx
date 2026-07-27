import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  cursorLabel?: string;
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 0.4,
  cursorLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 16 });
  const springY = useSpring(y, { stiffness: 260, damping: 16 });
  const scale = useSpring(1, { stiffness: 300, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
    scale.set(1.06);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const content = (
    <motion.span style={{ x: springX, y: springY }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ scale }}
        className={className}
        data-cursor="hover"
        data-cursor-label={cursorLabel}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ scale }}
      className={className}
      data-cursor="hover"
      data-cursor-label={cursorLabel}
    >
      {content}
    </motion.button>
  );
}

/** Profile image with subtle 3D tilt follow */
export function MagneticImage({
  src,
  alt,
  className = "",
  ready = true,
}: {
  src: string;
  alt: string;
  className?: string;
  ready?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 18 });
  const sheen = useTransform(mx, [-0.5, 0.5], [0.12, 0.4]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="relative"
      data-cursor="hover"
      data-cursor-label="Hey"
      initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
      animate={
        ready
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.85, filter: "blur(12px)" }
      }
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Orbit rings */}
      <motion.div
        className="pointer-events-none absolute -inset-4 rounded-[1.75rem] border border-[var(--color-border)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ delay: ready ? 0.25 : 0, duration: 0.7 }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-8 rounded-[2rem] border border-dashed border-[var(--color-border)]/60"
        initial={{ opacity: 0, rotate: -8 }}
        animate={ready ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -8 }}
        transition={{ delay: ready ? 0.4 : 0, duration: 0.9 }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-8"
        animate={ready ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-text-primary)]" />
      </motion.div>

      <motion.img
        src={src}
        alt={alt}
        className={className}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: ready ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: ready ? 0.05 : 0 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent mix-blend-overlay"
        style={{ opacity: sheen }}
      />
    </motion.div>
  );
}
