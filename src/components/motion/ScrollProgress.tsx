import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[80] h-[2px] pointer-events-none" aria-hidden="true">
      <motion.div
        className="h-full origin-left bg-[var(--color-text-primary)]"
        style={{ scaleX }}
      />
    </div>
  );
}
