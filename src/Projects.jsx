import "./realm-keeper.css";
import { Link } from "react-router-dom";
import { SEED_PROJECTS } from "./content";
import { Reveal, SectionHead, Tag, Arrow } from "./shared";

function Card({ p, index }) {
  const wide = index === 0;
  return (
    <Reveal index={index} className={wide ? "md:col-span-2" : ""}>
      <Link to={`/projects/${p.slug}`} className={`group flex h-full ${wide ? "md:flex-row" : ""} flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5`}
        style={{ border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg-elevated)" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
        {p.slug === "realm-keeper" ? <div className="rk-card-art md:w-1/2"><img src="/projects/realm-1.png" alt="Realm Keeper timers" loading="lazy" /><img src="/projects/realm-2.png" alt="Realm Keeper profit planner" loading="lazy" /></div> : p.images?.[0] && <div className={wide ? "md:w-1/2" : ""} style={{ aspectRatio: wide ? undefined : "16/9", minHeight: wide ? 260 : undefined, overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
          <img src={p.images[0]} alt={`${p.title} screenshot`} loading="lazy" className="w-full h-full object-cover object-top" /></div>}
        <div className="flex flex-col flex-1" style={{ padding: 28 }}>
          <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>{p.title}</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.desc}</p>
          <div className="flex flex-wrap gap-2 mt-auto mb-5">{(p.stack || []).map((s) => <Tag key={s}>{s}</Tag>)}</div>
          <span className="mono text-xs tracking-widest uppercase flex items-center gap-2" style={{ color: "#D71921" }}>View details <Arrow /></span>
        </div>
      </Link>
    </Reveal>
  );
}

export function ProjectsSection() {
  const items = SEED_PROJECTS;
  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead label="04 — Projects" title="Things I've " accent="Built" text="Projects built for businesses, offices, clinics, and players. Open one to see what I did on it." />
        <div className="grid md:grid-cols-2 gap-5">{items.map((p, i) => <Card key={p.id} p={p} index={i} />)}</div>
      </div>
    </section>
  );
}
