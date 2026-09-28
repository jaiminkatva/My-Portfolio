import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { TbArrowLeft, TbArrowRight, TbInfoCircle, TbRouteAltLeft } from "react-icons/tb";
import { projects } from "../data/content";
import { getLenis } from "../hooks/useLenis";
import Flipbook, { FLIP_MS, pageToView, useSpreadLayout, viewCount, viewToPage, visiblePages } from "./shared/Flipbook";
import TechnologyMark from "./shared/TechnologyMark";

const accents = ["var(--project-orange)", "var(--project-cyan)", "var(--project-purple)", "var(--project-green)"];

// Pages that belong to the whole book (cover, contents, index) use the section's signal colour.
const BOOK_ACCENT = "rgb(var(--color-signal))";

// The two chapters every project has; `page` is where each chapter begins.
const VIEWS = [
  { key: "info", label: "Project overview", short: "Overview", hint: "Purpose, features and my role", Icon: TbInfoCircle, page: "overview" },
  { key: "case", label: "Engineering case study", short: "Case study", hint: "Problem, approach and result", Icon: TbRouteAltLeft, page: "case" },
];

// One project's pages, each laid out from that project's existing content.
const PROJECT_PAGES = [
  { id: "title" },
  { id: "overview", view: "info" },
  { id: "features", view: "info" },
  { id: "role", view: "info" },
  { id: "case", view: "case" },
  { id: "architecture", view: "case" },
  { id: "solution", view: "case" },
  { id: "result", view: "case" },
];

// The Featured Work book: cover, contents, every project in turn, a summary and the back cover.
const PAGES = [
  { id: "cover" },
  { id: "contents" },
  ...projects.flatMap((_, project) => PROJECT_PAGES.map((page) => ({ ...page, project }))),
  { id: "index" },
  { id: "back" },
];

const pageIndex = (id, project) => PAGES.findIndex((page) => page.id === id && page.project === project);
const pad = (number) => String(number).padStart(2, "0");

// How long the book takes to fly from the section to the reader before its cover opens.
const ARRIVE_MS = 700;

const FOCUSABLE = 'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), [tabindex="0"]';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M3.5 9h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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

