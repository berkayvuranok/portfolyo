export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-text-primary)] ${className}`}
      role="status"
      aria-label="Yükleniyor"
    />
  );
}
