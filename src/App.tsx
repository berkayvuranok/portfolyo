import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { AboutSection } from "./components/sections/AboutSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { CertificatesSection } from "./components/sections/CertificatesSection";
import { ArticlesSection } from "./components/sections/ArticlesSection";
import { SkillModal } from "./components/skills/SkillModal";
import { useGitHubRepos, getRelatedRepos } from "./hooks/useGitHubRepos";
import type { Skill } from "./types";

const SEARCHABLE_TABS = new Set(["projects", "skills", "articles"]);

export default function App() {
  const { repos, loading, error } = useGitHubRepos();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (activeTab !== "articles") setSelectedArticleId(null);
    if (!SEARCHABLE_TABS.has(activeTab)) setSearchQuery("");
  }, [activeTab]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const relatedRepos = selectedSkill ? getRelatedRepos(repos, selectedSkill) : [];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <Header
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((d) => !d)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={SEARCHABLE_TABS.has(activeTab)}
      />

      <div className="flex flex-1">
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        />

        <div className="flex flex-1 flex-col min-w-0">
          <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + (selectedArticleId ?? "")}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="max-w-5xl"
              >
                {activeTab === "about" && <AboutSection />}
                {activeTab === "projects" && (
                  <ProjectsSection
                    repos={repos}
                    loading={loading}
                    error={error}
                    searchQuery={searchQuery}
                  />
                )}
                {activeTab === "skills" && (
                  <SkillsSection searchQuery={searchQuery} onSkillSelect={setSelectedSkill} />
                )}
                {activeTab === "certificates" && <CertificatesSection />}
                {activeTab === "articles" && (
                  <ArticlesSection
                    selectedArticleId={selectedArticleId}
                    onSelectArticle={setSelectedArticleId}
                    onBack={() => setSelectedArticleId(null)}
                    searchQuery={searchQuery}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer />
        </div>
      </div>

      <SkillModal
        skill={selectedSkill}
        relatedRepos={relatedRepos}
        onClose={() => setSelectedSkill(null)}
      />
    </div>
  );
}
