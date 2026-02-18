import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { flutterArticles, type FlutterArticle, type ContentBlock } from "./data/flutterArticles";

// --- Types ---
interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  topics: string[];
}

interface Skill {
  name: string;
  icon: string;
  category: string;
  description: string;
  matchKeys: string[]; // Keys to match with repo language or topics
}

// --- Data ---
const certificates = [
  {
    provider: "Udemy",
    items: ["Implement Clean Architecture in a Flutter app – Flutter", "Python"],
  },
  {
    provider: "HackerRank",
    items: [
      "C# (Basic) Certificate",
      "Java (Basic) Certificate",
      "SQL (Basic) Certificate",
      "CSS (Basic) Certificate",
    ],
  },
  {
    provider: "Turkcell Geleceği Yazanlar",
    items: [
      "C# ile Algoritma ve Programlama 101 & 201",
      "Uygulama Tabanlı Derin Öğrenme",
    ],
  },
  {
    provider: "BTK Akademi",
    items: [
      "C Programlama",
      "LLM Giriş (Büyük Dil Modellerine Giriş)",
      "Versiyon Kontrolleri: Git ve GitHub",
      "İletişim ve Network Yönetimi",
      "İletişim Yöntemi ve Girişimcilikte Sunum Teknikleri",
      "İkna Becerileri",
    ],
  },
];

const skills: Skill[] = [
  { 
    name: "React", 
    icon: "⚛️", 
    category: "Frontend", 
    description: "Modern web arayüzleri oluşturmak için kullandığım, bileşen tabanlı favori kütüphanem.",
    matchKeys: ["React", "TypeScript", "JavaScript", "TSX", "JSX"]
  },
  { 
    name: "Flutter", 
    icon: "📱", 
    category: "Mobile", 
    description: "Tek kod tabanıyla hem iOS hem Android için performanslı native uygulamalar geliştiriyorum.",
    matchKeys: ["Flutter", "Dart"]
  },
  { 
    name: "Python", 
    icon: "🐍", 
    category: "Backend", 
    description: "Veri analizi, yapay zeka ve backend servisleri için kullandığım güçlü dil.",
    matchKeys: ["Python", "Django", "Flask"]
  },
  { 
    name: "JavaScript", 
    icon: "🟨", 
    category: "Frontend", 
    description: "Web'in dili. Dinamik ve etkileşimli ön yüzler için temel taşım.",
    matchKeys: ["JavaScript", "JS"]
  },
  { 
    name: "TypeScript", 
    icon: "🔷", 
    category: "Frontend", 
    description: "Tip güvenliği sağlayarak daha ölçeklenebilir ve hatasız kod yazmamı sağlar.",
    matchKeys: ["TypeScript", "TS"]
  },
  { 
    name: "C#", 
    icon: "🔵", 
    category: "Backend", 
    description: ".NET ekosistemi ile güçlü backend servisleri ve oyun geliştirme.",
    matchKeys: ["C#", "C Sharp"]
  },
  { 
    name: "Java", 
    icon: "☕", 
    category: "Backend", 
    description: "Nesne yönelimli programlamanın temeli, kurumsal uygulama geliştirme.",
    matchKeys: ["Java"]
  },
  { 
    name: "Dart", 
    icon: "🎯", 
    category: "Mobile", 
    description: "Flutter uygulamaları için optimize edilmiş, hızlı derlenen modern dil.",
    matchKeys: ["Dart"]
  },
  { 
    name: "HTML", 
    icon: "🌐", 
    category: "Frontend", 
    description: "Web sayfalarının iskeleti ve semantik yapısı.",
    matchKeys: ["HTML"]
  },
  { 
    name: "CSS", 
    icon: "🎨", 
    category: "Frontend", 
    description: "Modern, responsive ve estetik tasarımlar için stil aracı.",
    matchKeys: ["CSS", "SCSS"]
  },
  { 
    name: "C", 
    icon: "⚙️", 
    category: "System", 
    description: "Sistem programlama ve bellek yönetimi temelleri.",
    matchKeys: ["C"]
  },
  { 
    name: "Supabase", 
    icon: "🚀", 
    category: "Database", 
    description: "Hızlı, ölçeklenebilir ve gerçek zamanlı veritabanı çözümleri.",
    matchKeys: ["SQL", "Database"]
  },
  { 
    name: "Figma", 
    icon: "🎨", 
    category: "Design", 
    description: "UI/UX tasarımlarını kodlamadan önce prototiplemek için kullandığım araç.",
    matchKeys: ["Design"]
  },
];

