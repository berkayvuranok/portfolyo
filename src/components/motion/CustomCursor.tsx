import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduce);
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-cursor='hover'], input, textarea, select, [data-cursor-label]"
      ) as HTMLElement | null;
      setHovering(!!interactive);
      setLabel(interactive?.getAttribute("data-cursor-label") ?? "");
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = hovering ? (label ? 72 : 52) : pressed ? 18 : 28;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[89] mix-blend-difference flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          width: size,
          height: size,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white">
          {label && hovering && (
            <span className="absolute text-[9px] font-medium tracking-wider uppercase text-white whitespace-nowrap">
              {label}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
