interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-[var(--radius-md)] bg-[var(--color-bg-secondary)] ${className}`}
      aria-hidden="true"
    />
  );
}

export function RepoCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
