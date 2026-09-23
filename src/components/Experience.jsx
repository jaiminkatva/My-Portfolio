import { motion } from 'framer-motion';
import { experience, leadership } from '../data/content';
import SectionHeading from './shared/SectionHeading';
import SystemIcon from './shared/SystemIcon';

export default function Experience() {
  return (
    <section className="section-shell relative overflow-hidden border-t border-white/[0.06] py-20 md:py-28">
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <SectionHeading eyebrow={experience.eyebrow} heading="Backend ownership, from plan to production." body="A hands-on role spanning implementation, technical direction, releases and team delivery." />

        <motion.article
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="experience-panel relative mt-12 overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-ink-800/85"
        >
          <div className="project-card-grid absolute inset-0 opacity-40" />
          <div className="relative grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="border-b border-white/[0.08] p-7 sm:p-9 lg:border-b-0 lg:border-r">
              <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-signal/25 bg-signal/[0.07] text-signal"><SystemIcon name="leadership" className="h-7 w-7" /></span>
                  <div><span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">Role and responsibility</span><p className="mt-1 text-sm text-paper-dim">{experience.company}</p></div>
                </div>
                <span className="w-fit rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-2 font-mono text-xs text-paper-dim">{experience.period.startsWith('TODO') ? 'Professional experience' : experience.period}</span>
              </div>
              <div className="mt-8 border-t border-white/[0.08] pt-8">
                <span className="inline-flex rounded-full border border-system/20 bg-system/[0.055] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-system">{experience.badge}</span>
                <h3 className="mt-4 max-w-2xl font-display text-3xl font-medium leading-tight text-paper">{experience.role}</h3>
                <p className="mt-5 max-w-2xl text-base leading-[1.75] text-paper-dim">{experience.summary}</p>
              </div>
            </div>

            <div className="p-7 sm:p-9">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-system">Core responsibilities</span>
              <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
                {leadership.items.map((item, index) => (
                  <div key={item} className="flex min-h-[92px] items-start gap-3 bg-ink-900/80 p-4">
                    <span className="font-mono text-xs text-signal">0{index + 1}</span>
                    <span className="text-sm leading-relaxed text-paper-dim">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
