export default function GlobalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-(--color-border-pb) bg-(--color-bg-dark)/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm text-[var(--color-text-secondary)] sm:px-6 lg:px-8">
        <p>© {year} community.dog</p>
        <p>Built with Next.js + Tailwind CSS</p>
      </div>
    </footer>
  );
}
