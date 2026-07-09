interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles =
    variant === "outline"
      ? "border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-transparent"
      : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]";

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium tracking-wide ${styles}`}>
      {children}
    </span>
  );
}
