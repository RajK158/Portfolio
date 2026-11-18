import { useState } from "react";
import { featuredProjects, secondaryProjects } from "../data/portfolio.js";

const categories = {
  ruptiq: ["systems"],
  vitalex: ["fullstack", "ai"],
  impulso: ["systems", "ai"],
  "invoice-extractor": ["ai"],
  "pharma-copilot": ["ai"],
  velora: ["fullstack"],
};

const projects = [...featuredProjects, ...secondaryProjects].map((project) => ({
  ...project,
  categories: categories[project.id] || [],
}));

const filters = [
  { id: "all", label: `All (${projects.length})` },
  { id: "systems", label: "Systems & Tooling" },
  { id: "ai", label: "AI & ML" },
  { id: "fullstack", label: "Full-Stack" },
];

function RuptiqDiagram() {
  return (
    <svg
      viewBox="0 108 720 224"
      role="img"
      aria-label="Ruptiq flow. A before run and an after run each save a k6 workload and Prometheus samples. Compare, investigation, and validation then run offline on those files."
      className="h-full w-full text-main"
      preserveAspectRatio="xMidYMid meet"
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

function OutLink({ href, children, tone = "sky" }) {
  const color = tone === "emerald"
    ? "text-emerald-400 hover:text-emerald-300"
    : "text-sky-400 hover:text-sky-300";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold transition-colors ${color}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

const mediaFrame = {
  ruptiq: "is-ruptiq",
  vitalex: "is-vitalex is-bleed",
  impulso: "is-impulso is-bleed",
  "pharma-copilot": "is-pharma is-bleed",
  velora: "is-velora is-bleed",
};

const invoiceSteps = ["Upload", "OCR", "Validate", "Export"];

function InvoiceFlow() {
  return (
    <div className="project-media is-invoice">
      <ol className="invoice-flow" aria-label="Upload, OCR, Validate, Export">
        {invoiceSteps.map((step, index) => (
          <li key={step}>
            {index > 0 && <span className="invoice-arrow" aria-hidden="true">→</span>}
            <span className="invoice-step">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProjectMedia({ project }) {
  if (project.id === "invoice-extractor") return <InvoiceFlow />;
  if (!project.image && project.id !== "ruptiq") return null;
  return (
    <div className={`project-media ${mediaFrame[project.id] || ""}`}>
      {project.image ? (
        <img src={project.image} alt={project.imageAlt} />
      ) : (
        <RuptiqDiagram />
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  const accent = project.live ? "text-emerald-400" : "text-sky-400";
  return (
    <article className="project-card surface-card flex h-full flex-col overflow-hidden rounded-2xl">
      <ProjectMedia project={project} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className={`font-mono text-xs font-medium ${accent}`}>{project.status || project.tag}</span>
          {project.live && (
            <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
              Live Demo
            </span>
          )}
        </div>
        <h3 className="type-h3 text-main">{project.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-sub sm:text-[15px]">{project.card}</p>
        <div className="mt-6 flex flex-1 flex-wrap items-end justify-between gap-3 border-t border-hairline pt-5">
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li key={item} className="tech-pill rounded-md px-2.5 py-1">{item}</li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-4">
          {project.live && <OutLink href={project.live} tone="emerald">Live Demo</OutLink>}
          {project.walkthrough && <OutLink href={project.walkthrough}>Walkthrough</OutLink>}
          {project.code && <OutLink href={project.code}>GitHub</OutLink>}
        </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all"
    ? projects
    : projects.filter((project) => project.categories.includes(filter));

  return (
    <section id="projects" className="reveal border-b border-hairline py-16 sm:py-24">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-sky-400">01 / Selected Work</span>
          <h2 className="type-h2 mt-1 text-main">Featured Engineering Projects</h2>
        </div>
        <div role="tablist" aria-label="Filter projects by category" className="flex flex-wrap gap-1.5">
          {filters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item.id)}
                className={
                  active
                    ? "rounded-lg bg-sky-500 px-3 py-1.5 font-mono text-xs font-medium text-slate-950"
                    : "surface-panel rounded-lg border border-hairline px-3 py-1.5 font-mono text-xs font-medium text-sub transition-colors hover:text-main"
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-6 text-sm text-sub">No projects in this category.</p>
      )}
    </section>
  );
}
