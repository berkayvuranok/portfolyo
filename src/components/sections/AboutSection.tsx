import { motion } from "framer-motion";
import { Target, Lightbulb, Rocket } from "lucide-react";
import { Card } from "../ui/Card";

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

export function AboutSection() {
  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col items-start sm:items-center sm:text-center"
      >
        <img
          src="/berkay.jpeg"
          alt="Berkay Vuranok profil fotoğrafı"
          className="mb-8 h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover border border-[var(--color-border)]"
        />

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)] text-balance">
          Merhaba, Ben Berkay!
        </h2>

        <p className="mt-4 max-w-2xl text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
          Yazılım dünyasında modern çözümler üreten, öğrenmeye tutkulu bir geliştiriciyim. Frontend,
          Backend ve Mobil teknolojileri harmanlayarak kullanıcı dostu deneyimler tasarlıyorum.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {highlights.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
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
