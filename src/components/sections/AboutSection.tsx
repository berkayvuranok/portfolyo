import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, BookOpen, Code2, GraduationCap, Lightbulb, MapPin, Rocket, Sparkles, Target, Zap } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { LetterReveal } from "../motion/LetterReveal";
import { ParallaxHero } from "../motion/ParallaxHero";
import { MagneticButton, MagneticImage } from "../motion/MagneticButton";
import { DualMarquee } from "../motion/Marquee";
import { ClipLineReveal } from "../motion/ClipLineReveal";
import { HorizontalScroll, CountUp } from "../motion/HorizontalScroll";
import { SpotlightCard } from "../motion/SpotlightCard";

const techStack = ["Flutter", "Dart", "React", "TypeScript", "Python", "C#", "Firebase", "AI"];

const highlights = [
  { icon: Target, title: "Odak", text: "Flutter, React ve modern web teknolojileri" },
  { icon: Lightbulb, title: "Yaklaşım", text: "Clean code, sürdürülebilirlik, performans" },
  { icon: Rocket, title: "Hedef", text: "Global ölçekte etkili ürünler geliştirmek" },
];

const quickFacts = [
  { icon: Code2, label: "Alan", value: "Full Stack & Mobile" },
  { icon: MapPin, label: "Konum", value: "Türkiye" },
  { icon: GraduationCap, label: "Mod", value: "Sürekli öğrenme" },
  { icon: BookOpen, label: "İçerik", value: "Flutter · AI · Web" },
];

const interests = [
  "Flutter & Clean Architecture",
  "React + TypeScript sistemleri",
  "LLM / agent araçları",
  "Motion & ürün deneyimi",
];

const slogansTop = ["Build. Ship. Learn.", "Flutter × React", "Clean Code", "AI-assisted craft"];
const slogansBottom = ["Mobile first", "Always shipping", "Type-safe", "Design systems"];

const gallery = [
  { emoji: "📱", title: "Flutter", subtitle: "Cross-platform apps, BLoC, clean architecture.", tag: "Mobile" },
  { emoji: "⚛️", title: "React", subtitle: "Modern UI, Vite, tip güvenli TypeScript.", tag: "Web" },
  { emoji: "🤖", title: "AI", subtitle: "LLM, prompt engineering, agent workflows.", tag: "AI" },
  { emoji: "🔥", title: "Firebase", subtitle: "Auth, hosting, realtime altyapı.", tag: "Cloud" },
  { emoji: "🎯", title: "Dart", subtitle: "Hızlı, tip güvenli Flutter dili.", tag: "Lang" },
  { emoji: "🐍", title: "Python", subtitle: "Veri, otomasyon, backend deneyleri.", tag: "Lang" },
];

interface AboutSectionProps {
  onNavigate?: (tabId: string) => void;
  ready?: boolean;
}

