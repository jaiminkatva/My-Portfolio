import { motion } from 'framer-motion';
import { TbBrain, TbCheck, TbSparkles } from 'react-icons/tb';
import { whyMe } from '../data/content';

export default function WhyMe() {
  return (
    <section aria-labelledby="ai-note-title" className="section-shell relative overflow-hidden border-t border-line/[0.06] py-12 md:py-16">
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-center gap-6 rounded-2xl border border-line/[0.09] bg-ink-800/65 p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto]"
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-signal/25 bg-signal/[0.07] text-signal">
            <TbBrain className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-system">{whyMe.eyebrow}</span>
            <h2 id="ai-note-title" className="mt-2 font-display text-2xl font-medium leading-tight text-paper sm:text-3xl">{whyMe.heading}</h2>
            <p className="mt-3 max-w-3xl text-base leading-[1.7] text-paper-dim">{whyMe.intro}</p>
          </div>
          <div className="flex gap-3 lg:flex-col">
            <span className="inline-flex items-center gap-2 rounded-full border border-line/[0.08] px-3 py-2 font-mono text-xs text-paper-dim"><TbSparkles className="text-signal" /> Accelerate</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-line/[0.08] px-3 py-2 font-mono text-xs text-paper-dim"><TbCheck className="text-system" /> Validate</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
