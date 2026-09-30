import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function MagneticButton({ href, children, variant = "solid", target }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "px-7 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors";
  const styles =
    variant === "solid"
      ? `${base} bg-accent text-ink hover:bg-paper`
      : `${base} border border-paper/30 hover:border-accent`;

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={target ? "noreferrer" : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={styles}
    >
      {children}
    </motion.a>
  );
}

export default MagneticButton;