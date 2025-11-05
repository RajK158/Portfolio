import { useEffect, useState } from "react";


export default function Navbar({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header
      className={`header fixed top-0 left-0 right-0 z-50 border-b border-[var(--accent-800)]/30 bg-[var(--nav)] backdrop-blur-md ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Signature logo (click -> home) */}
        <a href="#home" className="flex items-center gap-2">
        <img
        src="/signature.png"
        alt="Raj Kundur Signature"
        className="h-12 w-auto select-none pointer-events-none signature-img"
        />

        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--muted)] hover:text-[var(--fg)] relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--accent-500)] group-hover:w-full transition-all" />
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/5 text-sm"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
}
