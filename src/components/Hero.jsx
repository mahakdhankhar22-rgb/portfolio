import { motion } from "framer-motion";
import { profile } from "../data";
import MagneticButton from "./MagneticButton";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* MAIN GRID: only the left text sits in the grid */}
      <div className="grid md:grid-cols-2 items-center gap-10 w-full px-6 md:px-16 py-28">
        {/* LEFT: all content */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={item}
            className="font-display font-bold uppercase leading-[0.95] text-5xl md:text-7xl"
          >
            I BUILD
            <br />
            <span className="shimmer">DIGITAL</span>
            <br />
            <span className="shimmer">EXPERIENCES</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-sm tracking-widest text-muted uppercase"
          >
            Frontend Developer <span className="text-accent">·</span> UI/UX
            Designer
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-muted"
          >
            I design intuitive user experiences and build engaging,
            responsive interfaces. Bringing together thoughtful UX and clean
            frontend code to turn ideas into impactful digital products.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex gap-4">
            <MagneticButton href="#projects" variant="solid">
              View My Work
            </MagneticButton>

            <MagneticButton
              href={profile.resume}
              variant="outline"
              target="_blank"
            >
              Download Resume
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div />
      </div>

      {/* RIGHT: large hero portrait */}
      <div
        className="
          absolute
          right-[-5%]
          top-[5%]
          w-[700px]
          h-[700px]
          rounded-full
          bg-[radial-gradient(circle,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.18)_22%,rgba(255,255,255,0.08)_42%,transparent_72%)]
          blur-[45px]
          pointer-events-none
        "
      />

      <motion.img
        src="/mee.png"
        alt={profile.name}
        initial={{ opacity: 0, scale: 1.05, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        className="
          absolute
          bottom-0
          right-[-5vw]
          h-[92vh]
          w-auto
          object-cover
          object-bottom
        "
      />

      {/* edge fades painted in the site's own background color */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-ink to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-ink to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-16 md:left-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-muted">SCROLL</span>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="h-10 w-[4px] bg-accent"
        />
      </motion.div>
    </section>
  );
}

export default Hero;