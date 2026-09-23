import { motion } from 'framer-motion';
import { stack } from '../data/content';
import SectionHeading from './shared/SectionHeading';
import SystemIcon from './shared/SystemIcon';

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
    <ul className={`relative flex flex-wrap ${core ? 'justify-center gap-2.5' : 'gap-x-4 gap-y-2.5'}`}>
      {items.map((item, index) => (
        <li key={item} className="stack-technology flex items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-paper-dim sm:text-xs">
          <span className={`rounded-full ${core && index === 0 ? 'h-1.5 w-1.5 bg-[#55D6E8]' : 'h-1 w-1 bg-signal/80'}`} />
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
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-faint">System / 0{index + 2}</span>
          <h3 className="mt-2 font-display text-xl font-medium text-paper">{group.group}</h3>
        </div>
        <span className={`grid h-9 w-9 place-items-center rounded-full border ${group.group === 'Product' ? 'border-[#55D6E8]/25 text-[#55D6E8]' : 'border-signal/25 text-signal'}`}>
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
    <section id="stack" className="section-shell relative overflow-hidden border-t border-white/[0.06] py-20 md:py-28">
      <div className="bp-grid absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(ellipse_72%_72%_at_50%_58%,black,transparent)]" />
      <div className="stack-ambient pointer-events-none absolute left-1/2 top-[58%] h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Technical Stack"
            heading="A connected system, built from the backend out."
            body="Backend engineering is the core. Data, infrastructure, geospatial systems and product interfaces connect around it as one delivery architecture."
          />
          <div className="hidden items-center gap-3 pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-faint lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#55D6E8] shadow-[0_0_12px_rgba(85,214,232,.7)]" />
            System online
            <span className="h-px w-12 bg-gradient-to-r from-[#55D6E8]/45 to-transparent" />
          </div>
        </div>

        <div className="stack-architecture relative mt-14 lg:mt-20">
          <svg className="stack-connections pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
            <g fill="none" stroke="rgba(255,138,61,.28)" strokeWidth="1">
              <path d="M390 270H350C320 270 302 254 284 226L245 166H208" />
              <path d="M610 270H650C680 270 698 254 716 226L755 166H792" />
              <path d="M390 350H350C320 350 302 366 284 394L245 454H208" />
              <path d="M610 350H650C680 350 698 366 716 394L755 454H792" />
              <path d="M500 176V82" />
              <path d="M500 444V538" />
            </g>
            <g fill="#0B0E14" stroke="#FF8A3D" strokeWidth="1.25">
              <circle cx="208" cy="166" r="5" /><circle cx="792" cy="166" r="5" />
              <circle cx="208" cy="454" r="5" /><circle cx="792" cy="454" r="5" />
              <circle cx="500" cy="82" r="8" /><circle cx="500" cy="538" r="8" />
            </g>
            <circle cx="500" cy="538" r="3" fill="#55D6E8" />
            <g fill="#FF8A3D">
              <circle cx="390" cy="270" r="2.5" /><circle cx="610" cy="270" r="2.5" />
              <circle cx="390" cy="350" r="2.5" /><circle cx="610" cy="350" r="2.5" />
            </g>
          </svg>

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
            <span className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Core / 01</span>
            <span className="relative mt-7 grid h-14 w-14 place-items-center rounded-full border border-signal/35 text-signal shadow-[0_0_35px_rgba(255,138,61,.12)]">
              <SystemIcon name="backend" className="h-7 w-7" />
            </span>
            <h3 className="relative mt-5 font-display text-2xl font-medium tracking-[0.08em] text-paper">BACKEND</h3>
            <p className="relative mt-3 max-w-[25ch] text-center text-sm leading-relaxed text-paper-faint">The service layer where business logic, APIs and real-time workflows converge.</p>
            <div className="relative mt-7 border-t border-white/[0.08] pt-6">
              <TechnologyList items={backend.items} core />
            </div>
          </motion.article>

          {connectedSystems.map((group, index) => <SystemNode key={group.group} group={group} index={index} />)}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-faint lg:mt-2">
          <span className="h-px w-8 bg-signal/40" />
          One architecture · five connected domains
          <span className="h-px w-8 bg-[#55D6E8]/35" />
        </div>
      </div>
    </section>
  );
}
