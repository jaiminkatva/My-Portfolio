import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import useTheme from "../hooks/useTheme";
import SystemIcon from "./shared/SystemIcon";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#approach", label: "Approach" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

function useActiveSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const linked = new Set(LINKS.map((link) => link.href));
    const sections = document.querySelectorAll("main > section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const href = `#${entry.target.id}`;
          setActive(linked.has(href) ? href : null);
        });
      },
      // A thin band just below the nav decides which section is "current".
      { rootMargin: "-30% 0px -65% 0px" }
    );
    sections.forEach((section) => observer.observe(section));

    function clearAtTop() {
      if (window.scrollY < window.innerHeight * 0.4) setActive(null);
    }
    window.addEventListener("scroll", clearAtTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
  }, []);

  return active;
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, restDelta: 0.001 });
  const { theme, toggleTheme } = useTheme();
  const active = useActiveSection();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event) {
      if (!navRef.current?.contains(event.target)) setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 1024px)");
    function onBreakpoint(event) {
      if (event.matches) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener?.("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener?.("change", onBreakpoint);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        ref={navRef}
        aria-label="Primary"
        className={`nav-shell pointer-events-auto relative mx-auto flex h-16 max-w-content items-center justify-between overflow-visible rounded-2xl border px-3 transition-all duration-500 sm:px-4 ${scrolled || open ? "border-line/[0.11] bg-ink-900/85 shadow-[0_18px_60px_rgba(0,0,0,.3)] backdrop-blur-xl" : "border-line/[0.08] bg-ink-900/45 backdrop-blur-md"}`}>
        <motion.span className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-signal via-signal to-system" style={{ scaleX: progress }} />
        <a href="#top" aria-label="Jaimin Katva, back to top" className="group flex min-w-0 items-center gap-3 font-display text-base font-medium tracking-wide text-paper">
          <span className="nav-mark relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-signal/20 p-1.5 transition-all group-hover:border-signal/45">
            <img src={`${import.meta.env.BASE_URL}logo-mark.png`} alt="" width="28" height="24" className="relative h-full w-full object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block text-sm leading-none text-paper">Jaimin Katva</span>
            <span className="mt-1.5 flex items-center gap-1.5 whitespace-nowrap font-mono text-xs font-normal leading-none tracking-wide text-paper-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-system" />
              Backend Engineer · Team Lead
            </span>
          </span>
        </a>

        <ul className="hidden items-center rounded-xl border border-line/[0.06] bg-ink-900/40 p-1 text-sm text-paper-dim lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition-all duration-200 hover:bg-line/[0.06] hover:text-paper ${isActive ? "bg-line/[0.06] text-paper" : ""}`}>
                  <span className={`h-1 w-1 rounded-full bg-signal transition-all duration-300 ${isActive ? "opacity-100" : "-ml-2.5 opacity-0"}`} aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="theme-toggle group relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-line/[0.09] bg-line/[0.025] text-paper-dim transition-all duration-200 hover:border-signal/30 hover:text-signal"
          >
            <svg viewBox="0 0 20 20" className={`absolute h-[18px] w-[18px] transition-all duration-300 ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"}`} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <path d="M16.6 12.5A6.6 6.6 0 0 1 7.5 3.4a6.6 6.6 0 1 0 9.1 9.1Z" />
            </svg>
            <svg viewBox="0 0 20 20" className={`absolute h-[18px] w-[18px] transition-all duration-300 ${theme === "light" ? "scale-100 rotate-0 opacity-100" : "scale-50 rotate-90 opacity-0"}`} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <circle cx="10" cy="10" r="3.1" />
              <path d="M10 2.2v1.3M10 16.5v1.3M2.2 10h1.3M16.5 10h1.3M4.5 4.5l.9.9M14.6 14.6l.9.9M15.5 4.5l-.9.9M5.4 14.6l-.9.9" />
            </svg>
          </button>

          <a href="#contact" className="nav-cta group hidden items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium text-ink-900 lg:inline-flex">
            <span className="relative">Start a project</span>
            <span className="relative grid h-6 w-6 place-items-center rounded-md bg-ink-900/10 transition-transform duration-300 group-hover:translate-x-0.5">
              <SystemIcon name="arrow" className="h-3.5 w-3.5" />
            </span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line/[0.08] bg-line/[0.025] transition-colors hover:border-signal/30 lg:hidden">
            <span className="flex flex-col gap-1.5">
              <span className={`block h-px w-5 bg-paper transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-paper transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-line/[0.1] bg-ink-800 p-2 shadow-2xl lg:hidden">
              <ul className="flex flex-col gap-1 text-base text-paper-dim">
                {LINKS.map((link, index) => {
                  const isActive = active === link.href;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-line/[0.05] hover:text-paper ${isActive ? "bg-line/[0.05] text-paper" : ""}`}>
                        <span className="flex items-center gap-2.5">
                          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />}
                          {link.label}
                        </span>
                        <span className="font-mono text-xs text-paper-faint">0{index + 1}</span>
                      </a>
                    </li>
                  );
                })}
                <li className="mt-1 border-t border-line/[0.07] pt-2">
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="nav-cta flex items-center justify-between rounded-xl px-4 py-3 font-medium text-ink-900">
                    <span className="relative">Start a project</span>
                    <SystemIcon name="arrow" className="relative h-4 w-4" />
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
