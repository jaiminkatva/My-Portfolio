import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { hero } from '../data/content';
import MagneticButton from './shared/MagneticButton';
import SystemDiagram from './SystemDiagram';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 20 });
  const visualX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const visualY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  function handlePointerMove(event) {
    if (reduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerMove={handlePointerMove}
      className="hero-shell relative flex min-h-[700px] items-center overflow-hidden pb-16 pt-28 md:min-h-[90vh] md:pb-20 md:pt-32"
    >
      <div className="absolute inset-0 bp-grid opacity-60 [mask-image:radial-gradient(ellipse_75%_70%_at_50%_30%,black,transparent)]" />
      <div className="hero-aurora absolute -right-24 top-0 h-[540px] w-[540px] rounded-full bg-signal/[0.09] blur-[110px]" />
      <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-system/[0.06] blur-[120px]" />
      <div className="hero-scanline absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-content items-center gap-14 px-6 md:grid-cols-12 md:gap-7 md:px-10">
        <motion.div variants={container} initial="hidden" animate="show" className="md:col-span-7 lg:col-span-7">
          <motion.div variants={item} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-paper-dim backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            {hero.kicker}
          </motion.div>

          <motion.h1 variants={item} className="max-w-[760px] font-display text-[clamp(3.2rem,7vw,6.6rem)] font-medium leading-[0.92] tracking-[-0.055em] text-paper">
            I build reliable systems
            <span className="hero-gradient-text block pb-2">that power products.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-paper-dim sm:text-lg">
            {hero.sub}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-2">
            {hero.tags.map((tag, index) => (
              <span key={tag} className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 font-mono text-xs text-paper-dim transition-colors hover:border-signal/30 hover:text-paper">
                <span className={`h-1 w-1 rounded-full ${index === 0 ? 'bg-signal' : 'bg-paper-faint group-hover:bg-signal'}`} />
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href={hero.ctaPrimary.href} variant="primary" className="shadow-[0_12px_40px_rgba(255,138,61,0.18)]">
              {hero.ctaPrimary.label}<ArrowIcon />
            </MagneticButton>
            <MagneticButton href={hero.ctaSecondary.href} variant="secondary">
              {hero.ctaSecondary.label}
            </MagneticButton>
          </motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          style={reduceMotion ? undefined : { x: visualX, y: visualY }}
          className="relative md:col-span-5 lg:col-span-5"
        >
          <SystemDiagram />
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll to about section" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper-faint transition-colors hover:text-signal md:flex">
        <span className="font-mono text-xs uppercase tracking-[0.22em]">Scroll</span>
        <span className="hero-scroll-line h-9 w-px bg-gradient-to-b from-current to-transparent" />
      </a>
    </section>
  );
}
