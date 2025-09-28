import { useEffect, useState } from "react";
import profilephoto from "./assets/berkay.jpeg";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  topics: string[];
}

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

const skills = [
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "Flutter", icon: "📱", category: "Mobile" },
  { name: "Python", icon: "🐍", category: "Backend" },
  { name: "JavaScript", icon: "🟨", category: "Frontend" },
  { name: "TypeScript", icon: "🔷", category: "Frontend" },
  { name: "C#", icon: "🔵", category: "Backend" },
  { name: "Java", icon: "☕", category: "Backend" },
  { name: "Dart", icon: "🎯", category: "Mobile" },
  { name: "HTML", icon: "🌐", category: "Frontend" },
  { name: "CSS", icon: "🎨", category: "Frontend" },
  { name: "C", icon: "⚙️", category: "System" },
  { name: "Supabase", icon: "🚀", category: "Database" },
  { name: "Figma", icon: "🎨", category: "Design" },
];

export default function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/berkayvuranok/repos")
      .then((res) => res.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching repos:", error);
        setLoading(false);
      });
  }, []);

  const tabs = [
    { id: "about", label: "Hakkımda", emoji: "👋" },
    { id: "projects", label: "Projeler", emoji: "🚀" },
    { id: "skills", label: "Yetenekler", emoji: "⚡" },
    { id: "certificates", label: "Sertifikalar", emoji: "🎓" },
  ];

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      "C#": "bg-purple-500",
      Java: "bg-red-500",
      Flutter: "bg-cyan-500",
      Dart: "bg-teal-500",
    };
    return colors[language] || "bg-gray-500";
  };

  return (
    <div className={`min-h-screen transition-all duration-500 overflow-x-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-purple-500' : 'bg-purple-300'
        }`} style={{ animation: 'float 6s ease-in-out infinite' }}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          darkMode ? 'bg-blue-500' : 'bg-blue-300'
        }`} style={{ animation: 'float 8s ease-in-out infinite reverse' }}></div>
      </div>

      {/* Header */}
      <header className={`backdrop-blur-md sticky top-0 z-50 transition-all duration-300 border-b ${
        darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto p-4 md:p-6 flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex items-center justify-center shadow-md ${
                darkMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
            >
              <img
                src={profilephoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Berkay Vuranok
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <a
              href="https://github.com/berkayvuranok"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all hover:scale-110 ${
                darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/berkayvuranok/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-all hover:scale-110 ${
                darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`ml-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-lg shadow-yellow-500/25' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-4xl mx-auto p-4 md:p-6">
        <div className={`flex space-x-1 p-1 rounded-xl overflow-x-auto scrollbar-hide ${
          darkMode ? 'bg-gray-800/50' : 'bg-gray-200/50'
        } backdrop-blur-sm`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 py-2 px-3 md:py-3 md:px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                activeTab === tab.id
                  ? `${darkMode 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    } transform scale-105`
                  : `${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
              }`}
            >
              <span className="text-sm md:text-lg">{tab.emoji}</span>
              <span className="text-xs md:text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 pb-8 md:pb-12 overflow-x-hidden">
        {/* About Section */}
        {activeTab === "about" && (
          <div className="animate-fade-in">
            <div className="text-center mb-8 md:mb-12">
              <div
                className={`w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full overflow-hidden shadow-2xl ${
                  darkMode
                    ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-red-500'
                    : 'bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600'
                }`}
                style={{ animation: 'pulse 2s infinite' }}
              >
                <img
                  src={profilephoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Merhaba! 👋
              </h2>
              <p className={`text-base md:text-xl max-w-3xl mx-auto leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Ben <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Berkay Vuranok</span>. 
                Yazılım geliştirici olarak modern teknolojilerle kullanıcı deneyimini ön planda tutan, 
                performanslı ve ölçeklenebilir uygulamalar geliştiriyorum. Sürekli öğrenmeye ve 
                kendimi geliştirmeye odaklı bir geliştiriciyim.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              <div className={`p-4 md:p-6 rounded-xl backdrop-blur-sm transition-all hover:scale-105 ${
                darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
              }`}>
                <div className="text-2xl md:text-3xl mb-2 md:mb-4">🎯</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">Odak</h3>
                <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Flutter ile mobil uygulama geliştirme (UI/UX, state management, API entegrasyonu)
                  Backend ve frontend teknolojilerini öğrenme
                  İngilizce iletişim becerilerimi geliştirme
                </p>
              </div>
              <div className={`p-4 md:p-6 rounded-xl backdrop-blur-sm transition-all hover:scale-105 ${
                darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
              }`}>
                <div className="text-2xl md:text-3xl mb-2 md:mb-4">💡</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">Yaklaşım</h3>
                <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Clean code prensiplerine uygun, sürdürülebilir çözümler
                </p>
              </div>
              <div className={`p-4 md:p-6 rounded-xl backdrop-blur-sm transition-all hover:scale-105 ${
                darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/50 border border-gray-200'
              }`}>
                <div className="text-2xl md:text-3xl mb-2 md:mb-4">🌟</div>
                <h3 className="text-lg md:text-xl font-bold mb-2">Hedef</h3>
                <p className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Kullanıcı deneyimini ön planda tutan inovatif projeler
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeTab === "projects" && (
          <div className="animate-fade-in">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">🚀 Projelerim</h2>
              <p className={`text-base md:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                GitHub'daki açık kaynak projelerim ve çalışmalarım
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12 md:py-20">
                <div className={`animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 ${
                  darkMode ? 'border-purple-400' : 'border-blue-500'
                }`}></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {repos.slice(0, 9).map((repo, index) => (
                  <div
                    key={repo.id}
                    className={`group rounded-xl md:rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:-translate-y-2 border ${
                      darkMode 
                        ? 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50' 
                        : 'bg-white/50 border-gray-200 hover:border-blue-500/50'
                    } shadow-lg hover:shadow-2xl overflow-hidden`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex justify-between items-start mb-3 md:mb-4">
                        <h3 className="text-lg md:text-xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                          {repo.name}
                        </h3>
                        {repo.language && (
                          <span className={`px-2 py-1 rounded-full text-xs text-white ${getLanguageColor(repo.language)}`}>
                            {repo.language}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs md:text-sm mb-3 md:mb-4 line-clamp-3 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {repo.description || "Açıklama bulunmuyor"}
                      </p>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center space-x-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                          darkMode 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                        } text-white shadow-lg hover:shadow-xl hover:scale-105`}
                      >
                        <span>GitHub'da Gör</span>
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Skills Section */}
        {activeTab === "skills" && (
          <div className="animate-fade-in">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">⚡ Yeteneklerim</h2>
              <p className={`text-base md:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Uzmanlaştığım teknolojiler ve programlama dilleri
              </p>
            </div>
            
            {/* Skills Categories */}
            <div className="space-y-8 md:space-y-12">
              {["Frontend", "Backend", "Mobile", "Database", "Design", "System"].map((category) => {
                const categorySkills = skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="space-y-4 md:space-y-6">
                    <h3 className={`text-xl md:text-2xl font-bold text-center ${
                      darkMode ? 'text-purple-400' : 'text-blue-600'
                    }`}>
                      {category} {category === "Frontend" ? "🎨" : category === "Backend" ? "⚡" : category === "Mobile" ? "📱" : category === "Database" ? "🗄️" : category === "Design" ? "🎯" : "⚙️"}
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                      {categorySkills.map((skill, index) => (
                        <div
                          key={skill.name}
                          className={`group relative p-3 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer ${
                            darkMode 
                              ? 'bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 hover:bg-gray-700/50' 
                              : 'bg-white/50 border border-gray-200 hover:border-blue-500/50 hover:bg-white/80'
                          } shadow-lg hover:shadow-2xl`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {/* Skill Icon and Name */}
                          <div className="text-center">
                            <div className={`text-2xl md:text-4xl mb-2 md:mb-3 transform transition-transform duration-300 group-hover:scale-125`}>
                              {skill.icon}
                            </div>
                            <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                              {skill.name}
                            </h3>
                          </div>
                          
                          {/* Hover Animation Overlay */}
                          <div className={`absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                            darkMode 
                              ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10' 
                              : 'bg-gradient-to-r from-blue-500/10 to-purple-600/10'
                          }`}></div>
                          
                          {/* Floating Particles Effect */}
                          <div className="absolute top-1 right-1 md:top-2 md:right-2 w-1 h-1 md:w-2 md:h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" 
                               style={{
                                 background: darkMode ? '#a855f7' : '#3b82f6',
                                 animation: 'float 2s ease-in-out infinite'
                               }}>
                          </div>
                          <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" 
                               style={{
                                 background: darkMode ? '#ec4899' : '#8b5cf6',
                                 animation: 'float 3s ease-in-out infinite reverse'
                               }}>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Skills Summary */}
            <div className={`mt-8 md:mt-12 p-4 md:p-8 rounded-xl md:rounded-2xl backdrop-blur-sm text-center ${
              darkMode 
                ? 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600' 
                : 'bg-gradient-to-r from-white/50 to-gray-50/50 border border-gray-300'
            }`}>
              <div className="text-4xl md:text-6xl mb-2 md:mb-4">🚀</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sürekli Gelişim Halinde
              </h3>
              <p className={`text-sm md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Bu teknolojilerle projeler geliştiriyor, yeni beceriler öğreniyor ve 
                kendimi sürekli geliştirmeye odaklanıyorum.
              </p>
            </div>
          </div>
        )}

        {/* Certificates Section */}
        {activeTab === "certificates" && (
          <div className="animate-fade-in">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">🎓 Sertifikalarım</h2>
              <p className={`text-base md:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Aldığım sertifikalar ve eğitimler
              </p>
            </div>
            
            <div className="space-y-4 md:space-y-8">
              {certificates.map((cert, idx) => (
                <div
                  key={idx}
                  className={`p-4 md:p-8 rounded-xl md:rounded-2xl backdrop-blur-sm transition-all hover:scale-105 border ${
                    darkMode 
                      ? 'bg-gray-800/50 border-gray-700 hover:border-purple-500/50' 
                      : 'bg-white/50 border-gray-200 hover:border-blue-500/50'
                  } shadow-lg hover:shadow-2xl`}
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {cert.provider}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    {cert.items.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center space-x-2 p-2 md:p-3 rounded-lg transition-all hover:scale-105 ${
                          darkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                        }`}
                      >
                        <div className={`w-1 h-1 md:w-2 md:h-2 rounded-full ${
                          darkMode ? 'bg-purple-400' : 'bg-blue-500'
                        }`}></div>
                        <span className="text-xs md:text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t backdrop-blur-sm ${
        darkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto p-4 md:p-8 text-center">
          <p className={`text-xs md:text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} Berkay Vuranok. Tüm hakları saklıdır.
          </p>
          <div className="flex justify-center space-x-4 md:space-x-6 mt-2 md:mt-4">
            <span className="text-xl md:text-2xl animate-bounce" style={{ animationDelay: '0s' }}>💻</span>
            <span className="text-xl md:text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🚀</span>
            <span className="text-xl md:text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        @keyframes skillBar {
          from { width: 0%; }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}