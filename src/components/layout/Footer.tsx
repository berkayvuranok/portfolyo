export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] py-8 px-4 sm:px-6 lg:px-8">
      <p className="text-center text-xs text-[var(--color-text-disabled)]">
        © {new Date().getFullYear()} Berkay Vuranok. React & TypeScript ile geliştirildi.
      </p>
    </footer>
  );
}
