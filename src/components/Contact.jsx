import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { TbCheck, TbCopy, TbMail } from 'react-icons/tb';
import { contact, identity } from '../data/content';
import MagneticButton from './shared/MagneticButton';
import SystemIcon from './shared/SystemIcon';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    // Clipboard API is unavailable on insecure origins and some embedded browsers.
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    field.remove();
    return copied;
  }
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleCopy() {
    if (!(await copyText(identity.email))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      title={copied ? 'Copied' : 'Copy email address'}
      className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors ${copied ? 'border-system/30 bg-system/[0.08] text-system' : 'border-line/[0.09] bg-line/[0.03] text-paper-faint hover:border-signal/30 hover:text-signal'}`}
    >
      {copied ? <TbCheck className="h-4 w-4" aria-hidden="true" /> : <TbCopy className="h-4 w-4" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="contact-shell relative overflow-hidden border-t border-line/[0.06] py-24 md:py-32">
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
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.7 }} className="mx-auto mt-7 max-w-2xl text-base leading-[1.8] text-paper-dim sm:text-lg">{contact.body}</motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.17, duration: 0.7 }} className="mt-10 flex flex-col items-center gap-7">
          <MagneticButton href={`mailto:${identity.email}?subject=${encodeURIComponent('Project enquiry')}`} variant="primary" className="px-8 py-4 shadow-[0_16px_45px_rgba(255,138,61,.2)]">{contact.ctaLabel}<SystemIcon name="arrow" className="h-4 w-4" /></MagneticButton>
          <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr]">
            <div className="group relative flex items-center gap-3 rounded-xl border border-line/[0.09] bg-ink-800/65 py-3 pl-4 pr-3 text-left transition-colors hover:border-signal/35 sm:col-span-2 lg:col-span-1">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-signal/20 bg-signal/[0.07] text-signal"><TbMail className="h-5 w-5" aria-hidden="true" /></span>
              <a href={`mailto:${identity.email}`} className="min-w-0 flex-1 outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-signal">
                <span className="block font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">Email</span>
                <span className="mt-1 block break-all text-sm text-paper-dim transition-colors group-hover:text-signal">{identity.email}</span>
              </a>
              <CopyEmailButton />
            </div>
            <a href={identity.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl border border-line/[0.09] bg-ink-800/65 px-4 py-3 text-left transition-colors hover:border-system/35">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-system/20 bg-system/[0.07] text-system"><FaLinkedinIn className="h-4 w-4" aria-hidden="true" /></span>
              <span><span className="block font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">LinkedIn</span><span className="mt-1 block text-sm text-paper-dim transition-colors group-hover:text-system">jaiminkatva <span aria-hidden="true">↗</span></span></span>
            </a>
            <a href={identity.github} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl border border-line/[0.09] bg-ink-800/65 px-4 py-3 text-left transition-colors hover:border-line/25">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line/[0.12] bg-line/[0.04] text-paper"><FaGithub className="h-5 w-5" aria-hidden="true" /></span>
              <span><span className="block font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">GitHub</span><span className="mt-1 block text-sm text-paper-dim transition-colors group-hover:text-paper">jaiminkatva <span aria-hidden="true">↗</span></span></span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
