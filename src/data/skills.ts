import type { Skill } from "../types";

export const skills: Skill[] = [
  {
    name: "React",
    icon: "⚛️",
    category: "Frontend",
    description: "Modern web arayüzleri oluşturmak için kullandığım, bileşen tabanlı favori kütüphanem.",
    matchKeys: ["React", "TypeScript", "JavaScript", "TSX", "JSX"],
  },
  {
    name: "Flutter",
    icon: "📱",
    category: "Mobile",
    description: "Tek kod tabanıyla hem iOS hem Android için performanslı native uygulamalar geliştiriyorum.",
    matchKeys: ["Flutter", "Dart"],
  },
  {
    name: "Python",
    icon: "🐍",
    category: "Backend",
    description: "Veri analizi, yapay zeka ve backend servisleri için kullandığım güçlü dil.",
    matchKeys: ["Python", "Django", "Flask"],
  },
  {
    name: "JavaScript",
    icon: "🟨",
    category: "Frontend",
    description: "Web'in dili. Dinamik ve etkileşimli ön yüzler için temel taşım.",
    matchKeys: ["JavaScript", "JS"],
  },
  {
    name: "TypeScript",
    icon: "🔷",
    category: "Frontend",
    description: "Tip güvenliği sağlayarak daha ölçeklenebilir ve hatasız kod yazmamı sağlar.",
    matchKeys: ["TypeScript", "TS"],
  },
  {
    name: "C#",
    icon: "🔵",
    category: "Backend",
    description: ".NET ekosistemi ile güçlü backend servisleri ve oyun geliştirme.",
    matchKeys: ["C#", "C Sharp"],
  },
  {
    name: "Java",
    icon: "☕",
    category: "Backend",
    description: "Nesne yönelimli programlamanın temeli, kurumsal uygulama geliştirme.",
    matchKeys: ["Java"],
  },
  {
    name: "Dart",
    icon: "🎯",
    category: "Mobile",
    description: "Flutter uygulamaları için optimize edilmiş, hızlı derlenen modern dil.",
    matchKeys: ["Dart"],
  },
  {
    name: "HTML",
    icon: "🌐",
    category: "Frontend",
    description: "Web sayfalarının iskeleti ve semantik yapısı.",
    matchKeys: ["HTML"],
  },
  {
    name: "CSS",
    icon: "🎨",
    category: "Frontend",
    description: "Modern, responsive ve estetik tasarımlar için stil aracı.",
    matchKeys: ["CSS", "SCSS"],
  },
  {
    name: "C",
    icon: "⚙️",
    category: "System",
    description: "Sistem programlama ve bellek yönetimi temelleri.",
    matchKeys: ["C"],
  },
  {
    name: "Supabase",
    icon: "🚀",
    category: "Database",
    description: "Hızlı, ölçeklenebilir ve gerçek zamanlı veritabanı çözümleri.",
    matchKeys: ["SQL", "Database"],
  },
  {
    name: "Figma",
    icon: "🎨",
    category: "Design",
    description: "UI/UX tasarımlarını kodlamadan önce prototiplemek için kullandığım araç.",
    matchKeys: ["Design"],
  },
];

export const skillCategories = ["Frontend", "Backend", "Mobile", "Database", "Design", "System"] as const;
