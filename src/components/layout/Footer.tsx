export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-[var(--color-border)] page-x pt-16 pb-10 overflow-hidden relative">
      <p
        className="pointer-events-none absolute -bottom-6 left-0 right-0 text-center text-[clamp(3rem,14vw,11rem)] font-semibold tracking-[-0.06em] leading-none text-[var(--color-text-primary)]/[0.04] select-none whitespace-nowrap"
        aria-hidden="true"
      >
        BERKAY
      </p>
      <div className="relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pb-8">
        <div>
          <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Birlikte bir şeyler inşa edelim.
          </p>
          <a
            href="https://www.linkedin.com/in/berkayvuranok/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            data-cursor-label="Say hi"
            className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-text-primary)]"
          >
            LinkedIn üzerinden yaz →
          </a>
        </div>
        <div className="text-left sm:text-right space-y-1">
          <p className="text-xs text-[var(--color-text-disabled)]">
            © {new Date().getFullYear()} Berkay Vuranok
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-disabled)]">
            React · Motion · TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
