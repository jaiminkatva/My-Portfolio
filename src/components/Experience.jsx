import { motion } from 'framer-motion';
import { experience, leadership } from '../data/content';
import SectionHeading from './shared/SectionHeading';
import SystemIcon from './shared/SystemIcon';

// Dates stay hidden until they are confirmed in content.js.
const period = experience.period.startsWith('TODO') ? null : experience.period;

export default function Experience() {
  return (
    <section id="experience" className="section-shell relative overflow-hidden border-t border-line/[0.06] py-20 md:py-28">
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <SectionHeading eyebrow={experience.eyebrow} heading="Backend ownership, from plan to production." body="A hands-on role spanning implementation, technical direction, releases and team delivery." />

        <motion.article
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="experience-panel relative mt-12 overflow-hidden rounded-[1.75rem] border border-line/[0.09] bg-ink-800/85"
        >
          <div className="project-card-grid absolute inset-0 opacity-40" />
          <div className="relative grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="border-b border-line/[0.08] p-6 sm:p-9 lg:border-b-0 lg:border-r">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-signal/25 bg-signal/[0.07] text-signal"><SystemIcon name="leadership" className="h-7 w-7" /></span>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">Company</span>
                    <p className="mt-1 font-display text-lg font-medium text-paper">{experience.company}</p>
                  </div>
                </div>
                {period && <span className="whitespace-nowrap rounded-full border border-line/[0.09] bg-line/[0.03] px-4 py-2 font-mono text-xs text-paper-dim">{period}</span>}
              </div>
              <div className="mt-8 border-t border-line/[0.08] pt-8">
                <span className="inline-flex rounded-full border border-system/20 bg-system/[0.055] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-system">{experience.badge}</span>
                <h3 className="mt-4 max-w-2xl font-display text-[1.75rem] font-medium leading-tight text-paper sm:text-3xl">{experience.role}</h3>
                <p className="mt-5 max-w-2xl text-base leading-[1.75] text-paper-dim">{experience.summary}</p>
              </div>
            </div>

            <div className="p-6 sm:p-9">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-system">Core responsibilities</span>
              <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line/[0.08] bg-line/[0.08] sm:grid-cols-2">
                {leadership.items.map((item, index) => (
                  <li key={item} className="flex items-start gap-3 bg-ink-900/80 p-4 sm:min-h-[92px]">
                    <span className="font-mono text-xs leading-relaxed text-signal">0{index + 1}</span>
                    <span className="text-sm leading-relaxed text-paper-dim">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
