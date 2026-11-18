import { useEffect, useState } from "react";
import Academics from "./components/Academics.jsx";
import Contact from "./components/Contact.jsx";
import EngineeringBackground from "./components/EngineeringBackground.jsx";
import Experience from "./components/Experience.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import { profile } from "./data/portfolio.js";

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.classList.toggle("light-theme", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <EngineeringBackground />
      <div className="page">
        <Navbar theme={theme} setTheme={setTheme} />
        <main className="mx-auto max-w-5xl px-5 sm:px-8">
          <Hero />
          <Projects />
          <Experience />
          <Skills />
          <Academics />
          <Contact />
        </main>
        <footer className="border-t border-hairline py-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 font-mono text-xs text-dim sm:flex-row sm:px-8">
            <div>© {new Date().getFullYear()} {profile.name} — Software Engineer</div>
            <div className="flex items-center gap-5">
              <a href="#home" className="transition-colors hover:text-main">Top ↑</a>
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-sky-400">
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
