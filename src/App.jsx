import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import OwlAssistant from "./components/OwlAssistant.jsx";
import BackgroundGlow from "./components/BackgroundGlow.jsx";
import Reveal from "./components/Reveal.jsx";
import Effects from "./components/Effects.jsx";
import {
  profile,
  highlights,
  skillFilters,
  skillCategoryLabels,
  skills,
  featuredProjects,
  secondaryProjects,
  publication,
  experience,
  education,
} from "./data/portfolio.js";

function ProjectLinks({ project }) {
  const links = [
    project.live ? { href: project.live, label: "Live" } : null,
    project.walkthrough ? { href: project.walkthrough, label: "Walkthrough" } : null,
    project.code ? { href: project.code, label: "Code" } : null,
  ].filter(Boolean);

  return (
    <div className="flex gap-3 text-xs font-semibold">
      {links.map((link) => (
        <a
          key={link.label}
          className="text-[var(--accent-300)] hover:underline transition"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function ProjectCard({ project, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <article className="rounded-3xl border border-white/10 p-6 bg-[var(--card)] card-zoom flex flex-col justify-between min-h-[260px] h-auto transition-all relative overflow-hidden">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[var(--fg)] leading-snug">{project.title}</h3>
              <span className="block text-xs font-semibold text-[var(--muted)] mt-1.5">{project.tech}</span>
            </div>
            <span className="shrink-0 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[var(--accent-300)]">
              {project.tag}
            </span>
          </div>
          <p className="mt-4 text-sm text-[var(--muted)] leading-relaxed">{project.summary}</p>
          <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed">{project.detail}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4 mt-4">
          <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[var(--muted)]">
            {[project.year, project.status].filter(Boolean).join(" · ")}
          </span>
          <ProjectLinks project={project} />
        </div>
      </article>
    </Reveal>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [activeSkillCategory, setActiveSkillCategory] = useState("all");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("theme-light");
    } else {
      root.classList.remove("theme-light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const filteredSkills = activeSkillCategory === "all"
    ? skills
    : skills.filter((s) => s.category === activeSkillCategory);

  return (
    <div className="min-h-screen relative z-10 overflow-hidden">
      <BackgroundGlow />
      <Effects />
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Hero Section - Bento Style */}
      <section id="home" className="max-w-screen-xl mx-auto px-4 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Info Bento Card */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[var(--card)] card-zoom flex flex-col justify-between min-h-[340px]">
            <Reveal>
              <div>
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent-600)]/15 border border-[var(--accent-600)]/30 text-[var(--accent-300)]">
                  {profile.availability}
                </span>
                <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--accent-300)] text-glow">
                  {profile.name}
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-[var(--muted)] leading-relaxed">
                  {profile.roleLine}
                </p>
                <p className="mt-3 text-sm sm:text-base text-[var(--muted)]/80">
                  {profile.intro}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="px-5 py-2.5 rounded-xl bg-[var(--accent-600)]/20 hover:bg-[var(--accent-600)]/35 text-sm font-medium border border-[var(--accent-600)]/45 transition shadow-lg shadow-[var(--accent-600)]/5"
                >
                  Explore Projects
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="px-5 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 text-sm font-medium transition"
                >
                  Email Me
                </a>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 text-sm font-medium transition"
                >
                  Resume
                </a>
              </div>
            </Reveal>
          </div>

          {/* Quick Metrics Bento Card */}
          <div className="p-6 rounded-3xl border border-white/10 bg-[var(--card)] card-zoom flex flex-col justify-between">
            <Reveal delay={100}>
              <h3 className="text-lg font-semibold text-[var(--fg)] border-b border-white/5 pb-2 mb-4">Highlights</h3>
              <div className="space-y-4">
                {highlights.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-[var(--muted)]">{item.label}</span>
                    <span className={`text-sm font-semibold text-right ${item.accent ? "text-[var(--accent-300)]" : "text-[var(--fg)]"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-[var(--muted)] text-center">
                🤖 Hover & drag the AI Cyber-Owl companion to explore!
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Interactive Skills Showcase - Clean Badges without Scores */}
      <section id="skills" className="max-w-screen-xl mx-auto px-4 py-16">
        <Reveal>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">Technical Skills</h2>
              <p className="text-sm text-[var(--muted)] mt-1">Technologies used in the projects and engineering work below</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skillFilters.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveSkillCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    activeSkillCategory === cat.id
                      ? "bg-[var(--accent-600)]/20 border-[var(--accent-600)]/60 text-[var(--accent-300)] shadow-md"
                      : "bg-transparent border-white/10 hover:border-white/20 text-[var(--muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-wrap gap-3">
          {filteredSkills.map((s, i) => (
            <Reveal key={s.name} delay={i * 30}>
              <div className="px-5 py-3.5 rounded-2xl border border-white/5 bg-[var(--card)] card-zoom flex items-center gap-2.5 transition-all">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-300)] shadow-[0_0_8px_var(--accent-500)]" />
                <span className="text-sm font-bold text-[var(--fg)]">{s.name}</span>
                <span className="text-[10px] text-[var(--muted)] font-mono ml-1.5 opacity-60">
                  {skillCategoryLabels[s.category]}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projects" className="max-w-screen-xl mx-auto px-4 py-16">
        <Reveal>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)]">Featured Projects</h2>
            <p className="text-sm text-[var(--muted)] mt-1">Recent software engineering work, with the repository behind each one</p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index * 80} />
          ))}
        </div>

        <div className="mt-12">
          <Reveal>
            <h3 className="text-xl font-extrabold text-[var(--fg)] mb-4">Additional Project</h3>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {secondaryProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div id="research" className="mt-12">
          <Reveal>
            <h3 className="text-xl font-extrabold text-[var(--fg)] mb-4">Publication</h3>
            <article className="rounded-3xl border border-white/10 p-6 bg-[var(--card)] card-zoom">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold text-[var(--fg)] leading-snug">{publication.title}</h4>
                  <p className="mt-1.5 text-xs font-semibold text-[var(--accent-300)]">{publication.venue}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{publication.authors}</p>
                </div>
                <a
                  className="shrink-0 text-xs font-semibold text-[var(--accent-300)] hover:underline"
                  href={publication.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Paper
                </a>
              </div>
              <p className="mt-4 text-xs text-[var(--muted)] leading-relaxed">{publication.summary}</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Experience & Education Timelines */}
      <section id="journey" className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Work Experience */}
          <div id="experience">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)] mb-8">Professional Journey</h2>
            </Reveal>

            <div className="relative pl-6 border-l-2 border-white/5 ml-2 space-y-8">
              {experience.map((exp, idx) => (
                <div key={exp.company} className="relative group">
                  {/* Glowing Timeline Marker */}
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[var(--accent-600)] border border-[var(--accent-300)] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_var(--accent-600)]" />
                  
                  <Reveal delay={idx * 100}>
                    <div className="p-5 rounded-2xl border border-white/10 bg-[var(--card)] card-zoom">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <h4 className="text-base font-bold text-[var(--fg)]">{exp.title}</h4>
                        <span className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[var(--muted)] font-medium">{exp.period}</span>
                      </div>
                      <p className="text-xs font-semibold text-[var(--accent-300)] mt-1">{exp.company}</p>
                      <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">{exp.desc}</p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>

          {/* Education timeline */}
          <div id="education">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)] mb-8">Academic Path</h2>
            </Reveal>

            <div className="relative pl-6 border-l-2 border-white/5 ml-2 space-y-8">
              {education.map((edu, idx) => (
                <div key={edu.degree} className="relative group">
                  {/* Glowing Timeline Marker */}
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[var(--accent-500)] border border-[var(--accent-300)] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_var(--accent-500)]" />

                  <Reveal delay={idx * 120}>
                    <div className="p-5 rounded-2xl border border-white/10 bg-[var(--card)] card-zoom">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <h4 className="text-base font-bold text-[var(--fg)]">{edu.degree}</h4>
                        <span className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[var(--muted)] font-medium">{edu.period}</span>
                      </div>
                      <p className="text-xs font-semibold text-[var(--accent-300)] mt-1">{edu.school}</p>
                      <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">{edu.note}</p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Say Hello Section */}
      <section id="contact" className="max-w-screen-xl mx-auto px-4 py-16">
        <Reveal>
          <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--card)] to-[var(--accent-900)]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 card-zoom relative overflow-hidden">
            
            <div className="z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--fg)]">Open to engineering conversations</h2>
              <p className="mt-3 text-sm text-[var(--muted)] max-w-md leading-relaxed">
                I am looking at software engineering internships and co-ops. Email me if you want to talk through a project, or about backend systems and applied AI.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 z-10">
              <a
                href={`mailto:${profile.email}`}
                className="px-6 py-3 rounded-xl bg-[var(--accent-600)] text-white hover:bg-[var(--accent-500)] font-semibold text-sm transition shadow-lg shadow-[var(--accent-600)]/20"
              >
                Send Email
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 font-semibold text-sm transition"
              >
                LinkedIn
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 font-semibold text-sm transition"
              >
                GitHub Profile
              </a>
            </div>

            {/* Glowing background blob */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[var(--accent-600)]/10 blur-[100px] pointer-events-none" />
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--muted)] border-t border-white/5 pt-6">
          <p>© {new Date().getFullYear()} Raj Kundur. Engineered with precision.</p>
          <div className="flex gap-4">
            <a href="#home" className="hover:text-[var(--accent-300)] transition">Back to Top</a>
            <span>•</span>
            <span className="text-[var(--accent-300)] font-semibold">OWL Agent active 🦉</span>
          </div>
        </div>
      </section>

      {/* Global Floating Draggable Owl Assistant Companion */}
      <OwlAssistant theme={theme} setTheme={setTheme} />
    </div>
  );
}
