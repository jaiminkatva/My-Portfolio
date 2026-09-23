import { motion, useReducedMotion } from 'framer-motion';
import {
  TbArrowRight,
  TbBrain,
  TbCheck,
  TbSearch,
  TbSparkles,
  TbTopologyStar3,
  TbUsers,
} from 'react-icons/tb';
import { whyMe } from '../data/content';
import SectionHeading from './shared/SectionHeading';

const attributeIcons = {
  problem: TbSearch,
  system: TbTopologyStar3,
  ai: TbSparkles,
  user: TbUsers,
};

const flowSteps = [
  { label: 'Understand', detail: 'Problem', x: '10%', y: '20%', tone: 'signal' },
  { label: 'Explore', detail: 'Options', x: '68%', y: '10%', tone: 'system' },
  { label: 'Accelerate', detail: 'With AI', x: '72%', y: '70%', tone: 'signal' },
  { label: 'Validate', detail: 'Outcome', x: '8%', y: '72%', tone: 'system' },
];

function DecisionVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="why-visual crop relative mx-auto aspect-square w-full max-w-[540px] overflow-hidden rounded-[2rem] border border-white/[0.09] bg-ink-800/80"
      aria-label="A decision loop showing human judgment directing AI-assisted execution"
    >
      <div className="why-visual-grid absolute inset-0" />
      <div className="absolute inset-[12%] rounded-full border border-dashed border-white/[0.1]" />
      <div className="absolute inset-[22%] rounded-full border border-system/[0.12]" />

      <motion.div
        className="absolute inset-[12%] rounded-full"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
      >
        <span className="why-packet absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-signal" />
        <span className="absolute bottom-[8%] right-[9%] h-2 w-2 rounded-full bg-system shadow-[0_0_16px_rgba(94,200,216,0.8)]" />
      </motion.div>

      {flowSteps.map((step, index) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 + index * 0.09, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-10 min-w-[112px] rounded-xl border border-white/[0.09] bg-ink-900/90 px-3.5 py-3 backdrop-blur-md"
          style={{ left: step.x, top: step.y }}
        >
          <span className={`mb-2 block h-1.5 w-1.5 rounded-full ${step.tone === 'signal' ? 'bg-signal shadow-[0_0_10px_#ff8a3d]' : 'bg-system shadow-[0_0_10px_#5ec8d8]'}`} />
          <span className="block font-display text-sm font-medium text-paper">{step.label}</span>
          <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-paper-faint">{step.detail}</span>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.82 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 z-20 w-[176px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-signal/30 bg-ink-900/95 p-5 text-center shadow-[0_0_55px_rgba(255,138,61,0.12)] backdrop-blur-xl"
      >
        <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-signal/25 bg-signal/[0.08] text-signal">
          <TbBrain className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="mt-3 block font-display text-base font-medium text-paper">Human judgment</span>
        <span className="mt-1 block text-sm text-paper-dim">Directs every decision</span>
      </motion.div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.08] bg-ink-900/85 px-4 py-2 text-xs text-paper-dim backdrop-blur">
        <TbCheck className="h-4 w-4 text-system" aria-hidden="true" />
        Useful, validated solution
      </div>
    </motion.div>
  );
}

export default function WhyMe() {
  return (
    <section id="why-me" className="section-shell relative overflow-hidden border-t border-white/[0.06] py-24 md:py-36">
      <div className="section-orb -right-32 top-24 bg-signal" />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={whyMe.eyebrow} heading={whyMe.heading} body={whyMe.intro} />

            <div className="mt-8 space-y-5">
              {whyMe.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-2xl text-base leading-[1.8] text-paper-dim"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="why-statement mt-9 rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 sm:p-6"
            >
              <p className="flex flex-col gap-3 font-display text-lg leading-snug sm:flex-row sm:items-center sm:text-xl">
                <span className="text-signal">{whyMe.statement.lead}</span>
                <TbArrowRight className="h-5 w-5 rotate-90 text-paper-faint sm:rotate-0" aria-hidden="true" />
                <span className="text-paper">{whyMe.statement.close}</span>
              </p>
            </motion.div>
          </div>

          <DecisionVisual />
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {whyMe.attributes.map((attribute, index) => {
            const Icon = attributeIcons[attribute.key];
            return (
              <motion.article
                key={attribute.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="why-attribute group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800/65 p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-signal/20 bg-signal/[0.07] text-signal transition duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-paper-faint">0{index + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-lg font-medium text-paper">{attribute.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-paper-dim">{attribute.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
