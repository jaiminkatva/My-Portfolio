import { motion, useReducedMotion } from 'framer-motion';
import { TbBraces, TbFlask, TbRefresh, TbRocket, TbSearch, TbTopologyStar3 } from 'react-icons/tb';
import { engineeringPhilosophy } from '../data/content';
import SectionHeading from './shared/SectionHeading';

const stepIcons = [TbSearch, TbTopologyStar3, TbBraces, TbFlask, TbRocket, TbRefresh];
// Desktop layout snakes through a 2×3 grid: 1 → 2 ↓ 3 ← 4 ↓ 5 → 6.
const positions = [
  'lg:col-start-1 lg:row-start-1',
  'lg:col-start-2 lg:row-start-1',
  'lg:col-start-2 lg:row-start-2',
  'lg:col-start-1 lg:row-start-2',
  'lg:col-start-1 lg:row-start-3',
  'lg:col-start-2 lg:row-start-3',
];
const links = ['right', 'down', 'left', 'down', 'right', null];

export default function EngineeringApproach() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="approach" className="approach-section section-shell relative overflow-hidden border-t border-line/[0.06] py-20 md:py-28">
      <div className="bp-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_75%_75%_at_50%_55%,black,transparent)]" />
      <div className="section-orb -right-40 top-20 bg-signal" />
      <div className="absolute -left-48 bottom-10 h-96 w-96 rounded-full bg-system/[0.035] blur-[110px]" />

      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_390px] lg:items-end">
          <SectionHeading eyebrow={engineeringPhilosophy.eyebrow} heading="From problem to working product." />
          <p className="text-base leading-[1.8] text-paper-dim">{engineeringPhilosophy.intro}</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="approach-board relative mt-12 overflow-hidden rounded-[1.75rem] border border-line/[0.09] bg-ink-800/70 backdrop-blur-sm">
          <div className="approach-board-grid pointer-events-none absolute inset-0" />
          <div className="relative flex min-h-14 items-center justify-between gap-4 border-b border-line/[0.08] bg-ink-900/35 px-5 sm:px-7">
            <div className="flex items-center gap-3">
              <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.16em] text-signal">Delivery pipeline</span>
              <span className="hidden h-px w-10 bg-gradient-to-r from-signal/60 to-transparent sm:block" />
              <span className="hidden font-mono text-xs text-paper-faint sm:block">idea → reliable release</span>
            </div>
            <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.12em] text-system"><span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-system opacity-50" /><span className="relative h-2 w-2 rounded-full bg-system" /></span>Built to improve</span>
          </div>

          <div className="relative grid lg:grid-cols-[280px_1fr]">
            <aside className="relative overflow-hidden border-b border-line/[0.08] p-6 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
              <div className="relative">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-signal/20 bg-signal/[0.07] font-display text-2xl text-signal">{'{ }'}</span>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-paper-faint">Operating principle</p>
                <h3 className="mt-3 font-display text-2xl font-medium leading-tight text-paper">Start clear. Build with purpose.</h3>
                <p className="mt-4 text-sm leading-[1.75] text-paper-dim">Each step answers important questions before more time is invested, while leaving room to adapt when the product changes.</p>

                <div className="mt-9 space-y-3 border-t border-line/[0.08] pt-6">
                  {['Focused on the business goal', 'Guided by a clear system design', 'Ready for real-world use'].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-paper-dim"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-line/[0.07] bg-line/[0.025] font-mono text-xs text-signal">0{index + 1}</span>{item}</div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="approach-pipeline relative p-5 sm:p-7 lg:p-10">
              <ol className="approach-grid relative grid gap-4 lg:grid-cols-2 lg:grid-rows-3">
                {engineeringPhilosophy.steps.map((step, index) => {
                  const Icon = stepIcons[index];
                  return (
                    <motion.li
                      key={step.key}
                      initial={{ opacity: 0, x: reduceMotion ? 0 : index % 2 ? 24 : -24, y: reduceMotion ? 0 : 12 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-45px' }}
                      transition={{ duration: reduceMotion ? 0 : 0.65, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
                      className={`approach-step group relative z-10 min-h-[150px] rounded-2xl border border-line/[0.08] bg-ink-800/95 p-5 ${positions[index]}`}
                    >
                      {links[index] && (
                        <span className={`approach-link approach-link-${links[index]}`} style={{ '--step': index }} aria-hidden="true">
                          <i />
                        </span>
                      )}
                      <div className="relative flex items-start justify-between">
                        <span className="approach-icon grid h-11 w-11 place-items-center rounded-xl border border-signal/20 bg-signal/[0.06] text-signal"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                        <span className="font-mono text-xs tracking-[0.16em] text-paper-faint">0{index + 1}</span>
                      </div>
                      <h3 className="relative mt-5 font-display text-xl font-medium text-paper">{step.label}</h3>
                      <p className="relative mt-2 text-sm leading-[1.65] text-paper-dim">{step.detail}</p>
                      <span className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal to-system/40 transition-transform duration-500 group-hover:scale-x-100" />
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>

          <div className="relative flex flex-col gap-3 border-t border-line/[0.08] bg-ink-900/25 px-5 py-4 text-sm text-paper-faint sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <span>A clear process, with decisions shaped by the product.</span>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-system">06 steps · continuous improvement</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
