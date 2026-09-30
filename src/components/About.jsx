import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { profile } from "../data";
import Counter from "./Counter";

const aboutStats = [
  { value: "9.2", label: "B.Tech CGPA" },
  { value: "2", label: "Projects" },
  { value: "2", label: "Certifications" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function About() {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const srx = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const sry = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 18);
    rotateX.set(py * -18);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="mt-10 grid md:grid-cols-2 gap-12 items-center">
      {/* LEFT: photo in animated tilting frame, face mirrored toward the content */}
      <div
        style={{ perspective: 1000 }}
        className="flex justify-center md:justify-start"
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            rotateX: srx,
            rotateY: sry,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-sm aspect-[4/5] rounded-2xl"
        >
          <motion.div
            animate={{
              background: [
                "linear-gradient(0deg, #d4af37, transparent, #f5d97a, transparent)",
                "linear-gradient(360deg, #d4af37, transparent, #f5d97a, transparent)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute -inset-[8px] rounded-2xl"
          />

          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-paper/10 bg-ink">
            <img
              src="/mee.png"
              alt={profile.name}
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
        </motion.div>
      </div>

      {/* RIGHT: heading, intro, stats */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={item}
          className="font-display font-bold uppercase leading-[1.05] text-3xl md:text-5xl"
        >
          I don't just write code.
          <br />
          <span className="shimmer">I build what's next.</span>
        </motion.h2>

        <motion.p variants={item} className="mt-6 text-paper/90">
          I'm <span className="font-semibold">Mahak</span>, a Frontend
          Developer and AI &amp; Data Science student who enjoys turning
          ideas into clean, intuitive, and engaging digital experiences.
        </motion.p>

        <motion.p variants={item} className="mt-4 text-muted">
          Currently, I'm building real-world products, exploring modern
          technologies, and continuously improving my skills in UI/UX, full
          stack architecture, and product development.
        </motion.p>

        <motion.p variants={item} className="mt-4 text-muted">
          For me, great development is where design meets technology —
          creating experiences that not only look good, but also feel
          effortless to use.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 grid grid-cols-3 gap-6 border-t border-paper/10 pt-8"
        >
          {aboutStats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl md:text-5xl font-bold text-accent">
                <Counter value={s.value} />
              </p>
              <p className="mt-2 text-muted text-xs md:text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default About;