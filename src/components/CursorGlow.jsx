import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function CursorGlow() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
  style={{
    x: sx,
    y: sy,
    background: "radial-gradient(circle, rgba(122,92,18,0.35), transparent 70%)",
  }}
  className="pointer-events-none fixed top-0 left-0 -z-10 hidden md:block h-[400px] w-[400px] rounded-full blur-3xl"
  />
  );
}

export default CursorGlow;