import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Reveal from "./components/Reveal.jsx";
import {
  profile,
  featuredSkillNames,
  skillGroups,
  featuredProjects,
  secondaryProjects,
  certifications,
  publications,
  experience,
  education,
  achievements,
} from "./data/portfolio.js";

function ProjectLinks({ project }) {
  const links = [
    project.live ? { href: project.live, label: "Live" } : null,
    project.walkthrough ? { href: project.walkthrough, label: "Walkthrough" } : null,
    project.code ? { href: project.code, label: "GitHub" } : null,
  ].filter(Boolean);

  return (
    <div className="flex gap-4 text-sm">
      {links.map((link) => (
        <a
          key={link.label}
          className="text-[var(--accent)] hover:underline"
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

function projectHref(project) {
  return project.live || project.walkthrough || project.code;
}

function RuptiqDiagram() {
  return (
    <svg
      viewBox="0 0 720 420"
      role="img"
      aria-label="Ruptiq flow. A before run and an after run each save a k6 workload and Prometheus samples. Compare, investigation, and validation then run offline on those files."
      className="h-full w-full text-[var(--fg)]"
    >
      <g transform="translate(0 64)">
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35">
        <rect x="28" y="78" width="190" height="42" rx="6" />
        <rect x="28" y="132" width="190" height="42" rx="6" />
        <rect x="266" y="78" width="190" height="42" rx="6" />
        <rect x="266" y="132" width="190" height="42" rx="6" />
        <rect x="504" y="72" width="188" height="36" rx="6" />
        <rect x="504" y="118" width="188" height="36" rx="6" />
        <rect x="504" y="164" width="188" height="36" rx="6" />
        <path d="M218 120 H266 M456 120 H504" />
      </g>
      <g fill="currentColor" fontSize="14">
        <text x="28" y="58" opacity="0.55" fontSize="13">Before</text>
        <text x="44" y="104">k6 HTTP GET</text>
        <text x="44" y="158">Prometheus samples</text>
        <text x="266" y="58" opacity="0.55" fontSize="13">After</text>
        <text x="282" y="104">k6 HTTP GET</text>
        <text x="282" y="158">Prometheus samples</text>
        <text x="504" y="58" opacity="0.55" fontSize="13">Offline</text>
        <text x="520" y="95">Compare</text>
        <text x="520" y="141">Investigate</text>
        <text x="520" y="187">Validate</text>
        <text x="28" y="250" opacity="0.7" fontSize="13">Saved diagnosis files, with SHA-256 evidence</text>
      </g>
      </g>
    </svg>
  );
}

const projectSteps = {
  "invoice-extractor": ["Upload", "OCR", "Validate", "Export"],
};

function ProjectSteps({ project }) {
  const steps = projectSteps[project.id] || [];
  return (
    <a
      href={projectHref(project)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title}: ${steps.join(", ")}`}
      className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm transition-colors duration-200 hover:border-[var(--fg)]/25"
    >
      {steps.map((step, index) => (
        <span key={step} className="inline-flex items-center gap-2">
          {index > 0 && <span aria-hidden="true" className="text-[var(--muted)]">/</span>}
          <span>{step}</span>
        </span>
      ))}
    </a>
  );
}

function ProjectMedia({ project }) {
  const href = projectHref(project);
  if (!project.image && project.id !== "ruptiq") {
    return <ProjectSteps project={project} />;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block aspect-[16/10] overflow-hidden rounded-md border border-[var(--line)] bg-[var(--surface)] transition-colors duration-200 hover:border-[var(--fg)]/25"
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          className="h-full w-full object-contain object-center"
        />
      ) : (
        <RuptiqDiagram />
      )}
    </a>
  );
}

function ProjectCopy({ project, featured = false }) {
  const meta = [project.period, project.status].filter(Boolean).join(" · ");
  return (
    <div>
      {meta && <p className="text-xs text-[var(--muted)]">{meta}</p>}
      <h3 className={featured ? "mt-2 text-2xl font-medium tracking-tight" : "mt-2 text-base font-medium"}>
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.card}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li key={item} className="chip">{item}</li>
        ))}
      </ul>
      <div className="mt-4">
        <ProjectLinks project={project} />
      </div>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-5 py-12">
      <h2 className="text-lg font-medium tracking-tight">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function IssuerMark({ src }) {
  if (!src) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-[var(--line)] text-[var(--muted)]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex h-8 shrink-0 items-center justify-center rounded-sm bg-white px-1">
      <img src={src} alt="" className="h-6 w-auto max-w-[6.75rem] object-contain" />
    </span>
  );
}

function CredentialRow({ item }) {
  return (
    <article className="flex gap-3 border-t border-[var(--line)] py-4 first:border-t-0 first:pt-0">
      <IssuerMark src={item.logo} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-base font-medium">{item.title}</h3>
          <p className="text-sm text-[var(--muted)]">Issued {item.issued}</p>
        </div>
        <p className="mt-1 text-sm text-[var(--muted)]">{item.issuer}</p>
        {item.venue && <p className="mt-1 text-sm text-[var(--muted)]">{item.venue}</p>}
        {item.authors && <p className="mt-1 text-sm text-[var(--muted)]">{item.authors}</p>}
        {item.credentialId && (
          <p className="mt-1 text-sm text-[var(--muted)]">Credential ID {item.credentialId}</p>
        )}
        {item.expired && <p className="mt-1 text-sm text-[var(--muted)]">Expired {item.expired}</p>}
        {item.href && (
          <a
            className="mt-2 inline-block text-sm text-[var(--accent)] hover:underline"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.linkLabel}
          </a>
        )}
      </div>
    </article>
  );
}

function Row({ title, meta, subtitle, children }) {
  return (
    <article className="border-t border-[var(--line)] py-5 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-base font-medium">{title}</h3>
        {meta && <p className="text-sm text-[var(--muted)]">{meta}</p>}
      </div>
      {subtitle && <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>}
      {children}
    </article>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [skillsOpen, setSkillsOpen] = useState(false);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.classList.add("theme-light");
    else root.classList.remove("theme-light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const spot = spotlightRef.current;
    if (!spot) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    const onMove = (event) => {
      spot.style.setProperty("--spot-x", `${event.clientX}px`);
      spot.style.setProperty("--spot-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="min-h-screen">
      <div ref={spotlightRef} className="spotlight" aria-hidden="true" />
      <div className="relative z-10">
      <Navbar theme={theme} setTheme={setTheme} />

      <section id="home" className="mx-auto flex max-w-5xl flex-col px-5 pb-8 pt-28 md:min-h-[100dvh] md:justify-center md:pb-0 md:pt-[3.75rem]">
        <Reveal>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">{profile.intro}</p>
          <p className="mt-3 text-sm text-[var(--fg)]">{profile.roleLine}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{profile.availability}</p>
          <div className="mt-8">
            <a className="btn btn-primary" href="#projects">View Projects</a>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <a className="text-[var(--muted)] hover:text-[var(--fg)]" href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="text-[var(--muted)] hover:text-[var(--fg)]" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="text-[var(--muted)] hover:text-[var(--fg)]" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </Reveal>
      </section>

      <Section id="experience" title="Experience">
        {experience.map((role) => (
          <Row key={role.company} title={role.title} subtitle={role.company} meta={role.period}>
            <ul className="mt-3 space-y-2">
              {role.points.map((point) => (
                <li key={point} className="text-sm leading-6 text-[var(--muted)]">
                  {point}
                </li>
              ))}
            </ul>
          </Row>
        ))}
      </Section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="text-lg font-medium tracking-tight">Projects</h2>
        <div className="mt-8">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <article
              key={project.id}
              className={`grid items-center gap-6 py-8 md:grid-cols-2 md:gap-12 ${index ? "border-t border-[var(--line)]" : ""}`}
            >
              <div className={index % 2 ? "md:order-2" : undefined}>
                <ProjectMedia project={project} />
              </div>
              <ProjectCopy project={project} featured />
            </article>
          ))}
        </div>
        <h3 className="mb-4 mt-12 text-sm text-[var(--muted)]">More projects</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...featuredProjects.slice(3), ...secondaryProjects].map((project) => (
            <article key={project.id} className="flex h-full flex-col">
              <ProjectMedia project={project} />
              <div className="pt-4">
                <ProjectCopy project={project} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <Section id="skills" title="Technical skills">
        {!skillsOpen && (
          <ul className="flex flex-wrap gap-2">
            {featuredSkillNames.map((name) => (
              <li key={name} className="chip">{name}</li>
            ))}
          </ul>
        )}
        {skillsOpen && (
          <div className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.id}>
                <h3 className="text-xs uppercase tracking-wide text-[var(--muted)]">{group.label}</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((name) => (
                    <li key={name} className="chip">{name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          className="btn btn-ghost mt-5"
          aria-expanded={skillsOpen}
          onClick={() => setSkillsOpen((open) => !open)}
        >
          {skillsOpen ? "Show less" : "View all skills"}
        </button>
      </Section>

      <Section id="education" title="Education">
        {education.map((item) => (
          <Row key={item.degree} title={item.degree} subtitle={item.school} meta={item.period}>
            {item.note && <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.note}</p>}
          </Row>
        ))}
      </Section>

      <Section id="recognition" title="Achievements & Publications">
        <h3 className="text-sm text-[var(--muted)]">Awards & Achievements</h3>
        <div className="mt-4">
          {achievements.map((item) => (
            <Row key={item.title} title={item.title}>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
            </Row>
          ))}
        </div>
        <h3 className="mb-4 mt-10 text-sm text-[var(--muted)]">Certifications</h3>
        <div>
          {certifications.map((item) => (
            <CredentialRow key={item.title} item={item} />
          ))}
        </div>
        <h3 className="mb-4 mt-10 text-sm text-[var(--muted)]">Research Publications</h3>
        <div>
          {publications.map((item) => (
            <CredentialRow key={item.title} item={item} />
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
          {profile.availability}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a className="text-[var(--accent)] hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="text-[var(--accent)] hover:underline" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="text-[var(--accent)] hover:underline" href={profile.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p className="mt-10 border-t border-[var(--line)] pt-5 text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} Raj Kundur
        </p>
      </Section>
      </div>
    </div>
  );
}
