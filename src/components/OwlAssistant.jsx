import { useEffect, useRef, useState } from "react";

export default function OwlAssistant({ theme, setTheme }) {
  // ---- customize these two ----
  const EMAIL = "rajkundur58@gmail.com";
  const RESUME_URL = "https://www.overleaf.com/read/bjgjkwdfpxpp#c21205";
  // -----------------------------

  const [messages, setMessages] = useState(() => [
    {
      who: "owl",
      text:
        "hello - I can guide you. Try: projects, experience, education, contact, resume, theme.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  // smooth scroll helper
  const scrollTo = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return false;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  };

  // map common words to sections
  const navMap = {
    projects: "#projects",
    project: "#projects",
    experience: "#experience",
    exp: "#experience",
    education: "#education",
    edu: "#education",
    contact: "#contact",
    home: "#home",
    resume: "#home",
  };

  const chips = ["projects", "experience", "education", "contact", "resume", "theme", "help"];

  async function handleCommand(raw) {
    if (!raw.trim()) return;
    const text = raw.trim();
    const lower = text.toLowerCase();

    setMessages((m) => [...m, { who: "you", text }]);
    setIsTyping(true);

    // theme command: "theme light" / "theme dark"
    if (lower.startsWith("theme")) {
      const parts = lower.split(/\s+/);
      const mode = parts[1];
      if (mode === "light" || mode === "dark") {
        setTheme(mode);
        await sleep(300);
        setIsTyping(false);
        return setMessages((m) => [...m, { who: "owl", text: `theme set to ${mode}.` }]);
      } else {
        await sleep(300);
        setIsTyping(false);
        return setMessages((m) => [
          ...m,
          { who: "owl", text: "try 'theme light' or 'theme dark'." },
        ]);
      }
    }

    // quick actions
    if (lower === "email") {
      window.location.href = `mailto:${EMAIL}`;
      await sleep(300);
      setIsTyping(false);
      return setMessages((m) => [...m, { who: "owl", text: "opening mail…" }]);
    }

    if (lower === "resume") {
      window.open(RESUME_URL, "_blank");
      await sleep(300);
      setIsTyping(false);
      return setMessages((m) => [...m, { who: "owl", text: "opening resume…" }]);
    }

    // section navigation (FIX for wrong section issue)
    for (const key of Object.keys(navMap)) {
      if (lower === key) {
        const ok = scrollTo(navMap[key]);
        await sleep(300);
        setIsTyping(false);
        return setMessages((m) => [
          ...m,
          { who: "owl", text: ok ? `navigating to ${key}.` : `couldn't find ${key}.` },
        ]);
      }
    }

    // help
    if (lower === "help") {
      await sleep(300);
      setIsTyping(false);
      return setMessages((m) => [
        ...m,
        {
          who: "owl",
          text:
            "commands: projects, experience, education, contact, resume, email, theme light/dark.",
        },
      ]);
    }

    // default
    await sleep(300);
    setIsTyping(false);
    setMessages((m) => [
      ...m,
      { who: "owl", text: "got it — try 'projects' or 'theme light'." },
    ]);
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4 sm:p-5 max-w-3xl mx-auto">
      <div className="text-sm text-[var(--muted)] mb-3 flex items-center gap-2">
        <span role="img" aria-label="owl">🦉</span>
        <span>Owl assistant</span>
      </div>

      {/* messages */}
      <div className="space-y-2 max-h-64 overflow-auto pr-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.who === "you"
                ? "text-right"
                : "text-left"
            }
          >
            <span
              className={
                "inline-block px-3 py-2 rounded-xl border " +
                (m.who === "you"
                  ? "border-[var(--accent-600)]/40 bg-[var(--accent-600)]/15"
                  : "border-white/10 bg-white/5")
              }
            >
              {m.text}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="text-left text-sm text-[var(--muted)] mt-1">owl is typing…</div>
        )}
      </div>

      {/* input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(input);
          setInput("");
        }}
        className="mt-4 flex items-center gap-3"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a command - try 'projects' or 'theme light'"
          className="flex-1 px-3 py-2 rounded-xl bg-transparent border border-white/15 outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5"
        >
          Send
        </button>
      </form>

      {/* quick chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => handleCommand(c)}
            className="text-xs px-2 py-1 rounded-lg border border-white/15 hover:bg-white/5"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
