import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/Button";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { tabs } from "../../data/tabs";

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showSearch: boolean;
}

export function Header({
  darkMode,
  onToggleTheme,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  showSearch,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 backdrop-blur-xl">
      <div className="page-x flex h-16 items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => onTabChange("about")}
          className="flex items-center gap-3 min-w-0 shrink-0"
          data-cursor="hover"
        >
          <img
            src="/berkay.jpeg"
            alt="Berkay Vuranok"
            className="h-9 w-9 rounded-full object-cover border border-[var(--color-border)]"
          />
          <span className="hidden sm:block text-sm font-semibold tracking-tight text-[var(--color-text-primary)]">
            Berkay Vuranok
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1" aria-label="Ana navigasyon">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                data-cursor="hover"
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                  isActive
                    ? "text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 shrink-0">
          {showSearch && (
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Ara..."
              className="hidden lg:block h-9 w-44 xl:w-52 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] transition-all duration-200 focus:border-[var(--color-text-disabled)] focus:bg-[var(--color-surface)]"
              aria-label="Ara"
            />
          )}

          <a
            href="https://github.com/berkayvuranok"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-cursor="hover"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/berkayvuranok/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-cursor="hover"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            aria-label={darkMode ? "Açık temaya geç" : "Koyu temaya geç"}
            className="rounded-full"
            data-cursor="hover"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav
        className="md:hidden border-t border-[var(--color-border)] page-x py-2 overflow-x-auto scrollbar-hide"
        aria-label="Mobil navigasyon"
      >
        <div className="flex gap-1.5 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
