import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

/* ---------- helpers ---------- */
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const ease = (t) => t * t * (3 - 2 * t); // smoothstep
const pad = (n) => String(n).padStart(2, "0");

const PEEK = 44; // px of each older card that stays visible (and clickable)
const STEP = 0.75; // share of each scroll segment used for the slide; the rest is a resting pause

// how far card k has slid in (0 → 1) at scroll position v
const arrival = (v, k) => ease(clamp((v - (k - 1)) / STEP, 0, 1));

/* ---------- card content ---------- */
function CardBody({ card, hint }) {
  switch (card.type) {
    case "intro":
      return (
        <div className="flex h-full flex-col justify-between">
          <div>
            <h3 className="font-display text-4xl font-bold leading-[0.95] md:text-7xl">
              {card.role}
            </h3>
            <p className="mt-5 text-base text-paper/90 md:text-lg">
              {card.company}
            </p>
            <p className="mt-1 text-sm text-accent">{card.period}</p>
          </div>
          <div>
            <p className="max-w-xl text-sm leading-relaxed text-paper/80 md:text-base">
              {card.summary}
            </p>
            {hint && <div className="mt-5">{hint}</div>}
          </div>
        </div>
      );

    case "list":
      return (
        <div className="flex h-full flex-col">
          <h3 className="font-display text-2xl font-bold leading-tight md:text-5xl md:leading-none">
            {card.title}
          </h3>
          <ul className="mt-4 space-y-1.5 text-[13px] leading-snug text-paper/90 md:mt-6 md:space-y-3 md:text-xl md:leading-normal">
            {card.items.map((item) => (
              <li key={item} className="flex items-start gap-3 md:items-center md:gap-4">
                <span className="mt-[0.7em] h-px w-4 shrink-0 bg-accent md:mt-0 md:w-5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case "statement": {
      const parts = card.title.split("→").map((t) => t.trim());
      return (
        <div className="flex h-full flex-col justify-between">
          <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-3xl font-bold leading-[1.05] md:text-6xl">
            {parts.map((part, i) => (
              <span key={part} className="flex items-baseline gap-x-3">
                {i > 0 && <span className="text-accent">→</span>}
                {part}
              </span>
            ))}
          </h3>
          <p className="max-w-xl text-sm leading-relaxed text-paper/80 md:text-lg">
            {card.text}
          </p>
        </div>
      );
    }

    case "stack":
      return (
        <div className="flex h-full flex-col">
          <h3 className="font-display text-3xl font-bold leading-none md:text-5xl">
            {card.title}
          </h3>
          <div className="mt-6 space-y-3">
            {card.rows.map((row, r) => (
              <div key={r} className="flex flex-wrap gap-2">
                {row.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-paper/20 px-4 py-1.5 text-sm md:text-base"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

const cardSurface =
  "overflow-hidden rounded-[28px] border-[1.5px] border-accent bg-[#15141b] shadow-[0_-18px_40px_-18px_rgba(0,0,0,0.9)]";

// the strip that stays visible when a newer card covers this one
function CardHeader({ card, index }) {
  return (
    <div
      className="flex items-center justify-between px-6 text-xs uppercase tracking-[0.2em] text-accent md:px-10"
      style={{ height: PEEK }}
    >
      <span>{card.label}</span>
      <span className="font-display">{pad(index + 1)}</span>
    </div>
  );
}

/* ---------- one animated card ---------- */
function StackCard({ card, index, total, pos, active, onSelect }) {
  const enter = useTransform(pos, (v) => (index === 0 ? 1 : arrival(v, index)));
  // how many newer cards are on top of this one
  const buried = useTransform(pos, (v) => {
    let b = 0;
    for (let k = index + 1; k < total; k++) b += arrival(v, k);
    return Math.min(b, 3);
  });

  const y = useTransform(enter, (e) => `calc(${(1 - e) * 100}vh + ${index * PEEK}px)`);
  const scale = useTransform(buried, (b) => 1 - 0.03 * b);
  const rotateX = useTransform(enter, (e) => (1 - e) * 5);

  // parallax: text and big number drift at different speeds from the card
  const contentY = useTransform([enter, buried], ([e, b]) => (1 - e) * 70 - b * 18);
  const ghostY = useTransform([enter, buried], ([e, b]) => (1 - e) * 200 - b * 60);
  // older cards fade their body so only the label strip stays visible
  const contentOpacity = useTransform(
    [enter, buried],
    ([e, b]) => (0.3 + 0.7 * e) * (1 - clamp(b * 1.5, 0, 1))
  );
  const dim = useTransform(buried, (b) => clamp(b * 0.2, 0, 0.55));
  const hintOpacity = useTransform(pos, (v) => clamp(1 - v * 4, 0, 1));

  const hint =
    index === 0 ? (
      <motion.p
        style={{ opacity: hintOpacity }}
        className="flex items-center gap-3 text-sm text-muted"
      >
        <span className="h-px w-10 bg-accent" />
        Keep scrolling
      </motion.p>
    ) : null;

  const clickable = index < active;

  return (
    <motion.article
      style={{
        y,
        scale,
        rotateX,
        zIndex: index,
        transformOrigin: "50% 0%",
        height: `calc(100% - ${(total - 1) * PEEK}px)`,
      }}
      className={`absolute inset-x-0 top-0 will-change-transform ${cardSurface}`}
    >
      <CardHeader card={card} index={index} />

      <motion.span
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none absolute -bottom-6 right-4 select-none font-display text-[9rem] font-bold leading-none text-paper/[0.04] md:text-[16rem]"
      >
        {pad(index + 1)}
      </motion.span>

      {/* clipped area under the label strip, so parallax never overlaps it */}
      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden"
        style={{ top: PEEK }}
      >
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="h-full px-6 pb-6 pt-2 md:px-10 md:pb-9"
        >
          <CardBody card={card} hint={hint} />
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        style={{ opacity: dim }}
        className="pointer-events-none absolute inset-0 bg-ink"
      />

      {clickable && (
        <button
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Bring back: ${card.label}`}
          style={{ height: PEEK }}
          className="absolute inset-x-0 top-0 z-10 cursor-pointer transition-colors hover:bg-accent/15 focus-visible:outline-2 focus-visible:outline-accent"
        />
      )}
    </motion.article>
  );
}

function Dot({ index, pos }) {
  const width = useTransform(pos, (v) => 8 + 24 * clamp(1 - Math.abs(v - index), 0, 1));
  const opacity = useTransform(pos, (v) => 0.25 + 0.75 * clamp(1 - Math.abs(v - index), 0, 1));
  return (
    <motion.span style={{ width, opacity }} className="h-[3px] rounded-full bg-accent" />
  );
}

/* ---------- section ---------- */
export default function ExperienceStack({ cards }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const total = cards.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const pos = useTransform(scrollYProgress, (p) => p * (total - 1));

  const [active, setActive] = useState(0);
  useMotionValueEvent(pos, "change", (v) =>
    setActive(clamp(Math.round(v), 0, total - 1))
  );

  // clicking an older card scrolls back to the point where that card is on top
  const goTo = (i) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (i / (total - 1)) * range, behavior: "smooth" });
  };

  // plain list for people who prefer reduced motion
  if (reduceMotion) {
    return (
      <section id="experience" aria-label="Experience" className="py-24">
        <p className="text-sm text-muted">03 / EXPERIENCE</p>
        <div className="mt-10 space-y-6">
          {cards.map((card, i) => (
            <article key={i} className={`relative ${cardSurface}`}>
              <CardHeader card={card} index={i} />
              <div className="px-6 pb-8 pt-2 md:px-10">
                <CardBody card={card} />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={ref}
      aria-label="Experience"
      style={{ height: `${total * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden pt-16">
        <p className="text-sm text-muted">03 / EXPERIENCE</p>

        <div
          className="relative mt-5 h-[calc(100dvh-9.5rem)] max-h-[40rem] min-h-[28rem] md:h-[calc(100dvh-11rem)] md:min-h-[30rem] w-full"
          style={{ perspective: "1400px" }}
        >
          {cards.map((card, i) => (
            <StackCard
              key={i}
              card={card}
              index={i}
              total={total}
              pos={pos}
              active={active}
              onSelect={goTo}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2" aria-hidden>
          {cards.map((_, i) => (
            <Dot key={i} index={i} pos={pos} />
          ))}
        </div>
      </div>
    </section>
  );
}