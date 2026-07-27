import { certificates } from "../../data/certificates";
import { SectionHeader } from "../ui/SectionHeader";
import { HoverSweep } from "../motion/HoverSweep";

export function CertificatesSection() {
  const items = certificates.flatMap((cert) =>
    cert.items.map((item) => ({
      year: cert.provider.slice(0, 12),
      title: item,
      detail: cert.provider,
    }))
  );

  // Grouped view — keep provider cards but with sweep feel
  return (
    <div>
      <SectionHeader
        eyebrow="Credentials"
        title="Sertifikalar"
        description="Tamamladığım eğitimler ve aldığım sertifikalar."
      />

      <div className="space-y-10">
        {certificates.map((cert, i) => (
          <div key={cert.provider}>
            <div className="mb-4 flex items-baseline gap-4">
              <span className="text-[10px] tabular-nums tracking-wider text-[var(--color-text-disabled)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                {cert.provider}
              </h3>
            </div>
            <HoverSweep
              items={cert.items.map((item) => ({
                year: "CERT",
                title: item,
                detail: "Tamamlandı",
              }))}
            />
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-sm text-[var(--color-text-secondary)]">Henüz sertifika yok.</p>
        )}
      </div>
    </div>
  );
}
