import { profile } from "../data/portfolio.js";

const focus = ["Backend Systems", "Performance Engineering", "AI Applications"];

export default function Hero() {
  return (
    <section id="home" className="home-section py-16 sm:py-24">
      <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 font-mono text-xs font-medium text-sky-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>{profile.roleLine}</span>
          </div>

          <h1 className="type-hero text-main">
            Hi, I’m {profile.name}.
            <span className="mt-1 block text-sky-400">Software Engineer.</span>
          </h1>

          <p className="type-hero-sub">{profile.intro}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition-colors hover:bg-sky-400"
            >
              View Projects
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-panel inline-flex items-center gap-2 rounded-xl border border-hairline px-5 py-3 text-sm font-medium text-main transition-colors hover:border-sky-400/60"
            >
              <span>GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#contact"
              className="surface-panel rounded-xl border border-hairline px-5 py-3 text-sm font-medium text-sub transition-colors hover:border-emerald-400/60 hover:text-main"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="surface-panel overflow-hidden rounded-2xl shadow-xl">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3" style={{ backgroundColor: "var(--bg-chip)" }}>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-xs text-dim">engineer.profile.json</span>
            </div>
            <div className="overflow-x-auto p-5 font-mono text-xs leading-relaxed sm:p-6 sm:text-[13px]">
              <p className="sr-only">
                {profile.name}, Software Engineer. {profile.roleLine} Focus: {focus.join(", ")}.
              </p>
              <div className="text-dim" aria-hidden="true">{"{"}</div>
              <div className="pl-4" aria-hidden="true">
                <span className="text-sky-400">&quot;name&quot;</span>: <span className="text-emerald-400">&quot;{profile.name}&quot;</span>,
              </div>
              <div className="pl-4" aria-hidden="true">
                <span className="text-sky-400">&quot;role&quot;</span>: <span className="text-emerald-400">&quot;Software Engineer&quot;</span>,
              </div>
              <div className="pl-4" aria-hidden="true">
                <span className="text-sky-400">&quot;education&quot;</span>: <span className="text-emerald-400">&quot;{profile.roleLine}&quot;</span>,
              </div>
              <div className="pl-4" aria-hidden="true">
                <span className="text-sky-400">&quot;focus&quot;</span>: [
              </div>
              {focus.map((item, index) => (
                <div key={item} className="pl-8 text-amber-300" aria-hidden="true">
                  &quot;{item}&quot;{index < focus.length - 1 ? "," : ""}
                </div>
              ))}
              <div className="pl-4" aria-hidden="true">],</div>
              <div className="pl-4" aria-hidden="true">
                <span className="text-sky-400">&quot;github&quot;</span>:{" "}
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline underline-offset-2 hover:text-sky-300">
                  &quot;github.com/RajK158&quot;
                </a>
              </div>
              <div className="text-dim" aria-hidden="true">{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
