import { useEffect, useRef, useState } from 'react';

/**
 * A small crosshair-style cursor companion, desktop/pointer only.
 * Expands slightly over interactive elements. Disabled for touch devices
 * and when reduced motion is requested.
 */
export default function CursorDot() {
  const dotRef = useRef(null);
  const frameRef = useRef(null);
  const pointRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(canHover && !prefersReducedMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const el = dotRef.current;

    function move(e) {
      if (!el) return;
      pointRef.current = { x: e.clientX, y: e.clientY };
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        const { x, y } = pointRef.current;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frameRef.current = null;
      });
    }

    function overCheck(e) {
      const target = e.target;
      setHovering(Boolean(target.closest('a, button, [data-cursor="hover"]')));
    }

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', overCheck);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', overCheck);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] will-change-transform"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/70 transition-all duration-200 ease-out ${
          hovering ? 'h-9 w-9 bg-signal/10' : 'h-4 w-4'
        }`}
      />
    </div>
  );
}
