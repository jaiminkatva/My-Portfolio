import { motion } from 'framer-motion';

/**
 * Consistent heading block used at the top of each major section.
 * `coordinate` is optional and only used where content is genuinely
 * sequential (e.g. the engineering process, case study steps).
 */
export default function SectionHeading({ eyebrow, heading, body, align = 'left', coordinate }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`mb-4 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        {coordinate && (
          <span className="font-mono text-xs text-signal tracking-[0.16em]">{coordinate}</span>
        )}
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-signal">{eyebrow}</span>
        <span className="h-px w-8 bg-signal/50" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="font-display text-[clamp(2.25rem,3.5vw,3.35rem)] font-medium leading-[1.08] tracking-[-0.035em] text-paper text-balance"
      >
        {heading}
      </motion.h2>
      {body && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={`mt-5 max-w-2xl text-base leading-[1.75] text-paper-dim ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {body}
        </motion.p>
      )}
    </div>
  );
}
