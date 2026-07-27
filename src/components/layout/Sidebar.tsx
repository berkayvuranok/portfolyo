import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FolderGit2,
  Sparkles,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { tabs } from "../../data/tabs";

const tabIcons: Record<string, LucideIcon> = {
  about: User,
  projects: FolderGit2,
  skills: Sparkles,
  certificates: Award,
  articles: BookOpen,
};

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ activeTab, onTabChange, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <>
      <aside
        className={`hidden lg:flex flex-col border-r border-[var(--color-border)] bg-[var(--color-bg-primary)]/80 backdrop-blur-sm transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        }`}
        aria-label="Ana navigasyon"
      >
        <div className="flex h-14 items-center justify-between px-3 border-b border-[var(--color-border)]">
          {!collapsed && (
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-disabled)]">
              Navigate
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            data-cursor="hover"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-text-secondary)] transition-colors duration-200 hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
            aria-label={collapsed ? "Kenar çubuğunu genişlet" : "Kenar çubuğunu daralt"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {tabs.map((tab) => {
            const Icon = tabIcons[tab.id];
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                data-cursor="hover"
                className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] shadow-[inset_0_0_0_1px_rgba(124,58,237,0.25)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[#7c3aed]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#7c3aed]" : ""}`} aria-hidden="true" />
                {!collapsed && <span className="truncate">{tab.label}</span>}
              </button>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="p-3 border-t border-[var(--color-border)]">
            <div className="rounded-2xl bg-gradient-to-br from-[#7c3aed]/15 to-transparent border border-[var(--color-border)] p-3">
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-disabled)]">Status</p>
              <p className="mt-1 text-xs font-medium text-[var(--color-text-primary)]">Building cool stuff</p>
            </div>
          </div>
        )}
      </aside>

      <nav
        className="lg:hidden sticky top-14 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-xl px-2 py-2 overflow-x-auto scrollbar-hide"
        aria-label="Mobil navigasyon"
      >
        <div className="flex gap-1.5 min-w-max">
          {tabs.map((tab) => {
            const Icon = tabIcons[tab.id];
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
