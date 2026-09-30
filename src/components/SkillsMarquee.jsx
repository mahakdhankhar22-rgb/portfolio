import { skills } from "../data";

const allSkills = Object.values(skills).flat();
const track = [...allSkills, ...allSkills];

function SkillsMarquee() {
  return (
    <div className="relative py-14 border-y border-paper/10 overflow-hidden">
      <div
        className="flex w-max"
        style={{ animation: "marquee 22s linear infinite" }}
      >
        {track.map((skill, i) => (
          <span
            key={i}
            className="flex items-center font-display font-bold uppercase text-3xl md:text-5xl text-paper whitespace-nowrap px-10"
          >
            {skill}
            <span className="text-accent text-2xl ml-10">•</span>
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}

export default SkillsMarquee;