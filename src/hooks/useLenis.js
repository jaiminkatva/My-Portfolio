import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

/** The active Lenis instance, or null when smooth scrolling is disabled. */
export function getLenis() {
  return lenisInstance;
}

/**
 * Initializes Lenis smooth scrolling for the whole document and routes
 * in-page anchor links through it. No-ops when the user has requested
 * reduced motion, leaving native anchor jumps (with scroll-padding) in place.
 */
export default function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisInstance = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    function handleAnchorClick(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (hash === '#top') {
        event.preventDefault();
        lenis.scrollTo(0);
        history.replaceState(null, '', window.location.pathname + window.location.search);
        return;
      }
      const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!target) return;
      event.preventDefault();
      // Lenis honours the CSS scroll-padding-top, which keeps targets clear of the fixed nav.
      lenis.scrollTo(target);
      history.replaceState(null, '', hash);
      // Keep keyboard focus in step with the visual jump (e.g. the skip link).
      if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
    }
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
