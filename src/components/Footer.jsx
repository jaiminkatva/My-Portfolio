import { identity } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.07] bg-ink-900 py-9">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-5 px-6 text-sm text-paper-faint sm:flex-row md:px-10">
        <div className="flex items-center gap-3"><span className="font-display text-base font-medium text-paper">JK<span className="text-signal">.</span></span><span className="h-4 w-px bg-white/10" /><span>© {year} {identity.name}</span></div>
        <span className="text-center">Backend Engineer · Team Lead</span>
        <a href="#top" className="rounded-full border border-white/[0.08] px-4 py-2 transition-colors hover:border-signal/30 hover:text-signal">Back to top ↑</a>
      </div>
    </footer>
  );
}
