import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* ---------- variants ---------- */
const words = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const maskUp = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const cards = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};
const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* ---------- icons ---------- */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7.5 8 6 8-6" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10.5V16M8 7.8v.1M12 16v-5.5M12 13c0-1.7 1-2.6 2.3-2.6S16.5 11.3 16.5 13v3" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" {...stroke}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const clean = (url) =>
  url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

/* ---------- one contact card ---------- */
function ContactCard({ label, value, href, icon: Icon, external, reduce }) {
  return (
    <motion.li variants={card} className="h-full">
      <motion.a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        initial={{ y: 0, boxShadow: "0 0 0 0 rgba(212,175,55,0)" }}
        whileHover={
          reduce
            ? undefined
            : { y: -6, boxShadow: "0 20px 50px -20px rgba(212,175,55,0.4)" }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-3xl border border-paper/15 bg-[#15141b] p-6 transition-colors duration-300 hover:border-accent/60 focus-visible:border-accent focus-visible:outline-none md:p-8"
      >
        {/* soft glow that fades in from the top corner */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/20"
        />

        <div className="relative flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 text-accent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-8deg] group-hover:border-accent group-hover:bg-accent/10">
            <Icon />
          </span>
          <span className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent">
            <ArrowIcon />
          </span>
        </div>

        <div className="relative">
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 font-display text-base font-bold leading-snug [overflow-wrap:anywhere] md:text-lg">
            {/* allow line breaks after slashes instead of mid-word */}
            {value.split("/").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <>
                    /<wbr />
                  </>
                )}
              </span>
            ))}
          </p>
        </div>
      </motion.a>
    </motion.li>
  );
}

/* ---------- section content ---------- */
export default function Contact({ profile }) {
  const reduce = useReducedMotion();
  const start = reduce ? "show" : "hidden";

  const heading = ["Let’s", "build", "something", "meaningful", "together."];

  const items = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: MailIcon,
    },
    {
      label: "LinkedIn",
      value: clean(profile.linkedin),
      href: profile.linkedin,
      icon: LinkedInIcon,
      external: true,
    },
    {
      label: "GitHub",
      value: clean(profile.github),
      href: profile.github,
      icon: GitHubIcon,
      external: true,
    },
  ];

  return (
    <div className="pb-16 md:pb-24">
      {/* large text reveal */}
      <motion.h2
        variants={words}
        initial={start}
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-6 font-display text-5xl font-bold leading-[0.95] md:text-8xl"
      >
        {heading.map((w, i) => (
          <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              variants={maskUp}
              className={`inline-block ${w === "meaningful" ? "shimmer pb-3" : ""}`}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
        initial={start}
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-8 max-w-xl"
      >
        <motion.p variants={fadeUp} className="text-lg text-paper md:text-xl">
          Have an idea, opportunity, or just want to say hello?
        </motion.p>
        <motion.p variants={fadeUp} className="mt-3 leading-relaxed text-paper/70">
          I’d love to connect and talk about frontend, UI/UX, and building great
          digital experiences.
        </motion.p>
      </motion.div>

      {/* staggered cards */}
      <motion.ul
        variants={cards}
        initial={start}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-12 grid gap-5 md:grid-cols-3"
      >
        {items.map((it) => (
          <ContactCard key={it.label} {...it} reduce={reduce} />
        ))}
      </motion.ul>
    </div>
  );
}