const tabs = [
  { id: "about", label: "Hakkımda", emoji: "👋" },
  { id: "projects", label: "Projeler", emoji: "🚀" },
  { id: "skills", label: "Yetenekler", emoji: "⚡" },
  { id: "certificates", label: "Sertifikalar", emoji: "🎓" },
  { id: "articles", label: "Yazılarım", emoji: "📝" },
];

export default function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/berkayvuranok/repos")
      .then((res) => res.json())
      .then((data) => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repos:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (activeTab !== "articles") setSelectedArticleId(null);
  }, [activeTab]);

  const getLanguageColor = (language: string | null) => {
    if (!language) return "bg-gray-500";
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      "C#": "bg-purple-500",
      Java: "bg-red-500",
      Flutter: "bg-cyan-500",
      Dart: "bg-teal-500",
      HTML: "bg-orange-500",
      CSS: "bg-blue-400",
    };
    return colors[language] || "bg-gray-500";
  };

  // Filter repos based on selected skill
  const getRelatedRepos = (skill: Skill) => {
    return repos.filter(repo => {
      const langMatch = repo.language && skill.matchKeys.some(key => repo.language.includes(key));
      const topicMatch = repo.topics && repo.topics.some(topic => skill.matchKeys.some(key => topic.toLowerCase().includes(key.toLowerCase())));
      const descMatch = repo.description && skill.matchKeys.some(key => repo.description.toLowerCase().includes(key.toLowerCase()));
      return langMatch || topicMatch || descMatch;
    });
  };

  return (
    <div className={`min-h-[100dvh] w-full transition-colors duration-500 overflow-x-hidden font-sans ${
      darkMode 
        ? 'bg-[#0f172a] text-gray-100 selection:bg-purple-500 selection:text-white' 
        : 'bg-gray-50 text-gray-900 selection:bg-blue-500 selection:text-white'
    }`}>
      
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -top-20 -right-20 w-96 h-96 rounded-full blur-[100px] opacity-20 ${
          darkMode ? 'bg-purple-600' : 'bg-blue-400'
        }`} />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className={`absolute top-1/2 -left-20 w-72 h-72 rounded-full blur-[100px] opacity-20 ${
          darkMode ? 'bg-blue-600' : 'bg-purple-400'
        }`} />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-900/70 border-gray-800' : 'bg-white/70 border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className={`absolute inset-0 rounded-full blur-md opacity-50 ${darkMode ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
              <img
                src="/berkay.jpeg"
                alt="Profile"
                className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-transparent bg-clip-border"
              />
            </div>
            <h1 className={`text-xl md:text-2xl font-bold bg-clip-text text-transparent ${
              darkMode
                ? 'bg-gradient-to-r from-white via-purple-200 to-white'
                : 'bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800'
            }`}>
              Berkay Vuranok
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <SocialLink href="https://github.com/berkayvuranok" icon="github" darkMode={darkMode} />
            <SocialLink href="https://www.linkedin.com/in/berkayvuranok/" icon="linkedin" darkMode={darkMode} />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all active:scale-95 ${
                darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-purple-600 hover:bg-gray-200'
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col min-h-[calc(100vh-80px)]">
        
        {/* Navigation */}
        <nav className="mb-6 md:mb-16 sticky top-20 z-30 px-2 md:px-0">
          <div className={`flex overflow-x-auto flex-nowrap gap-2 p-2 rounded-2xl border backdrop-blur-md mx-auto w-full md:w-auto md:max-w-fit scrollbar-hide ${
            darkMode ? 'bg-gray-800/40 border-gray-700/50' : 'bg-white/40 border-gray-200/50'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${
                  activeTab === tab.id ? 'text-white' : (darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black')
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-xl ${
                      darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span>{tab.emoji}</span>
                  <span>{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === "about" && (
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative group cursor-pointer mb-8"
                >
                  <div className={`absolute -inset-1 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 ${
                    darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-blue-400 to-purple-400'
                  }`}></div>
                  <img
                    src="/berkay.jpeg"
                    alt="Profile"
                    className="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white/10"
                  />
                </motion.div>

                <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent ${
                  darkMode
                    ? 'bg-gradient-to-r from-white via-purple-200 to-white'
                    : 'bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800'
                }`}>
                  Merhaba, Ben Berkay!
                </h2>
                
                <p className={`text-lg md:text-xl max-w-2xl leading-relaxed mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Yazılım dünyasında modern çözümler üreten, öğrenmeye tutkulu bir geliştiriciyim. 
                  Frontend, Backend ve Mobil teknolojileri harmanlayarak kullanıcı dostu deneyimler tasarlıyorum.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  <InfoCard title="Odak" emoji="🎯" text="Flutter, React ve Modern Web Teknolojileri" darkMode={darkMode} />
                  <InfoCard title="Yaklaşım" emoji="💡" text="Clean Code, Sürdürülebilirlik ve Performans" darkMode={darkMode} />
                  <InfoCard title="Hedef" emoji="🚀" text="Global ölçekte etkili ürünler geliştirmek" darkMode={darkMode} />
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-center">GitHub Projelerim</h2>
                {loading ? (
                  <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.map((repo, i) => (
                      <RepoCard key={repo.id} repo={repo} index={i} darkMode={darkMode} getLanguageColor={getLanguageColor} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Teknik Yetenekler</h2>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Detayları ve ilgili projeleri görmek için kartlara tıklayın.
                  </p>
                </div>

                {["Frontend", "Backend", "Mobile", "Database", "Design", "System"].map((category) => {
                   const categorySkills = skills.filter(skill => skill.category === category);
                   if (categorySkills.length === 0) return null;

                   return (
                     <div key={category}>
                       <h3 className={`text-xl font-bold mb-6 pl-4 border-l-4 ${darkMode ? 'border-purple-500 text-gray-200' : 'border-blue-500 text-gray-800'}`}>
                         {category}
                       </h3>
                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                         {categorySkills.map((skill) => (
                           <SkillCard 
                              key={skill.name} 
                              skill={skill} 
                              darkMode={darkMode} 
                              onClick={() => setSelectedSkill(skill)}
                            />
                         ))}
                       </div>
                     </div>
                   );
                })}
              </div>
            )}

            {activeTab === "certificates" && (
              <div className="space-y-6">
                 {certificates.map((cert, i) => (
                   <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-6 rounded-2xl border backdrop-blur-sm ${
                        darkMode ? 'bg-gray-800/40 border-gray-700' : 'bg-white/60 border-gray-200'
                      }`}
                   >
                     <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>{cert.provider}</h3>
                     <div className="flex flex-wrap gap-2">
                       {cert.items.map((item, idx) => (
                         <span key={idx} className={`px-3 py-1 rounded-full text-sm ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                         }`}>
                           {item}
                         </span>
                       ))}
                     </div>
                   </motion.div>
                 ))}
              </div>
            )}

            {activeTab === "articles" && (
              <div className="space-y-8">
                {selectedArticleId ? (
                  <ArticleDetail
                    article={flutterArticles.find((a) => a.id === selectedArticleId)!}
                    darkMode={darkMode}
                    onBack={() => setSelectedArticleId(null)}
                  />
                ) : (
                  <>
                    <div className="text-center">
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">Yazılarım</h2>
                      <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                        Flutter, Dart ve yapay zeka (AI) ile ilgili notlar ve örnekler.
                      </p>
                    </div>
                    {(["Flutter", "AI"] as const).map((topic) => {
                      const items = flutterArticles.filter((a) => a.topic === topic);
                      if (items.length === 0) return null;
                      return (
                        <div key={topic}>
                          <h3 className={`text-lg font-bold mb-4 pl-2 border-l-4 ${
                            darkMode ? "border-cyan-500 text-cyan-200" : "border-cyan-600 text-cyan-800"
                          }`}>
                            {topic === "Flutter" ? "📱 Flutter & Dart" : "🤖 Yapay Zeka (AI)"}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {items.map((article, i) => (
                              <motion.button
                                key={article.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelectedArticleId(article.id)}
                                className={`text-left p-5 rounded-2xl border backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
                                  darkMode
                                    ? "bg-gray-800/40 border-gray-700 hover:border-cyan-500/50"
                                    : "bg-white/60 border-gray-200 hover:border-cyan-500/50"
                                }`}
                              >
                                <span className="text-2xl mb-2 block">{article.emoji}</span>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                  darkMode ? "bg-cyan-900/50 text-cyan-300" : "bg-cyan-100 text-cyan-700"
                                }`}>
                                  {article.category}
                                </span>
                                <h3 className="font-bold text-lg mt-2 mb-1">{article.title}</h3>
                                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} line-clamp-2`}>
                                  {article.excerpt}
                                </p>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 md:p-8 relative border ${
                darkMode 
                  ? 'bg-gray-900 border-gray-700 text-gray-100' 
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <button 
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-500/20 transition-colors"
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{selectedSkill.icon}</span>
                <div>
                  <h2 className="text-3xl font-bold">{selectedSkill.name}</h2>
                  <span className={`text-sm px-2 py-0.5 rounded ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                    {selectedSkill.category}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2 opacity-80">Hakkında</h3>
                <p className="text-lg leading-relaxed">{selectedSkill.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 opacity-80 flex items-center gap-2">
                  <span>📂</span> İlgili Projeler
                </h3>
                
                {getRelatedRepos(selectedSkill).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {getRelatedRepos(selectedSkill).map(repo => (
                      <a 
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                          darkMode 
                            ? 'bg-gray-800/50 border-gray-700 hover:border-purple-500' 
                            : 'bg-gray-50 border-gray-200 hover:border-blue-500'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold truncate">{repo.name}</span>
                          <span className="text-xs opacity-60">↗</span>
                        </div>
                        <p className="text-xs opacity-70 line-clamp-2">{repo.description || "Açıklama yok"}</p>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className={`p-4 rounded-xl text-center border border-dashed ${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-300 text-gray-400'}`}>
                    Bu yetenekle etiketlenmiş açık kaynak proje bulunamadı.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className={`mt-auto py-8 text-center border-t backdrop-blur-sm ${
         darkMode ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'
      }`}>
        <p className="text-sm">© {new Date().getFullYear()} Berkay Vuranok. Designed with ❤️ using React & Framer Motion.</p>
      </footer>
    </div>
  );
}

// --- Subcomponents ---

const SocialLink = ({ href, icon, darkMode }: { href: string; icon: "github" | "linkedin"; darkMode: boolean }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-2 rounded-xl transition-all hover:scale-110 ${
      darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-black hover:bg-gray-100'
    }`}
  >
    {icon === "github" ? (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    ) : (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    )}
  </a>
);

const InfoCard = ({ title, emoji, text, darkMode }: { title: string, emoji: string, text: string, darkMode: boolean }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`p-6 rounded-2xl border backdrop-blur-sm text-left transition-all ${
      darkMode ? 'bg-gray-800/40 border-gray-700 hover:bg-gray-800/60' : 'bg-white/60 border-gray-200 hover:bg-white/80'
    }`}
  >
    <div className="text-3xl mb-3">{emoji}</div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{text}</p>
  </motion.div>
);

const RepoCard = ({ repo, index, darkMode, getLanguageColor }: { repo: Repo; index: number; darkMode: boolean; getLanguageColor: (l: string | null) => string }) => (
  <motion.a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className={`flex flex-col p-6 rounded-2xl border backdrop-blur-sm transition-all ${
      darkMode 
        ? 'bg-gray-800/30 border-gray-700 hover:border-purple-500/50' 
        : 'bg-white/60 border-gray-200 hover:border-blue-500/50'
    }`}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="font-bold text-lg truncate pr-2 group-hover:text-purple-500 transition-colors">
        {repo.name}
      </h3>
      <span className={`px-2 py-0.5 rounded text-[10px] font-medium text-white ${getLanguageColor(repo.language)}`}>
        {repo.language || "N/A"}
      </span>
    </div>
    <p className={`text-sm flex-grow mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      {repo.description || "Açıklama bulunmuyor."}
    </p>
    <div className="flex items-center text-xs font-medium opacity-60">
      <span>Görüntüle ↗</span>
    </div>
  </motion.a>
);

const SkillCard = ({ skill, darkMode, onClick }: { skill: Skill; darkMode: boolean; onClick: () => void }) => (
  <motion.div
    layoutId={`skill-${skill.name}`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-2xl border backdrop-blur-sm transition-all ${
      darkMode 
        ? 'bg-gray-800/40 border-gray-700 hover:bg-gray-700 hover:border-purple-500/50' 
        : 'bg-white/60 border-gray-200 hover:bg-white hover:border-blue-500/50'
    }`}
  >
    <span className="text-3xl md:text-4xl mb-2">{skill.icon}</span>
    <span className="font-medium text-sm text-center">{skill.name}</span>
  </motion.div>
);

function ArticleContent({ blocks, darkMode }: { blocks: ContentBlock[]; darkMode: boolean }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className={`text-xl font-bold mt-8 mb-2 first:mt-0 ${
                darkMode ? "text-cyan-200" : "text-cyan-800"
              }`}
            >
              {block.content}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3
              key={i}
              className={`text-lg font-semibold mt-6 mb-1 ${darkMode ? "text-gray-200" : "text-gray-800"}`}
            >
              {block.content}
            </h3>
          );
        }
        if (block.type === "p") {
          return (
            <p
              key={i}
              className={`leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {block.content}
            </p>
          );
        }
        if (block.type === "code") {
          return (
            <pre
              key={i}
              className={`overflow-x-auto p-4 rounded-xl text-sm font-mono ${
                darkMode
                  ? "bg-gray-900 border border-gray-700 text-gray-200"
                  : "bg-gray-100 border border-gray-200 text-gray-800"
              }`}
            >
              <code>{block.content}</code>
            </pre>
          );
        }
        return null;
      })}
    </div>
  );
}

function ArticleDetail({
  article,
  darkMode,
  onBack,
}: {
  article: FlutterArticle;
  darkMode: boolean;
  onBack: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      <button
        onClick={onBack}
        className={`flex items-center gap-2 mb-6 text-sm font-medium ${
          darkMode ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-700"
        }`}
      >
        ← Yazılara dön
      </button>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{article.emoji}</span>
        <div>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              darkMode ? "bg-cyan-900/50 text-cyan-300" : "bg-cyan-100 text-cyan-700"
            }`}
          >
            {article.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mt-1">{article.title}</h1>
        </div>
      </div>
      <div
        className={`rounded-2xl border p-6 md:p-8 ${
          darkMode ? "bg-gray-800/40 border-gray-700" : "bg-white/60 border-gray-200"
        }`}
      >
        <ArticleContent blocks={article.content} darkMode={darkMode} />
      </div>
    </motion.article>
  );
}
