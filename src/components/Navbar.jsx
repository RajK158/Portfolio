import { useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

function ThemeButton({ theme, setTheme }) {
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3.5" />
          <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 13.5A6.5 6.5 0 1 1 10.5 7.5 5 5 0 0 0 16.5 13.5z" />
        </svg>
      )}
    </button>
  );
}

export default function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="header fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-5">
        <a href="#home" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <img
            src="/signature.png"
            alt="Raj Kundur"
            className="signature-img h-9 w-auto shrink-0 select-none"
          />
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--muted)] hover:text-[var(--fg)]"
            >
              {link.label}
            </a>
          ))}
          <ThemeButton theme={theme} setTheme={setTheme} />
        </nav>

        <div className="flex items-center gap-4 lg:hidden">
          <ThemeButton theme={theme} setTheme={setTheme} />
          <button
            type="button"
            className="text-sm text-[var(--fg)]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-[var(--line)] bg-[var(--bg)] lg:hidden" aria-label="Mobile">
          <div className="mx-auto flex max-w-5xl flex-col px-5 py-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-[var(--line)] py-3 text-sm text-[var(--fg)] last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
