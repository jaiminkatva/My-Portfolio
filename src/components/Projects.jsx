import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TbInfoCircle, TbRouteAltLeft } from "react-icons/tb";
import { projects } from "../data/content";
import TechnologyMark from "./shared/TechnologyMark";

const accents = ["#FF8A3D", "#5EC8D8", "#A88BFA", "#6BD6A4"];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg viewBox="0 0 18 18" className="h-4 w-4" fill="none" aria-hidden="true">
      {diagonal ? (
        <path d="M5 13 13 5m-6 0h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M3.5 9h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ProjectGlyph({ index, accent }) {
  const paths = [
    <>
      <rect key="a" x="5" y="8" width="22" height="17" rx="2" />
      <path key="b" d="M9 8V5h14v3M10 13h5m-5 5h12" />
    </>,
    <>
      <circle key="a" cx="16" cy="10" r="4" />
      <path key="b" d="M8 27v-3c0-4 3-7 8-7s8 3 8 7v3M5 28h22" />
    </>,
    <>
      <path key="a" d="m5 11 11-6 11 6-11 6-11-6Zm0 6 11 6 11-6M5 23l11 6 11-6" />
    </>,
    <>
      <path key="a" d="M6 26V8l7-3 7 3 6-2v18l-6 3-7-3-7 2Z" />
      <path key="b" d="M13 5v19m7-16v19" />
    </>,
  ];
  return (
    <div
      className="project-glyph relative grid h-14 w-14 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.035]"
      style={{ "--project-accent": accent }}>
      <span className="absolute inset-2 rounded-xl opacity-20 blur-md" style={{ background: accent }} />
      <svg
        viewBox="0 0 32 32"
        className="relative h-8 w-8"
        fill="none"
        stroke={accent}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true">
        {paths[index]}
      </svg>
    </div>
  );
}

function ProjectCard({ project, index, onOpen }) {
  const accent = accents[index];

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="hover"
      className="project-card group relative isolate flex min-h-[470px] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-ink-800/80 p-6 backdrop-blur-sm sm:p-8"
      style={{ "--project-accent": accent }}>
      <div className="project-card-grid absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div
        className="absolute -right-20 -top-20 -z-10 h-52 w-52 rounded-full opacity-[0.08] blur-[60px] transition-all duration-700 group-hover:scale-125 group-hover:opacity-[0.16]"
        style={{ background: accent }}
      />
      <div
        className="absolute inset-x-8 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-engineer group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      <div className="flex items-start justify-between">
        <ProjectGlyph index={index} accent={accent} />
        <div className="text-right">
          <span className="block font-mono text-xs uppercase tracking-[0.16em] text-paper-faint">System / {project.index}</span>
          <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em]" style={{ color: accent }}>
            <span className="h-1 w-1 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
            Built for production
          </span>
        </div>
      </div>

      <div className="mt-8">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-paper-faint">{project.category}</span>
        <h3 className="mt-3 max-w-md font-display text-2xl font-medium leading-tight text-paper transition-colors duration-300 group-hover:text-white sm:text-[1.7rem]">
          {project.name}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-[1.75] text-paper-dim">{project.summary}</p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
        {project.tags.map((tag) => (
          <li key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 font-mono text-xs tracking-wide text-paper-dim">
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <div className="mb-5 flex items-center gap-3 border-t border-white/[0.07] pt-5">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">Key benefit</span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          <span className="font-display text-sm text-paper">{project.usp.title}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onOpen(project, "info")}
            className="project-button inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.025] px-3 py-3 font-mono text-xs uppercase tracking-[0.08em] text-paper transition-colors hover:border-white/25 hover:bg-white/[0.055]">
            Project info <ArrowIcon />
          </button>
          <button
            type="button"
            onClick={() => onOpen(project, "case")}
            className="project-button inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 font-mono text-xs uppercase tracking-[0.08em] text-ink-900 transition-transform hover:-translate-y-0.5"
            style={{ background: accent, boxShadow: `0 10px 30px ${accent}24` }}>
            Case study <ArrowIcon diagonal />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function DetailBlock({ number, label, title, children }) {
  return (
    <div className="project-detail-block group grid gap-4 border-t border-white/[0.08] py-7 sm:grid-cols-[108px_1fr] sm:gap-7">
      <div className="flex items-start gap-2 sm:block">
        <span className="project-detail-number grid h-9 w-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.025] font-mono text-xs">
          {number}
        </span>
        <span className="mt-2 block font-mono text-xs uppercase tracking-[0.12em] text-paper-faint">{label}</span>
      </div>
      <div>
        <h4 className="font-display text-xl font-medium text-paper">{title}</h4>
        <div className="mt-2 text-base leading-[1.75] text-paper-dim">{children}</div>
      </div>
    </div>
  );
}

function TechnologyPill({ name, accent }) {
  return (
    <span className="project-skill-pill group inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.025] py-2 pl-2 pr-3 font-mono text-xs tracking-wide text-paper-dim transition-all hover:-translate-y-0.5 hover:text-paper">
      <span className="project-skill-icon grid h-7 w-7 place-items-center rounded-lg border border-white/[0.07] bg-ink-900/65">
        <TechnologyMark name={name} className="h-4 w-4" />
      </span>
      {name}
      <span
        className="h-1 w-1 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: accent, boxShadow: `0 0 7px ${accent}` }}
      />
    </span>
  );
}

function ProjectModal({ project, initialView, onClose }) {
  const [view, setView] = useState(initialView);
  const closeRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const index = projects.findIndex((item) => item.id === project.id);
  const accent = accents[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 backdrop-blur-md sm:items-center sm:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-${project.id}-title`}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 32, scale: reduceMotion ? 1 : 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.99 }}
        transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="project-modal relative flex h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[1.75rem] border border-white/[0.1] bg-ink-800 shadow-2xl sm:h-[min(900px,94vh)] sm:rounded-[1.75rem]"
        style={{ "--project-accent": accent }}>
        <div className="project-modal-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full opacity-[0.1] blur-[90px]" style={{ background: accent }} />
        <div className="absolute inset-x-10 top-0 z-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

        <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-ink-800/85 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: accent }}>
              Featured work
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-paper-faint sm:block" />
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">Project {project.index}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 font-mono text-xs text-paper-faint sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
              Built for production
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="project-modal-close grid h-10 w-10 place-items-center rounded-xl border border-white/[0.1] bg-white/[0.025] text-paper-dim transition-all hover:border-white/25 hover:bg-white/[0.06] hover:text-paper">
              <CloseIcon />
            </button>
          </div>
        </div>

        <div
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          tabIndex="0"
          aria-label={`${project.name} project details`}
          className="project-modal-scroll relative min-h-0 flex-1 overflow-y-auto overscroll-contain"
          style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
          onWheelCapture={(event) => event.stopPropagation()}>
          <div className="px-5 pb-10 pt-8 sm:px-8 sm:pt-10 lg:px-12">
            <div className="project-modal-intro relative overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900/35 p-5 sm:p-7">
              <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full opacity-[0.08] blur-[58px]" style={{ background: accent }} />
              <div className="relative flex items-start gap-4 sm:gap-5">
                <div className="shrink-0">
                  <ProjectGlyph index={index} accent={accent} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs uppercase tracking-[0.15em]" style={{ color: accent }}>
                      {project.category}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-paper-faint" />
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-paper-faint">{project.tags.slice(0, 2).join(" · ")}</span>
                  </div>
                  <h3
                    id={`project-${project.id}-title`}
                    className="mt-3 max-w-3xl font-display text-3xl font-medium leading-[1.07] tracking-[-0.025em] text-paper sm:text-4xl lg:text-[2.75rem]">
                    {project.fullTitle}
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-[1.7] text-paper-dim">{project.summary}</p>
                </div>
              </div>
            </div>

            <div className="project-modal-tabs mt-5 grid gap-3 sm:grid-cols-2" role="tablist" aria-label="Choose project details">
              <button
                type="button"
                role="tab"
                aria-selected={view === "info"}
                onClick={() => setView("info")}
                className={`project-view-tab group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${view === "info" ? "is-active" : "border-white/[0.07] bg-white/[0.015]"}`}
                style={{ "--tab-accent": accent }}>
                <span className="project-view-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-ink-900/60 text-paper-dim">
                  <TbInfoCircle className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-base font-medium text-paper">Project overview</span>
                  <span className="mt-1 block text-sm text-paper-faint">Purpose, features and my role</span>
                </span>
                <span className="ml-auto font-mono text-xs text-paper-faint">01</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={view === "case"}
                onClick={() => setView("case")}
                className={`project-view-tab group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${view === "case" ? "is-active" : "border-white/[0.07] bg-white/[0.015]"}`}
                style={{ "--tab-accent": accent }}>
                <span className="project-view-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-ink-900/60 text-paper-dim">
                  <TbRouteAltLeft className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-base font-medium text-paper">Engineering case study</span>
                  <span className="mt-1 block text-sm text-paper-faint">Problem, approach and result</span>
                </span>
                <span className="ml-auto font-mono text-xs text-paper-faint">02</span>
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className="mt-10">
                {view === "info" ? (
                  <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
                    <div>
                      <p className="max-w-2xl text-base leading-[1.8] text-paper-dim">{project.description}</p>
                      <div className="mt-8 rounded-2xl border p-5 sm:p-6" style={{ borderColor: `${accent}40`, background: `${accent}0b` }}>
                        <span className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: accent }}>
                          Key benefit
                        </span>
                        <h4 className="mt-3 font-display text-xl font-medium text-paper">{project.usp.title}</h4>
                        <p className="mt-2 text-base leading-relaxed text-paper-dim">{project.usp.body}</p>
                      </div>
                    </div>
                    <div className="space-y-7">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">Main features</span>
                        <ul className="mt-4 grid gap-2">
                          {project.modules.map((module, i) => (
                            <li key={module} className="flex items-center gap-3 text-base text-paper-dim">
                              <span className="font-mono text-xs" style={{ color: accent }}>
                                0{i + 1}
                              </span>
                              {module}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t border-white/[0.08] pt-6">
                        <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">My role</span>
                        <p className="mt-3 text-base leading-relaxed text-paper-dim">{project.role.join(" · ")}</p>
                      </div>
                    </div>
                    <div className="border-t border-white/[0.08] pt-6 lg:col-span-2">
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">Technology & skills</span>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {project.allTags.map((tag) => (
                          <TechnologyPill key={tag} name={tag} accent={accent} />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <DetailBlock number="01" label="Overview" title="What the product does">
                      {project.description}
                    </DetailBlock>
                    <DetailBlock number="02" label="Problem" title="Why it was needed">
                      {project.caseStudy.problem}
                    </DetailBlock>
                    <DetailBlock number="03" label="My work" title="What I was responsible for">
                      {project.role.join(" · ")}
                    </DetailBlock>
                    <DetailBlock number="04" label="Architecture" title="How the system is built">
                      {project.caseStudy.architecture}
                    </DetailBlock>
                    <DetailBlock number="05" label="Challenge" title="The main technical challenge">
                      {project.caseStudy.challenge}
                    </DetailBlock>
                    <DetailBlock number="06" label="Solution" title={project.usp.title}>
                      {project.caseStudy.solution}
                    </DetailBlock>
                    <DetailBlock number="07" label="Workflow" title="How the product works">
                      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                        {project.caseStudy.workflow.map((step, i) => (
                          <li key={step} className="flex gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                            <span className="font-mono text-xs" style={{ color: accent }}>
                              0{i + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </DetailBlock>
                    <DetailBlock number="08" label="Result" title="What the system made possible">
                      {project.caseStudy.outcome}
                    </DetailBlock>
                    <DetailBlock number="09" label="Technology" title="Tools and technical skills">
                      <div className="flex flex-wrap gap-2.5">
                        {project.allTags.map((tag) => (
                          <TechnologyPill key={tag} name={tag} accent={accent} />
                        ))}
                      </div>
                    </DetailBlock>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selection, setSelection] = useState(null);
  function openProject(project, view) {
    setSelection({ project, view });
  }

  return (
    <section id="work" className="featured-work relative overflow-hidden border-t border-ink-600 py-20 md:py-28">
      <div className="bp-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent)]" />
      <div className="absolute left-1/2 top-12 h-80 w-[70%] -translate-x-1/2 rounded-full bg-signal/[0.035] blur-[100px]" />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_390px]">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="mb-5 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-signal">Featured Work</span>
              <span className="h-px w-14 bg-gradient-to-r from-signal/70 to-transparent" />
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">Selected systems / 01—04</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.25rem,3.5vw,3.35rem)] font-medium leading-[1.08] tracking-[-0.035em] text-paper">
              Real problems. <span className="featured-gradient-text">Working software.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="max-w-xl text-base leading-[1.8] text-paper-dim lg:pb-1">
            Business operations, HR automation and interactive mapping tools—each designed around the way people actually work and built for real users.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={openProject} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-system/20 bg-system/[0.07] font-mono text-sm text-system">{`{ }`}</span>
            <div>
              <p className="font-display text-sm text-paper">Built for real-world use.</p>
              <p className="mt-1 text-xs text-paper-faint">Planning · system design · APIs · business rules · deployment</p>
            </div>
          </div>
          <a
            href="#approach"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-system transition-colors hover:text-paper">
            Explore my approach <ArrowIcon />
          </a>
        </motion.div>
      </div>
      <AnimatePresence>
        {selection && <ProjectModal key={selection.project.id} project={selection.project} initialView={selection.view} onClose={() => setSelection(null)} />}
      </AnimatePresence>
    </section>
  );
}
