import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";

interface HorizontalScrollProps {
  items: { title: string; subtitle: string; emoji?: string; tag?: string }[];
}

export function HorizontalScroll({ items }: HorizontalScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY * 0.9;
      update();
    };

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
      update();
    };
    const onUp = (e: PointerEvent) => {
      dragging.current = false;
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("scroll", update);
    update();

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div>
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((item, i) => (
          <TiltCard key={item.title} item={item} index={i} />
        ))}
      </div>
      <div className="mt-4 h-0.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[var(--color-text-primary)] origin-left"
          style={{ scaleX: progress || 0.05 }}
        />
      </div>
    </div>
  );
}

function TiltCard({
  item,
  index,
}: {
  item: { title: string; subtitle: string; emoji?: string; tag?: string };
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 200, damping: 20 });
  const ry = useSpring(mx, { stiffness: 200, damping: 20 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        my.set(((e.clientY - r.top) / r.height - 0.5) * -10);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 sm:p-8 transition-colors duration-300 hover:border-[var(--color-text-disabled)]"
      data-cursor="hover"
      data-cursor-label="Explore"
    >
      {item.emoji && <span className="text-3xl mb-4 block" aria-hidden="true">{item.emoji}</span>}
      {item.tag && (
        <span className="mb-2 inline-block text-[10px] uppercase tracking-wider text-[var(--color-text-disabled)]">
          {item.tag}
        </span>
      )}
      <h4 className="text-base font-semibold text-[var(--color-text-primary)]">{item.title}</h4>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.subtitle}</p>
    </motion.article>
  );
}

interface CountUpProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export function CountUp({ end, suffix = "", label, duration = 1800 }: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(end * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <motion.div
      ref={ref}
      className="text-center sm:text-left"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] tabular-nums">
        {value}
        <span className="text-[var(--color-text-disabled)]">{suffix}</span>
      </p>
      <p className="mt-2 text-xs uppercase tracking-wider text-[var(--color-text-disabled)]">{label}</p>
      <motion.div
        className="mt-3 h-px bg-[var(--color-border)] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      />
    </motion.div>
  );
}
