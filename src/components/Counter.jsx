import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const text = String(value);
  const num = parseFloat(text);
  const decimals = text.includes(".") ? 1 : 0;
  const suffix = text.replace(/[\d.]/g, "");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, num, {
      duration: 1.5,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, num, decimals, suffix]);

  return <span ref={ref}>0</span>;
}

export default Counter;