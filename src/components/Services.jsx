import { motion } from 'framer-motion';
import { services } from '../data/content';
import SectionHeading from './shared/SectionHeading';
import SystemIcon from './shared/SystemIcon';

const serviceIcons = ['backend', 'architecture', 'platforms', 'gis', 'infra', 'leadership'];

export default function Services() {
  return (
    <section className="section-shell relative overflow-hidden border-t border-white/[0.06] py-24 md:py-36">
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <SectionHeading eyebrow="How I Can Help" heading="Practical engineering for real problems." />
          <p className="text-base leading-[1.8] text-paper-dim">Whether you need a new backend, a clearer business workflow or a more reliable existing system, we can start with the problem and build the right solution.</p>
        </div>

        <div className="mt-16 border-t border-white/[0.09]">
          {services.map((service, index) => (
            <motion.article key={service.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }} className="service-row group relative isolate grid gap-4 border-b border-white/[0.08] py-7 md:grid-cols-[70px_1fr_1.25fr_48px] md:items-center md:gap-7">
              <span className="font-mono text-sm text-paper-faint">0{index + 1}</span>
              <div className="flex items-center gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-signal transition-all duration-300 group-hover:border-signal/30 group-hover:bg-signal/[0.07]"><SystemIcon name={serviceIcons[index]} className="h-5 w-5" /></span><h3 className="font-display text-xl font-medium text-paper transition-colors group-hover:text-signal sm:text-2xl">{service.title}</h3></div>
              <p className="text-base leading-[1.7] text-paper-dim">{service.description}</p>
              <span className="hidden h-10 w-10 place-items-center rounded-full border border-white/[0.08] text-paper-faint transition-all group-hover:translate-x-1 group-hover:border-signal/30 group-hover:text-signal md:grid"><SystemIcon name="arrow" className="h-4 w-4" /></span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
