import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { TbAt, TbBriefcase, TbBuilding, TbCheck, TbCopy, TbMail, TbMessage2, TbRefresh, TbSend, TbShieldCheck, TbUser } from "react-icons/tb";
import { contact, identity, services } from "../data/content";
import { portfolioApi } from "../lib/api";
import SectionHeading from "./shared/SectionHeading";

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    // Clipboard API is unavailable on insecure origins and some embedded browsers.
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
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
      aria-label={copied ? "Email address copied" : "Copy email address"}
      title={copied ? "Copied" : "Copy email address"}
      className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors ${copied ? "border-system/30 bg-system/[0.08] text-system" : "border-line/[0.09] bg-line/[0.03] text-paper-faint hover:border-signal/30 hover:text-signal"}`}>
      {copied ? <TbCheck className="h-4 w-4" aria-hidden="true" /> : <TbCopy className="h-4 w-4" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}

const emptyForm = { name: "", email: "", company: "", service: "", budget: "", message: "" };

function InquiryForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [receipt, setReceipt] = useState("");

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const result = await portfolioApi.submitInquiry(form);
      setReceipt(result.id.slice(-6).toUpperCase());
      setForm(emptyForm);
      setStatus({ state: "success", message: "Your project brief reached my inbox." });
    } catch (error) {
      setStatus({ state: "error", message: error.message });
    }
  }

  function reset() {
    setReceipt("");
    setStatus({ state: "idle", message: "" });
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-line/[0.1] bg-ink-900/75 py-3 pl-11 pr-4 font-sans text-base normal-case tracking-normal text-paper outline-none transition-all placeholder:text-paper-faint/60 hover:border-line/[0.18] focus:border-signal/55 focus:bg-ink-900 focus:shadow-[0_0_0_3px_rgb(var(--color-signal)/0.07)] sm:text-sm";
  const labelClass = "group relative block font-mono text-[11px] uppercase tracking-[0.14em] text-paper-faint";

  const steps = [
    ["01", "Share the context", "Tell me what needs to work better."],
    ["02", "Define the scope", "Choose the closest engineering capability."],
    ["03", "Start the conversation", "I’ll reply using the email you provide."],
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-line/[0.09] bg-ink-800/70 text-left sm:rounded-[1.75rem]">
      <div className="project-modal-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative flex min-h-14 items-center justify-between gap-3 border-b border-line/[0.08] bg-ink-900/35 px-4 sm:px-6 lg:px-7">
        <span className="flex min-w-0 items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-dim sm:gap-3 sm:text-xs sm:tracking-[0.16em]">
          <span className="grid h-7 w-7 shrink-0 place-items-center whitespace-nowrap rounded-lg border border-signal/25 bg-signal/[0.07] font-mono text-[14px] leading-none text-signal">
            {"{}"}
          </span>
          Project request
        </span>
        <span className="inline-flex shrink-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-system sm:text-[10px] sm:tracking-[0.14em]">
          <span className="h-1.5 w-1.5 rounded-full bg-system shadow-[0_0_10px_rgb(var(--color-system))]" />
          <span className="hidden min-[390px]:inline">Secure channel</span>
          <span className="min-[390px]:hidden">Secure</span>
        </span>
      </div>

      <AnimatePresence mode="wait">
        {status.state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid min-h-[420px] place-items-center px-6 py-12 text-center">
            <div className="relative max-w-xl">
              <div className="relative mx-auto h-28 w-28">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-dashed border-system/25">
                  <i className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-system shadow-[0_0_14px_rgb(var(--color-system))]" />
                </motion.span>
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-4 grid place-items-center rounded-full border border-system/25 bg-system/[0.07]">
                  <motion.svg
                    viewBox="0 0 48 48"
                    className="h-10 w-10 text-system"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <motion.path
                      d="m13 25 7 7 15-17"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.35, duration: 0.65, ease: "easeOut" }}
                    />
                  </motion.svg>
                </motion.span>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-system">
                Signal received · Ref {receipt}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="mt-4 font-display text-2xl font-medium text-paper sm:text-3xl">
                Your project brief is in.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mx-auto mt-4 max-w-lg text-base leading-7 text-paper-dim">
                Thanks for sharing the context. I’ll review the details and reply using the email address you provided.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58 }}
                type="button"
                onClick={reset}
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-line/[0.1] bg-line/[0.035] px-5 py-3 text-sm text-paper-dim hover:border-signal/30 hover:text-signal">
                <TbRefresh className="h-4 w-4" /> Send another enquiry
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            className="relative grid xl:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)]">
            <aside className="relative overflow-hidden border-b border-line/[0.08] bg-ink-900/45 p-5 sm:p-6 lg:p-7 xl:border-b-0 xl:border-r xl:p-8">
              <div className="relative">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">Start with the problem</span>
                <h3 className="mt-3 font-display text-2xl font-medium leading-tight text-paper">{contact.ctaLabel}</h3>
                <p className="mt-3 text-sm leading-6 text-paper-dim">
                  A few useful details are enough to begin. You don’t need a finished technical specification.
                </p>
                <ol className="mt-6 grid gap-4 md:grid-cols-3 xl:mt-8 xl:grid-cols-1 xl:gap-5">
                  {steps.map(([number, title, detail], index) => (
                    <li key={number} className="relative grid grid-cols-[34px_1fr] gap-3">
                      {index < steps.length - 1 && (
                        <span className="absolute bottom-[-20px] left-[16px] top-8 hidden w-px bg-gradient-to-b from-signal/25 to-transparent xl:block" />
                      )}
                      <span className="grid h-8 w-8 place-items-center rounded-lg border border-signal/20 bg-signal/[0.06] font-mono text-[10px] text-signal">
                        {number}
                      </span>
                      <span>
                        <strong className="block text-sm font-medium text-paper">{title}</strong>
                        <span className="mt-1 block text-xs leading-5 text-paper-faint">{detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-system/15 bg-system/[0.045] p-4 xl:mt-9">
                  <TbShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-system" />
                  <p className="text-xs leading-5 text-paper-faint">
                    Your enquiry is stored in the private admin inbox and used only to respond to your request.
                  </p>
                </div>
              </div>
            </aside>

            <div className="min-w-0 p-5 sm:p-6 lg:p-7 xl:p-8">
              <div className="flex flex-col items-start gap-2 border-b border-line/[0.07] pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-system">Project brief</span>
                  <h3 className="mt-1 font-display text-xl font-medium text-paper">Tell me what you’re building.</h3>
                </div>
                <span className="hidden font-mono text-[10px] text-paper-faint sm:block">Required fields *</span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:gap-5">
                <label className={labelClass}>
                  Name *<TbUser className="absolute bottom-3.5 left-4 h-4 w-4 text-paper-faint transition-colors group-focus-within:text-signal" />
                  <input
                    className={fieldClass}
                    name="name"
                    value={form.name}
                    onChange={update}
                    minLength={2}
                    maxLength={100}
                    required
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </label>
                <label className={labelClass}>
                  Email *<TbAt className="absolute bottom-3.5 left-4 h-4 w-4 text-paper-faint transition-colors group-focus-within:text-signal" />
                  <input
                    className={fieldClass}
                    name="email"
                    value={form.email}
                    onChange={update}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                  />
                </label>
                <label className={labelClass}>
                  Company <span className="normal-case tracking-normal">(optional)</span>
                  <TbBuilding className="absolute bottom-3.5 left-4 h-4 w-4 text-paper-faint transition-colors group-focus-within:text-signal" />
                  <input
                    className={fieldClass}
                    name="company"
                    value={form.company}
                    onChange={update}
                    maxLength={120}
                    autoComplete="organization"
                    placeholder="Company or team"
                  />
                </label>
                <label className={labelClass}>
                  Service <span className="normal-case tracking-normal">(optional)</span>
                  <TbBriefcase className="absolute bottom-3.5 left-4 h-4 w-4 text-paper-faint transition-colors group-focus-within:text-signal" />
                  <select className={fieldClass} name="service" value={form.service} onChange={update}>
                    <option value="">Choose a capability</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  Engagement size <span className="normal-case tracking-normal">(optional)</span>
                  <TbBriefcase className="absolute bottom-3.5 left-4 h-4 w-4 text-paper-faint transition-colors group-focus-within:text-system" />
                  <select className={fieldClass} name="budget" value={form.budget} onChange={update}>
                    <option value="">Not decided yet</option>
                    <option value="Small engagement">Small engagement</option>
                    <option value="Medium project">Medium project</option>
                    <option value="Large project">Large project</option>
                    <option value="Ongoing partnership">Ongoing partnership</option>
                  </select>
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  Project details *
                  <TbMessage2 className="absolute left-4 top-[42px] h-4 w-4 text-paper-faint transition-colors group-focus-within:text-signal" />
                  <textarea
                    className={`${fieldClass} min-h-32 resize-y leading-6 sm:min-h-36`}
                    name="message"
                    value={form.message}
                    onChange={update}
                    minLength={10}
                    maxLength={3000}
                    required
                    placeholder="What problem are you solving, what exists today, and what would a successful outcome look like?"
                  />
                </label>
              </div>
              {status.state === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="mt-5 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
                  {status.message}
                </motion.div>
              )}
              <div className="mt-6 flex flex-col gap-4 border-t border-line/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.12em] text-paper-faint sm:text-left">
                  Direct · thoughtful · no obligation
                </p>
                <button
                  type="submit"
                  disabled={status.state === "loading"}
                  className="nav-cta group inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-sm font-medium text-ink-900 disabled:cursor-wait disabled:opacity-60 sm:w-auto">
                  {status.state === "loading" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
                        className="h-4 w-4 rounded-full border-2 border-ink-900/25 border-t-ink-900"
                      />{" "}
                      Sending brief…
                    </>
                  ) : (
                    <>
                      Send project brief <TbSend className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="contact-shell section-shell relative overflow-hidden border-t border-line/[0.06] py-20 md:py-28">
      <div className="bp-grid absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(ellipse_72%_72%_at_50%_55%,black,transparent)]" />
      <div className="absolute -right-40 top-24 h-80 w-80 rounded-full bg-system/[0.035] blur-[100px]" />

      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_390px] lg:items-end">
          <SectionHeading eyebrow={contact.eyebrow} heading={contact.heading} />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="border-l border-line/[0.1] pl-5">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-system">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-system opacity-40" />
                <span className="relative h-2 w-2 rounded-full bg-system" />
              </span>
              Available for the right problem
            </span>
            <p className="mt-3 text-base leading-[1.75] text-paper-dim">{contact.body}</p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center gap-5">
          <InquiryForm />
          <div className="grid w-full max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr]">
            <div className="group relative flex items-center gap-3 rounded-xl border border-line/[0.09] bg-ink-800/65 py-3 pl-4 pr-3 text-left transition-colors hover:border-signal/35 sm:col-span-2 lg:col-span-1">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-signal/20 bg-signal/[0.07] text-signal">
                <TbMail className="h-5 w-5" aria-hidden="true" />
              </span>
              <a
                href={`mailto:${identity.email}`}
                className="min-w-0 flex-1 outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-signal">
                <span className="block font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">Email</span>
                <span className="mt-1 block break-all text-sm text-paper-dim transition-colors group-hover:text-signal">{identity.email}</span>
              </a>
              <CopyEmailButton />
            </div>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-line/[0.09] bg-ink-800/65 px-4 py-3 text-left transition-colors hover:border-system/35">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-system/20 bg-system/[0.07] text-system">
                <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">LinkedIn</span>
                <span className="mt-1 block text-sm text-paper-dim transition-colors group-hover:text-system">
                  jaiminkatva <span aria-hidden="true">↗</span>
                </span>
              </span>
            </a>
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-line/[0.09] bg-ink-800/65 px-4 py-3 text-left transition-colors hover:border-line/25">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line/[0.12] bg-line/[0.04] text-paper">
                <FaGithub className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">GitHub</span>
                <span className="mt-1 block text-sm text-paper-dim transition-colors group-hover:text-paper">
                  jaiminkatva <span aria-hidden="true">↗</span>
                </span>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
