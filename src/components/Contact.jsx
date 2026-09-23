import { motion } from 'framer-motion';
import { contact, identity } from '../data/content';
import MagneticButton from './shared/MagneticButton';
import SystemIcon from './shared/SystemIcon';

export default function Contact() {
  return (
    <section id="contact" className="contact-shell relative overflow-hidden border-t border-white/[0.06] py-28 md:py-44">
      <div className="bp-grid absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_65%_75%_at_50%_50%,black,transparent)]" />
      <div className="contact-orbit absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/[0.08]" />
      <div className="contact-orbit contact-orbit-reverse absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-system/[0.09]" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/[0.08] blur-[100px]" />

      <div className="relative mx-auto max-w-content px-6 text-center md:px-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-system/20 bg-system/[0.055] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-system">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-system opacity-50" /><span className="relative h-2 w-2 rounded-full bg-system" /></span>
          Available for the right problem
        </motion.div>
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 block font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">{contact.eyebrow} / Let’s build</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.75rem,5vw,5rem)] font-medium leading-[0.98] tracking-[-0.045em] text-paper">
          Have a system <span className="hero-gradient-text">to build?</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7 }} className="mx-auto mt-7 max-w-2xl text-lg leading-[1.8] text-paper-dim">{contact.body}</motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.17, duration: 0.7 }} className="mt-10 flex flex-col items-center gap-5">
          <MagneticButton href={identity.linkedin} variant="primary" className="px-8 py-4 shadow-[0_16px_45px_rgba(255,138,61,.2)]">{contact.ctaLabel}<SystemIcon name="arrow" className="h-4 w-4" /></MagneticButton>
          <a href={identity.linkedin} target="_blank" rel="noreferrer" className="text-sm text-paper-dim transition-colors hover:text-signal">linkedin.com/in/jaiminkatva <span aria-hidden="true">↗</span></a>
        </motion.div>
      </div>
    </section>
  );
}
