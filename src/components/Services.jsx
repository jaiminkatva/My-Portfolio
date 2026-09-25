import { motion } from 'framer-motion';
import { identity, services } from '../data/content';
import SectionHeading from './shared/SectionHeading';
import SystemIcon from './shared/SystemIcon';

const serviceIcons = ['backend', 'architecture', 'platforms', 'gis', 'infra', 'leadership'];

function enquiryHref(title) {
  return `mailto:${identity.email}?subject=${encodeURIComponent(`${title} enquiry`)}`;
}

export default function Services() {
  return (
    <section id="services" className="section-shell relative overflow-hidden border-t border-line/[0.06] py-20 md:py-28">
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <SectionHeading eyebrow="Engineering Capabilities" heading="Focused expertise across the system lifecycle." />
          <p className="text-base leading-[1.75] text-paper-dim">Capabilities shaped by owning backend products from system planning and implementation through integration, infrastructure and team delivery.</p>
        </div>

        <ul className="mt-12 border-t border-line/[0.09]">
          {services.map((service, index) => (
            <motion.li key={service.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }} className="service-row group relative isolate grid gap-4 border-b border-line/[0.08] py-7 md:grid-cols-[70px_1fr_1.25fr_48px] md:items-center md:gap-7">
              <span className="font-mono text-sm text-paper-faint">0{index + 1}</span>
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line/[0.08] bg-line/[0.025] text-signal transition-all duration-300 group-hover:border-signal/30 group-hover:bg-signal/[0.07]"><SystemIcon name={serviceIcons[index]} className="h-5 w-5" /></span>
                <h3 className="font-display text-xl font-medium text-paper transition-colors group-hover:text-signal sm:text-2xl">
                  {/* Stretched link: the whole row is clickable while the heading stays the accessible name. */}
                  <a href={enquiryHref(service.title)} className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-signal">
                    {service.title}
                  </a>
                </h3>
              </div>
              <p className="text-base leading-[1.7] text-paper-dim">{service.description}</p>
              <span className="hidden h-10 w-10 place-items-center rounded-full border border-line/[0.08] text-paper-faint transition-all group-hover:translate-x-1 group-hover:border-signal/30 group-hover:text-signal md:grid" aria-hidden="true"><SystemIcon name="arrow" className="h-4 w-4" /></span>
            </motion.li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">Select a capability to start an enquiry by email.</p>
      </div>
    </section>
  );
}
