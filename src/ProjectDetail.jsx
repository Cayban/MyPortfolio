import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import RealmKeeperDetail from "./RealmKeeperDetail";
import { SEED_PROJECTS } from "./content";
import { Page, Tag, Arrow } from "./shared";

export default function ProjectDetail({ theme }) {
  const { slug } = useParams();
  const items = SEED_PROJECTS;
  const loading = false;
  const p = items.find((x) => x.slug === slug);
  const [shot, setShot] = useState(0);
  useEffect(() => { window.scrollTo(0, 0); setShot(0); }, [slug]);

  if (slug === "realm-keeper") return <RealmKeeperDetail theme={theme} />;

  if (!p) return (
    <Page theme={theme}><div className="max-w-3xl mx-auto px-6 py-24">
      <p className="mono text-sm" style={{ color: "var(--text-secondary)" }}>{loading ? "Loading…" : "Project not found."}</p>
      {!loading && <Link to="/#projects" className="mono text-xs uppercase tracking-widest" style={{ color: "#D71921" }}>All projects</Link>}
    </div></Page>
  );
  const btn = { background: "var(--text)", color: "var(--bg)", borderRadius: 6, padding: "10px 18px" };
  return (
    <Page theme={theme}>
      <article className="max-w-4xl mx-auto px-6 pt-10 pb-24">
        <h1 className="text-5xl md:text-6xl mb-5" style={{ color: "var(--text)" }}>{p.title}</h1>
        <p className="text-base leading-relaxed max-w-2xl mb-8" style={{ color: "var(--text-secondary)" }}>{p.desc}</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 py-5 mb-10" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          {p.role && <div><p className="mono text-xs uppercase tracking-widest mb-1.5" style={{ color: "var(--text-muted)" }}>Role</p><p className="text-sm">{p.role}</p></div>}
          <div><p className="mono text-xs uppercase tracking-widest mb-1.5" style={{ color: "var(--text-muted)" }}>Stack</p><div className="flex flex-wrap gap-2">{(p.stack || []).map((s) => <Tag key={s}>{s}</Tag>)}</div></div>
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="mono text-xs uppercase tracking-widest flex items-center gap-2 ml-auto transition-transform active:scale-[0.98]" style={btn}>{p.liveLabel || "Visit site"} <Arrow /></a>}
        </div>
        {p.images?.length > 0 && (
          <div className="mb-14">
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "var(--surface-solid)" }}>
              <img src={p.images[shot]} alt={`${p.title} screenshot ${shot + 1}`} className="w-full" style={{ display: "block", maxHeight: 520, objectFit: "cover", objectPosition: "top" }} />
            </div>
            {p.images.length > 1 && <div className="flex gap-3 mt-3">{p.images.map((src, i) => (
              <button key={src} onClick={() => setShot(i)} aria-label={`Screenshot ${i + 1}`} style={{ width: 96, height: 60, borderRadius: 8, overflow: "hidden", border: `1px solid ${i === shot ? "#D71921" : "var(--border)"}`, opacity: i === shot ? 1 : 0.6 }}>
                <img src={src} alt="" className="w-full h-full object-cover object-top" /></button>))}</div>}
          </div>
        )}
        {p.did?.length > 0 && (
          <section>
            <h2 className="text-3xl mb-6">What I did</h2>
            <ul>{p.did.map((d, i) => (
              <li key={i} className="flex gap-5 py-4 text-sm leading-relaxed" style={{ borderBottom: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                <span className="mono text-xs pt-0.5" style={{ color: "#D71921" }}>{String(i + 1).padStart(2, "0")}</span><span>{d}</span></li>))}</ul>
          </section>
        )}
      </article>
    </Page>
  );
}
