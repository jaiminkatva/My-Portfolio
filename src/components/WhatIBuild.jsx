import { motion } from 'framer-motion';
import { capabilities } from '../data/content';
import SectionHeading from './shared/SectionHeading';
import SystemIcon from './shared/SystemIcon';

export default function WhatIBuild() {
  return (
    <section className="section-shell relative overflow-hidden border-t border-white/[0.06] py-24 md:py-36">
      <div className="bp-grid absolute inset-0 opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black_35%,transparent)]" />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <SectionHeading eyebrow="What I Build" heading="Software designed for real work." />
          <p className="max-w-xl text-base leading-[1.8] text-paper-dim">These skills come from building and releasing real products—from the API and database to the servers that keep everything running.</p>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <motion.article key={capability.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -5 }} className="system-card group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800/75 p-7">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-signal/[0.07] blur-[50px] transition-all duration-500 group-hover:bg-signal/[0.13]" />
              <div className="relative flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-signal/20 bg-signal/[0.07] text-signal"><SystemIcon name={capability.id} /></span>
                <span className="font-mono text-xs tracking-[0.18em] text-paper-faint">0{index + 1}</span>
              </div>
              <h3 className="relative mt-8 font-display text-2xl font-medium text-paper">{capability.title}</h3>
              <p className="relative mt-3 text-base leading-[1.7] text-paper-dim">{capability.description}</p>
              <span className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
