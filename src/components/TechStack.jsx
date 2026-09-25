import { motion } from 'framer-motion';
import { stack } from '../data/content';
import SectionHeading from './shared/SectionHeading';
import SystemIcon from './shared/SystemIcon';
import TechnologyMark from './shared/TechnologyMark';

const iconNames = {
  Backend: 'backend',
  Data: 'data',
  Infrastructure: 'infra',
  Geospatial: 'gis',
  Product: 'frontend',
};

const positions = {
  Data: 'stack-data',
  Infrastructure: 'stack-infrastructure',
  Geospatial: 'stack-geospatial',
  Product: 'stack-product',
};

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

function TechnologyList({ items, core = false }) {
  return (
    <ul className={`relative flex flex-wrap gap-2 ${core ? 'justify-center' : ''}`}>
      {items.map((item) => (
        <li
          key={item}
          className="stack-technology inline-flex items-center gap-2 rounded-lg border border-line/[0.07] bg-line/[0.025] py-1.5 pl-1.5 pr-2.5 font-mono text-xs tracking-[0.02em] text-paper-dim"
        >
          <span className="grid h-6 w-6 place-items-center rounded-md bg-ink-900/60">
            <TechnologyMark name={item} className="h-3.5 w-3.5" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function SystemNode({ group, index }) {
  return (
    <motion.article
      custom={0.12 + index * 0.06}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`stack-node ${positions[group.group]}`}
    >
      <span className="stack-link" style={{ '--delay': `${index * 0.8}s` }} aria-hidden="true">
        <i />
      </span>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-faint">System / 0{index + 2}</span>
          <h3 className="mt-2 font-display text-xl font-medium text-paper">{group.group}</h3>
        </div>
        <span className={`grid h-9 w-9 place-items-center rounded-full border ${group.group === 'Product' ? 'border-system/25 text-system' : 'border-signal/25 text-signal'}`}>
          <SystemIcon name={iconNames[group.group]} className="h-[18px] w-[18px]" />
        </span>
      </div>
      <TechnologyList items={group.items} />
    </motion.article>
  );
}

export default function TechStack() {
  const backend = stack.find((group) => group.group === 'Backend');
  const connectedSystems = stack.filter((group) => group.group !== 'Backend');

  return (
    <section id="stack" className="section-shell relative overflow-hidden border-t border-line/[0.06] py-20 md:py-28">
      <div className="bp-grid absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(ellipse_72%_72%_at_50%_58%,black,transparent)]" />
      <div className="stack-ambient pointer-events-none absolute left-1/2 top-[58%] h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Technical Stack"
            heading="A connected system, built from the backend out."
            body="Backend engineering is the core. Data, infrastructure, geospatial systems and product interfaces connect around it as one delivery architecture."
          />
          <div className="hidden items-center gap-3 pb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-faint lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-system shadow-[0_0_12px_rgb(var(--color-system)/0.7)]" />
            System online
            <span className="h-px w-12 bg-gradient-to-r from-system/45 to-transparent" />
          </div>
        </div>

        <div className="stack-architecture relative mt-14 lg:mt-20">
          <motion.article
            custom={0.04}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="stack-core crop relative"
          >
            <div className="stack-core-surface" aria-hidden="true" />
            <div className="stack-core-orbit" aria-hidden="true"><span /></div>
            <span className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Core / 01</span>
            <span className="relative mt-7 grid h-14 w-14 place-items-center rounded-full border border-signal/35 bg-ink-900/40 text-signal shadow-[0_0_35px_rgba(255,138,61,.12)]">
              <SystemIcon name="backend" className="h-7 w-7" />
            </span>
            <h3 className="relative mt-5 font-display text-2xl font-medium tracking-[0.08em] text-paper">BACKEND</h3>
            <p className="relative mt-3 max-w-[26ch] text-center text-sm leading-relaxed text-paper-dim">The service layer where business logic, APIs and real-time workflows converge.</p>
            <div className="relative mt-7 w-full border-t border-line/[0.08] pt-6">
              <TechnologyList items={backend.items} core />
            </div>
          </motion.article>

          {connectedSystems.map((group, index) => <SystemNode key={group.group} group={group} index={index} />)}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-paper-faint lg:mt-8">
          <span className="h-px w-8 shrink-0 bg-signal/40" />
          One architecture · five connected domains
          <span className="h-px w-8 shrink-0 bg-system/35" />
        </div>
      </div>
    </section>
  );
}
