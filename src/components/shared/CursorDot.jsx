import { useEffect, useRef, useState } from 'react';

/**
 * A small crosshair-style cursor companion, desktop/pointer only.
 * Expands slightly over interactive elements. Disabled for touch devices
 * and when reduced motion is requested. Stays hidden until the pointer
 * first moves and whenever it leaves the window.
 */
export default function CursorDot() {
  const dotRef = useRef(null);
  const frameRef = useRef(null);
  const pointRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
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
      if (!el || e.pointerType === 'touch') return;
      pointRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        const { x, y } = pointRef.current;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frameRef.current = null;
      });
    }

    function overCheck(e) {
      setHovering(Boolean(e.target.closest?.('a, button, [role="tab"], [data-cursor="hover"]')));
    }

    function leave(e) {
      if (!e.relatedTarget) setVisible(false);
    }

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', overCheck);
    document.addEventListener('pointerout', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', overCheck);
      document.removeEventListener('pointerout', leave);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[150] will-change-transform transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/70 transition-all duration-200 ease-out ${
          hovering ? 'h-9 w-9 bg-signal/10' : 'h-4 w-4'
        }`}
      />
    </div>
  );
}
