import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function Navbar({ name }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-ink/80 backdrop-blur">
      <span className="font-display font-bold">{name}</span>
      <div className="hidden md:flex gap-8 text-sm">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`relative pb-1 transition ${
              active === l.href.slice(1)
                ? "text-accent"
                : "text-muted hover:text-paper"
            }`}
          >
            {l.label}
            {active === l.href.slice(1) && (
              <motion.div
                layoutId="nav-underline"
                className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-accent"
              />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;