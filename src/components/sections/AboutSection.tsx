import { motion } from "framer-motion";
import { BookOpen, Code2, GraduationCap, Lightbulb, MapPin, Rocket, Target } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";

const techStack = ["Flutter", "Dart", "React", "TypeScript", "Python", "C#", "Firebase"];

const highlights = [
  {
    icon: Target,
    title: "Odak",
    text: "Flutter, React ve Modern Web Teknolojileri",
  },
  {
    icon: Lightbulb,
    title: "Yaklaşım",
    text: "Clean Code, Sürdürülebilirlik ve Performans",
  },
  {
    icon: Rocket,
    title: "Hedef",
    text: "Global ölçekte etkili ürünler geliştirmek",
  },
];

const quickFacts = [
  { icon: Code2, label: "Alan", value: "Full Stack & Mobile" },
  { icon: MapPin, label: "Konum", value: "Türkiye" },
  { icon: GraduationCap, label: "Öğrenme", value: "Sürekli gelişim" },
  { icon: BookOpen, label: "Yazılarım", value: "Flutter, AI & Web" },
];

const interests = [
  "Mobil uygulama geliştirme (Flutter)",
  "Modern web arayüzleri (React)",
  "Yapay zeka ve LLM araçları",
  "Clean Architecture & test edilebilir kod",
];

export function AboutSection() {
  return (
    <div className="w-full space-y-10">
      {/* Hero — profil + sağ içerik */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-start"
      >
        {/* Sol: profil */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative">
            <img
              src="/berkay.jpeg"
              alt="Berkay Vuranok profil fotoğrafı"
              className="h-40 w-40 sm:h-48 sm:w-48 rounded-2xl object-cover border border-[var(--color-border)] shadow-[var(--shadow-card)]"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2 w-full justify-center lg:justify-start">
            <a
              href="https://github.com/berkayvuranok"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 text-xs font-medium text-[var(--color-text-primary)] transition-colors duration-200 hover:bg-[var(--color-border)]"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/berkayvuranok/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 text-xs font-medium text-[var(--color-text-primary)] transition-colors duration-200 hover:bg-[var(--color-border)]"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Sağ: metin ve detaylar */}
        <div className="min-w-0 text-center lg:text-left">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-disabled)] mb-2">
            Hakkımda
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)] text-balance">
            Merhaba, Ben Berkay!
          </h2>
          <p className="mt-2 text-base font-medium text-[var(--color-text-secondary)]">
            Yazılım Geliştirici · Flutter & Web
          </p>

          <p className="mt-5 text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Yazılım dünyasında modern çözümler üreten, öğrenmeye tutkulu bir geliştiriciyim.
            Frontend, Backend ve Mobil teknolojileri harmanlayarak kullanıcı dostu deneyimler tasarlıyorum.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
            {techStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Hızlı bilgiler + ilgi alanları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          <Card className="h-full">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
              Hızlı Bilgiler
            </h3>
            <dl className="space-y-4">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-3">
                  <fact.icon className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-text-disabled)]" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-[var(--color-text-disabled)]">{fact.label}</dt>
                    <dd className="text-sm font-medium text-[var(--color-text-primary)]">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
        >
          <Card className="h-full">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
              İlgi Alanlarım
            </h3>
            <ul className="space-y-3">
              {interests.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] leading-relaxed"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>

      {/* Odak / Yaklaşım / Hedef */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {highlights.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.15 + i * 0.05 }}
          >
            <Card hover className="h-full">
              <item.icon className="mb-4 h-5 w-5 text-[var(--color-text-primary)]" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
