import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import SystemIcon from './shared/SystemIcon';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#approach', label: 'Approach' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <nav className={`nav-shell pointer-events-auto relative mx-auto flex h-16 max-w-content items-center justify-between overflow-visible rounded-2xl border px-3 transition-all duration-500 sm:px-4 ${scrolled ? 'border-white/[0.11] bg-ink-900/88 shadow-[0_18px_60px_rgba(0,0,0,.3)] backdrop-blur-xl' : 'border-white/[0.08] bg-ink-900/45 backdrop-blur-md'}`}>
        <motion.span className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-signal via-signal to-system" style={{ scaleX: progress }} />
        <a href="#top" className="group flex items-center gap-3 font-display text-base font-medium tracking-wide text-paper">
          <span className="nav-mark relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-signal/20 bg-signal/[0.07] transition-all group-hover:border-signal/45 group-hover:bg-signal/[0.11]"><span className="relative">JK<span className="text-signal">.</span></span></span>
          <span className="hidden sm:block">
            <span className="block text-sm leading-none text-paper">Jaimin Katva</span>
            <span className="mt-1.5 flex items-center gap-1.5 font-mono text-xs font-normal leading-none tracking-wide text-paper-faint"><span className="h-1.5 w-1.5 rounded-full bg-system shadow-[0_0_8px_#5EC8D8]" />Systems engineer</span>
          </span>
        </a>

        <ul className="hidden items-center rounded-xl border border-white/[0.06] bg-black/10 p-1 text-sm text-paper-dim md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="relative block rounded-lg px-3.5 py-2 transition-all duration-200 hover:bg-white/[0.045] hover:text-paper">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="nav-cta group hidden items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-900 md:inline-flex">
          <span className="relative">Start a project</span>
          <span className="relative grid h-6 w-6 place-items-center rounded-md bg-ink-900/10 transition-transform duration-300 group-hover:translate-x-0.5"><SystemIcon name="arrow" className="h-3.5 w-3.5" /></span>
        </a>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.025] md:hidden"
        >
          <span className="flex flex-col gap-1.5"><span className={`block h-px w-5 bg-paper transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} /><span className={`block h-px w-5 bg-paper transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} /></span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} className="absolute inset-x-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-white/[0.1] bg-ink-900/95 p-2 shadow-2xl backdrop-blur-xl md:hidden">
              <ul className="flex flex-col gap-1 text-base text-paper-dim">
                {LINKS.map((link, index) => (
                  <li key={link.href}><a href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.04] hover:text-paper"><span>{link.label}</span><span className="font-mono text-xs text-paper-faint">0{index + 1}</span></a></li>
                ))}
                <li className="mt-1 border-t border-white/[0.07] pt-2"><a href="#contact" onClick={() => setOpen(false)} className="nav-cta flex items-center justify-between rounded-xl px-4 py-3 font-medium text-ink-900"><span className="relative">Start a project</span><SystemIcon name="arrow" className="relative h-4 w-4" /></a></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
