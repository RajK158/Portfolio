import { experience } from "../data/portfolio.js";

const companyTone = ["text-sky-400", "text-emerald-400", "text-sub"];

export default function Experience() {
  return (
    <section id="experience" className="reveal border-b border-hairline py-16 sm:py-24">
      <div className="mb-10">
        <span className="font-mono text-xs uppercase tracking-wider text-sky-400">02 / Career</span>
        <h2 className="type-h2 mt-1 text-main">Professional Experience</h2>
      </div>

      <div className="relative ml-3 space-y-8 border-l border-hairline pl-6 sm:ml-4 sm:pl-8">
        {experience.map((role, index) => (
          <div key={role.company} className="relative">
            <span
              className={`absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 sm:-left-[39px] ${
                index === 0 ? "bg-sky-400 ring-sky-400/15" : "bg-slate-500 ring-slate-500/15"
              }`}
              aria-hidden="true"
            />
            <article className="surface-panel rounded-2xl p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="type-h3 text-main">{role.title}</h3>
                <span className="font-mono text-xs text-dim">{role.period}</span>
              </div>
              <p className={`mt-1 font-mono text-xs ${companyTone[index] || "text-sub"}`}>{role.company}</p>
              <ul className="mt-4 space-y-2">
                {role.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-sub sm:text-[15px]">
                    <span className="mt-0.5 text-sky-400" aria-hidden="true">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
