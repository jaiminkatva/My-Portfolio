import { motion } from "framer-motion";
import { TbBinaryTree, TbBriefcase, TbRocket, TbTopologyStar3, TbUsers } from "react-icons/tb";
import { about } from "../data/content";
import SectionHeading from "./shared/SectionHeading";

const storyIcons = [TbBriefcase, TbBinaryTree, TbTopologyStar3];
const storyLabels = ["Role & Responsibility", "Real-World Experience", "Working Philosophy"];
const strengthIcons = [TbBriefcase, TbBinaryTree, TbRocket, TbUsers];
const strengthTitles = ["Product-aware", "System thinking", "Production-ready", "Technical leadership"];

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

function ProfileCard() {
  return (
    <div className="about-profile relative overflow-hidden border-b border-white/[0.08] p-6 sm:p-8 lg:border-b-0 lg:border-r">
      <div className="about-profile-grid pointer-events-none absolute inset-0" />

      <div className="relative flex items-center justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-paper-faint">Engineer profile</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-system/20 bg-system/[0.055] px-3 py-1.5 font-mono text-xs text-system">
          <span className="h-1.5 w-1.5 rounded-full bg-system" />
          Building systems
        </span>
      </div>

      <motion.div
        custom={0}
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="about-identity relative mt-9 overflow-hidden rounded-2xl border border-white/[0.09] bg-ink-900/65 p-6">
        <div className="absolute right-0 top-0 h-24 w-24 border-b border-l border-white/[0.05] bg-signal/[0.035] [clip-path:polygon(100%_0,100%_100%,0_0)]" />
        <div className="flex items-center gap-5">
          <div className="about-monogram grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl border border-signal/25 p-2.5">
            <img src={`${import.meta.env.BASE_URL}jklogo.png`} alt="Jaimin Katva logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-medium text-paper">Jaimin Katva</h3>
            <p className="mt-1 text-base text-paper-dim">Backend Engineer · Team Lead</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 border-t border-white/[0.08] pt-5">
          {["Backend", "Systems", "Product"].map((item, index) => (
            <div key={item} className={index ? "border-l border-white/[0.08] pl-3 sm:pl-4" : ""}>
              <span className="block font-mono text-xs text-signal">0{index + 1}</span>
              <span className="mt-1 block text-sm text-paper-dim">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.blockquote
        custom={1}
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative mt-5 overflow-hidden rounded-2xl border border-signal/20 bg-signal/[0.045] p-6">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">Operating principle</span>
        <p className="mt-4 font-display text-xl leading-relaxed text-paper">{about.motto}</p>
        <div className="mt-5 flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-signal/60 to-transparent" />
          <TbTopologyStar3 className="h-5 w-5 text-signal" />
        </div>
      </motion.blockquote>
    </div>
  );
}

function StoryPanel() {
  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="flex items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">How I work</span>
          <h3 className="mt-3 font-display text-2xl font-medium text-paper sm:text-3xl">The work behind the title.</h3>
        </div>
        <span className="hidden font-mono text-xs text-paper-faint sm:block">01 — 03</span>
      </div>

      <div className="relative mt-2">
        <span className="about-story-line absolute bottom-7 left-[21px] top-7 w-px" aria-hidden="true" />
        {about.paragraphs.map((paragraph, index) => {
          const Icon = storyIcons[index];
          return (
            <motion.article
              key={paragraph}
              custom={index}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-45px" }}
              className="about-story relative grid grid-cols-[44px_1fr] gap-5 border-b border-white/[0.07] py-6 last:border-b-0 sm:gap-6">
              <span className="relative z-10 grid h-11 w-11 place-items-center rounded-xl border border-white/[0.09] bg-ink-800 text-paper-faint">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-system">{storyLabels[index]}</span>
                  <span className="font-mono text-xs text-paper-faint">0{index + 1}</span>
                </div>
                <p className={`mt-2 text-base leading-[1.75] ${index === 0 ? "text-paper" : "text-paper-dim"}`}>{paragraph}</p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-shell relative overflow-hidden border-t border-white/[0.06] py-20 md:py-28">
      <div className="bp-grid pointer-events-none absolute inset-0 opacity-[0.13] [mask-image:radial-gradient(ellipse_68%_60%_at_20%_45%,black,transparent)]" />

      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_390px] lg:items-end">
          <SectionHeading eyebrow={about.eyebrow} heading="Technology built around real needs." />
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-70px" }}
            className="flex items-center gap-4 border-l border-white/[0.1] pl-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-signal/20 bg-signal/[0.07] text-signal">
              <TbTopologyStar3 className="h-5 w-5" />
            </span>
            <p className="text-base leading-relaxed text-paper-dim">Backend engineering, system planning and product thinking—working together.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="about-board mt-11 overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-ink-800/70">
          <div className="flex min-h-14 items-center justify-between border-b border-white/[0.08] bg-ink-900/45 px-5 sm:px-7">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">About Jaimin</span>
              <span className="hidden h-px w-10 bg-gradient-to-r from-signal/60 to-transparent sm:block" />
              <span className="hidden font-mono text-xs text-paper-faint sm:block">profile / approach / experience</span>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-system">
              <span className="h-1.5 w-1.5 rounded-full bg-system" /> Active
            </span>
          </div>

          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <ProfileCard />
            <StoryPanel />
          </div>
        </motion.div>

        <div className="about-strengths mt-5 grid overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800/55 sm:grid-cols-2 lg:grid-cols-4">
          {about.distinctive.map((line, index) => {
            const Icon = strengthIcons[index];
            return (
              <motion.article
                key={line}
                custom={index}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-45px" }}
                className="about-strength relative border-b border-white/[0.07] p-5 sm:border-r lg:border-b-0">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-system/20 bg-system/[0.055] text-system">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-medium text-paper">{strengthTitles[index]}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-paper-dim">{line}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
