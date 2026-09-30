import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import {
  profile,
  experienceCards,
  projects,
  certifications,
} from "./data";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import ProjectCard, { ProjectsHeading } from "./components/ProjectCard";
import Hero from "./components/Hero";
import CursorGlow from "./components/CursorGlow";
import Loader from "./components/Loader";
import TechMarquee from "./components/TechMarquee";
import About from "./components/About";
import ExperienceStack from "./components/ExperienceStack";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";

function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <div className="min-h-screen px-6 md:px-16">
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-accent"
        />
        <CursorGlow />
        <Navbar name={profile.name} />

        <Hero />

        <Section id="about" label="01 / ABOUT">
          <About />
        </Section>

        {/* SKILLS */}
        <Section id="skills" label="02 / SKILLS">
          <div className="mt-10">
            <TechMarquee />
          </div>
        </Section>

        {/* EXPERIENCE */}
        <ExperienceStack cards={experienceCards} />

        {/* PROJECTS */}
        <Section id="projects" label="04 / PROJECTS">
          <ProjectsHeading>Featured Projects</ProjectsHeading>
          <div className="mt-12 space-y-10 overflow-x-clip py-2 md:space-y-16">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </Section>

        {/* CERTIFICATIONS */}
        <Section id="certifications" label="05 / CERTIFICATIONS">
          <Certifications items={certifications} />
        </Section>

        {/* CONTACT */}
        <Section id="contact" label="06 / LET’S CONNECT">
          <Contact profile={profile} />
        </Section>
      </div>
    </>
  );
}

export default App;