function ProjectGlyph({ index, accent, small = false }) {
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
      className={`project-glyph relative grid shrink-0 place-items-center border border-line/[0.08] bg-line/[0.035] ${small ? "h-10 w-10 rounded-xl" : "h-14 w-14 rounded-2xl"}`}
      style={{ "--project-accent": accent }}>
      <span className="absolute inset-2 rounded-xl opacity-20 blur-md" style={{ background: accent }} />
      <svg
        viewBox="0 0 32 32"
        className={`relative ${small ? "h-6 w-6" : "h-8 w-8"}`}
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

function DetailBlock({ number, label, title, children }) {
  return (
    <div className="project-detail-block group border-t border-line/[0.08] py-4 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-3">
        <span className="project-detail-number grid h-7 w-7 place-items-center rounded-lg border border-line/[0.08] bg-line/[0.025] font-mono text-xs">
          {number}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-paper-faint">{label}</span>
      </div>
      <h4 className="mt-3 font-display text-lg font-medium leading-snug text-paper">{title}</h4>
      <div className="mt-2 text-[0.9rem] leading-[1.75] text-paper-dim">{children}</div>
    </div>
  );
}

function TechnologyPill({ name, accent }) {
  return (
    <span className="project-skill-pill group inline-flex items-center gap-2.5 rounded-xl border border-line/[0.08] bg-line/[0.025] py-2 pl-2 pr-3 font-mono text-xs tracking-wide text-paper-dim transition-all hover:-translate-y-0.5 hover:text-paper">
      <span className="project-skill-icon grid h-7 w-7 place-items-center rounded-lg border border-line/[0.07] bg-ink-900/65">
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

function ProductionMark({ accent }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em]" style={{ color: accent }}>
      <span className="h-1 w-1 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
      Built for production
    </span>
  );
}

function ChapterHeading({ view, accent }) {
  const { Icon } = view;
  return (
    <div>
      <div className="flex items-center gap-3">
        <span
          className="grid h-10 w-10 place-items-center rounded-xl border"
          style={{ color: accent, borderColor: `color-mix(in srgb, ${accent} 30%, transparent)`, background: `color-mix(in srgb, ${accent} 7%, transparent)` }}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-paper-faint">Chapter {pad(VIEWS.indexOf(view) + 1)}</span>
      </div>
      <h4 className="mt-5 font-display text-[1.85rem] font-medium leading-[1.1] tracking-[-0.02em] text-paper">{view.label}</h4>
      <p className="mt-2 text-sm text-paper-faint">{view.hint}</p>
      <span className="mt-5 block h-px w-14" style={{ background: accent }} />
    </div>
  );
}

// Printed frame shared by the inside pages: running head, body and folio.
function DossierPage({ accent, side, number, head, chapter, footer, children }) {
  return (
    <div className={`relative flex min-h-full flex-col ${side === "single" ? "px-6 pb-5 pt-6" : "px-9 pb-6 pt-7"}`} style={{ "--project-accent": accent }}>
      <div className="project-modal-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-faint">
        <span className="whitespace-nowrap">{head}</span>
        <span className="truncate" style={{ color: accent }}>
          {chapter}
        </span>
      </div>
      <div className="relative mt-6 flex flex-1 flex-col">{children}</div>
      <div
        className={`relative mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-faint ${side === "left" ? "" : "flex-row-reverse"}`}>
        <span className="text-paper-dim">{pad(number)}</span>
        <span className="h-px flex-1 bg-line/[0.08]" />
        <span className="truncate">{footer}</span>
      </div>
    </div>
  );
}

// Front cover of the Featured Work book: the section's title and description. Sized in
// container units, so the same cover works on the floating book and on the reader's page.
function BookCover({ Heading = "p", onOpen }) {
  return (
    <div className="dossier-cover book-cover relative flex h-full min-h-full flex-col overflow-hidden" style={{ "--project-accent": BOOK_ACCENT }}>
      <div className="project-modal-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute -right-[22%] -top-[18%] h-[62%] w-[75%] rounded-full opacity-[0.16] blur-[70px]"
        style={{ background: BOOK_ACCENT }}
      />
      <span className="dossier-cover-band is-spine-left" />
      <div className="book-cover-meta relative flex items-center justify-between gap-3 font-mono uppercase tracking-[0.16em]">
        <span className="text-signal">Featured Work</span>
        <span className="text-paper-faint">01—04</span>
      </div>
      <div className="relative mt-auto pt-[6cqw]">
        <div className="flex gap-[2.5cqw]">
          {projects.map((project, i) => (
            <ProjectGlyph key={project.id} index={i} accent={accents[i]} small />
          ))}
        </div>
        <Heading className="book-cover-title mt-[7cqw] font-display font-medium leading-[1.06] tracking-[-0.035em] text-paper">
          Real problems. <span className="featured-gradient-text">Working software.</span>
        </Heading>
        <p className="book-cover-text mt-[4.5cqw] leading-[1.7] text-paper-dim">
          Business operations, HR automation and interactive mapping tools—each designed around the way people actually work and built for real users.
        </p>
      </div>
      <div className="relative mt-[7cqw] flex items-center justify-between gap-3 border-t border-line/[0.08] pt-[4.5cqw]">
        <span className="book-cover-meta font-mono uppercase tracking-[0.16em] text-paper-faint">Selected systems</span>
        {onOpen ? (
          <button
            type="button"
            onClick={onOpen}
            className="dossier-open inline-flex items-center gap-2 rounded-lg px-2 py-1 font-mono text-xs uppercase tracking-[0.12em] text-paper">
            Open <ArrowIcon />
          </button>
        ) : (
          <span className="dossier-open inline-flex items-center gap-2 rounded-lg px-2 py-1 font-mono text-xs uppercase tracking-[0.12em] text-paper">
            Open <ArrowIcon />
          </span>
        )}
      </div>
    </div>
  );
}

function BackCoverPage({ side }) {
  return (
    <div
      className={`dossier-cover relative flex min-h-full flex-col overflow-hidden ${side === "single" ? "px-7 py-7" : "px-10 py-9"}`}
      style={{ "--project-accent": BOOK_ACCENT }}>
      <div className="project-modal-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full opacity-[0.12] blur-[80px]" style={{ background: BOOK_ACCENT }} />
      <span className={`dossier-cover-band ${side === "left" ? "is-spine-right" : "is-spine-left"}`} />
      <div className="relative flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.16em]">
        <span className="text-signal">Featured Work</span>
        <span className="text-paper-faint">01—04</span>
      </div>
      <div className="relative my-auto py-10">
        <div className="flex gap-2.5">
          {projects.map((project, i) => (
            <ProjectGlyph key={project.id} index={i} accent={accents[i]} small />
          ))}
        </div>
        <p className="mt-8 font-display text-2xl font-medium leading-tight text-paper">Built for real-world use.</p>
        <p className="mt-3 text-sm leading-relaxed text-paper-dim">Planning · system design · APIs · business rules · deployment</p>
      </div>
      <div className="relative border-t border-line/[0.08] pt-5">
        <ProductionMark accent={BOOK_ACCENT} />
      </div>
    </div>
  );
}

// A project's opening page: what its card on the page used to show.
function ProjectTitlePage({ project, accent, index, side }) {
  return (
    <div
      className={`dossier-cover relative flex min-h-full flex-col overflow-hidden ${side === "single" ? "px-7 py-7" : "px-10 py-9"}`}
      style={{ "--project-accent": accent }}>
      <div className="project-modal-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.16] blur-[80px]" style={{ background: accent }} />
      <span className={`dossier-cover-band ${side === "left" ? "is-spine-right" : "is-spine-left"}`} />
      <div className="relative flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.16em]">
        <span style={{ color: accent }}>System / {project.index}</span>
        <span className="text-paper-faint">
          {project.index} / {pad(projects.length)}
        </span>
      </div>
      <div className="relative mt-auto pt-10">
        <ProjectGlyph index={index} accent={accent} />
        <span className="mt-7 block font-mono text-xs uppercase tracking-[0.16em]" style={{ color: accent }}>
          {project.category}
        </span>
        <h3 className="text-balance mt-3 font-display text-[1.75rem] font-medium leading-[1.12] tracking-[-0.025em] text-paper">{project.fullTitle}</h3>
        <p className="mt-4 text-[0.9rem] leading-[1.75] text-paper-dim">{project.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line/[0.08] bg-line/[0.02] px-3 py-1.5 font-mono text-xs tracking-wide text-paper-dim">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative mt-9 border-t border-line/[0.08] pt-5">
        <ProductionMark accent={accent} />
      </div>
    </div>
  );
}

function ContentsEntry({ number, label, page, accent, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(page)} className="dossier-contents-entry group flex w-full items-baseline gap-3 py-1 text-left">
      <span className="w-6 shrink-0 font-mono text-xs" style={{ color: accent }}>
        {number}
      </span>
      <span className="font-display text-base font-medium text-paper">{label}</span>
      <span className="dossier-leader min-w-4 flex-1" />
      <span className="font-mono text-xs text-paper-faint">{pad(page + 1)}</span>
    </button>
  );
}

function ContentsPage({ goTo }) {
  return (
    <>
      <h4 className="font-display text-[1.6rem] font-medium leading-tight text-paper">Selected systems</h4>
      <ol className="mt-7 grid gap-5">
        {projects.map((project, i) => (
          <li key={project.id} style={{ "--project-accent": accents[i] }}>
            <ContentsEntry number={project.index} label={project.name} page={pageIndex("title", i)} accent={accents[i]} onSelect={goTo} />
            <p className="ml-9 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-faint">{project.category}</p>
            <div className="ml-9 mt-1.5 flex flex-wrap gap-x-5 gap-y-1">
              {VIEWS.map((view) => (
                <button
                  key={view.key}
                  type="button"
                  onClick={() => goTo(pageIndex(view.page, i))}
                  className="dossier-contents-entry group inline-flex items-baseline gap-2 text-sm text-paper-dim transition-colors hover:text-paper">
                  {view.short}
                  <span className="font-mono text-xs text-paper-faint">{pad(pageIndex(view.page, i) + 1)}</span>
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

// Closing summary: each project's key benefit, one tap from its chapter.
function IndexPage({ goTo }) {
  return (
    <>
      <h4 className="font-display text-[1.6rem] font-medium leading-tight text-paper">Key benefit</h4>
      <ol className="mt-6 grid gap-3">
        {projects.map((project, i) => (
          <li key={project.id}>
            <button
              type="button"
              onClick={() => goTo(pageIndex("title", i))}
              className="dossier-index-row group flex w-full items-start gap-4 rounded-xl border border-line/[0.08] bg-line/[0.02] p-3.5 text-left"
              style={{ "--project-accent": accents[i] }}>
              <span className="pt-0.5 font-mono text-xs" style={{ color: accents[i] }}>
                {project.index}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-paper-faint">{project.name}</span>
                <span className="mt-1 block font-display text-base font-medium leading-snug text-paper">{project.usp.title}</span>
              </span>
              <span className="pt-0.5 font-mono text-xs text-paper-faint">{pad(pageIndex("title", i) + 1)}</span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

function OverviewPage({ project, accent }) {
  return (
    <>
      <ChapterHeading view={VIEWS[0]} accent={accent} />
      <p className="mt-6 text-[0.9rem] leading-[1.8] text-paper-dim">{project.description}</p>
    </>
  );
}

function FeaturesPage({ project, accent }) {
  return (
    <>
      <div
        className="rounded-2xl border p-5"
        style={{ borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`, background: `color-mix(in srgb, ${accent} 4%, transparent)` }}>
        <span className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: accent }}>
          Key benefit
        </span>
        <h4 className="mt-3 font-display text-xl font-medium leading-snug text-paper">{project.usp.title}</h4>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-paper-dim">{project.usp.body}</p>
      </div>
      <div className="mt-6">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">Main features</span>
        <ul className="mt-4 grid gap-2">
          {project.modules.map((module, i) => (
            <li key={module} className="flex items-center gap-3 text-[0.9rem] text-paper-dim">
              <span className="font-mono text-xs" style={{ color: accent }}>
                0{i + 1}
              </span>
              {module}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function RolePage({ project, accent }) {
  return (
    <>
      <div>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">My role</span>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.role.map((item) => (
            <li key={item} className="rounded-full border border-line/[0.08] bg-line/[0.02] px-3 py-1.5 text-sm text-paper-dim">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-7 border-t border-line/[0.08] pt-6">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">Technology & skills</span>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {project.allTags.map((tag) => (
            <TechnologyPill key={tag} name={tag} accent={accent} />
          ))}
        </div>
      </div>
    </>
  );
}

function CaseStudyPage({ project, accent }) {
  return (
    <>
      <ChapterHeading view={VIEWS[1]} accent={accent} />
      <div className="mt-6">
        <DetailBlock number="01" label="Problem" title="Why it was needed">
          {project.caseStudy.problem}
        </DetailBlock>
      </div>
    </>
  );
}

function ArchitecturePage({ project }) {
  return (
    <>
      <DetailBlock number="02" label="Architecture" title="How the system is built">
        {project.caseStudy.architecture}
      </DetailBlock>
      <DetailBlock number="03" label="Challenge" title="The main technical challenge">
        {project.caseStudy.challenge}
      </DetailBlock>
    </>
  );
}

function SolutionPage({ project, accent }) {
  return (
    <>
      <DetailBlock number="04" label="Solution" title={project.usp.title}>
        {project.caseStudy.solution}
      </DetailBlock>
      <DetailBlock number="05" label="Workflow" title="How the product works">
        <ol className="mt-3 grid gap-1.5">
          {project.caseStudy.workflow.map((step, i) => (
            <li key={step} className="dossier-step relative flex items-start gap-3">
              <span
                className="dossier-step-number relative grid h-6 w-6 shrink-0 place-items-center rounded-full border font-mono text-[9px]"
                style={{ color: accent, borderColor: `color-mix(in srgb, ${accent} 40%, transparent)` }}>
                0{i + 1}
              </span>
              <span className="text-sm leading-6">{step}</span>
            </li>
          ))}
        </ol>
      </DetailBlock>
    </>
  );
}

function ResultPage({ project, accent, index }) {
  return (
    <>
      <DetailBlock number="06" label="Result" title="What the system made possible">
        <p className="font-display text-[1.3rem] leading-[1.5] tracking-[-0.01em] text-paper">{project.caseStudy.outcome}</p>
      </DetailBlock>
      <div className="mt-auto flex items-center gap-4 border-t border-line/[0.08] pt-5">
        <ProjectGlyph index={index} accent={accent} />
        <div className="min-w-0">
          <span className="block font-mono text-xs uppercase tracking-[0.14em] text-paper-faint">System / {project.index}</span>
          <span className="mt-1.5 block">
            <ProductionMark accent={accent} />
          </span>
        </div>
      </div>
    </>
  );
}

const PAGE_BODIES = {
  overview: OverviewPage,
  features: FeaturesPage,
  role: RolePage,
  case: CaseStudyPage,
  architecture: ArchitecturePage,
  solution: SolutionPage,
  result: ResultPage,
};

function DossierSheet({ number, side, goTo, onOpen }) {
  const { id, project: projectIndex, view } = PAGES[number];
  if (id === "cover") return <BookCover onOpen={onOpen} />;
  if (id === "back") return <BackCoverPage side={side} />;
  if (id === "contents" || id === "index") {
    const Body = id === "contents" ? ContentsPage : IndexPage;
    return (
      <DossierPage
        accent={BOOK_ACCENT}
        side={side}
        number={number + 1}
        head="Featured Work"
        chapter={id === "contents" ? "Contents" : "01—04"}
        footer="Selected systems / 01—04">
        <Body goTo={goTo} />
      </DossierPage>
    );
  }
  const project = projects[projectIndex];
  const accent = accents[projectIndex];
  if (id === "title") return <ProjectTitlePage project={project} accent={accent} index={projectIndex} side={side} />;
  const Body = PAGE_BODIES[id];
  return (
    <DossierPage
      accent={accent}
      side={side}
      number={number + 1}
      head={`System / ${project.index}`}
      chapter={VIEWS.find((item) => item.key === view).label}
      footer={project.name}>
      <Body project={project} accent={accent} index={projectIndex} />
    </DossierPage>
  );
}

function TurnButton({ direction, disabled, onClick }) {
  const Icon = direction < 0 ? TbArrowLeft : TbArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction < 0 ? "Previous page" : "Next page"}
      className="dossier-turn grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line/[0.1] bg-ink-800/85 text-paper-dim backdrop-blur-xl transition-all hover:border-line/25 hover:text-paper disabled:cursor-default disabled:border-line/[0.1] disabled:text-paper-dim disabled:opacity-30">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

// Where the book starts its flight: the floating book's cover, moved and scaled onto
// the closed cover as it will sit in the reader (centred between toolbar and footer).
function arrivalFrom(origin, spread) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const stageWidth = spread ? width - 2 * (20 + 44 + 12) : width - 16;
  const stageHeight = height - 76 - (spread ? 16 : 92);
  const coverWidth = spread ? 440 * Math.min((stageWidth - 40) / 880, (stageHeight - 20) / 620, 1.25) : Math.min(stageWidth - 14, 520);
  return {
    x: origin.left + origin.width / 2 - width / 2,
    y: origin.top + origin.height / 2 - (76 + 8 + stageHeight / 2),
    scale: origin.width / coverWidth,
    rotateY: -22,
    rotateX: -6,
  };
}

function FeaturedWorkBook({ startPage, origin, onClose }) {
  const reduceMotion = useReducedMotion();
  const spread = useSpreadLayout();
  // The book arrives closed, then its cover swings open (riffling on to a chosen project).
  const [page, setPage] = useState(() => (reduceMotion ? startPage : 0));
  const [arrival] = useState(() => (reduceMotion ? { opacity: 1 } : origin ? arrivalFrom(origin, spread) : { opacity: 0, scale: 0.9, y: 36, rotateX: 12 }));
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const view = pageToView(page, spread);
  const lastView = viewCount(PAGES.length, spread) - 1;
  const shown = visiblePages(view, PAGES.length, spread);
  const lead = PAGES[[...shown].reverse().find((number) => PAGES[number].project !== undefined)];
  const current = lead?.project;
  const accent = current === undefined ? BOOK_ACCENT : accents[current];

  const turnPage = useCallback(
    (step) =>
      setPage((currentPage) => {
        const from = pageToView(currentPage, spread);
        const to = Math.min(Math.max(from + step, 0), lastView);
        return to === from ? currentPage : viewToPage(to, spread);
      }),
    [spread, lastView],
  );
  const turnRef = useRef(turnPage);
  turnRef.current = turnPage;

  useEffect(() => {
    if (reduceMotion || startPage === 0) return undefined;
    const timer = setTimeout(() => setPage((currentPage) => (currentPage === 0 ? startPage : currentPage)), ARRIVE_MS);
    return () => clearTimeout(timer);
  }, [reduceMotion, startPage]);

  // Once per opening: freeze the page behind, keep keyboard focus inside the
  // dialog, and hand focus back to whatever opened it on close.
  useEffect(() => {
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    closeRef.current?.focus({ preventScroll: true });

    function handleKey(event) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && !event.altKey && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        turnRef.current(event.key === "ArrowRight" ? 1 : -1);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE)).filter((el) => el.getClientRects().length > 0 && !el.closest("[inert]"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const inside = dialogRef.current.contains(document.activeElement);
      if (event.shiftKey && (!inside || document.activeElement === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!inside || document.activeElement === last)) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
      window.removeEventListener("keydown", handleKey);
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, []);

  const renderPage = (number, side) => <DossierSheet number={number} side={side} goTo={setPage} onOpen={() => turnPage(1)} />;
  const counter = (
    <span className="flex items-center gap-3">
      <span aria-live="polite" className="whitespace-nowrap font-mono text-xs text-paper-dim">
        {shown.map((number) => pad(number + 1)).join("–")} <span className="text-paper-faint">/ {pad(PAGES.length)}</span>
      </span>
      <span className="relative hidden h-px w-16 overflow-hidden bg-line/[0.12] min-[380px]:block" aria-hidden="true">
        <span className="absolute inset-y-0 left-0 transition-[width] duration-500" style={{ width: `${(view / lastView) * 100}%`, background: accent }} />
      </span>
    </span>
  );

  return (
    <motion.div
      className="modal-backdrop fixed inset-0 z-[100] backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3 }}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Featured Work book"
        className="project-dossier flex h-full flex-col"
        style={{ "--project-accent": accent }}>
        <div className="relative z-10 shrink-0 px-3 pt-3 sm:px-5">
          <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-2 rounded-2xl border border-line/[0.08] bg-ink-800/85 py-1.5 pl-2 pr-1.5 shadow-lg backdrop-blur-xl sm:gap-3 sm:pl-4">
            <div className="hidden min-w-0 items-center gap-3 sm:flex">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">Featured Work</span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-paper-faint" />
              <span className="truncate text-sm text-paper-dim">{current === undefined ? "Selected systems" : projects[current].name}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3">
              <nav aria-label="Projects" className="flex items-center gap-1">
                {projects.map((project, i) => (
                  <button
                    key={project.id}
                    type="button"
                    aria-label={project.name}
                    aria-current={current === i ? "true" : undefined}
                    onClick={() => setPage(pageIndex("title", i))}
                    className="dossier-chapter inline-flex items-center gap-1.5 rounded-lg border border-transparent px-2 py-2 font-mono text-[11px] text-paper-dim transition-colors hover:text-paper"
                    style={{ "--project-accent": accents[i] }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: accents[i] }} />
                    {project.index}
                  </button>
                ))}
              </nav>
              {current !== undefined && (
                <nav aria-label="Chapters" className="flex items-center gap-1 border-l border-line/[0.08] pl-1.5 sm:pl-3">
                  {VIEWS.map(({ key, short, Icon, page: start }) => (
                    <button
                      key={key}
                      type="button"
                      aria-current={lead.view === key ? "true" : undefined}
                      onClick={() => setPage(pageIndex(start, current))}
                      className="dossier-chapter inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-transparent px-2 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-paper-dim transition-colors hover:text-paper">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only lg:not-sr-only">{short}</span>
                    </button>
                  ))}
                </nav>
              )}
              {spread && <span className="border-l border-line/[0.08] pl-3">{counter}</span>}
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close the book"
                className="project-modal-close grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line/[0.1] bg-line/[0.025] text-paper-dim transition-all hover:border-line/25 hover:bg-line/[0.06] hover:text-paper">
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>

        <div
          className="flex min-h-0 flex-1 items-center gap-3 px-2 py-2 sm:px-5"
          onMouseDown={(event) => {
            // Clicks in the margin around the book close it, like a modal backdrop.
            if (event.target === event.currentTarget || event.target.classList.contains("flipbook-stage")) onClose();
          }}>
          {spread && <TurnButton direction={-1} disabled={view === 0} onClick={() => turnPage(-1)} />}
          <motion.div
            className="h-full min-w-0 flex-1"
            initial={arrival}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
            exit={{
              opacity: 0,
              scale: reduceMotion ? 1 : 0.94,
              y: reduceMotion ? 0 : 18,
              transition: { duration: reduceMotion ? 0 : 0.3, ease: [0.4, 0, 1, 1] },
            }}
            transition={{ duration: reduceMotion ? 0 : ARRIVE_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1800 }}>
            <Flipbook
              pageCount={PAGES.length}
              page={page}
              spread={spread}
              renderPage={renderPage}
              onTurn={turnPage}
              flipMs={reduceMotion ? 0 : FLIP_MS}
              label="Featured Work book"
            />
          </motion.div>
          {spread && <TurnButton direction={1} disabled={view === lastView} onClick={() => turnPage(1)} />}
        </div>

        {!spread && (
          <div className="relative z-10 flex shrink-0 items-center justify-center gap-4 px-3 pb-4 pt-1">
            <TurnButton direction={-1} disabled={view === 0} onClick={() => turnPage(-1)} />
            <span className="rounded-full border border-line/[0.08] bg-ink-800/85 px-4 py-2.5 backdrop-blur-xl">{counter}</span>
            <TurnButton direction={1} disabled={view === lastView} onClick={() => turnPage(1)} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// The closed book floating in the section: it follows the pointer, and its cover lifts
// when hovered to show there are pages inside.
function FloatingBook({ hidden, peek, coverRef, onOpen }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 140, damping: 16 });
  const rotateY = useSpring(tiltY, { stiffness: 140, damping: 16 });

  function handlePointerMove(event) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - box.left) / box.width - 0.5) * 18);
    tiltX.set(-((event.clientY - box.top) / box.height - 0.5) * 12);
  }

  function handlePointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
    setHovered(false);
  }

  return (
    <div
      className="featured-book-scene"
      // Vanishes at once as its copy flies out; fades back after the reader has closed.
      style={{ opacity: hidden ? 0 : 1, transitionDuration: hidden ? "0ms" : "200ms", transitionDelay: hidden ? "0ms" : "280ms" }}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}>
      <div className="featured-book-pose">
        <div className="featured-book-float">
          <motion.div className={`featured-book${hovered || peek ? " is-peeking" : ""}`} style={{ rotateX, rotateY }} onClick={onOpen} data-cursor="hover">
            <span className="featured-book-back" />
            <span className="featured-book-spine">
              <span>Featured Work · 01—04</span>
            </span>
            <span className="featured-book-block is-right" />
            <span className="featured-book-block is-top" />
            <span className="featured-book-block is-bottom" />
            <span className="featured-book-page" />
            <div ref={coverRef} className="featured-book-cover">
              <BookCover Heading="h2" />
            </div>
          </motion.div>
        </div>
      </div>
      <span className="featured-book-shadow" aria-hidden="true" />
    </div>
  );
}

export default function Projects() {
  const [reader, setReader] = useState(null);
  const [peek, setPeek] = useState(false);
  const coverRef = useRef(null);
  const openBook = useCallback((startPage) => setReader({ startPage, origin: coverRef.current?.getBoundingClientRect() }), []);
  const closeBook = useCallback(() => setReader(null), []);

  return (
    <section id="work" className="featured-work relative overflow-hidden border-t b order-ink-600 py-20 md:py-28">
      <div className="bp-grid absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent)]" />
      <div className="absolute left-1/2 top-12 h-80 w-[70%] -translate-x-1/2 rounded-full bg-signal/[0.035] blur-[100px]" />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-signal">Featured Work</span>
          <span className="h-px w-14 bg-gradient-to-r from-signal/70 to-transparent" />
          <span className="hidden font-mono text-xs uppercase tracking-[0.14em] text-paper-faint sm:inline">Selected systems / 01—04</span>
        </motion.div>

        <div className="mt-4 grid items-center gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:order-2">
            <FloatingBook hidden={reader !== null} peek={peek} coverRef={coverRef} onOpen={() => openBook(1)} />
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => openBook(1)}
              className="dossier-open -mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-paper">
              Open the book <ArrowIcon />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-paper-faint">Contents</span>
            <ol className="mt-4 grid gap-3" onPointerLeave={() => setPeek(false)}>
              {projects.map((project, index) => (
                <li key={project.id}>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => openBook(pageIndex("title", index))}
                    onPointerEnter={() => setPeek(true)}
                    className="featured-index-row group flex w-full items-center gap-4 rounded-2xl border border-line/[0.08] bg-ink-800/60 p-4 text-left backdrop-blur-sm"
                    style={{ "--project-accent": accents[index] }}>
                    <ProjectGlyph index={index} accent={accents[index]} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-mono text-[11px] uppercase tracking-[0.14em] text-paper-faint">
                        System / {project.index} · {project.category}
                      </span>
                      <span className="mt-1 block font-display text-lg font-medium leading-snug text-paper">{project.name}</span>
                      <span className="mt-0.5 block text-sm text-paper-dim">{project.usp.title}</span>
                    </span>
                    <span className="featured-index-arrow hidden shrink-0 items-center gap-2 font-mono text-xs text-paper-faint sm:inline-flex">
                      {pad(pageIndex("title", index) + 1)} <ArrowIcon />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          className="mt-10 flex flex-col gap-4 rounded-2xl border border-line/[0.07] bg-line/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
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
        {reader && <FeaturedWorkBook key="featured-work-book" startPage={reader.startPage} origin={reader.origin} onClose={closeBook} />}
      </AnimatePresence>
    </section>
  );
}
