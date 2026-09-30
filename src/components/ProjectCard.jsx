import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* ---------- staggered text variants ---------- */
const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } },
};
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const slide = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};
const maskUp = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* ---------- built-in preview art (used until you add real screenshots) ---------- */
function GithubPreview() {
  return (
    <div className="absolute inset-0 flex flex-col gap-4 p-6 md:p-9">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full border-2 border-accent bg-paper/10" />
        <div className="space-y-2">
          <div className="h-3 w-32 rounded bg-paper/70" />
          <div className="h-2 w-20 rounded bg-paper/25" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["Repos", "Followers", "Stars"].map((l) => (
          <div key={l} className="rounded-xl border border-paper/15 p-3">
            <div className="h-3 w-8 rounded bg-accent/80" />
            <p className="mt-2 text-[10px] text-muted">{l}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2.5">
        {[64, 48, 72, 40].map((w, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border border-paper/10 bg-paper/[0.03] p-3"
          >
            <div className="h-2.5 rounded bg-paper/50" style={{ width: `${w}%` }} />
            <div className="h-2 w-8 rounded bg-accent/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioPreview() {
  return (
    <div className="absolute inset-0 p-8 md:p-10">
      <div className="relative h-full">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-x-0 overflow-hidden rounded-2xl border border-accent/70 bg-[#15141b]"
            style={{
              top: i * 22,
              bottom: (2 - i) * 22,
              transform: `scale(${1 - (2 - i) * 0.04})`,
              transformOrigin: "50% 0%",
            }}
          >
            {i === 2 ? (
              <div className="space-y-3 p-5 pt-9">
                <div className="h-4 w-3/4 rounded bg-paper/80" />
                <div className="h-4 w-1/2 rounded bg-gradient-to-r from-[#8a6d1d] via-[#f5d97a] to-[#d4af37]" />
                <div className="h-2 w-2/3 rounded bg-paper/25" />
                <div className="h-2 w-1/2 rounded bg-paper/25" />
              </div>
            ) : (
              <div className="h-4 px-4 pt-1.5 text-[9px] uppercase tracking-widest text-accent/70">
                {i === 0 ? "Experience" : "Projects"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const previews = { github: GithubPreview, portfolio: PortfolioPreview };

/* ---------- heading ---------- */
export function ProjectsHeading({ children = "Featured Projects" }) {
  const reduce = useReducedMotion();
  return (
    <motion.h2
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className="mt-6 font-display text-4xl font-bold leading-[0.95] md:text-7xl"
    >
      {children.split(" ").map((w, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom">
          <motion.span variants={maskUp} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

/* ---------- card ---------- */
function ProjectCard({ project, index = 0 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const dir = index % 2 === 0 ? -1 : 1; // alternate: left, right, left…
  const reversed = index % 2 === 1;

  // pointer position (px inside card, and 0–1)
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const glowOn = useSpring(0, { stiffness: 120, damping: 20 });

  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), spring);
  const imgX = useSpring(useTransform(mx, [0, 1], [5, -5]), spring);
  const imgY = useSpring(useTransform(my, [0, 1], [4, -4]), spring);

  const glow = useMotionTemplate`radial-gradient(520px circle at ${gx}px ${gy}px, rgba(212,175,55,0.18), transparent 55%)`;

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    gx.set(x);
    gy.set(y);
    mx.set(x / r.width);
    my.set(y / r.height);
  };
  const onEnter = (e) => {
    if (!reduce && e.pointerType === "mouse") glowOn.set(1);
  };
  const onLeave = () => {
    glowOn.set(0);
    mx.set(0.5);
    my.set(0.5);
  };

  const Preview = previews[project.preview];
  const hasLive = project.live && project.live !== "#";
  const hasCode = project.code && project.code !== "#";

  return (
    // 1) reveal from the side with fade + scale
    <motion.div
      initial={reduce ? false : { opacity: 0, x: dir * 140, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: EASE }}
      style={{ perspective: 1200 }}
    >
      {/* 2) hover tilt */}
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative grid overflow-hidden rounded-[28px] border-[1.5px] border-paper/15 bg-[#15141b] transition-colors duration-500 hover:border-accent md:grid-cols-[1.05fr_1fr]"
      >
        {/* 3) cursor-following glow */}
        <motion.div
          aria-hidden
          style={{ background: glow, opacity: glowOn }}
          className="pointer-events-none absolute inset-0 z-20"
        />

        {/* 4) image with zoom on hover */}
        <div className={`p-4 md:p-5 ${reversed ? "md:order-2" : ""}`}>
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-paper/10 bg-gradient-to-br from-[#1d1b26] to-[#0f0e14]">
            <motion.div style={{ x: reduce ? 0 : imgX, y: reduce ? 0 : imgY }} className="absolute inset-[-2%]">
              <div className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  Preview && <Preview />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 5) staggered text */}
        <motion.div
          variants={list}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 flex flex-col justify-center p-6 md:p-9 md:pl-5"
        >
          <motion.div variants={rise} className="flex items-center gap-3">
            <span className="font-display text-sm text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-accent" />
          </motion.div>

          <h3 className="mt-3 font-display text-3xl font-bold leading-[1.02] md:text-4xl">
            <span className="block overflow-hidden pb-1">
              <motion.span variants={maskUp} className="block">
                {project.title}
              </motion.span>
            </span>
          </h3>

          <motion.div variants={rise} className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-paper/20 px-3 py-1 text-xs"
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.p variants={rise} className="mt-5 max-w-md text-sm leading-relaxed text-paper/75 md:text-base">
            {project.description}
          </motion.p>

          {project.highlights?.length > 0 && (
            <>
              <motion.p variants={rise} className="mt-6 text-xs uppercase tracking-[0.2em] text-accent">
                Highlights
              </motion.p>
              <ul className="mt-3 space-y-2 text-sm text-paper/90">
                {project.highlights.map((h) => (
                  <motion.li key={h} variants={slide} className="flex items-center gap-3">
                    <span className="h-px w-4 shrink-0 bg-accent" />
                    {h}
                  </motion.li>
                ))}
              </ul>
            </>
          )}

          {(hasLive || hasCode) && (
            <motion.div variants={rise} className="mt-6 flex gap-5 text-sm">
              {hasLive && (
                <a href={project.live} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  Live ↗
                </a>
              )}
              {hasCode && (
                <a href={project.code} target="_blank" rel="noreferrer" className="hover:text-accent">
                  Code ↗
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.article>
    </motion.div>
  );
}

export default ProjectCard;