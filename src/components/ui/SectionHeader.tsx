interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header className="mb-8 sm:mb-10">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
