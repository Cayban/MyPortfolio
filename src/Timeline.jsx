import { SEED_EXPERIENCE, SEED_CERTS } from "./content";
import { SectionHead } from "./shared";

const Dot = ({ c }) => <span className="absolute -left-9 top-1.5 w-3.5 h-3.5 rounded-full" style={{ background: c, border: "3px solid var(--bg)" }} />;

export function ExperienceSection() {
  const exp = SEED_EXPERIENCE;
  const certs = SEED_CERTS;
  return (
    <section id="experience" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead label="03 — Experience & Certification" title="Where I've " accent="Worked" text={exp[0]?.summary} />
        <div className="max-w-3xl relative pl-9">
          <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "var(--border)" }} />
          {exp.map((e) => (
            <div key={e.id} className="relative pb-14"><Dot c="#D71921" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
                <h3 className="text-lg font-semibold">{e.role}</h3>
                <span className="mono text-xs sm:text-right" style={{ color: "#D71921" }}>{e.duration}{e.period && <span className="block mt-0.5" style={{ color: "var(--text-muted)" }}>{e.period}</span>}</span>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>{e.org}</p>
              <ul className="space-y-2.5">{(e.highlights || []).map((h) => (
                <li key={h.title} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}><span style={{ color: "var(--text)", fontWeight: 500 }}>{h.title}.</span> {h.desc}</li>))}</ul>
            </div>
          ))}
          {certs.map((c) => (
            <div key={c.id} className="relative pb-8"><Dot c="#346538" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
                <h3 className="text-lg font-semibold">{c.url ? <a href={c.url} target="_blank" rel="noreferrer" className="hover:underline">{c.title}</a> : c.title}</h3>
                <span className="mono text-xs sm:text-right" style={{ color: "#346538" }}>{c.status}{c.date && <span className="block mt-0.5" style={{ color: "var(--text-muted)" }}>{c.date}</span>}</span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{c.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
