import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxHeroProps {
  children: ReactNode;
  background?: ReactNode;
  className?: string;
}

export function ParallaxHero({ children, background, className = "" }: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });
  const yBg = useTransform(smooth, [0, 1], [0, 100]);
  const opacity = useTransform(smooth, [0, 0.85], [1, 0.15]);
  const yContent = useTransform(smooth, [0, 1], [0, 48]);
  const scaleContent = useTransform(smooth, [0, 1], [1, 0.98]);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden ${className}`}>
      {background && (
        <motion.div
          className="absolute inset-0 -z-10 pointer-events-none will-change-transform"
          style={{ y: yBg }}
        >
          {background}
        </motion.div>
      )}
      <motion.div
        className="will-change-transform"
        style={{ y: yContent, opacity, scale: scaleContent }}
      >
        {children}
      </motion.div>
    </div>
  );
}
