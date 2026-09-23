import { motion } from 'framer-motion';
import { experience } from '../data/content';
import SectionHeading from './shared/SectionHeading';
import SystemIcon from './shared/SystemIcon';

export default function Experience() {
  return (
    <section className="section-shell relative overflow-hidden border-t border-white/[0.06] py-24 md:py-36">
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <SectionHeading eyebrow={experience.eyebrow} heading="From building features to leading systems." body="My growth is reflected in the responsibility I take—from code and architecture to releases and team decisions." />

          <motion.article initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="experience-panel relative overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-ink-800/85 p-7 sm:p-9">
            <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-signal/[0.1] blur-[75px]" />
            <div className="project-card-grid absolute inset-0 opacity-40" />
            <div className="relative flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-signal/25 bg-signal/[0.07] text-signal"><SystemIcon name="leadership" className="h-7 w-7" /></span>
                <div><span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">Role and responsibility</span><p className="mt-1 text-sm text-paper-dim">{experience.company}</p></div>
              </div>
              <span className="w-fit rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-2 font-mono text-xs text-paper-dim">{experience.period.startsWith('TODO') ? 'Professional experience' : experience.period}</span>
            </div>
            <div className="relative mt-8 border-t border-white/[0.08] pt-8">
              <h3 className="max-w-2xl font-display text-2xl font-medium leading-tight text-paper sm:text-3xl">{experience.role}</h3>
              <p className="mt-5 max-w-2xl text-base leading-[1.8] text-paper-dim">{experience.summary}</p>
            </div>
            <div className="relative mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/[0.07]">
              {['Build', 'Lead', 'Ship'].map((item, index) => <div key={item} className="bg-ink-900/80 px-3 py-4 text-center"><span className="block font-mono text-xs text-signal">0{index + 1}</span><span className="mt-1 block text-sm text-paper-dim">{item}</span></div>)}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
