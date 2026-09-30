import { motion } from "framer-motion";

function Section({ id, label, children }) {
  return (
    <motion.section
      id={id}
      className="py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="text-accent tracking-widest text-sm">{label}</p>
      {children}
    </motion.section>
  );
}

export default Section;