import { motion } from "framer-motion";
import { profile } from "../data";

const letters = profile.name.split("");

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center"
    >
      <div className="font-display text-4xl md:text-6xl font-bold uppercase flex">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={letter === " " ? "w-3" : "text-accent"}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "160px" }}
        transition={{ delay: 1, duration: 3.5, ease: "linear" }}
        className="mt-8 h-[2px] bg-accent"
      />
    </motion.div>
  );
}

export default Loader;