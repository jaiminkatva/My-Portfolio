import { motion } from 'framer-motion';
import { leadership } from '../data/content';
import SectionHeading from './shared/SectionHeading';
import SystemIcon from './shared/SystemIcon';

export default function Leadership() {
  return (
    <section className="section-shell relative overflow-hidden border-t border-white/[0.06] bg-ink-800/30 py-24 md:py-36">
      <div className="section-orb -left-48 bottom-0 bg-system" />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={leadership.eyebrow} heading="Responsible for more than code." body={leadership.intro} />
            <div className="mt-9 hidden items-center gap-3 text-system lg:flex"><span className="h-2 w-2 animate-pulse rounded-full bg-system shadow-[0_0_12px_#5EC8D8]" /><span className="font-mono text-xs uppercase tracking-[0.16em]">Responsibility across the product</span></div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {leadership.items.map((item, index) => (
              <motion.article key={item} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }} className={`group flex min-h-[126px] items-start gap-4 rounded-2xl border border-white/[0.07] bg-ink-800/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-system/25 ${index === leadership.items.length - 1 ? 'sm:col-span-2' : ''}`}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-system/20 bg-system/[0.06] text-system"><SystemIcon name={index % 3 === 0 ? 'architecture' : index % 3 === 1 ? 'leadership' : 'check'} className="h-4 w-4" /></span>
                <div><span className="font-mono text-xs text-paper-faint">0{index + 1}</span><h3 className="mt-2 text-base font-medium leading-snug text-paper">{item}</h3></div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