export function AboutSection({ onNavigate, ready = true }: AboutSectionProps) {
  return (
    <div className="w-full">
      <ParallaxHero
        className="min-h-[calc(100dvh-4rem)]"
        background={
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)] via-transparent to-[var(--color-bg-primary)]" />
            <motion.div
              className="absolute top-0 right-0 h-[min(70vw,600px)] w-[min(70vw,600px)] rounded-full bg-[var(--color-text-primary)]/[0.05] blur-[120px]"
              animate={ready ? { scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] } : {}}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        }
      >
        <div className="page-x relative flex min-h-[calc(100dvh-4rem)] items-center py-16 lg:py-20">
          <motion.p
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block text-[clamp(8rem,18vw,14rem)] font-semibold tracking-[-0.06em] leading-none text-[var(--color-text-primary)]/[0.04] select-none"
            aria-hidden="true"
            initial={{ opacity: 0, x: 40 }}
            animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            BV
          </motion.p>

          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(240px,320px)_1fr] lg:gap-20 xl:gap-28">
            <div className="flex flex-col items-center lg:items-start">
              <MagneticImage
                src="/berkay.jpeg"
                alt="Berkay Vuranok profil fotoğrafı"
                ready={ready}
                className="h-52 w-52 sm:h-60 sm:w-60 rounded-2xl object-cover border border-[var(--color-border)] shadow-[var(--shadow-card)]"
              />
              <motion.div
                className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 16 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: ready ? 0.55 : 0, duration: 0.55 }}
              >
                <MagneticButton
                  href="https://github.com/berkayvuranok"
                  cursorLabel="GitHub"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--color-text-primary)] px-5 text-xs font-medium text-[var(--color-bg-primary)]"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </MagneticButton>
                <MagneticButton
                  href="https://www.linkedin.com/in/berkayvuranok/"
                  cursorLabel="Connect"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-xs font-medium text-[var(--color-text-primary)]"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  LinkedIn
                </MagneticButton>
              </motion.div>
            </div>

            <div className="min-w-0 text-center lg:text-left">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1 mb-6"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.45 }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                  Available for work
                </span>
              </motion.div>

              <LetterReveal
                text="Merhaba, Ben Berkay!"
                className="display-headline text-[var(--color-text-primary)]"
                delay={0.05}
                active={ready}
              />

              <motion.p
                className="mt-5 text-lg sm:text-xl font-medium text-[var(--color-text-secondary)]"
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={
                  ready
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 12, filter: "blur(6px)" }
                }
                transition={{ delay: ready ? 0.7 : 0, duration: 0.6 }}
              >
                Flutter · React · AI
              </motion.p>

              <div className="mt-8 max-w-2xl mx-auto lg:mx-0">
                <ClipLineReveal
                  active={ready}
                  delay={0.75}
                  text="Modern ürünler inşa eden, öğrenmeye bağımlı bir geliştiriciyim. Mobil, web ve AI araçlarını birleştirerek hızlı, temiz ve kullanıcı odaklı deneyimler tasarlıyorum."
                />
              </div>

              <motion.div
                className="mt-10 flex flex-wrap gap-2 justify-center lg:justify-start"
                initial="hidden"
                animate={ready ? "show" : "hidden"}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.045, delayChildren: 1.1 } },
                }}
              >
                {techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={{
                      hidden: { opacity: 0, y: 14, scale: 0.9 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -2, borderColor: "var(--color-text-primary)" }}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              {onNavigate && (
                <motion.div
                  className="mt-12"
                  initial={{ opacity: 0, y: 16 }}
                  animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ delay: ready ? 1.35 : 0, duration: 0.55 }}
                >
                  <MagneticButton
                    onClick={() => onNavigate("projects")}
                    cursorLabel="Explore"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-sm font-medium text-[var(--color-text-primary)]"
                  >
                    Projeleri keşfet
                    <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                </motion.div>
              )}
            </div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: ready ? 1.6 : 0 }}
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-disabled)]">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown className="h-3.5 w-3.5 text-[var(--color-text-disabled)]" />
            </motion.div>
          </motion.div>
        </div>
      </ParallaxHero>

      <DualMarquee top={slogansTop} bottom={slogansBottom} />

      <div className="page-x space-y-20 sm:space-y-28 pb-20 sm:pb-28">
        <section aria-label="İstatistikler">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-12 py-4">
            <CountUp end={30} suffix="+" label="Yazı" />
            <CountUp end={13} suffix="+" label="Teknoloji" />
            <CountUp end={4} suffix="+" label="Sertifika" />
            <CountUp end={100} suffix="%" label="Merak" />
          </div>
          <div className="h-px w-full bg-[var(--color-border)]" />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          <SpotlightCard index={0} className="p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="h-4 w-4 text-[var(--color-text-primary)]" />
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Hızlı Bilgiler</h3>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="rounded-xl bg-[var(--color-bg-secondary)] p-4">
                  <fact.icon className="h-4 w-4 mb-2 text-[var(--color-text-disabled)]" />
                  <dt className="text-[10px] uppercase tracking-wider text-[var(--color-text-disabled)]">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </SpotlightCard>

          <SpotlightCard index={1} className="p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="h-4 w-4 text-[var(--color-text-primary)]" />
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Şu an üzerine çalıştığım</h3>
            </div>
            <ul className="space-y-2">
              {interests.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-text-secondary)]"
                >
                  <span className="h-1 w-1 rounded-full bg-[var(--color-text-primary)]" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </SpotlightCard>
        </div>

        <section>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-disabled)] mb-2">Stack</p>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                Yığın Galerisi
              </h3>
            </div>
            <p className="hidden sm:block text-xs text-[var(--color-text-disabled)]">Sürükle →</p>
          </div>
          <HorizontalScroll items={gallery} />
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
          {highlights.map((item, i) => (
            <SpotlightCard key={item.title} index={i} className="p-6 sm:p-7">
              <item.icon className="mb-5 h-5 w-5 text-[var(--color-text-primary)]" />
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.text}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  );
}
