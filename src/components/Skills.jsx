import { skillGroups } from "../data/portfolio.js";

export default function Skills() {
  return (
    <section id="skills" className="reveal border-b border-hairline py-16 sm:py-24">
      <div className="mb-10">
        <span className="font-mono text-xs uppercase tracking-wider text-sky-400">03 / Stack</span>
        <h2 className="type-h2 mt-1 text-main">Technical Skills</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <div key={group.id} className="surface-panel rounded-2xl p-6">
            <h3 className={`mb-4 font-mono text-xs font-semibold uppercase tracking-wider ${index % 2 ? "text-emerald-400" : "text-sky-400"}`}>
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="tech-pill rounded-lg px-3 py-1.5">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
