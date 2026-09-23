import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Button that subtly follows the pointer within its bounds ("magnetic" effect).
 * Falls back to a static button when the user prefers reduced motion or on touch.
 */
export default function MagneticButton({ href, children, variant = 'primary', className = '' }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  function handleMove(e) {
    const el = ref.current;
    if (!el || reduceMotion || e.pointerType === 'touch') return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * 0.25, y: relY * 0.35 });
  }

  function handleLeave() {
    setPos({ x: 0, y: 0 });
  }

  const base =
    'magnetic-button group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-300';
  const styles =
    variant === 'primary'
      ? 'magnetic-button-primary text-ink-900'
      : 'magnetic-button-secondary border border-white/[0.12] bg-white/[0.025] text-paper hover:border-signal/35 hover:text-signal';

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      animate={reduceMotion ? undefined : { x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.4 }}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
