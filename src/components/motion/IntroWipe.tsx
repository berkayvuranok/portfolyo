import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroWipeProps {
  onReveal?: () => void;
  onComplete?: () => void;
}

export function IntroWipe({ onReveal, onComplete }: IntroWipeProps) {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Start hero animations as panels open — not after they're gone
    const reveal = window.setTimeout(() => onReveal?.(), 1280);
    const done = window.setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 2200);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(done);
    };
  }, [onReveal, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
          <motion.div className="absolute inset-0 bg-[var(--color-text-primary)]" />

          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[var(--color-text-primary)] z-20"
            initial={{ y: 0 }}
            animate={{ y: "-105%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 1.25 }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[var(--color-text-primary)] z-20"
            initial={{ y: 0 }}
            animate={{ y: "105%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 1.25 }}
          />

          {/* Center content fades as wipe opens */}
          <motion.div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-8 pointer-events-none"
            animate={{ opacity: count >= 100 ? 0 : 1 }}
            transition={{ duration: 0.35, delay: 0.15 }}
          >
            <motion.p
              className="text-[10px] tracking-[0.5em] uppercase text-[var(--color-bg-primary)]/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Portfolio / 2026
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-[var(--color-bg-primary)]"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                Berkay Vuranok
              </motion.h1>
            </div>

            <div className="flex items-center gap-6">
              <motion.div
                className="h-px w-16 sm:w-24 bg-[var(--color-bg-primary)]/30 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              <span className="text-sm tabular-nums tracking-widest text-[var(--color-bg-primary)]/70">
                {String(count).padStart(3, "0")}
              </span>
              <motion.div
                className="h-px w-16 sm:w-24 bg-[var(--color-bg-primary)]/30 origin-right"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
