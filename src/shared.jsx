import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const FONTS = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;500;700&family=DotGothic16&display=swap";

export function ThemeStyle() {
  return (
    <style>{`
      @import url('${FONTS}');
      :root{--bg:#0A0A0A;--bg-elevated:#ffffff08;--surface-solid:#161616;--text:#F5F5F0;--text-secondary:rgba(245,245,240,0.62);--text-muted:#8A8A85;--border:rgba(255,255,255,0.08);--border-strong:rgba(255,255,255,0.18)}
      [data-theme="light"]{--bg:#F2F1EC;--bg-elevated:#00000006;--surface-solid:#FAFAF7;--text:#111111;--text-secondary:rgba(17,17,17,0.64);--text-muted:#6B6B66;--border:rgba(10,10,10,0.1);--border-strong:rgba(10,10,10,0.22)}
      .mono{font-family:'Space Mono',monospace}
      h1,section h2{font-family:'DotGothic16','Space Grotesk',sans-serif;font-weight:400!important;letter-spacing:-0.01em;line-height:1.1}
      @media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
    `}</style>
  );
}

// Gentle fade-in on scroll (IntersectionObserver, transform + opacity only)
export function Reveal({ children, index = 0, className = "" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), o.disconnect()), { threshold: 0.1 });
    ref.current && o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(12px)", transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${index * 80}ms` }}>
      {children}
    </div>
  );
}

export const Arrow = ({ dir = "right" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export const Tag = ({ children }) => (
  <span className="mono uppercase" style={{ fontSize: 10, letterSpacing: "0.05em", padding: "3px 9px", borderRadius: 9999, border: "1px solid var(--border-strong)", color: "var(--text-secondary)" }}>{children}</span>
);

export function SectionHead({ label, title, accent, text }) {
  return (
    <div className="mb-14">
      <span className="mono text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>{label}</span>
      <h2 className="text-4xl md:text-5xl mt-2" style={{ color: "var(--text)" }}>{title}<span style={{ color: "#D71921" }}>{accent}</span></h2>
      {text && <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{text}</p>}
    </div>
  );
}

export function Page({ theme, children }) {
  return (
    <div data-theme={theme} className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'Space Grotesk', sans-serif" }}>
      <ThemeStyle />
      <header className="px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/#projects" className="mono text-xs tracking-widest uppercase flex items-center gap-2" style={{ color: "var(--text-secondary)" }}><Arrow dir="left" /> Back</Link>
        <span className="mono text-xs tracking-widest uppercase flex items-center gap-2"><span style={{ width: 10, height: 10, border: "2px solid #D71921", borderRadius: "50%" }} />Kim Ivan Ebora</span>
      </header>
      {children}
    </div>
  );
}
