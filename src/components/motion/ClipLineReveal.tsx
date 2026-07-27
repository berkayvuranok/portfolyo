import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ClipLineRevealProps {
  text: string;
  className?: string;
  active?: boolean;
  delay?: number;
}

export function ClipLineReveal({ text, className = "", active, delay = 0 }: ClipLineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const play = active ?? inView;
  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-[1.8]">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.28em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "115%", rotate: 3, opacity: 0, filter: "blur(4px)" }}
              animate={
                play
                  ? { y: 0, rotate: 0, opacity: 1, filter: "blur(0px)" }
                  : { y: "115%", rotate: 3, opacity: 0, filter: "blur(4px)" }
              }
              transition={{
                duration: 0.55,
                delay: play ? delay + 0.04 + i * 0.03 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </p>
      <div className="mt-5 relative h-px overflow-hidden bg-[var(--color-border)]">
        <motion.div
          className="absolute inset-y-0 left-0 w-full bg-[var(--color-text-primary)] origin-left"
          initial={{ scaleX: 0 }}
          animate={play ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: play ? delay + 0.4 : 0, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
