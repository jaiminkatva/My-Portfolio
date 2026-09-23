import { motion, useReducedMotion } from 'framer-motion';

const technologies = [
  { id: 'node', label: 'Node.js', detail: 'Runtime', x: '7%', y: '14%' },
  { id: 'mongo', label: 'MongoDB', detail: 'Database', x: '68%', y: '8%' },
  { id: 'redis', label: 'Redis', detail: 'Cache', x: '73%', y: '65%' },
  { id: 'docker', label: 'Docker', detail: 'Deploy', x: '4%', y: '69%' },
];

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.84 },
  show: (index) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.65 + index * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

function TechIcon({ id }) {
  if (id === 'mongo') {
    return <path d="M12 3c.6 4.2-.1 7.1-3.4 9.2C7.2 10.3 7.8 6.4 12 3Zm0 0c2.7 3.2 3.2 6.3.5 9.3M10.6 11.2v4.1" />;
  }
  if (id === 'redis') {
    return <path d="m4 7 6-3 6 3-6 3-6-3Zm0 3 6 3 6-3M4 13l6 3 6-3" />;
  }
  if (id === 'docker') {
    return <path d="M4 9h3V6h3v3h3V6h3v5.5c-1.2 2.8-3.6 4.2-7 4.2-3 0-4.5-1.7-5-4.2h12.5c1.2 0 2-.5 2.5-1.5" />;
  }
  return <path d="m10 3.5 6 3.3v6.4l-6 3.3-6-3.3V6.8l6-3.3Zm-2.2 5v3.2l2.2 1.2 2.2-1.2V8.5" />;
}

function TechMark({ id }) {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-signal shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <TechIcon id={id} />
      </svg>
    </span>
  );
}

export default function SystemDiagram() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="system-visual relative mx-auto aspect-square w-full max-w-[500px]" aria-label="Animated backend technology system">
      <div className="absolute inset-[5%] rounded-full border border-white/[0.07]" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-white/[0.09] system-orbit" />
      <div className="absolute inset-[31%] rounded-full border border-signal/20 system-orbit-reverse" />

      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 500 500" aria-hidden="true">
        <defs>
          <linearGradient id="system-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF8A3D" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FF8A3D" stopOpacity="0.8" />
            <stop offset="1" stopColor="#5EC8D8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="core-glow">
            <stop offset="0" stopColor="#FF8A3D" stopOpacity="0.2" />
            <stop offset="1" stopColor="#FF8A3D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="250" r="150" fill="url(#core-glow)" opacity="0.7" />
        {[45, 135, 225, 315].map((angle, index) => {
          const radians = (angle * Math.PI) / 180;
          const x = 250 + Math.cos(radians) * 184;
          const y = 250 + Math.sin(radians) * 184;
          return (
            <motion.line
              key={angle}
              x1="250"
              y1="250"
              x2={x}
              y2={y}
              stroke="url(#system-line)"
              strokeWidth="1"
              strokeDasharray="4 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1.2, delay: 0.4 + index * 0.1 }}
            />
          );
        })}
        {!reduceMotion && (
          <circle r="3" fill="#FF8A3D" className="system-packet">
            <animateMotion dur="3s" repeatCount="indefinite" path="M250,250 L378,122" />
          </circle>
        )}
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.72, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 z-10 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2rem] border border-signal/30 bg-ink-800/90 shadow-[0_0_80px_rgba(255,138,61,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
      >
        <span className="absolute left-4 top-4 h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_#FF8A3D]" />
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-paper-faint">System core</span>
        <span className="mt-2 font-display text-4xl font-medium text-paper">{'{ }'}</span>
        <span className="mt-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-system">
          <span className="h-1 w-1 rounded-full bg-system shadow-[0_0_8px_#5EC8D8]" />
          production ready
        </span>
      </motion.div>

      {technologies.map((tech, index) => (
        <motion.div
          key={tech.id}
          custom={index}
          variants={nodeVariants}
          initial="hidden"
          animate="show"
          style={{ left: tech.x, top: tech.y }}
          className="absolute z-20 flex items-center gap-2.5 rounded-xl border border-white/[0.09] bg-ink-800/85 p-2.5 pr-4 shadow-[0_14px_45px_rgba(0,0,0,0.3)] backdrop-blur-xl"
        >
          <TechMark id={tech.id} />
          <span>
            <span className="block font-display text-sm font-medium text-paper">{tech.label}</span>
            <span className="block font-mono text-xs uppercase tracking-wide text-paper-faint">{tech.detail}</span>
          </span>
        </motion.div>
      ))}

      <div className="absolute bottom-[3%] left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-system/20 bg-system/[0.06] px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-system">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-system opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-system" />
        </span>
        All services operational
      </div>
    </div>
  );
}
