import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import OwlAssistant from "./components/OwlAssistant";
import BackgroundGlow from "./components/BackgroundGlow";
import Reveal from "./components/Reveal";
import Effects from "./components/Effects";


export default function App() {
  // default: dark theme
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.classList.add("theme-light");
    else root.classList.remove("theme-light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen relative z-10">
      <BackgroundGlow />
      <Effects />
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Hero (includes About for now) */}
     {/* Hero Section */}
<section id="home" className="max-w-screen-xl mx-auto px-4 pt-28 pb-24">
  {/* Wrap hero content in Reveal for smooth scroll-in */}
  <Reveal>
    <div className="text-center">
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--accent-300)]">
        Raj Kundur
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-[var(--muted)]">
      MS CS Student/Software Engineer @ California State University, Long Beach
      <br />
      • Software developer by profession
      </p>


      <div className="mt-8 flex items-center justify-center gap-3">
        <a
          href="#projects"
          className="px-4 py-2 rounded-xl bg-[var(--accent-600)]/20 hover:bg-[var(--accent-600)]/30 border border-[var(--accent-600)]/40"
        >
          See Projects
        </a>
        <a
          href="mailto:rajkundur58@gmail.com"
          className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/5"
        >
          Email Me
        </a>
        <a
          href="https://www.overleaf.com/read/bjgjkwdfpxpp#c21205"
          className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/5"
        >
          Resume
        </a>
      </div>
    </div>
  </Reveal>

  {/* Owl assistant with a small delay for staggered reveal */}
  <div className="mt-16">
    <Reveal delay={120}>
      <OwlAssistant theme={theme} setTheme={setTheme} />
    </Reveal>
  </div>
</section>

     
 {/* Projects */}
<section id="projects" className="max-w-screen-xl mx-auto px-4 py-24">
  <h2 className="text-2xl sm:text-3xl font-semibold">Projects</h2>

  <div className="mt-6 grid gap-6 sm:grid-cols-2">
    {[
      {
        title: "Pharma Copilot Medical Diagnostics | Agentic AI",
        tech: "(FastAPI, React, FAISS)",
        year: "2025",
        desc: "An AI-powered diagnostic assistant that helps doctors analyze patient reports and medical images using a retrieval-augmented model.",
        live: "https://github.com/RajK158",
        code: "https://github.com/RajK158"
      },
      {
        title: "Detecting Spammers on Social Media using Machine Learning Methodologies",
        tech: "(Machine Learning, NLP)",
        year: "2023",
        desc: "Developed a classifier to detect spam accounts using ML models and linguistic feature analysis of tweets and comments.",
        Research: "https://ijrar.org/papers/IJRAR23A1860.pdf",
        // code: "https://github.com/yourname/spam-detector"
      },
      {
        title: "Multi-Language Invoice Extractor",
        tech: "(Python, OCR, LangChain)",
        year: "2023",
        desc: "Extracts structured data from invoices in multiple languages using OCR and LLM pipelines.",
        live: "https://github.com/RajK158",
        code: "https://github.com/RajK158"
      },
      {
        title: "Phi Quick Chat AI",
        tech: "(React, FastAPI, HuggingFace)",
        year: "2025",
        desc: "A lightweight chatbot using the Phi family of LLMs optimized for fast, context-aware responses.",
        live: "https://github.com/RajK158",
        code: "https://github.com/RajK158"
      },
    ].map((p, i) => (
      <Reveal key={i} delay={i * 100}>
        <article className="rounded-2xl border border-white/10 p-5 bg-[var(--card)] card-zoom">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {p.title}
              <span className="block text-xs text-[var(--muted)] mt-1">{p.tech}</span>
            </h3>
            <span className="text-xs px-2 py-1 rounded-full border border-white/10">{p.year}</span>
          </div>

          <p className="mt-2 text-sm text-[var(--muted)]">{p.desc}</p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
  {(() => {
    const computed = [];

    // 1) Array style: p.links = [{label, url}, ...]
    if (Array.isArray(p.links) && p.links.length) {
      computed.push(...p.links);
    }

    // 2) Classic fields
    if (p.live) computed.push({ label: "Live", url: p.live });
    if (p.code) computed.push({ label: "Code", url: p.code });

    // 3) ANY other string fields become links (e.g., Research, Paper, Docs)
    Object.keys(p).forEach((key) => {
      const val = p[key];
      if (
        typeof val === "string" &&
        key !== "title" &&
        key !== "tech" &&
        key !== "year" &&
        key !== "desc" &&
        key !== "live" &&
        key !== "code" &&
        key !== "links"
      ) {
        computed.push({ label: key, url: val });
      }
    });

    return computed.map((link, j) => (
      <a
        key={j}
        className="underline hover:text-[var(--accent-300)] transition"
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.label}
      </a>
    ));
  })()}
</div>



        </article>
      </Reveal>
    ))}
  </div>
</section>


     
     {/* Education */}
<section id="education" className="max-w-screen-xl mx-auto px-4 py-24">
  <h2 className="text-2xl sm:text-3xl font-semibold">Education</h2>

  <Reveal>
    <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-[var(--card)] card-zoom">
      <p className="font-medium">Master's in Computer Science, California State University Long Beach</p>
      <p className="text-sm text-[var(--muted)]">Jan 2025 — Dec 2026</p>
    </div>
    <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-[var(--card)] card-zoom">
      <p className="font-medium">Bachelor's in Computer Engineering, Savitribai Phule Pune University</p>
      <p className="text-sm text-[var(--muted)]">Jan 2020 — June 2023</p>
    </div>
  </Reveal>
</section>

 {/* Experience */}
 <section id="experience" className="max-w-screen-xl mx-auto px-4 py-24">
  <h2 className="text-2xl sm:text-3xl font-semibold">Experience</h2>

  <Reveal>
     <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-[var(--card)] card-zoom">
      <p className="font-medium">Software Engineer - California State University, Long Beach</p>
      <p className="text-sm text-[var(--muted)]">Sept 2025 — Present</p>
      
    </div>
    <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-[var(--card)] card-zoom">
      <p className="font-medium">Software Engineer - JSPM University</p>
      <p className="text-sm text-[var(--muted)]">Jan 2024 — Nov 2024</p>
    </div>
    <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-[var(--card)] card-zoom">
      <p className="font-medium">Full Stack Software Developer - QSpiders</p>
      <p className="text-sm text-[var(--muted)]">Feb 2023 — August 2023</p>
    </div>
  </Reveal>
</section>


{/* Contact */}
<section id="contact" className="max-w-screen-xl mx-auto px-4 py-24">
  <Reveal>
    <div className="p-6 rounded-2xl border border-white/10 bg-[var(--card)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card-zoom">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold">Say hello</h2>
        <p className="mt-2 text-[var(--muted)]">
          Best way to reach me is email.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="mailto:rajkundur58@gmail.com"
          className="px-4 py-2 rounded-xl bg-[var(--accent-600)]/20 border border-[var(--accent-600)]/40"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/rajkundur/"
          className="px-4 py-2 rounded-xl border border-white/20"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/Rajk158"
          className="px-4 py-2 rounded-xl border border-white/20"
        >
          GitHub
        </a>
      </div>
    </div>
  </Reveal>

  <p className="mt-6 text-xs text-[var(--muted)]">
    © {new Date().getFullYear()} Raj Kundur
  </p>
</section>

    </div>
  );
}
