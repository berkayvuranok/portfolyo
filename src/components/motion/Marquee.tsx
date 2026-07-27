interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  size?: "sm" | "lg";
}

export function Marquee({ items, speed = 35, reverse = false, size = "sm" }: MarqueeProps) {
  const doubled = [...items, ...items, ...items];
  const animationClass = reverse ? "animate-marquee-reverse" : "animate-marquee";
  const isLg = size === "lg";

  return (
    <div
      className={`group relative overflow-hidden border-y border-[var(--color-border)] select-none ${
        isLg ? "bg-transparent py-6 sm:py-8" : "bg-[var(--color-bg-secondary)] py-4"
      }`}
      aria-hidden="true"
    >
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-32 bg-gradient-to-r to-transparent ${
          isLg ? "from-[var(--color-bg-primary)]" : "from-[var(--color-bg-secondary)]"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-32 bg-gradient-to-l to-transparent ${
          isLg ? "from-[var(--color-bg-primary)]" : "from-[var(--color-bg-secondary)]"
        }`}
      />
      <div
        className={`flex w-max whitespace-nowrap ${animationClass} marquee-track ${isLg ? "gap-10 sm:gap-16" : "gap-12"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={
              isLg
                ? "text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]/15 hover:text-[var(--color-text-primary)]/40 transition-colors"
                : "text-xs sm:text-sm font-medium tracking-[0.22em] uppercase text-[var(--color-text-secondary)]"
            }
          >
            {item}
            <span className={isLg ? "ml-10 sm:ml-16 text-[var(--color-text-primary)]/20" : "ml-12 text-[var(--color-text-disabled)]"}>
              {isLg ? "/" : " · "}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function DualMarquee({ top, bottom }: { top: string[]; bottom: string[] }) {
  return (
    <div className="space-y-0">
      <Marquee items={top} speed={40} size="lg" />
      <Marquee items={bottom} speed={48} reverse size="lg" />
    </div>
  );
}
