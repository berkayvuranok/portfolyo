import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/Button";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showSearch: boolean;
}

export function Header({ darkMode, onToggleTheme, searchQuery, onSearchChange, showSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/berkay.jpeg"
            alt="Berkay Vuranok"
            className="h-8 w-8 rounded-full object-cover border border-[var(--color-border)]"
          />
          <h1 className="truncate text-sm font-semibold tracking-tight text-[var(--color-text-primary)]">
            Berkay Vuranok
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <div className="hidden sm:block">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Ara..."
                className="h-9 w-48 lg:w-56 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] transition-colors duration-200 focus:border-[var(--color-text-disabled)] focus:bg-[var(--color-surface)]"
                aria-label="Ara"
              />
            </div>
          )}

          <a
            href="https://github.com/berkayvuranok"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-secondary)] transition-colors duration-200 hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/berkayvuranok/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-secondary)] transition-colors duration-200 hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            aria-label={darkMode ? "Açık temaya geç" : "Koyu temaya geç"}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
