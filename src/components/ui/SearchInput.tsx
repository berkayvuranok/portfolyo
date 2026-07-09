import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Ara..." }: SearchInputProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-disabled)]"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] pl-9 pr-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] transition-colors duration-200 focus:border-[var(--color-text-disabled)] focus:bg-[var(--color-surface)]"
        aria-label={placeholder}
      />
    </div>
  );
}
