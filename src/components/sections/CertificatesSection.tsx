import { motion } from "framer-motion";
import { certificates } from "../../data/certificates";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { SectionHeader } from "../ui/SectionHeader";

export function CertificatesSection() {
  return (
    <div>
      <SectionHeader
        title="Sertifikalar"
        description="Tamamladığım eğitimler ve aldığım sertifikalar."
      />

      <div className="space-y-4">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.provider}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
          >
            <Card>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
                {cert.provider}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cert.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
