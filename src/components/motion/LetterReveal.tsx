import { motion } from "framer-motion";

interface LetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  active?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function LetterReveal({
  text,
  className = "",
  delay = 0,
  active = true,
  as: Tag = "h2",
}: LetterRevealProps) {
  const letters = Array.from(text);

  return (
    <Tag className={`${className} perspective-[800px]`} aria-label={text}>
      {letters.map((char, i) => (
        <span key={`${char}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block origin-bottom will-change-transform"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
            initial={{ opacity: 0, y: "120%", rotateX: -80, filter: "blur(8px)" }}
            animate={
              active
                ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
                : { opacity: 0, y: "120%", rotateX: -80, filter: "blur(8px)" }
            }
            transition={{
              duration: 0.65,
              delay: active ? delay + i * 0.028 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
