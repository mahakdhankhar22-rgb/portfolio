const groupA = [
  "React.js",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Responsive Design",
  "Data Structures & Algorithms",
];

const groupB = ["VS Code", "Git", "GitHub", "Cursor", "Framer Motion"];

const trackA = [...groupA, ...groupA];
const trackB = [...groupB, ...groupB];

function Strip({ items, duration, big }) {
  return (
    <div
      className={`relative border-y border-paper/10 overflow-hidden ${
        big ? "py-12" : "py-12"
      }`}
    >
      <div
        className="flex w-max"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        {items.map((skill, i) => (
          <span
            key={i}
            className={`flex items-center font-display font-bold uppercase whitespace-nowrap px-8 ${
              big ? "text-3xl md:text-5xl" : "text-3xl md:text-5xl"
            }`}
          >
            {skill}
            <span className="text-accent text-xl ml-8">•</span>
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}

function TechMarquee() {
  return (
    <div className="py-24">
      <h2 className="text-center font-display font-bold uppercase text-3xl md:text-5xl">
        Technologies I <span className="shimmer">Work With</span>
      </h2>

      <div className="mt-14 space-y-12">
        <Strip items={trackA} duration={24} big />
        <Strip items={trackB} duration={24} />
      </div>
    </div>
  );
}

export default TechMarquee;