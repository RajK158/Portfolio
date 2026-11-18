import { useState } from "react";
import { profile } from "../data/portfolio.js";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyGithub() {
    try {
      await navigator.clipboard.writeText(profile.githubUrl);
    } catch {
      const input = document.createElement("input");
      input.value = profile.githubUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <section id="contact" className="reveal py-16 sm:py-24">
      <div className="surface-panel mx-auto max-w-3xl rounded-3xl p-8 text-center sm:p-12">
        <span className="font-mono text-xs uppercase tracking-wider text-sky-400">05 / Connect</span>
        <h2 className="type-h2 mt-2 text-main">Get in Touch</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-sub sm:text-base">
          {profile.availability}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition-colors hover:bg-sky-400"
          >
            <span>GitHub (@RajK158)</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="surface-card rounded-xl border border-hairline px-5 py-3 font-mono text-xs font-medium text-main"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="surface-card inline-flex items-center gap-1.5 rounded-xl border border-hairline px-5 py-3 font-mono text-xs font-medium text-sub hover:text-main"
          >
            <span>LinkedIn</span>
            <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            onClick={copyGithub}
            className="surface-card inline-flex items-center gap-2 rounded-xl border border-hairline px-5 py-3 font-mono text-xs font-medium text-main"
          >
            {copied ? "Copied to clipboard!" : "Copy GitHub URL"}
          </button>
        </div>
      </div>
    </section>
  );
}
