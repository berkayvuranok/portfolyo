import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { AboutSection } from "./components/sections/AboutSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { CertificatesSection } from "./components/sections/CertificatesSection";
import { ArticlesSection } from "./components/sections/ArticlesSection";
import { SkillModal } from "./components/skills/SkillModal";
import { IntroWipe } from "./components/motion/IntroWipe";
import { CustomCursor } from "./components/motion/CustomCursor";
import { ScrollProgress } from "./components/motion/ScrollProgress";
import { useGitHubRepos, getRelatedRepos } from "./hooks/useGitHubRepos";
import type { Skill } from "./types";

const SEARCHABLE_TABS = new Set(["projects", "skills", "articles"]);

export default function App() {
  const { repos, loading, error } = useGitHubRepos();
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (activeTab !== "articles") setSelectedArticleId(null);
    if (!SEARCHABLE_TABS.has(activeTab)) setSearchQuery("");
  }, [activeTab]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleReveal = useCallback(() => setHeroReady(true), []);
  const handleIntroDone = useCallback(() => setShowIntro(false), []);

  const relatedRepos = selectedSkill ? getRelatedRepos(repos, selectedSkill) : [];

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-32 right-0 h-[min(60vw,520px)] w-[min(60vw,520px)] rounded-full bg-[var(--color-text-primary)]/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[min(50vw,400px)] w-[min(50vw,400px)] rounded-full bg-[var(--color-text-primary)]/[0.03] blur-[100px]" />
      </div>
      <div className="film-grain" aria-hidden="true" />

      {showIntro && <IntroWipe onReveal={handleReveal} onComplete={handleIntroDone} />}
      <CustomCursor />
      <ScrollProgress />

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col">
        <Header
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((d) => !d)}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSearch={SEARCHABLE_TABS.has(activeTab)}
        />

        <main className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedArticleId ?? "")}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {activeTab === "about" && (
                <AboutSection onNavigate={handleTabChange} ready={heroReady || !showIntro} />
              )}
              {activeTab === "projects" && (
                <div className="page-x py-12 sm:py-16 lg:py-20">
                  <ProjectsSection repos={repos} loading={loading} error={error} searchQuery={searchQuery} />
                </div>
              )}
              {activeTab === "skills" && (
                <div className="page-x py-12 sm:py-16 lg:py-20">
                  <SkillsSection searchQuery={searchQuery} onSkillSelect={setSelectedSkill} />
                </div>
              )}
              {activeTab === "certificates" && (
                <div className="page-x py-12 sm:py-16 lg:py-20">
                  <CertificatesSection />
                </div>
              )}
              {activeTab === "articles" && (
                <div className="page-x py-12 sm:py-16 lg:py-20">
                  <ArticlesSection
                    selectedArticleId={selectedArticleId}
                    onSelectArticle={setSelectedArticleId}
                    onBack={() => setSelectedArticleId(null)}
                    searchQuery={searchQuery}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <SkillModal skill={selectedSkill} relatedRepos={relatedRepos} onClose={() => setSelectedSkill(null)} />
    </div>
  );
}
