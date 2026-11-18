import { achievements, certifications, education, publications } from "../data/portfolio.js";

function OutLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-sky-400 transition-colors hover:text-sky-300"
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Academics() {
  return (
    <section id="education" className="reveal border-b border-hairline py-16 sm:py-24">
      <div className="mb-10">
        <span className="font-mono text-xs uppercase tracking-wider text-sky-400">04 / Academics</span>
        <h2 className="type-h2 mt-1 text-main">Education & Publications</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {education.map((item) => (
          <article key={item.degree} className="surface-panel rounded-2xl p-6 sm:p-7">
            <span className="font-mono text-xs font-medium text-sky-400">{item.period}</span>
            <h3 className="type-h3 mt-2 text-main">{item.degree}</h3>
            <p className="mt-1 text-sm font-medium text-emerald-400">{item.school}</p>
            {item.note && <p className="mt-4 text-sm leading-relaxed text-sub">{item.note}</p>}
          </article>
        ))}

        <article className="surface-panel rounded-2xl p-6 sm:p-7">
          <span className="font-mono text-xs font-medium text-sky-400">Awards & Achievements</span>
          <ul className="mt-4 space-y-4">
            {achievements.map((item) => (
              <li key={item.title}>
                <h3 className="text-base font-semibold text-main">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-sub">{item.detail}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="surface-panel rounded-2xl p-6 sm:p-7">
          <span className="font-mono text-xs font-medium text-emerald-400">Certifications</span>
          <ul className="mt-4 space-y-4">
            {certifications.map((item) => (
              <li key={item.title} className="flex gap-3">
                {item.logo && (
                  <span className="inline-flex h-8 shrink-0 items-center justify-center rounded-sm bg-white px-1">
                    <img src={item.logo} alt="" className="h-6 w-auto max-w-[6.75rem] object-contain" />
                  </span>
                )}
                <div>
                  <h3 className="text-base font-semibold text-main">{item.title}</h3>
                  <p className="mt-1 text-sm text-sub">{item.issuer}</p>
                  <p className="mt-1 font-mono text-xs text-dim">Issued {item.issued}</p>
                  {item.credentialId && <p className="mt-1 font-mono text-xs text-dim">Credential ID {item.credentialId}</p>}
                  {item.expired && <p className="mt-1 font-mono text-xs text-dim">Expired {item.expired}</p>}
                  {item.href && <div className="mt-2"><OutLink href={item.href}>{item.linkLabel}</OutLink></div>}
                </div>
              </li>
            ))}
          </ul>
        </article>

        {publications.map((item) => (
          <article key={item.title} className="surface-panel flex flex-col justify-between rounded-2xl p-6 sm:p-7">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-medium text-emerald-400">Research Publication</span>
                <span className="tech-pill rounded-md px-2.5 py-0.5">{item.issuer}</span>
              </div>
              <h3 className="type-h3 mt-2 text-main">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-sub">{item.authors}</p>
              {item.venue && <p className="mt-2 text-sm text-sub">{item.venue}</p>}
              <p className="mt-2 font-mono text-xs text-dim">Issued {item.issued}</p>
              {item.credentialId && <p className="mt-1 font-mono text-xs text-dim">Credential ID {item.credentialId}</p>}
            </div>
            {item.href && <div className="mt-4"><OutLink href={item.href}>{item.linkLabel}</OutLink></div>}
          </article>
        ))}
      </div>
    </section>
  );
}
