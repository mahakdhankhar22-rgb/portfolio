import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// grid staggers its cards; each card fades, slides up and scales in
const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

// small dot with a slow, minimal pulse ring
function PulseDot({ animate }) {
  return (
    <span className="relative flex h-2 w-2">
      {animate && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-accent"
          animate={{ scale: [1, 2.8], opacity: [0.55, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="relative h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}

function CertCard({ cert, index, reduce }) {
  const inProgress = cert.status === "in-progress";

  return (
    <motion.li variants={item} className="h-full">
      {/* separate layer for hover so it never fights the reveal animation */}
      <motion.div
        initial={{ y: 0, boxShadow: "0 0 0 0 rgba(212,175,55,0)" }}
        whileHover={
          reduce
            ? undefined
            : { y: -6, boxShadow: "0 18px 48px -18px rgba(212,175,55,0.35)" }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full rounded-3xl border border-paper/15 bg-[#15141b] p-6 transition-colors duration-300 hover:border-accent/60 md:p-8"
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-sm text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-accent" />
        </div>

        <h3 className="mt-4 font-display text-2xl font-bold leading-tight md:text-3xl">
          {cert.title}
        </h3>

        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          <span>{cert.issuer}</span>
          <span aria-hidden>·</span>
          {inProgress ? (
            <span className="inline-flex items-center gap-2 text-accent">
              <PulseDot animate={!reduce} />
              In Progress
            </span>
          ) : (
            <span>{cert.year}</span>
          )}
        </p>

        <p className="mt-5 max-w-md text-sm leading-relaxed text-paper/75 md:text-base">
          {cert.description}
        </p>
      </motion.div>
    </motion.li>
  );
}

export default function Certifications({ items }) {
  const reduce = useReducedMotion();
  return (
    <motion.ul
      variants={grid}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="mt-10 grid gap-6 md:grid-cols-2"
    >
      {items.map((cert, i) => (
        <CertCard key={cert.title} cert={cert} index={i} reduce={reduce} />
      ))}
    </motion.ul>
  );
}