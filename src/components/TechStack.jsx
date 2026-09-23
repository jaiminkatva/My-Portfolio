import { motion } from 'framer-motion';
import { stack } from '../data/content';
import SectionHeading from './shared/SectionHeading';
import SystemIcon from './shared/SystemIcon';
import TechnologyMark from './shared/TechnologyMark';

const iconNames = ['backend', 'data', 'realtime', 'infra', 'cloud', 'gis', 'development', 'frontend'];
const tones = ['#FF8A3D', '#6BD6A4', '#F7C65D', '#5EC8D8', '#7DA6FF', '#A88BFA', '#F18BB8', '#73D5D0'];

export default function TechStack() {
  return (
    <section id="stack" className="section-shell relative overflow-hidden border-t border-white/[0.06] py-24 md:py-36">
      <div className="bp-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_80%_75%_at_50%_55%,black,transparent)]" />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <SectionHeading eyebrow="Technical Stack" heading="Tools I use to build and ship." body="Grouped by purpose—from backend code and databases to deployment, mapping and the user-facing product." />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((group, index) => {
            const tone = tones[index];
            return (
              <motion.article key={group.group} initial={{ opacity: 0, y: 24, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.65, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -5 }} className="tech-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800/80 p-6" style={{ '--tech-tone': tone }}>
                <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full opacity-[0.09] blur-[42px] transition-opacity group-hover:opacity-[0.18]" style={{ background: tone }} />
                <div className="relative flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border bg-white/[0.025]" style={{ color: tone, borderColor: `${tone}35` }}><SystemIcon name={iconNames[index]} /></span>
                  <div><span className="font-mono text-xs tracking-[0.14em] text-paper-faint">0{index + 1}</span><h3 className="mt-1 font-display text-xl font-medium text-paper">{group.group}</h3></div>
                </div>
                <ul className="relative mt-6 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex min-h-11 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 text-sm text-paper-dim transition-colors hover:border-white/[0.12] hover:text-paper">
                      <span className="technology-mark grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/[0.06] bg-ink-900/60"><TechnologyMark name={item} /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
