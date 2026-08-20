import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// Firebase — used for the public reviews feature (Firestore only, no Analytics needed)
const firebaseConfig = {
  apiKey: "AIzaSyCicBy-bdCdORjwfKOos_3FIrsjge7_1hg",
  authDomain: "kimebora-portfolio.firebaseapp.com",
  projectId: "kimebora-portfolio",
  storageBucket: "kimebora-portfolio.firebasestorage.app",
  messagingSenderId: "214655007851",
  appId: "1:214655007851:web:a011414ff70bec8203452e",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// KTTM screenshots
import kttmHome from "./assets/kttmhomeSample3.png";
import kttmLogin from "./assets/kttmloginSample.png";
import kttmLogin2 from "./assets/kttmloginSample2.png";

// Castillo Clinic screenshots
import pedHome from "./assets/pedatricsample.png";
import pedHome2 from "./assets/pediatricSample2.png";
import pedHome3 from "./assets/pediatricSample3.png";
import myImage from "./assets/myimage.jpg";
import ladLoginSample from "./assets/ladloginSample.png";
import ladSample2 from "./assets/ladSample2.png";
import ladSample3 from "./assets/ladSample3.png";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Reviews", "Contact"];

const SKILLS_CAN_DO = [
  {
    name: "Web Development",
    level: 55,
    label: "Comfortable",
    desc: "I can build functional, responsive websites using HTML, CSS, JavaScript, and React. I rely on documentation and research for advanced patterns, but I understand what I'm working with and can adapt code to fit the project.",
  },
  {
    name: "Backend Development",
    level: 45,
    label: "Familiar",
    desc: "I've worked with Laravel and Node.js to build basic server-side logic and REST APIs. I can follow and modify existing backend code, but I lean on guides and examples when building from scratch.",
  },
  {
    name: "Database Management",
    level: 45,
    label: "Familiar",
    desc: "I have hands-on experience handling basic data relationships and writing the queries around them setting up tables, defining relations, and working with PostgreSQL and Firebase. For complex queries or schema design decisions, I look things up, but I'm comfortable enough with the fundamentals to get things working.",
  },
  {
    name: "UI/UX Design",
    level: 52,
    label: "Comfortable",
    desc: "I have a decent eye for layout, spacing, and color, mostly self-taught through building real projects. I use Tailwind CSS and reference design patterns. I'm not a formal designer, but I can produce clean, usable interfaces.",
  },
  {
    name: "System Integration",
    level: 42,
    label: "Familiar",
    desc: "I've connected frontend and backend systems and integrated third-party services like Firebase. I approach integration tasks step by step, researching each connection point to make sure things work together properly.",
  },
  {
    name: "AI-Assisted Dev",
    level: 70,
    label: "Proficient",
    desc: "This is genuinely one of my stronger skills. I know how to use AI tools effectively — writing clear prompts, reviewing and understanding generated code, spotting issues, and adapting outputs to fit what the project actually needs.",
  },
  {
    name: "Research & Problem Solving",
    level: 72,
    label: "Proficient",
    desc: "When I hit something I don't know, I find the answer. I'm good at searching, reading docs, cross-referencing Stack Overflow, and applying solutions to my specific context — rather than just copying blindly.",
  },
  {
    name: "Business Web Dev",
    level: 58,
    label: "Comfortable",
    desc: "I've built and redesigned real websites for actual clients. I understand what small businesses need — clean presentation, contact flows, mobile-readiness — and I can deliver that within a reasonable scope.",
  },
];

const TECH_TAGS = [
  "HTML", "CSS", "JavaScript", "Tailwind CSS",
  "Node.js", "Laravel", "PHP Blade",
  "React.js", "PostgreSQL", "Firebase",
  "MS Word", "Canva", "Technical Documentation",
];

const SOFT_SKILLS = [
  { name: "Communication", level: 70, label: "Proficient", desc: "I can clearly explain technical concepts to both technical and non-technical audiences — whether it's presenting project updates or walking a client through requirements." },
  { name: "Time Management", level: 62, label: "Comfortable", desc: "I break projects into manageable tasks and generally meet deadlines, even while juggling coursework, freelance work, and personal projects at the same time." },
  { name: "Adaptability", level: 65, label: "Comfortable", desc: "I've had to pick up new frameworks and tools quickly across different projects, and I'm comfortable adjusting my approach when requirements change mid-project." },
  { name: "Team Collaboration", level: 60, label: "Comfortable", desc: "I've worked in group projects and with clients, coordinating on shared codebases, giving and receiving feedback, and aligning on project direction." },
  { name: "Client Relations", level: 58, label: "Comfortable", desc: "Through freelance work, I've learned to manage client expectations, explain technical trade-offs in plain terms, and keep communication clear throughout a project." },
  { name: "Attention to Detail", level: 66, label: "Comfortable", desc: "I catch inconsistencies in layouts, broken links, and edge cases before they become bigger issues, especially when testing across devices." },
  { name: "Critical Thinking", level: 68, label: "Proficient", desc: "I approach problems by breaking them down, questioning assumptions, and weighing trade-offs rather than jumping to the first solution I find." },
  { name: "Work Ethic", level: 72, label: "Proficient", desc: "I follow through on commitments and put in the extra effort needed to deliver quality work, even when working under tight timelines." },
];

const EXPERIENCE = {
  role: "OJT Intern",
  org: "KTTM Office — Batangas State University",
  duration: "500 Hours · On-the-Job Training",
  summary: "500 hours immersed in real office operations — handling IP records, building the systems the office actually needed, providing tech support, and picking up my first freelance client along the way.",
  highlights: [
    {
      title: "IP Records & Database System",
      desc: "Assisted in processing and organizing copyright and intellectual property documents, then helped build the office a proper database system to replace their reliance on Google Sheets and Google Drive — later developed further into the KTTM Records System.",
      tags: ["Records Management", "Database Design", "Laravel"],
    },
    {
      title: "IT & Technical Support",
      desc: "Handled day-to-day technical issues around the office — PC formatting, file backups, and troubleshooting software problems — plus produced graphic design work, infographics, and PPT presentations using Canva.",
      tags: ["Troubleshooting", "Backup & Recovery", "Canva"],
    },
    {
      title: "First Freelance Client",
      desc: "Gained my first client during the internship — my supervisor's own business. I rebuilt his existing website using the same tech stack from the KTTM system, improved on the original design, and hosted it live as LAD Enterprises.",
      tags: ["Web Development", "Client Work", "Laravel"],
    },
  ],
};

const PROJECTS = [
  {
    title: "LAD Enterprises",
    desc: "Redesigned and modernized an existing business website for LAD Enterprises — transforming their outdated web presence into a clean, professional, and fully responsive site.",
    stack: ["PHP Blade", "Laravel"],
    lang: "Laravel",
    color: "#D71921",
    github: null,
    live: "https://lad-enterprises.com",
    liveLabel: "lad-enterprises.com",
    images: [ladLoginSample, ladSample2, ladSample3],
  },
  {
    title: "KTTM Records System",
    desc: "An office records management system designed to replace manual paperwork and Google Sheets with a structured, reliable digital solution for handling day-to-day records efficiently.",
    stack: ["PHP Blade", "Laravel"],
    lang: "Laravel",
    color: "#9C9C97",
    github: null,
    live: null,
    liveLabel: null,
    images: [kttmHome, kttmLogin, kttmLogin2],
  },
  {
    title: "Castillo Children Clinic",
    desc: "A full-featured clinic management system for a pediatric clinic, supporting appointment scheduling, patient record management, and real-time data handling via a smart kiosk integration.",
    stack: ["React.js", "Tailwind CSS", "Node.js"],
    lang: "React / Node",
    color: "#D71921",
    github: null,
    live: null,
    liveLabel: null,
    images: [pedHome, pedHome2, pedHome3],
  },
];

function AnimatedCounter({ target, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count}</span>;
}

function SkillBar({ name, level, label, desc, delay }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setAnimated(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const labelColor = {
    "Proficient": "#D71921",
    "Comfortable": "#8A8A85",
    "Familiar": "#D71921",
  }[label] || "#D71921";

  return (
    <div ref={ref} className="group relative">
      <div className="w-full text-left">
        <div className="flex justify-between items-center mb-2">
          <span className="flex items-center gap-2 text-sm font-medium text-white/80 transition-colors">
            {name}
          </span>
          <div className="flex items-center gap-2">
            <span
              className="mono text-xs px-2 py-0.5 rounded-full"
              style={{ background: `${labelColor}18`, color: labelColor, border: `1px solid ${labelColor}35`, fontSize: "10px" }}
            >
              {label}
            </span>
          </div>
        </div>
        <div className="flex gap-[2px]">
          {Array.from({ length: 20 }).map((_, i) => {
            const filled = animated && i < Math.round((level / 100) * 20);
            return (
              <span
                key={i}
                className="rounded-full transition-colors"
                style={{
                  width: "4px",
                  height: "4px",
                  flexShrink: 0,
                  background: filled ? labelColor : "var(--border)",
                  transitionDuration: "0.5s",
                  transitionDelay: `${i * 20}ms`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Reusable carousel for images
function ImageCarousel({ images, color, height = 220 }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;
  const prev = (e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); };
  return (
    <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height, background: "#07070f" }}>
      <img
        src={images[idx]}
        alt={`screenshot ${idx + 1}`}
        className="w-full h-full object-cover object-top transition-all duration-500"
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #0A0A0A 0%, transparent 50%)` }} />
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 opacity-80 hover:opacity-100" style={{ background: "rgba(0,0,0,0.7)", border: `1px solid ${color}50` }}>
            <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 opacity-80 hover:opacity-100" style={{ background: "rgba(0,0,0,0.7)", border: `1px solid ${color}50` }}>
            <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                className="rounded-full transition-all duration-300"
                style={{ width: i === idx ? "20px" : "6px", height: "6px", background: i === idx ? color : "rgba(255,255,255,0.3)", boxShadow: i === idx ? `0 0 8px ${color}` : "none" }}
              />
            ))}
          </div>
        </>
      )}
      <div className="absolute top-3 right-3 mono text-xs px-2 py-0.5 rounded-md" style={{ background: "rgba(0,0,0,0.65)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)" }}>
        {idx + 1} / {images.length}
      </div>
    </div>
  );
}

// Stacked project card carousel — click a background card to bring it forward,
// click the front card again to expand it
function ProjectStack({ projects }) {
  const [order, setOrder] = useState(projects.map((_, i) => i));
  const [expanded, setExpanded] = useState(false);

  const handleClick = (pos) => {
    if (pos === 0) {
      setExpanded((e) => !e);
    } else {
      setOrder((prev) => {
        const next = [...prev];
        const [id] = next.splice(pos, 1);
        next.unshift(id);
        return next;
      });
      setExpanded(false);
    }
  };

  return (
    <div className="relative mx-auto" style={{ width: "100%", maxWidth: 440, height: expanded ? 360 : 300 }}>
      {order.map((idx, pos) => {
        const p = projects[idx];
        const isFront = pos === 0;
        const tx = pos === 0 ? 0 : pos === 1 ? 28 : -28;
        const ty = pos === 0 ? 0 : pos === 1 ? 16 : 26;
        const rot = pos === 0 ? 0 : pos === 1 ? 5 : -5;
        const scale = isFront ? (expanded ? 1.02 : 1) : pos === 1 ? 0.93 : 0.87;
        const op = isFront ? 1 : pos === 1 ? 0.75 : 0.55;
        const z = 10 - pos;
        return (
          <div
            key={idx}
            onClick={() => handleClick(pos)}
            role="button"
            tabIndex={0}
            aria-label={isFront ? `${p.title}, expand for details` : `${p.title}, bring to front`}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(pos); }}
            className="absolute top-0 left-0 w-full rounded-2xl cursor-pointer"
            style={{
              height: isFront ? (expanded ? 340 : 260) : 190,
              transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`,
              zIndex: z,
              opacity: op,
              transition: "transform 0.45s cubic-bezier(0.34,1.2,0.4,1), opacity 0.35s ease, height 0.3s ease",
              background: "var(--surface-solid)",
              border: "1px solid var(--border)",
              padding: isFront ? "1.5rem" : "1.1rem",
              boxSizing: "border-box",
              overflow: "hidden",
              outline: "none",
            }}
          >
            {isFront ? (
              <>
                <p className="text-lg font-bold text-white mb-1.5">{p.title}</p>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{
                    color: "var(--text-secondary)",
                    display: expanded ? "block" : "-webkit-box",
                    WebkitLineClamp: expanded ? "unset" : 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.desc}
                </p>
                {expanded ? (
                  <>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.stack.map((s) => (
                        <span key={s} className="mono text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mono text-xs"
                        style={{ color: p.color }}
                      >
                        {p.liveLabel} ↗
                      </a>
                    )}
                  </>
                ) : (
                  <p className="mono text-xs" style={{ color: "var(--text-muted)" }}>tap to expand</p>
                )}
              </>
            ) : (
              <>
                <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{p.title}</p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Featured (large) project card — used for LAD Enterprises
function FeaturedCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-3xl border overflow-hidden transition-all duration-500 flex flex-col md:flex-row"
      style={{
        borderColor: hovered ? project.color + "55" : "var(--border)",
        background: hovered ? `linear-gradient(135deg, ${project.color}0d, var(--bg-elevated))` : "var(--bg-elevated)",
        boxShadow: hovered ? `0 30px 80px ${project.color}18` : "none",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left — carousel or decorative placeholder */}
      <div className="md:w-1/2 relative overflow-hidden flex-shrink-0" style={{ minHeight: "280px", background: "#07070f" }}>
        {project.images && project.images.length > 0 ? (
          <>
            {/* Fixed height so ImageCarousel gets a number, not "100%" */}
            <div className="absolute inset-0">
              <ImageCarousel images={project.images} color={project.color} height={280} />
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top, #0A0A0A 0%, transparent 40%)` }} />
            {project.live && (
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ background: "rgba(10,10,10,0.55)", opacity: hovered ? 1 : 0, pointerEvents: "none" }}
              >
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${project.color}, #8A8A85)`, color: "#000", pointerEvents: "auto" }}
                >
                  Visit Site
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            )}
          </>
        ) : project.screenshot ? (
          <>
            <img
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover object-top"
              style={{ display: "block", minHeight: "280px" }}
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top, #0A0A0A 0%, transparent 40%)` }} />
            {project.live && (
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ background: "rgba(10,10,10,0.55)", opacity: hovered ? 1 : 0, pointerEvents: "none" }}
              >
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${project.color}, #8A8A85)`, color: "#000", pointerEvents: "auto" }}
                >
                  Visit Site
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}18 0%, #0A0A0A 70%)` }} />
            <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.015) 30px, rgba(255,255,255,0.015) 31px)" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="px-4 py-2 rounded-xl mono text-xs" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
                Live Website
              </div>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${project.color}, #8A8A85)`, color: "#000" }}>
                  Visit Site
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              )}
            </div>
          </>
        )}
      </div>

      {/* Right — content */}
      <div className="flex-1 p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="mono text-xs px-2.5 py-1 rounded-full" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
              Featured Project
            </span>
            <span className="mono text-xs text-white/25">{project.lang}</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white mb-3">{project.title}</h3>
          <p className="text-white/55 leading-relaxed text-sm mb-6">{project.desc}</p>
          {project.live && (
            <p className="mono text-xs mb-6" style={{ color: project.color }}>
              <a href={project.live} target="_blank" rel="noreferrer" className="hover:underline">{project.liveLabel}</a>
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.map((s) => (
            <span key={s} className="mono text-xs px-3 py-1.5 rounded-lg" style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}28` }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Smaller project card — for KTTM and Castillo
function SmallCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all duration-500 flex flex-col"
      style={{
        borderColor: hovered ? project.color + "55" : "var(--border)",
        background: hovered ? `linear-gradient(160deg, ${project.color}0d, var(--bg-elevated))` : "var(--bg-elevated)",
        boxShadow: hovered ? `0 24px 60px ${project.color}18` : "none",
        transform: hovered ? "translateY(-5px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ImageCarousel images={project.images} color={project.color} height={200} />

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="mono text-xs text-white/25">{project.lang}</span>
          <div className="ml-auto w-2 h-2 rounded-full flex-shrink-0" style={{ background: project.color, boxShadow: `0 0 8px ${project.color}` }} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-5 flex-1">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
          {project.stack.map((s) => (
            <span key={s} className="mono text-xs px-2.5 py-1 rounded-lg" style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}28` }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SERVICES DATA ──
const WEBSITE_TYPES = [
  {
    id: "restaurant",
    label: "Restaurant / Café",
    icon: "🍽️",
    desc: "Menus, reservations, gallery & location — perfect for food businesses.",
    color: "#ff6b35",
    deliveryDays: "7–12",
  },
  {
    id: "realestate",
    label: "Real Estate / Construction",
    icon: "🏗️",
    desc: "Property listings, project showcases, lead forms & credibility sections.",
    color: "#3b82f6",
    deliveryDays: "10–16",
  },
  {
    id: "gym",
    label: "Gym / Fitness Studio",
    icon: "💪",
    desc: "Class schedules, membership plans, trainer profiles & booking.",
    color: "#D71921",
    deliveryDays: "7–12",
  },
  {
    id: "ecommerce",
    label: "E-Commerce / Online Store",
    icon: "🛒",
    desc: "Product grids, cart, filters, and checkout — sell anything online.",
    color: "#D71921",
    deliveryDays: "14–21",
  },
  {
    id: "events",
    label: "Events / Wedding Planner",
    icon: "🎉",
    desc: "Portfolio of past events, packages, gallery & inquiry form.",
    color: "#a855f7",
    deliveryDays: "7–12",
  },
];

// ── ADD-ON FEATURES per type (optional extras the client can toggle) ──
const ADDONS_BY_TYPE = {
  restaurant: [
    { id: "reservation", label: "Reservation Form", icon: "📅", desc: "Online table booking with date/time picker" },
    { id: "reviews", label: "Customer Reviews", icon: "⭐", desc: "Testimonial or Google Reviews section" },
    { id: "delivery", label: "Delivery/Takeout CTA", icon: "🛵", desc: "Link to GrabFood / order page" },
    { id: "promo", label: "Promos & Events", icon: "🎟️", desc: "Highlight ongoing deals or special events" },
    { id: "social", label: "Social Media Feed", icon: "📱", desc: "Embedded Instagram or Facebook feed" },
    { id: "blog", label: "Blog / News", icon: "📰", desc: "Share updates, recipes, or announcements" },
  ],
  realestate: [
    { id: "filter", label: "Search & Filter", icon: "🔍", desc: "Filter by price, type, location, size" },
    { id: "map", label: "Property Map View", icon: "🗺️", desc: "Interactive map with property pins" },
    { id: "team", label: "Agent / Team Profiles", icon: "👔", desc: "Show agent bios and contact info" },
    { id: "testimonials", label: "Client Testimonials", icon: "💬", desc: "Trust-building reviews from past clients" },
    { id: "blog", label: "News / Market Updates", icon: "📰", desc: "Blog for real estate tips and news" },
    { id: "chat", label: "Live Chat Widget", icon: "💬", desc: "Real-time chat for instant lead response" },
  ],
  gym: [
    { id: "booking", label: "Class Booking", icon: "✅", desc: "Online slot reservation for classes" },
    { id: "results", label: "Transformation Stories", icon: "🔥", desc: "Before & after testimonials section" },
    { id: "trial", label: "Free Trial CTA", icon: "🎁", desc: "Prominent sign-up for a free trial" },
    { id: "shop", label: "Merch / Supplement Shop", icon: "🛒", desc: "Simple product section for gym products" },
    { id: "blog", label: "Fitness Blog", icon: "📰", desc: "Workout tips, nutrition advice, updates" },
    { id: "chat", label: "Live Chat Widget", icon: "💬", desc: "Answer membership inquiries in real-time" },
  ],
  ecommerce: [
    { id: "wishlist", label: "Wishlist / Favorites", icon: "❤️", desc: "Let shoppers save items for later" },
    { id: "checkout", label: "Full Checkout Flow", icon: "💳", desc: "Multi-step checkout with order summary" },
    { id: "promo", label: "Promo / Sale Banners", icon: "🏷️", desc: "Flash sale countdowns and discount badges" },
    { id: "reviews", label: "Product Reviews", icon: "⭐", desc: "Customer ratings and written reviews" },
    { id: "chat", label: "Live Chat Widget", icon: "💬", desc: "Answer product questions in real-time" },
    { id: "blog", label: "Blog / Lookbook", icon: "📰", desc: "Style guides, stories, and content marketing" },
  ],
  events: [
    { id: "timeline", label: "Event Timeline", icon: "📅", desc: "Sample wedding/event day timeline" },
    { id: "vendors", label: "Vendor Partners", icon: "🤝", desc: "Preferred florists, caterers, photographers" },
    { id: "testimonials", label: "Couple Testimonials", icon: "💬", desc: "Reviews & real love stories" },
    { id: "faq", label: "FAQ Section", icon: "❓", desc: "Common questions about bookings & services" },
    { id: "blog", label: "Blog / Inspiration", icon: "📰", desc: "Wedding tips, event ideas, and stories" },
    { id: "chat", label: "Live Chat Widget", icon: "💬", desc: "Answer booking inquiries instantly" },
  ],
};

// ── TEMPLATES per type ────────────────────────
const TEMPLATES = {
  restaurant: [
    {
      id: "rest-1",
      name: "Ember",
      badge: "🏆 Most Popular",
      tagline: "Dark & moody fine dining",
      desc: "Full-screen hero with food photography, animated menu reveal, reservation section, and Instagram feed embed.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "📋", label: "Digital Menu" },
        { icon: "📸", label: "Food Gallery" },
        { icon: "📍", label: "Location & Hours" },
        { icon: "📞", label: "Contact / CTA" },
      ],
      price: 4500,
      accent: "#ff6b35",
      bg: "linear-gradient(135deg, #1a0a00, #0d0d0d)",
      preview: { palette: ["#ff6b35", "#ff9a5c", "#1a0a00"], style: "Dark · Warm amber tones · Full-screen sections", mockSections: ["🍴 Hero", "📋 Menu", "📅 Reserve", "📍 Find Us"] },
    },
    {
      id: "rest-2",
      name: "Bloom",
      badge: "✨ Premium",
      tagline: "Fresh & airy café vibe",
      desc: "Light editorial feel with handwritten-style accents, animated section reveals, loyalty/promo section, and reviews carousel.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "📋", label: "Digital Menu" },
        { icon: "📸", label: "Food Gallery" },
        { icon: "📍", label: "Location & Hours" },
        { icon: "📞", label: "Contact / CTA" },
        { icon: "👤", label: "About / Our Story" },
      ],
      price: 6500,
      accent: "#ff6b35",
      bg: "linear-gradient(135deg, #fff8f0, #ffe8d6)",
      preview: { palette: ["#ff6b35", "#fff3e8", "#3d1a00"], style: "Light · Editorial · Soft gradients", mockSections: ["☕ Welcome", "🍰 Menu", "🎟️ Promos", "⭐ Reviews"] },
    },
    {
      id: "rest-3",
      name: "Spot",
      badge: "🚀 Starter",
      tagline: "Clean one-pager",
      desc: "Hero, quick menu highlights, location map, and contact link. Lean and fast to deliver.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "📋", label: "Menu Highlights" },
        { icon: "📍", label: "Location & Hours" },
        { icon: "📞", label: "Contact / CTA" },
      ],
      price: 2500,
      accent: "#ff6b35",
      bg: "linear-gradient(135deg, #0d0800, #1a1000)",
      preview: { palette: ["#ff6b35", "#ff9a5c", "#111"], style: "Minimal · Fast delivery · Mobile-first", mockSections: ["🍽️ Hero", "📋 Menu", "📍 Location"] },
    },
  ],
  realestate: [
    {
      id: "re-1",
      name: "Apex",
      badge: "🏆 Most Popular",
      tagline: "Premium property listings",
      desc: "Luxury dark layout with property grid, advanced search/filter, agent profiles, and a lead capture form.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "🏘️", label: "Property Listings" },
        { icon: "🏗️", label: "Project Showcase" },
        { icon: "📝", label: "Lead Inquiry Form" },
        { icon: "📞", label: "Contact / CTA" },
      ],
      price: 6000,
      accent: "#3b82f6",
      bg: "linear-gradient(135deg, #00050f, #060b18)",
      preview: { palette: ["#3b82f6", "#93c5fd", "#020810"], style: "Dark luxury · Grid listings · Refined", mockSections: ["🏙️ Hero", "🔍 Search", "🏘️ Listings", "👔 Agents"] },
    },
    {
      id: "re-2",
      name: "Terrain",
      badge: "✨ Premium",
      tagline: "Construction & development",
      desc: "Bold industrial aesthetic — project showcase with before/after, map view, team section, and market update blog.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "🏘️", label: "Property Listings" },
        { icon: "🏗️", label: "Project Showcase" },
        { icon: "📝", label: "Lead Inquiry Form" },
        { icon: "📞", label: "Contact / CTA" },
        { icon: "👤", label: "About / Company Profile" },
      ],
      price: 8000,
      accent: "#3b82f6",
      bg: "linear-gradient(135deg, #050a14, #0a1628)",
      preview: { palette: ["#3b82f6", "#f59e0b", "#050a14"], style: "Industrial · Bold type · Full-featured", mockSections: ["🏗️ Projects", "🗺️ Map", "👥 Team", "📰 Blog"] },
    },
    {
      id: "re-3",
      name: "Scout",
      badge: "🚀 Starter",
      tagline: "Simple & fast",
      desc: "Hero, a few property cards, inquiry form, and contact info. Quick to launch for small agencies.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "🏘️", label: "Property Listings (6 cards)" },
        { icon: "📝", label: "Lead Inquiry Form" },
        { icon: "📞", label: "Contact / CTA" },
      ],
      price: 3000,
      accent: "#3b82f6",
      bg: "linear-gradient(135deg, #030510, #050a14)",
      preview: { palette: ["#3b82f6", "#60a5fa", "#030510"], style: "Clean · Starter · Fast delivery", mockSections: ["🏠 Hero", "🏘️ Listings", "📝 Inquiry"] },
    },
  ],
  gym: [
    {
      id: "gym-1",
      name: "Forge",
      badge: "🏆 Most Popular",
      tagline: "High-energy dark powerhouse",
      desc: "Full-screen hero video-style section, membership tiers, class schedule grid, trainer cards, and transformation gallery.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "💳", label: "Membership Plans" },
        { icon: "📆", label: "Class Schedule" },
        { icon: "🏋️", label: "Trainer Profiles" },
        { icon: "📞", label: "Contact / CTA" },
      ],
      price: 5000,
      accent: "#D71921",
      bg: "linear-gradient(135deg, #0d0005, #1a0010)",
      preview: { palette: ["#D71921", "#ff6b9d", "#0d0005"], style: "Dark · High energy · Bold type", mockSections: ["💪 Hero", "💳 Plans", "📆 Schedule", "🏋️ Trainers"] },
    },
    {
      id: "gym-2",
      name: "Kinetic",
      badge: "✨ Premium",
      tagline: "Modern boutique studio",
      desc: "Editorial layout for yoga/pilates/boxing studios. Animated counters, testimonials, class booking, merch section.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "💳", label: "Membership Plans" },
        { icon: "📆", label: "Class Schedule" },
        { icon: "🏋️", label: "Trainer Profiles" },
        { icon: "📸", label: "Gym Gallery" },
        { icon: "📞", label: "Contact / CTA" },
      ],
      price: 7500,
      accent: "#D71921",
      bg: "linear-gradient(135deg, #05000a, #100018)",
      preview: { palette: ["#D71921", "#a855f7", "#05000a"], style: "Boutique · Editorial · Full-featured", mockSections: ["🧘 Hero", "✅ Booking", "👥 Trainers", "🛒 Merch"] },
    },
    {
      id: "gym-3",
      name: "Pump",
      badge: "🚀 Starter",
      tagline: "No-frills starter site",
      desc: "Hero, quick membership cards, schedule table, and a free trial CTA. Perfect for a gym just getting online.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "💳", label: "Membership Plans" },
        { icon: "📆", label: "Class Schedule" },
        { icon: "📞", label: "Contact / CTA" },
      ],
      price: 2800,
      accent: "#D71921",
      bg: "linear-gradient(135deg, #0d0005, #0d0005)",
      preview: { palette: ["#D71921", "#ff6b9d", "#111"], style: "Minimal · Fast delivery · Mobile-first", mockSections: ["💪 Hero", "💳 Plans", "📆 Schedule"] },
    },
  ],
  ecommerce: [
    {
      id: "ec-1",
      name: "Vault",
      badge: "🏆 Most Popular",
      tagline: "Clean dark storefront",
      desc: "Filterable product grid, product detail modals, add-to-cart, promo banners, and reviews section.",
      baseFeatures: [
        { icon: "🏠", label: "Hero / Banner" },
        { icon: "🛍️", label: "Product Grid" },
        { icon: "📄", label: "Product Detail Pages" },
        { icon: "🛒", label: "Shopping Cart" },
        { icon: "📞", label: "Contact / CTA" },
      ],
      price: 8000,
      accent: "#D71921",
      bg: "linear-gradient(135deg, #000d0b, #001a16)",
      preview: { palette: ["#D71921", "#00b89c", "#000d0b"], style: "Dark · Clean grid · Minimal checkout", mockSections: ["🛍️ Hero", "🔍 Filter", "📄 Products", "🛒 Cart"] },
    },
    {
      id: "ec-2",
      name: "Luxe",
      badge: "✨ Premium",
      tagline: "Fashion-forward full store",
      desc: "Editorial fashion layout, wishlist, full checkout flow, sale countdowns, and customer reviews system.",
      baseFeatures: [
        { icon: "🏠", label: "Hero / Banner" },
        { icon: "🛍️", label: "Product Grid" },
        { icon: "🔍", label: "Product Search & Filter" },
        { icon: "📄", label: "Product Detail Pages" },
        { icon: "🛒", label: "Shopping Cart" },
        { icon: "📞", label: "Contact / CTA" },
      ],
      price: 12000,
      accent: "#D71921",
      bg: "linear-gradient(135deg, #000a08, #001812)",
      preview: { palette: ["#D71921", "#fff", "#000a08"], style: "Fashion · Editorial · Full-featured", mockSections: ["✨ Hero", "🛍️ Catalog", "❤️ Wishlist", "💳 Checkout"] },
    },
    {
      id: "ec-3",
      name: "Shelf",
      badge: "🚀 Starter",
      tagline: "Simple product showcase",
      desc: "Clean product grid, basic detail page, and a WhatsApp/email order CTA. No cart needed.",
      baseFeatures: [
        { icon: "🏠", label: "Hero / Banner" },
        { icon: "🛍️", label: "Product Grid" },
        { icon: "📄", label: "Product Detail Pages" },
        { icon: "📲", label: "Order via WhatsApp / Email CTA" },
      ],
      price: 3500,
      accent: "#D71921",
      bg: "linear-gradient(135deg, #000d0b, #001209)",
      preview: { palette: ["#D71921", "#00b89c", "#111"], style: "Minimal · Simple order flow · Starter", mockSections: ["🛍️ Hero", "📦 Products", "📲 Order CTA"] },
    },
  ],
  events: [
    {
      id: "ev-1",
      name: "Velvet",
      badge: "🏆 Most Popular",
      tagline: "Elegant wedding & events",
      desc: "Full-screen hero, masonry portfolio gallery, package pricing cards, testimonial slider, and inquiry form.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "🖼️", label: "Event Portfolio / Gallery" },
        { icon: "💍", label: "Package Pricing" },
        { icon: "📝", label: "Booking Inquiry Form" },
        { icon: "📞", label: "Contact / CTA" },
      ],
      price: 5500,
      accent: "#a855f7",
      bg: "linear-gradient(135deg, #080010, #0f0020)",
      preview: { palette: ["#a855f7", "#e9d5ff", "#080010"], style: "Elegant · Dark romantic · Masonry gallery", mockSections: ["💍 Hero", "🖼️ Gallery", "💎 Packages", "📝 Inquire"] },
    },
    {
      id: "ev-2",
      name: "Gala",
      badge: "✨ Premium",
      tagline: "Full-featured event planner",
      desc: "Vendor partners section, animated event timeline, FAQ accordion, video background hero, and full inquiry flow.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "🖼️", label: "Event Portfolio / Gallery" },
        { icon: "💍", label: "Package Pricing" },
        { icon: "📝", label: "Booking Inquiry Form" },
        { icon: "📞", label: "Contact / CTA" },
        { icon: "👤", label: "About / Our Story" },
      ],
      price: 8500,
      accent: "#a855f7",
      bg: "linear-gradient(135deg, #050010, #0a0020)",
      preview: { palette: ["#a855f7", "#f0abfc", "#050010"], style: "Luxury · Full-featured · Video hero", mockSections: ["🎬 Video Hero", "📅 Timeline", "🤝 Vendors", "❓ FAQ"] },
    },
    {
      id: "ev-3",
      name: "Bloom",
      badge: "🚀 Starter",
      tagline: "Simple & charming one-pager",
      desc: "Hero, a quick gallery, two package options, and an inquiry form. Ideal for small event planners starting out.",
      baseFeatures: [
        { icon: "🏠", label: "Hero Section" },
        { icon: "📸", label: "Mini Photo Gallery" },
        { icon: "💍", label: "Package Pricing (2 tiers)" },
        { icon: "📝", label: "Booking Inquiry Form" },
      ],
      price: 3000,
      accent: "#a855f7",
      bg: "linear-gradient(135deg, #080010, #0f0020)",
      preview: { palette: ["#a855f7", "#c084fc", "#111"], style: "Minimal · Charming · Fast delivery", mockSections: ["💐 Hero", "📸 Gallery", "📝 Inquire"] },
    },
  ],
};

// ─────────────────────────────────────────────
// HTML TEMPLATE PREVIEWS (iframe srcDoc)
// ─────────────────────────────────────────────
const TEMPLATE_HTML = {
  // ── RESTAURANT ──────────────────────────────
  "rest-1": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#0d0500;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:rgba(0,0,0,0.6);border-bottom:1px solid #ff6b3530}
    .logo{color:#ff6b35;font-weight:800;font-size:11px;letter-spacing:1px}
    .nav-links{display:flex;gap:10px}
    .nav-links a{color:rgba(255,255,255,0.4);font-size:8px;text-decoration:none}
    .hero{display:flex;align-items:center;justify-content:space-between;padding:14px 14px 8px;background:linear-gradient(135deg,#ff6b3520,transparent);position:relative}
    .hero::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,0.02) 10px,rgba(255,255,255,0.02) 11px)}
    .hero-text{position:relative;z-index:1}
    .eyebrow{font-size:7px;color:rgba(255,255,255,0.35);letter-spacing:2px;margin-bottom:4px}
    h1{font-size:18px;font-weight:900;line-height:1.05;margin-bottom:8px}
    h1 span{color:#ff6b35}
    .btns{display:flex;gap:6px}
    .btn-p{background:#ff6b35;color:#000;font-size:8px;font-weight:700;padding:4px 10px;border-radius:6px;border:none;cursor:pointer}
    .btn-s{background:#ff6b3520;color:#ff6b35;font-size:8px;padding:4px 10px;border-radius:6px;border:1px solid #ff6b3340;cursor:pointer}
    .hero-emoji{font-size:44px;opacity:.8;position:relative;z-index:1}
    .menu-strip{display:flex;gap:6px;padding:8px 14px;border-top:1px solid #ff6b3520}
    .menu-cat{flex:1;background:#ff6b3515;border:1px solid #ff6b3530;border-radius:6px;padding:5px 4px;text-align:center}
    .menu-cat p{font-size:8px;color:#ff6b35;font-weight:600}
    .menu-cat small{font-size:6px;color:rgba(255,255,255,0.3)}
    .gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:0 14px 8px}
    .g-item{background:#ff6b3512;border:1px solid #ff6b3520;border-radius:5px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px}
  </style></head><body>
    <nav><span class="logo">🔥 EMBER KITCHEN</span><div class="nav-links"><a href="#">Menu</a><a href="#">Reserve</a><a href="#">Gallery</a><a href="#">Find Us</a></div></nav>
    <div class="hero">
      <div class="hero-text">
        <p class="eyebrow">FINE DINING · EST. 2019 · MANILA</p>
        <h1>Where Every<br>Meal is<br><span>Pure Art</span></h1>
        <div class="btns"><button class="btn-p">Book a Table</button><button class="btn-s">View Menu</button></div>
      </div>
      <div class="hero-emoji">🔥</div>
    </div>
    <div class="menu-strip">
      <div class="menu-cat"><p>🥗 Starters</p><small>12 items</small></div>
      <div class="menu-cat"><p>🥩 Mains</p><small>18 items</small></div>
      <div class="menu-cat"><p>🍷 Wine</p><small>24 wines</small></div>
      <div class="menu-cat"><p>🍮 Desserts</p><small>9 items</small></div>
    </div>
    <div class="gallery"><div class="g-item">🍝</div><div class="g-item">🥩</div><div class="g-item">🦞</div><div class="g-item">🍰</div></div>
  </body></html>`,

  "rest-2": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Georgia',serif}
    body{background:#fffaf5;color:#1a0a00;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:#fff;border-bottom:1px solid #ff6b3520;box-shadow:0 1px 8px #ff6b3510}
    .logo{color:#ff6b35;font-weight:800;font-size:12px;font-style:italic}
    .nav-links{display:flex;gap:12px}
    .nav-links a{color:rgba(80,30,0,0.45);font-size:8px;text-decoration:none;font-family:'Segoe UI',sans-serif}
    .hero{padding:16px 14px 8px;background:linear-gradient(135deg,#fff3e8,#fffaf5)}
    .eyebrow{font-size:7px;color:#ff6b35;letter-spacing:3px;font-family:'Segoe UI',sans-serif;margin-bottom:5px}
    h1{font-size:22px;font-weight:900;line-height:1;color:#1a0a00;margin-bottom:3px}
    .sub{font-size:9px;color:rgba(80,30,0,0.45);margin-bottom:10px;font-family:'Segoe UI',sans-serif}
    .btns{display:flex;gap:6px}
    .btn-p{background:#ff6b35;color:#fff;font-size:8px;font-weight:700;padding:5px 12px;border-radius:20px;border:none;cursor:pointer;font-family:'Segoe UI',sans-serif}
    .btn-s{background:transparent;color:#ff6b35;font-size:8px;padding:5px 12px;border-radius:20px;border:1.5px solid #ff6b35;cursor:pointer;font-family:'Segoe UI',sans-serif}
    .promo{margin:8px 14px;background:linear-gradient(135deg,#ff6b35,#ff9a5c);border-radius:8px;padding:7px 10px;display:flex;align-items:center;justify-content:space-between}
    .promo p{font-size:8px;color:#fff;font-weight:700;font-family:'Segoe UI',sans-serif}
    .promo small{font-size:7px;color:rgba(255,255,255,0.7);font-family:'Segoe UI',sans-serif}
    .reviews{display:flex;gap:6px;padding:0 14px}
    .rev{flex:1;background:#fff;border:1px solid #ff6b3520;border-radius:7px;padding:5px 7px}
    .stars{color:#ff6b35;font-size:8px}
    .rev p{font-size:7px;color:rgba(80,30,0,0.55);margin-top:2px;font-family:'Segoe UI',sans-serif}
    .rev small{font-size:6px;color:rgba(80,30,0,0.3);font-family:'Segoe UI',sans-serif}
  </style></head><body>
    <nav><span class="logo">☕ The Bloom Café</span><div class="nav-links"><a href="#">Menu</a><a href="#">Order</a><a href="#">Events</a><a href="#">Find Us</a></div></nav>
    <div class="hero">
      <p class="eyebrow">CAFÉ · BAKERY · BRUNCH</p>
      <h1>Fresh Plates,<br>Bold Flavors</h1>
      <p class="sub">Where every cup tells a story — crafted with love since 2020.</p>
      <div class="btns"><button class="btn-p">Order Online</button><button class="btn-s">Our Menu</button></div>
    </div>
    <div class="promo"><div><p>🎟️ Weekend Brunch Special</p><small>Free coffee with any meal · Sat & Sun 8am–12pm</small></div><span style="font-size:18px">☀️</span></div>
    <div class="reviews">
      <div class="rev"><div class="stars">★★★★★</div><p>"Best latte in the city!"</p><small>— Maria S.</small></div>
      <div class="rev"><div class="stars">★★★★★</div><p>"Cozy vibes, amazing food."</p><small>— James R.</small></div>
      <div class="rev"><div class="stars">★★★★☆</div><p>"Love the pastries here."</p><small>— Ana L.</small></div>
    </div>
  </body></html>`,

  "rest-3": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#0a0600;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #ff6b3525}
    .logo{color:#ff6b35;font-weight:800;font-size:11px}
    .tagline{font-size:7px;color:rgba(255,255,255,0.3)}
    .hero{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px 14px;align-items:center}
    .hero-left h1{font-size:20px;font-weight:900;line-height:1.05;margin-bottom:6px}
    .hero-left h1 em{color:#ff6b35;font-style:normal}
    .hero-left p{font-size:8px;color:rgba(255,255,255,0.4);margin-bottom:10px;line-height:1.5}
    .btn-p{background:#ff6b35;color:#000;font-size:8px;font-weight:700;padding:5px 12px;border-radius:6px;border:none;cursor:pointer}
    .map-box{background:#ff6b3510;border:1px solid #ff6b3525;border-radius:8px;height:80px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px}
    .map-box p{font-size:8px;color:#ff6b35;font-weight:600}
    .map-box small{font-size:6.5px;color:rgba(255,255,255,0.35);text-align:center}
    .info{display:flex;gap:6px;padding:0 14px 10px}
    .info-card{flex:1;background:#ff6b3508;border:1px solid #ff6b3520;border-radius:7px;padding:6px 8px}
    .info-card p{font-size:8px;color:#ff6b35;font-weight:600;margin-bottom:2px}
    .info-card small{font-size:6.5px;color:rgba(255,255,255,0.35)}
    .highlights{display:flex;gap:6px;padding:0 14px}
    .h-item{flex:1;text-align:center}
    .h-item .num{font-size:14px;font-weight:900;color:#ff6b35}
    .h-item small{font-size:6px;color:rgba(255,255,255,0.3);display:block}
  </style></head><body>
    <nav><span class="logo">🍕 Casa Mia</span><span class="tagline">Italian · Casual · Authentic</span></nav>
    <div class="hero">
      <div class="hero-left">
        <h1>Simple Food,<br><em>Big Taste</em></h1>
        <p>Authentic Italian flavors made with the freshest local ingredients.</p>
        <button class="btn-p">View Menu →</button>
      </div>
      <div class="map-box">
        <span style="font-size:24px">📍</span>
        <p>Makati City</p>
        <small>123 Ayala Ave, BGC<br>Open 10am – 10pm daily</small>
      </div>
    </div>
    <div class="info">
      <div class="info-card"><p>📋 Menu</p><small>Pizza · Pasta · Desserts</small></div>
      <div class="info-card"><p>📅 Hours</p><small>Mon–Sun 10am–10pm</small></div>
      <div class="info-card"><p>📞 Reserve</p><small>+63 912 345 6789</small></div>
    </div>
    <div class="highlights" style="margin-top:8px">
      <div class="h-item"><div class="num">4.9</div><small>Google Rating</small></div>
      <div class="h-item"><div class="num">12+</div><small>Pasta Dishes</small></div>
      <div class="h-item"><div class="num">8+</div><small>Years Open</small></div>
      <div class="h-item"><div class="num">Free</div><small>Delivery ₱500+</small></div>
    </div>
  </body></html>`,

  // ── REAL ESTATE ─────────────────────────────
  "re-1": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#03050f;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:7px 14px;border-bottom:1px solid #3b82f625}
    .logo{color:#3b82f6;font-weight:800;font-size:11px;letter-spacing:.5px}
    .nav-links{display:flex;gap:10px}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none}
    .search-bar{display:flex;align-items:center;gap:6px;margin:8px 14px;padding:6px 10px;background:rgba(255,255,255,0.05);border:1px solid #3b82f630;border-radius:7px}
    .search-bar span{font-size:9px;color:#3b82f6}
    .search-bar input{background:none;border:none;outline:none;color:rgba(255,255,255,0.35);font-size:8px;flex:1}
    .search-bar button{background:#3b82f6;color:#fff;font-size:7px;font-weight:700;padding:3px 8px;border-radius:5px;border:none;cursor:pointer}
    .filters{display:flex;gap:5px;padding:0 14px 6px}
    .filter-tag{background:rgba(59,130,246,0.1);border:1px solid #3b82f625;border-radius:4px;padding:2px 8px;font-size:7px;color:#3b82f6}
    .filter-tag.active{background:#3b82f6;color:#000;font-weight:700}
    .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding:0 14px}
    .card{background:rgba(255,255,255,0.03);border:1px solid #3b82f620;border-radius:8px;overflow:hidden}
    .card-img{height:42px;display:flex;align-items:center;justify-content:center;font-size:22px;background:linear-gradient(135deg,#3b82f625,rgba(255,255,255,0.02))}
    .card-body{padding:5px 6px}
    .price{font-size:9px;font-weight:800;color:#3b82f6;margin-bottom:1px}
    .type{font-size:6.5px;color:rgba(255,255,255,0.35)}
    .badge{font-size:6px;color:#3b82f6;background:#3b82f615;border:1px solid #3b82f625;border-radius:3px;padding:1px 4px;display:inline-block;margin-top:2px}
    .bottom{display:flex;align-items:center;justify-content:space-between;padding:6px 14px 0}
    .bottom p{font-size:7px;color:rgba(255,255,255,0.3)}
    .bottom button{background:linear-gradient(135deg,#3b82f6,#8A8A85);color:#fff;font-size:7px;font-weight:700;padding:3px 9px;border-radius:5px;border:none;cursor:pointer}
  </style></head><body>
    <nav><span class="logo">🏙️ APEX REALTY</span><div class="nav-links"><a href="#">Buy</a><a href="#">Rent</a><a href="#">Sell</a><a href="#">Agents</a></div></nav>
    <div class="search-bar"><span>🔍</span><input placeholder="Search by location, price, type..."><button>Search</button></div>
    <div class="filters">
      <span class="filter-tag active">All</span>
      <span class="filter-tag">House</span>
      <span class="filter-tag">Condo</span>
      <span class="filter-tag">Commercial</span>
      <span class="filter-tag">Land</span>
    </div>
    <div class="grid">
      <div class="card"><div class="card-img">🏡</div><div class="card-body"><div class="price">₱4.2M</div><div class="type">3BR · Quezon City</div><div class="badge">For Sale</div></div></div>
      <div class="card"><div class="card-img">🏢</div><div class="card-body"><div class="price">₱2.1M</div><div class="type">Studio · BGC</div><div class="badge">For Rent</div></div></div>
      <div class="card"><div class="card-img">🏘️</div><div class="card-body"><div class="price">₱7.8M</div><div class="type">4BR · Makati</div><div class="badge">For Sale</div></div></div>
    </div>
    <div class="bottom"><p>Showing 128 properties</p><button>View All →</button></div>
  </body></html>`,

  "re-2": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#050a14;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #3b82f625}
    .logo{color:#f59e0b;font-weight:900;font-size:12px;letter-spacing:1px}
    .nav-links{display:flex;gap:10px}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none}
    .hero{padding:10px 14px 8px;background:linear-gradient(135deg,#3b82f615,transparent)}
    .eyebrow{font-size:7px;color:#f59e0b;letter-spacing:2px;margin-bottom:3px}
    h1{font-size:16px;font-weight:900;line-height:1.1;margin-bottom:6px}
    h1 span{color:#3b82f6}
    .stats{display:flex;gap:12px;margin-bottom:6px}
    .stat .num{font-size:16px;font-weight:900;color:#f59e0b}
    .stat small{font-size:6.5px;color:rgba(255,255,255,0.4);display:block}
    .projects{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding:0 14px}
    .proj{background:rgba(255,255,255,0.04);border:1px solid #3b82f620;border-radius:7px;overflow:hidden}
    .proj-img{height:45px;display:flex;align-items:center;justify-content:center;font-size:24px;background:linear-gradient(135deg,#f59e0b20,rgba(59,130,246,0.1))}
    .proj-body{padding:5px 6px}
    .proj-name{font-size:8px;font-weight:700;color:#fff;margin-bottom:1px}
    .proj-loc{font-size:6.5px;color:rgba(255,255,255,0.4)}
    .proj-status{font-size:6px;color:#f59e0b;margin-top:2px}
    .cta{padding:8px 14px 0;display:flex;gap:6px}
    .cta button{flex:1;font-size:8px;font-weight:700;padding:5px;border-radius:6px;border:none;cursor:pointer}
    .cta .p{background:linear-gradient(135deg,#f59e0b,#3b82f6);color:#000}
    .cta .s{background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.6);border:1px solid rgba(255,255,255,0.1)!important}
  </style></head><body>
    <nav><span class="logo">⚒ TERRAIN BUILD</span><div class="nav-links"><a href="#">Projects</a><a href="#">Services</a><a href="#">Team</a><a href="#">Contact</a></div></nav>
    <div class="hero">
      <p class="eyebrow">CONSTRUCTION & DEVELOPMENT</p>
      <h1>Building <span>Excellence</span><br>Across the Philippines</h1>
      <div class="stats">
        <div class="stat"><div class="num">120+</div><small>Projects Done</small></div>
        <div class="stat"><div class="num">15+</div><small>Years Experience</small></div>
        <div class="stat"><div class="num">₱2B+</div><small>Total Value Built</small></div>
      </div>
    </div>
    <div class="projects">
      <div class="proj"><div class="proj-img">🏗️</div><div class="proj-body"><div class="proj-name">Makati Tower</div><div class="proj-loc">Makati City</div><div class="proj-status">● Ongoing</div></div></div>
      <div class="proj"><div class="proj-img">🏭</div><div class="proj-body"><div class="proj-name">Clark Warehouse</div><div class="proj-loc">Pampanga</div><div class="proj-status">✓ Completed</div></div></div>
      <div class="proj"><div class="proj-img">🏢</div><div class="proj-body"><div class="proj-name">Cebu Office Park</div><div class="proj-loc">Cebu City</div><div class="proj-status">● Ongoing</div></div></div>
    </div>
    <div class="cta"><button class="p">View All Projects</button><button class="s">Get a Quote</button></div>
  </body></html>`,

  "re-3": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#030510;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #3b82f620}
    .logo{color:#3b82f6;font-weight:800;font-size:11px}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:8px;text-decoration:none;margin-left:10px}
    .hero{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 14px 8px;align-items:start}
    h1{font-size:17px;font-weight:900;line-height:1.1;margin-bottom:4px}
    h1 em{color:#3b82f6;font-style:normal}
    .sub{font-size:7.5px;color:rgba(255,255,255,0.4);margin-bottom:8px;line-height:1.5}
    .btn-p{background:#3b82f6;color:#fff;font-size:8px;font-weight:700;padding:5px 12px;border-radius:6px;border:none;cursor:pointer}
    .form-box{background:rgba(59,130,246,0.06);border:1px solid #3b82f625;border-radius:8px;padding:8px}
    .form-box p{font-size:8px;font-weight:700;color:#3b82f6;margin-bottom:5px}
    .inp{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:5px;padding:4px 7px;font-size:7.5px;color:rgba(255,255,255,0.5);display:block;width:100%;margin-bottom:4px}
    .form-btn{background:#3b82f6;color:#fff;font-size:7.5px;font-weight:700;padding:4px;border-radius:5px;border:none;cursor:pointer;width:100%}
    .listings{display:flex;gap:5px;padding:0 14px}
    .card{flex:1;background:rgba(255,255,255,0.03);border:1px solid #3b82f618;border-radius:7px;overflow:hidden}
    .card-img{height:36px;display:flex;align-items:center;justify-content:center;font-size:18px;background:#3b82f615}
    .card-body{padding:4px 6px}
    .price{font-size:8.5px;font-weight:800;color:#3b82f6}
    .type{font-size:6.5px;color:rgba(255,255,255,0.35)}
  </style></head><body>
    <nav><span class="logo">🏠 SCOUT PROPERTIES</span><div><a href="#">Buy</a><a href="#">Rent</a><a href="#">Contact</a></div></nav>
    <div class="hero">
      <div>
        <h1>Find Your<br><em>Dream Home</em></h1>
        <p class="sub">Simple, fast, and trusted property search across the Philippines.</p>
        <button class="btn-p">Browse Listings →</button>
      </div>
      <div class="form-box">
        <p>📝 Quick Inquiry</p>
        <input class="inp" placeholder="Your name">
        <input class="inp" placeholder="Email address">
        <input class="inp" placeholder="Budget range">
        <button class="form-btn">Send Inquiry</button>
      </div>
    </div>
    <div class="listings" style="margin-top:6px">
      <div class="card"><div class="card-img">🏡</div><div class="card-body"><div class="price">₱3.5M</div><div class="type">3BR · Laguna</div></div></div>
      <div class="card"><div class="card-img">🏠</div><div class="card-body"><div class="price">₱1.8M</div><div class="type">2BR · Cavite</div></div></div>
      <div class="card"><div class="card-img">🏘️</div><div class="card-body"><div class="price">₱5.2M</div><div class="type">4BR · Batangas</div></div></div>
    </div>
  </body></html>`,

  // ── GYM ─────────────────────────────────────
  "gym-1": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#090005;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:7px 14px;border-bottom:1px solid #D7192125}
    .logo{color:#D71921;font-weight:900;font-size:12px;letter-spacing:1px}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none;margin-left:10px}
    .hero{display:flex;align-items:center;justify-content:space-between;padding:10px 14px 8px;background:linear-gradient(135deg,#D7192130,transparent);position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(45deg,transparent,transparent 8px,rgba(255,255,255,0.02) 8px,rgba(255,255,255,0.02) 9px)}
    .hero-text{position:relative;z-index:1}
    .eyebrow{font-size:7px;color:#D71921;letter-spacing:3px;margin-bottom:3px}
    h1{font-size:20px;font-weight:900;line-height:1;text-transform:uppercase;margin-bottom:6px}
    .btns{display:flex;gap:6px}
    .btn-p{background:#D71921;color:#000;font-size:8px;font-weight:900;padding:5px 12px;border-radius:6px;border:none;cursor:pointer;text-transform:uppercase;letter-spacing:.5px}
    .btn-s{background:#D7192120;color:#D71921;font-size:8px;padding:5px 12px;border-radius:6px;border:1px solid #D7192140;cursor:pointer}
    .hero-emoji{font-size:52px;opacity:.7;position:relative;z-index:1}
    .plans{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding:7px 14px}
    .plan{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:6px 5px;text-align:center}
    .plan.hot{background:#D7192120;border-color:#D7192150}
    .plan-name{font-size:7.5px;font-weight:700;color:rgba(255,255,255,0.5);margin-bottom:2px}
    .plan.hot .plan-name{color:#D71921}
    .plan-price{font-size:13px;font-weight:900;color:#fff}
    .plan.hot .plan-price{color:#D71921}
    .plan-per{font-size:6px;color:rgba(255,255,255,0.3)}
    .schedule{display:flex;gap:4px;padding:0 14px}
    .day{flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:4px 3px;text-align:center}
    .day-label{font-size:7px;font-weight:700;color:#D71921}
    .day-class{font-size:6.5px;color:rgba(255,255,255,0.4)}
    .day-time{font-size:6px;color:rgba(255,255,255,0.25)}
  </style></head><body>
    <nav><span class="logo">⚡ FORGE GYM</span><div><a href="#">Plans</a><a href="#">Schedule</a><a href="#">Trainers</a><a href="#">Free Trial</a></div></nav>
    <div class="hero">
      <div class="hero-text">
        <p class="eyebrow">TRAIN · FORGE · CONQUER</p>
        <h1>Build the<br>Body You<br><span style="color:#D71921">Deserve</span></h1>
        <div class="btns"><button class="btn-p">Free Trial →</button><button class="btn-s">View Plans</button></div>
      </div>
      <div class="hero-emoji">🏋️</div>
    </div>
    <div class="plans">
      <div class="plan"><div class="plan-name">BASIC</div><div class="plan-price">₱999</div><div class="plan-per">/month</div></div>
      <div class="plan hot"><div class="plan-name">PRO ★</div><div class="plan-price">₱1,799</div><div class="plan-per">/month</div></div>
      <div class="plan"><div class="plan-name">ELITE</div><div class="plan-price">₱2,999</div><div class="plan-per">/month</div></div>
    </div>
    <div class="schedule">
      <div class="day"><div class="day-label">MON</div><div class="day-class">Yoga</div><div class="day-time">7:00 AM</div></div>
      <div class="day"><div class="day-label">TUE</div><div class="day-class">HIIT</div><div class="day-time">6:00 PM</div></div>
      <div class="day"><div class="day-label">WED</div><div class="day-class">Boxing</div><div class="day-time">8:00 AM</div></div>
      <div class="day"><div class="day-label">THU</div><div class="day-class">Pilates</div><div class="day-time">5:00 PM</div></div>
      <div class="day"><div class="day-label">FRI</div><div class="day-class">Zumba</div><div class="day-time">7:00 AM</div></div>
    </div>
  </body></html>`,

  "gym-2": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#05000a;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:7px 14px;border-bottom:1px solid #D7192120}
    .logo{font-weight:900;font-size:11px;letter-spacing:2px;background:linear-gradient(135deg,#D71921,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none;margin-left:10px}
    .hero{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 14px 6px;align-items:center}
    .eyebrow{font-size:7px;color:#a855f7;letter-spacing:2px;margin-bottom:3px}
    h1{font-size:16px;font-weight:900;line-height:1.1;margin-bottom:5px}
    h1 em{color:#D71921;font-style:normal}
    .sub{font-size:7px;color:rgba(255,255,255,0.4);line-height:1.5;margin-bottom:7px}
    .btns{display:flex;gap:5px}
    .btn-p{background:linear-gradient(135deg,#D71921,#a855f7);color:#fff;font-size:7.5px;font-weight:700;padding:4px 10px;border-radius:6px;border:none;cursor:pointer}
    .btn-s{background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5);font-size:7.5px;padding:4px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);cursor:pointer}
    .classes{background:rgba(255,255,255,0.03);border:1px solid #a855f720;border-radius:8px;padding:7px}
    .class-title{font-size:8px;font-weight:700;color:#a855f7;margin-bottom:5px}
    .class-item{display:flex;align-items:center;justify-content:space-between;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.05)}
    .class-item:last-child{border-bottom:none}
    .class-name{font-size:7.5px;color:#fff}
    .class-time{font-size:6.5px;color:rgba(255,255,255,0.35)}
    .class-slots{font-size:6px;color:#D71921;background:#D7192115;border:1px solid #D7192125;border-radius:3px;padding:1px 4px}
    .trainers{display:flex;gap:5px;padding:0 14px}
    .trainer{flex:1;background:rgba(255,255,255,0.03);border:1px solid #a855f720;border-radius:7px;padding:6px;text-align:center}
    .trainer-avatar{font-size:20px;margin-bottom:3px}
    .trainer-name{font-size:7.5px;font-weight:700;color:#fff;margin-bottom:1px}
    .trainer-spec{font-size:6px;color:#a855f7}
  </style></head><body>
    <nav><span class="logo">KINETIC STUDIO</span><div><a href="#">Classes</a><a href="#">Trainers</a><a href="#">Merch</a><a href="#">Book</a></div></nav>
    <div class="hero">
      <div>
        <p class="eyebrow">BOUTIQUE FITNESS STUDIO</p>
        <h1>Move with<br><em>Purpose</em></h1>
        <p class="sub">Premium classes for yoga, pilates, boxing & more. Find your flow.</p>
        <div class="btns"><button class="btn-p">Book a Class</button><button class="btn-s">Our Plans</button></div>
      </div>
      <div class="classes">
        <div class="class-title">📆 Today's Classes</div>
        <div class="class-item"><span class="class-name">🧘 Yoga Flow</span><span class="class-time">7:00 AM</span><span class="class-slots">3 slots</span></div>
        <div class="class-item"><span class="class-name">🥊 Boxing</span><span class="class-time">10:00 AM</span><span class="class-slots">Full</span></div>
        <div class="class-item"><span class="class-name">💃 Zumba</span><span class="class-time">5:00 PM</span><span class="class-slots">8 slots</span></div>
        <div class="class-item"><span class="class-name">🧘 Pilates</span><span class="class-time">7:00 PM</span><span class="class-slots">5 slots</span></div>
      </div>
    </div>
    <div class="trainers">
      <div class="trainer"><div class="trainer-avatar">👩‍🏫</div><div class="trainer-name">Coach Ana</div><div class="trainer-spec">Yoga · Pilates</div></div>
      <div class="trainer"><div class="trainer-avatar">👨‍🏫</div><div class="trainer-name">Coach Rico</div><div class="trainer-spec">Boxing · HIIT</div></div>
      <div class="trainer"><div class="trainer-avatar">👩‍🏫</div><div class="trainer-name">Coach Mia</div><div class="trainer-spec">Zumba · Dance</div></div>
    </div>
  </body></html>`,

  "gym-3": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#0a0008;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #D7192120}
    .logo{color:#D71921;font-weight:900;font-size:12px;text-transform:uppercase;letter-spacing:2px}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:8px;text-decoration:none;margin-left:10px}
    .hero{display:flex;align-items:center;gap:12px;padding:12px 14px 8px;background:linear-gradient(135deg,#D7192120,transparent)}
    .hero-text h1{font-size:22px;font-weight:900;text-transform:uppercase;line-height:1}
    .hero-text h1 em{color:#D71921;font-style:normal;display:block}
    .hero-text p{font-size:7.5px;color:rgba(255,255,255,0.4);margin:4px 0 8px}
    .trial-btn{background:#D71921;color:#000;font-size:9px;font-weight:900;padding:6px 14px;border-radius:7px;border:none;cursor:pointer;text-transform:uppercase;letter-spacing:1px}
    .hero-badge{background:#D7192115;border:1px solid #D7192130;border-radius:10px;padding:8px 10px;text-align:center;min-width:60px}
    .hero-badge .big{font-size:20px;font-weight:900;color:#D71921;line-height:1}
    .hero-badge small{font-size:6px;color:rgba(255,255,255,0.4)}
    .plans{display:flex;gap:6px;padding:0 14px 8px}
    .plan{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:8px 6px;text-align:center}
    .plan.hot{background:#D7192120;border-color:#D71921}
    .plan-name{font-size:7.5px;color:rgba(255,255,255,0.5);margin-bottom:3px;font-weight:700}
    .plan.hot .plan-name{color:#D71921}
    .plan-price{font-size:16px;font-weight:900;color:#fff}
    .plan.hot .plan-price{color:#D71921}
    .plan-price sub{font-size:8px;font-weight:400}
    .plan-perks{margin-top:4px}
    .plan-perks p{font-size:6px;color:rgba(255,255,255,0.35);margin-bottom:1px}
    .cta-strip{background:linear-gradient(135deg,#D7192130,#D7192110);border-top:1px solid #D7192125;padding:8px 14px;display:flex;align-items:center;justify-content:space-between}
    .cta-strip p{font-size:8px;font-weight:700;color:#fff}
    .cta-strip small{font-size:6.5px;color:rgba(255,255,255,0.4)}
    .cta-strip button{background:#D71921;color:#000;font-size:8px;font-weight:700;padding:5px 12px;border-radius:6px;border:none;cursor:pointer}
  </style></head><body>
    <nav><span class="logo">💪 PUMP GYM</span><div><a href="#">Plans</a><a href="#">Schedule</a><a href="#">Contact</a></div></nav>
    <div class="hero">
      <div class="hero-text">
        <h1>Pump<br><em>It Up</em></h1>
        <p>Your neighborhood gym for serious results.</p>
        <button class="trial-btn">Free Trial Day</button>
      </div>
      <div class="hero-badge"><div class="big">3</div><small>Locations</small></div>
      <div class="hero-badge"><div class="big">500+</div><small>Members</small></div>
    </div>
    <div class="plans">
      <div class="plan"><div class="plan-name">BASIC</div><div class="plan-price">₱999<sub>/mo</sub></div><div class="plan-perks"><p>✓ Gym access</p><p>✓ Locker</p></div></div>
      <div class="plan hot"><div class="plan-name">PRO ★</div><div class="plan-price">₱1,799<sub>/mo</sub></div><div class="plan-perks"><p>✓ All classes</p><p>✓ 1 PT session</p></div></div>
      <div class="plan"><div class="plan-name">ELITE</div><div class="plan-price">₱2,999<sub>/mo</sub></div><div class="plan-perks"><p>✓ Unlimited PT</p><p>✓ Nutrition</p></div></div>
    </div>
    <div class="cta-strip"><div><p>🎁 First month FREE for new members!</p><small>No contract · Cancel anytime</small></div><button>Join Now</button></div>
  </body></html>`,

  // ── ECOMMERCE ────────────────────────────────
  "ec-1": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#000d0b;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:7px 14px;border-bottom:1px solid #D7192125}
    .logo{color:#D71921;font-weight:900;font-size:12px;letter-spacing:2px}
    .nav-right{display:flex;align-items:center;gap:8px}
    .nav-right a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none}
    .cart-btn{position:relative;cursor:pointer}
    .cart-btn span{font-size:14px}
    .cart-count{position:absolute;top:-4px;right:-4px;background:#D71921;color:#000;font-size:7px;font-weight:900;width:12px;height:12px;border-radius:50%;display:flex;align-items:center;justify-content:center}
    .banner{padding:7px 14px;background:linear-gradient(135deg,#D7192130,transparent);display:flex;align-items:center;justify-content:space-between}
    .banner h2{font-size:16px;font-weight:900;line-height:1.1}
    .banner h2 em{color:#D71921;font-style:normal}
    .banner-badge{background:#D71921;color:#000;font-size:7px;font-weight:900;padding:3px 8px;border-radius:5px;display:inline-block;margin-bottom:4px}
    .banner-btn{background:#D71921;color:#000;font-size:8px;font-weight:700;padding:5px 12px;border-radius:6px;border:none;cursor:pointer;margin-top:5px;display:block}
    .banner-img{font-size:48px;opacity:.8}
    .filters{display:flex;gap:5px;padding:5px 14px}
    .f-tag{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:2px 8px;font-size:7px;color:rgba(255,255,255,0.4);cursor:pointer}
    .f-tag.active{background:#D7192120;border-color:#D7192140;color:#D71921;font-weight:700}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:5px 14px}
    .card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:7px;overflow:hidden}
    .card-img{height:44px;display:flex;align-items:center;justify-content:center;font-size:24px;background:linear-gradient(135deg,#D7192115,rgba(255,255,255,0.02))}
    .card-body{padding:5px}
    .c-name{font-size:7px;color:rgba(255,255,255,0.55);margin-bottom:1px}
    .c-price{font-size:9px;font-weight:800;color:#D71921}
    .c-old{font-size:6.5px;color:rgba(255,255,255,0.25);text-decoration:line-through}
  </style></head><body>
    <nav>
      <span class="logo">▣ VAULT</span>
      <div class="nav-right">
        <a href="#">Shop</a><a href="#">Sale</a><a href="#">About</a>
        <div class="cart-btn"><span>🛒</span><div class="cart-count">3</div></div>
      </div>
    </nav>
    <div class="banner">
      <div>
        <span class="banner-badge">🏷️ FLASH SALE — 30% OFF</span>
        <h2>Shop the<br><em>Best Deals</em><br>Today</h2>
        <button class="banner-btn">Shop Now →</button>
      </div>
      <div class="banner-img">🛍️</div>
    </div>
    <div class="filters">
      <span class="f-tag active">All</span>
      <span class="f-tag">Clothing</span>
      <span class="f-tag">Shoes</span>
      <span class="f-tag">Bags</span>
      <span class="f-tag">Watches</span>
    </div>
    <div class="grid">
      <div class="card"><div class="card-img">👗</div><div class="card-body"><div class="c-name">Midi Dress</div><div class="c-price">₱840</div><div class="c-old">₱1,200</div></div></div>
      <div class="card"><div class="card-img">👟</div><div class="card-body"><div class="c-name">Sneakers</div><div class="c-price">₱2,450</div><div class="c-old">₱3,500</div></div></div>
      <div class="card"><div class="card-img">👜</div><div class="card-body"><div class="c-name">Tote Bag</div><div class="c-price">₱1,960</div><div class="c-old">₱2,800</div></div></div>
      <div class="card"><div class="card-img">⌚</div><div class="card-body"><div class="c-name">Watch</div><div class="c-price">₱3,500</div><div class="c-old">₱5,000</div></div></div>
    </div>
  </body></html>`,

  "ec-2": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#000a08;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #D7192120}
    .logo{font-weight:900;font-size:12px;letter-spacing:3px;background:linear-gradient(135deg,#D71921,#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .nav-mid{display:flex;gap:10px}
    .nav-mid a{color:rgba(255,255,255,0.4);font-size:7.5px;text-decoration:none;letter-spacing:.5px}
    .nav-right{display:flex;align-items:center;gap:8px}
    .nav-right span{font-size:12px;cursor:pointer}
    .hero{display:grid;grid-template-columns:1fr 1fr;height:110px}
    .hero-left{padding:12px 14px;background:linear-gradient(135deg,#D7192120,transparent);display:flex;flex-direction:column;justify-content:center}
    .hero-left .tag{font-size:6.5px;color:#D71921;letter-spacing:2px;margin-bottom:4px}
    .hero-left h1{font-size:18px;font-weight:900;line-height:1.05}
    .hero-left h1 em{color:#D71921;font-style:normal}
    .hero-left p{font-size:7px;color:rgba(255,255,255,0.4);margin:4px 0 6px}
    .hero-left button{background:#D71921;color:#000;font-size:7.5px;font-weight:700;padding:4px 12px;border-radius:6px;border:none;cursor:pointer;align-self:flex-start}
    .hero-right{background:#D7192110;display:flex;align-items:center;justify-content:center;font-size:52px;border-left:1px solid #D7192120}
    .products{display:flex;gap:5px;padding:6px 14px}
    .prod{flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;overflow:hidden;position:relative}
    .prod-img{height:42px;display:flex;align-items:center;justify-content:center;font-size:22px;background:linear-gradient(135deg,#D7192112,rgba(255,255,255,0.02))}
    .prod-body{padding:4px 5px}
    .prod-name{font-size:7px;color:rgba(255,255,255,0.5)}
    .prod-price{font-size:9px;font-weight:800;color:#D71921}
    .wish{position:absolute;top:4px;right:4px;font-size:9px;cursor:pointer}
    .sale-tag{position:absolute;top:4px;left:4px;background:#D71921;color:#000;font-size:6px;font-weight:700;padding:1px 4px;border-radius:3px}
    .footer-strip{padding:5px 14px;background:rgba(215,25,33,0.05);border-top:1px solid #D7192115;display:flex;gap:12px}
    .f-item{display:flex;align-items:center;gap:4px}
    .f-item span{font-size:10px}
    .f-item p{font-size:7px;color:rgba(255,255,255,0.4)}
  </style></head><body>
    <nav>
      <span class="logo">LUXE</span>
      <div class="nav-mid"><a href="#">WOMEN</a><a href="#">MEN</a><a href="#">SALE</a><a href="#">NEW IN</a></div>
      <div class="nav-right"><span>🔍</span><span>❤️</span><span>🛒</span><span>👤</span></div>
    </nav>
    <div class="hero">
      <div class="hero-left">
        <div class="tag">NEW COLLECTION</div>
        <h1>Style That<br><em>Speaks</em></h1>
        <p>Curated fashion for the modern you.</p>
        <button>Shop Now →</button>
      </div>
      <div class="hero-right">👗</div>
    </div>
    <div class="products">
      <div class="prod"><span class="sale-tag">-30%</span><span class="wish">❤️</span><div class="prod-img">👠</div><div class="prod-body"><div class="prod-name">Heels</div><div class="prod-price">₱2,100</div></div></div>
      <div class="prod"><span class="wish">🤍</span><div class="prod-img">👔</div><div class="prod-body"><div class="prod-name">Blazer</div><div class="prod-price">₱3,800</div></div></div>
      <div class="prod"><span class="sale-tag">-20%</span><span class="wish">🤍</span><div class="prod-img">👒</div><div class="prod-body"><div class="prod-name">Sun Hat</div><div class="prod-price">₱960</div></div></div>
      <div class="prod"><span class="wish">🤍</span><div class="prod-img">💍</div><div class="prod-body"><div class="prod-name">Necklace</div><div class="prod-price">₱1,200</div></div></div>
    </div>
    <div class="footer-strip">
      <div class="f-item"><span>🚚</span><p>Free delivery ₱1,500+</p></div>
      <div class="f-item"><span>↩️</span><p>7-day returns</p></div>
      <div class="f-item"><span>🔒</span><p>Secure checkout</p></div>
    </div>
  </body></html>`,

  "ec-3": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#000d0b;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #D7192120}
    .logo{color:#D71921;font-weight:800;font-size:11px}
    .nav-right{display:flex;gap:10px;align-items:center}
    .nav-right a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none}
    .hero{padding:12px 14px 8px;display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,#D7192115,transparent)}
    .hero-text h1{font-size:18px;font-weight:900;line-height:1.05;margin-bottom:5px}
    .hero-text h1 em{color:#D71921;font-style:normal}
    .hero-text p{font-size:7.5px;color:rgba(255,255,255,0.4);margin-bottom:8px}
    .order-options{display:flex;gap:5px}
    .wa-btn{background:#25d366;color:#fff;font-size:7.5px;font-weight:700;padding:5px 10px;border-radius:6px;border:none;cursor:pointer}
    .em-btn{background:#D7192120;color:#D71921;font-size:7.5px;font-weight:700;padding:5px 10px;border-radius:6px;border:1px solid #D7192130;cursor:pointer}
    .hero-img{font-size:50px;opacity:.7}
    .section-title{font-size:8px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:2px;text-transform:uppercase;padding:0 14px 5px}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:0 14px}
    .card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:7px;overflow:hidden;cursor:pointer}
    .card:hover{border-color:#D7192130}
    .card-img{height:42px;display:flex;align-items:center;justify-content:center;font-size:22px;background:#D7192112}
    .card-body{padding:5px}
    .c-name{font-size:7px;color:rgba(255,255,255,0.5);margin-bottom:1px}
    .c-price{font-size:9px;font-weight:800;color:#D71921}
    .wa-mini{font-size:6px;color:#25d366;margin-top:2px}
  </style></head><body>
    <nav>
      <span class="logo">📦 SHELF STORE</span>
      <div class="nav-right"><a href="#">Products</a><a href="#">About</a><a href="#">Contact</a></div>
    </nav>
    <div class="hero">
      <div class="hero-text">
        <h1>Quality Finds,<br><em>Easy Ordering</em></h1>
        <p>Browse our catalog and order directly via WhatsApp or Email.</p>
        <div class="order-options">
          <button class="wa-btn">📱 Order via WhatsApp</button>
          <button class="em-btn">✉️ Order via Email</button>
        </div>
      </div>
      <div class="hero-img">🛒</div>
    </div>
    <div class="section-title" style="margin-top:6px">Our Products</div>
    <div class="grid">
      <div class="card"><div class="card-img">👗</div><div class="card-body"><div class="c-name">Dress</div><div class="c-price">₱1,200</div><div class="wa-mini">📱 Order</div></div></div>
      <div class="card"><div class="card-img">👟</div><div class="card-body"><div class="c-name">Sneakers</div><div class="c-price">₱3,500</div><div class="wa-mini">📱 Order</div></div></div>
      <div class="card"><div class="card-img">🎒</div><div class="card-body"><div class="c-name">Backpack</div><div class="c-price">₱1,800</div><div class="wa-mini">📱 Order</div></div></div>
      <div class="card"><div class="card-img">🕶️</div><div class="card-body"><div class="c-name">Sunglasses</div><div class="c-price">₱750</div><div class="wa-mini">📱 Order</div></div></div>
    </div>
  </body></html>`,

  // ── EVENTS ───────────────────────────────────
  "ev-1": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Georgia',serif}
    body{background:#080010;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #a855f720;background:rgba(0,0,0,0.3)}
    .logo{color:#a855f7;font-weight:800;font-size:12px;font-style:italic}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none;margin-left:10px;font-family:'Segoe UI',sans-serif}
    .hero{display:grid;grid-template-columns:1fr 1fr;height:105px}
    .hero-left{padding:12px 14px;background:linear-gradient(135deg,#a855f730,transparent);display:flex;flex-direction:column;justify-content:center}
    .eyebrow{font-size:7px;color:#a855f7;letter-spacing:3px;font-family:'Segoe UI',sans-serif;margin-bottom:4px}
    h1{font-size:17px;font-weight:900;line-height:1.05;margin-bottom:6px}
    h1 em{color:#a855f7;font-style:italic}
    .btns{display:flex;gap:5px}
    .btn-p{background:#a855f7;color:#fff;font-size:7.5px;font-weight:700;padding:4px 10px;border-radius:5px;border:none;cursor:pointer;font-family:'Segoe UI',sans-serif}
    .btn-s{background:transparent;color:#a855f7;font-size:7.5px;padding:4px 10px;border-radius:5px;border:1px solid #a855f750;cursor:pointer;font-family:'Segoe UI',sans-serif}
    .gallery{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;padding:3px}
    .g-item{background:linear-gradient(135deg,#a855f720,rgba(255,255,255,0.03));border:1px solid #a855f720;border-radius:5px;height:46px;display:flex;align-items:center;justify-content:center;font-size:22px}
    .packages{display:flex;gap:5px;padding:5px 14px}
    .pkg{flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:7px;padding:6px 5px;text-align:center}
    .pkg.hot{background:#a855f720;border-color:#a855f760}
    .pkg-name{font-size:7.5px;font-weight:700;color:rgba(255,255,255,0.5);margin-bottom:2px;font-family:'Segoe UI',sans-serif}
    .pkg.hot .pkg-name{color:#a855f7}
    .pkg-price{font-size:13px;font-weight:900;color:#fff;font-family:'Segoe UI',sans-serif}
    .pkg.hot .pkg-price{color:#a855f7}
    .pkg-detail{font-size:6px;color:rgba(255,255,255,0.3);font-family:'Segoe UI',sans-serif}
  </style></head><body>
    <nav><span class="logo">💍 Velvet Events</span><div><a href="#">Gallery</a><a href="#">Packages</a><a href="#">Testimonials</a><a href="#">Book</a></div></nav>
    <div class="hero">
      <div class="hero-left">
        <p class="eyebrow">WEDDINGS & EVENTS</p>
        <h1>Your Dream Day,<br>Our <em>Expertise</em></h1>
        <div class="btns"><button class="btn-p">Book Now</button><button class="btn-s">Our Work</button></div>
      </div>
      <div class="gallery">
        <div class="g-item">💍</div>
        <div class="g-item">🌸</div>
        <div class="g-item">🥂</div>
        <div class="g-item">🕊️</div>
      </div>
    </div>
    <div class="packages">
      <div class="pkg"><div class="pkg-name">SILVER</div><div class="pkg-price">₱35K</div><div class="pkg-detail">Basic styling</div></div>
      <div class="pkg hot"><div class="pkg-name">GOLD ★</div><div class="pkg-price">₱65K</div><div class="pkg-detail">Full coordination</div></div>
      <div class="pkg"><div class="pkg-name">PLATINUM</div><div class="pkg-price">₱120K</div><div class="pkg-detail">Luxury experience</div></div>
    </div>
  </body></html>`,

  "ev-2": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',sans-serif}
    body{background:#050010;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:7px 14px;background:rgba(0,0,0,0.5);border-bottom:1px solid #a855f725}
    .logo{font-weight:900;font-size:11px;letter-spacing:2px;background:linear-gradient(135deg,#a855f7,#f0abfc);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none;margin-left:10px}
    .hero{height:90px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;background:linear-gradient(135deg,#a855f740,#050010);position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 70% 50%,#a855f730,transparent 60%)}
    .hero-text{position:relative;z-index:1}
    .hero-tag{font-size:6.5px;color:#a855f7;letter-spacing:3px;margin-bottom:4px}
    h1{font-size:17px;font-weight:900;line-height:1.05;margin-bottom:6px;font-family:Georgia,serif}
    h1 em{color:#f0abfc;font-style:italic}
    .btns{display:flex;gap:5px}
    .btn-p{background:linear-gradient(135deg,#a855f7,#7c3aed);color:#fff;font-size:7.5px;font-weight:700;padding:4px 10px;border-radius:5px;border:none;cursor:pointer}
    .btn-s{background:rgba(168,85,247,0.1);color:#a855f7;font-size:7.5px;padding:4px 10px;border-radius:5px;border:1px solid #a855f740;cursor:pointer}
    .hero-decor{font-size:48px;opacity:.6;position:relative;z-index:1}
    .timeline{padding:6px 14px;display:flex;gap:0;align-items:center;border-top:1px solid #a855f720}
    .t-step{flex:1;text-align:center;position:relative}
    .t-step::after{content:'';position:absolute;top:8px;right:0;width:50%;height:1px;background:#a855f730}
    .t-step:last-child::after{display:none}
    .t-dot{width:16px;height:16px;border-radius:50%;border:1.5px solid #a855f7;display:flex;align-items:center;justify-content:center;margin:0 auto 3px;font-size:7px}
    .t-dot.done{background:#a855f7;color:#fff}
    .t-label{font-size:6.5px;color:rgba(255,255,255,0.4)}
    .vendors{display:flex;gap:5px;padding:5px 14px}
    .vendor{flex:1;background:rgba(168,85,247,0.07);border:1px solid #a855f720;border-radius:7px;padding:5px;text-align:center}
    .vendor span{font-size:16px;display:block;margin-bottom:2px}
    .vendor p{font-size:6.5px;color:#a855f7;font-weight:600}
    .vendor small{font-size:6px;color:rgba(255,255,255,0.3)}
  </style></head><body>
    <nav><span class="logo">✦ GALA EVENTS CO.</span><div><a href="#">Portfolio</a><a href="#">Packages</a><a href="#">Vendors</a><a href="#">Book</a></div></nav>
    <div class="hero">
      <div class="hero-text">
        <div class="hero-tag">FULL-SERVICE EVENT PLANNING</div>
        <h1>Crafting Moments<br><em>That Last Forever</em></h1>
        <div class="btns"><button class="btn-p">Book a Consult</button><button class="btn-s">View Portfolio</button></div>
      </div>
      <div class="hero-decor">🎬</div>
    </div>
    <div class="timeline">
      <div class="t-step"><div class="t-dot done">✓</div><div class="t-label">Consultation</div></div>
      <div class="t-step"><div class="t-dot done">✓</div><div class="t-label">Planning</div></div>
      <div class="t-step"><div class="t-dot">3</div><div class="t-label">Coordination</div></div>
      <div class="t-step"><div class="t-dot">4</div><div class="t-label">Event Day</div></div>
      <div class="t-step"><div class="t-dot">5</div><div class="t-label">Memories</div></div>
    </div>
    <div class="vendors">
      <div class="vendor"><span>📸</span><p>Photography</p><small>3 partners</small></div>
      <div class="vendor"><span>🌸</span><p>Florals</p><small>5 partners</small></div>
      <div class="vendor"><span>🍽️</span><p>Catering</p><small>4 partners</small></div>
      <div class="vendor"><span>🎵</span><p>Music</p><small>6 partners</small></div>
      <div class="vendor"><span>🚗</span><p>Limo</p><small>2 partners</small></div>
    </div>
  </body></html>`,

  "ev-3": `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Georgia',serif}
    body{background:#080010;color:#fff;overflow:hidden;height:240px}
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #a855f720}
    .logo{color:#c084fc;font-weight:800;font-size:12px;font-style:italic}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none;margin-left:10px;font-family:'Segoe UI',sans-serif}
    .hero{padding:12px 14px 8px;text-align:center;background:linear-gradient(180deg,#a855f720,transparent)}
    .eyebrow{font-size:7px;color:#a855f7;letter-spacing:3px;font-family:'Segoe UI',sans-serif;margin-bottom:4px}
    h1{font-size:18px;font-weight:900;line-height:1.05;margin-bottom:3px}
    h1 em{color:#c084fc;font-style:italic}
    .sub{font-size:7.5px;color:rgba(255,255,255,0.4);font-family:'Segoe UI',sans-serif;margin-bottom:8px}
    .btns{display:flex;justify-content:center;gap:6px}
    .btn-p{background:#a855f7;color:#fff;font-size:8px;font-weight:700;padding:5px 14px;border-radius:20px;border:none;cursor:pointer;font-family:'Segoe UI',sans-serif}
    .btn-s{background:transparent;color:#a855f7;font-size:8px;padding:5px 14px;border-radius:20px;border:1px solid #a855f750;cursor:pointer;font-family:'Segoe UI',sans-serif}
    .gallery{display:flex;gap:4px;padding:8px 14px}
    .g-item{flex:1;background:linear-gradient(135deg,#a855f720,rgba(255,255,255,0.02));border:1px solid #a855f725;border-radius:7px;height:36px;display:flex;align-items:center;justify-content:center;font-size:18px}
    .packages{display:flex;gap:6px;padding:4px 14px}
    .pkg{flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:7px 6px;text-align:center}
    .pkg.hot{background:#a855f720;border-color:#a855f760}
    .pkg-name{font-size:7.5px;font-weight:700;color:rgba(255,255,255,0.45);margin-bottom:3px;font-family:'Segoe UI',sans-serif}
    .pkg.hot .pkg-name{color:#a855f7}
    .pkg-price{font-size:15px;font-weight:900;color:#fff;font-family:'Segoe UI',sans-serif}
    .pkg.hot .pkg-price{color:#c084fc}
    .pkg-detail{font-size:6px;color:rgba(255,255,255,0.3);margin-top:2px;font-family:'Segoe UI',sans-serif}
    .pkg-btn{margin-top:5px;background:#a855f7;color:#fff;font-size:6.5px;font-weight:700;padding:3px 8px;border-radius:5px;border:none;cursor:pointer;font-family:'Segoe UI',sans-serif;width:100%}
    .pkg .pkg-btn.outline{background:transparent;color:#a855f7;border:1px solid #a855f740}
  </style></head><body>
    <nav><span class="logo">🌸 Bloom Events</span><div><a href="#">Gallery</a><a href="#">Packages</a><a href="#">Contact</a></div></nav>
    <div class="hero">
      <p class="eyebrow">WEDDINGS · DEBUTS · CELEBRATIONS</p>
      <h1>Let's Celebrate<br><em>Together</em></h1>
      <p class="sub">Simple, heartfelt event planning made just for you.</p>
      <div class="btns"><button class="btn-p">💌 Book Now</button><button class="btn-s">View Gallery</button></div>
    </div>
    <div class="gallery">
      <div class="g-item">💐</div>
      <div class="g-item">🎂</div>
      <div class="g-item">🎊</div>
      <div class="g-item">📸</div>
      <div class="g-item">🕯️</div>
    </div>
    <div class="packages">
      <div class="pkg"><div class="pkg-name">SILVER</div><div class="pkg-price">₱35K</div><div class="pkg-detail">Essentials package</div><button class="pkg-btn outline">Inquire</button></div>
      <div class="pkg hot"><div class="pkg-name">GOLD ★</div><div class="pkg-price">₱65K</div><div class="pkg-detail">Full coordination</div><button class="pkg-btn">Book This</button></div>
    </div>
  </body></html>`,
};

// ─────────────────────────────────────────────
// TEMPLATE PREVIEW (iframe)
// ─────────────────────────────────────────────


function TemplatePreview({ tmpl }) {
  // Map template id to an array of HTML files (for multi-page preview)
  const htmlFileMap = {
  'rest-1': [
    { label: 'Home', file: '/templates/ember_restaurant_design.html' },
  ],

  'rest-2': [
    { label: 'Home', file: '/templates/bloom_cafe_design.html' },
  ],

  'rest-3': [
    { label: 'Home', file: '/templates/spot_restaurant_design.html' },
  ],

  're-1': [
    { label: 'Home', file: '/templates/apex_realestate_design.html' },
  ],

  're-2': [
    { label: 'Home', file: '/templates/terrain_realestate_design.html' },
  ],

  're-3': [
    { label: 'Home', file: '/templates/scout_realestate_design.html' },
  ],

  // ── GYM TEMPLATES ──
  'gym-1': [
    { label: 'Home', file: '/templates/forge_design.html' },
  ],

  'gym-2': [
    { label: 'Home', file: '/templates/kinetic_design.html' },
  ],

  'gym-3': [
    { label: 'Home', file: '/templates/pump_design.html' },
  ],

  'ec-1': [
    { label: 'Home', file: '/templates/vault-ecommerce-store.html' },
  ],

  'ec-2': [
    { label: 'Home', file: '/templates/luxe-ecommerce-store.html' },
  ],

  'ec-3': [
    { label: 'Home', file: '/templates/shelf-ecommerce-store.html' },
  ],

  // ── EVENTS TEMPLATES ──
  'ev-1': [
    { label: 'Home', file: '/templates/velvet_noir_design.html' },
  ],

  'ev-2': [
    { label: 'Home', file: '/templates/gala_editorial_design.html' },
  ],

  'ev-3': [
    { label: 'Home', file: '/templates/bloom_garden_design.html' },
  ],
};

  const htmlFiles = htmlFileMap[tmpl.id] || [];
  const [pageIdx, setPageIdx] = useState(0);
  const touchStartX = useRef(null);

  // Handle swipe gestures
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx > 0 && pageIdx > 0) setPageIdx(pageIdx - 1);
      else if (dx < 0 && pageIdx < htmlFiles.length - 1) setPageIdx(pageIdx + 1);
    }
    touchStartX.current = null;
  };

  // Fallback to srcDoc if no HTML file
  const showIframe = htmlFiles.length > 0;
  const currentFile = htmlFiles[pageIdx]?.file;
  const currentLabel = htmlFiles[pageIdx]?.label;

  return (
    <div className="relative w-full overflow-hidden rounded-t-xl" style={{ height: 200 }}>
      {showIframe ? (
        <iframe
          src={currentFile}
          title={tmpl.name + (currentLabel ? ' - ' + currentLabel : '')}
          scrolling="no"
          style={{
            width: "200%",
            height: "200%",
            border: "none",
            transform: "scale(0.5)",
            transformOrigin: "top left",
            pointerEvents: "none",
            display: "block",
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      ) : (
        <iframe
          srcDoc={TEMPLATE_HTML[tmpl.id] || ""}
          title={tmpl.name}
          scrolling="no"
          style={{
            width: "200%",
            height: "200%",
            border: "none",
            transform: "scale(0.5)",
            transformOrigin: "top left",
            pointerEvents: "none",
            display: "block",
          }}
        />
      )}
      {/* Arrows for navigation if multiple pages */}
      {showIframe && htmlFiles.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-7 h-7 flex items-center justify-center z-20 border border-white/10"
            style={{ opacity: pageIdx === 0 ? 0.3 : 1, pointerEvents: pageIdx === 0 ? 'none' : 'auto' }}
            onClick={() => setPageIdx(pageIdx - 1)}
            aria-label="Previous page"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full w-7 h-7 flex items-center justify-center z-20 border border-white/10"
            style={{ opacity: pageIdx === htmlFiles.length - 1 ? 0.3 : 1, pointerEvents: pageIdx === htmlFiles.length - 1 ? 'none' : 'auto' }}
            onClick={() => setPageIdx(pageIdx + 1)}
            aria-label="Next page"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </>
      )}
      {/* Page indicator */}
      {showIframe && htmlFiles.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {htmlFiles.map((f, i) => (
            <span key={i} className={`w-2 h-2 rounded-full ${i === pageIdx ? 'bg-white' : 'bg-white/30'} border border-white/20`} />
          ))}
        </div>
      )}
      <div className="absolute top-2.5 left-2.5 z-10">
        <span className="mono px-2.5 py-1 rounded-full font-semibold"
          style={{ background: `${tmpl.accent}30`, color: tmpl.accent, border: `1px solid ${tmpl.accent}50`, fontSize: "10px" }}>
          {tmpl.badge}
        </span>
      </div>
      {/* Page label */}
      {showIframe && htmlFiles.length > 1 && (
        <div className="absolute top-2.5 right-2.5 z-10 mono text-xs px-2 py-0.5 rounded-full bg-black/60 text-white border border-white/10">
          {currentLabel}
        </div>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────
// FEATURE PICKER
// ─────────────────────────────────────────────
function FeaturePicker({ typeId, typeObj, template, onConfirm, onBack }) {
  const addons = ADDONS_BY_TYPE[typeId] || [];
  const [selectedAddons, setSelectedAddons] = useState(new Set());
  const [contactOnly, setContactOnly] = useState(false);

  const toggleAddon = (id) => {
    if (contactOnly) return;
    setSelectedAddons(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <motion.div
      key="feature-picker"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.45, ease: [0.4, 0.2, 0.2, 1] }}
    >
      <button onClick={onBack} className="flex items-center gap-2 mb-6 text-xs text-white/35 hover:text-white/70 transition-colors mono">
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        Back to templates
      </button>

      <div className="flex items-center gap-3 mb-2">
        <span className="w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0" style={{ background: `linear-gradient(135deg, ${typeObj.color}, #8A8A85)` }}>3</span>
        <p className="mono text-xs text-white/30 uppercase tracking-widest">Customize Your Features</p>
      </div>
      <p className="text-xs text-white/25 mono mb-8 ml-9">
        {typeObj.icon} {typeObj.label} — <span style={{ color: typeObj.color }}>{template.name}</span> template
      </p>

      {/* ── BASE FEATURES (always included) ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="mono text-xs uppercase tracking-widest text-white/30">Always Included</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span className="mono text-xs px-2 py-0.5 rounded-full" style={{ background: `${typeObj.color}15`, color: typeObj.color, border: `1px solid ${typeObj.color}25` }}>
            {template.baseFeatures.length} features
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          {template.baseFeatures.map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5"
              style={{ background: `${typeObj.color}08`, border: `1px solid ${typeObj.color}20` }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${typeObj.color}20` }}>
                <svg width="8" height="8" fill="none" stroke={typeObj.color} strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span style={{ fontSize: 13 }}>{f.icon}</span>
              <p className="text-xs font-medium text-white/70">{f.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ADD-ON FEATURES (optional) ── */}
      <div className={`mb-6 transition-opacity duration-300 ${contactOnly ? "opacity-30 pointer-events-none" : ""}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="mono text-xs uppercase tracking-widest text-white/30">Optional Add-ons</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span className="mono text-xs text-white/25">{selectedAddons.size} selected</span>
        </div>
        <div className="grid md:grid-cols-2 gap-2.5">
          {addons.map((f) => {
            const isOn = selectedAddons.has(f.id);
            return (
              <div key={f.id}
                onClick={() => toggleAddon(f.id)}
                className="flex items-start gap-3 rounded-xl p-3 cursor-pointer transition-all duration-200 group"
                style={{
                  background: isOn ? `${typeObj.color}12` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isOn ? typeObj.color + "45" : "rgba(255,255,255,0.07)"}`,
                }}>
                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-150" style={{
                  background: isOn ? typeObj.color : "rgba(255,255,255,0.06)",
                  border: isOn ? "none" : "1px solid rgba(255,255,255,0.15)",
                }}>
                  {isOn && <svg width="9" height="9" fill="none" stroke="#000" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontSize: 12 }}>{f.icon}</span>
                    <p className="text-xs font-semibold text-white/75 group-hover:text-white transition-colors">{f.label}</p>
                  </div>
                  <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Email instead toggle ── */}
      <div className="mb-6 p-4 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200"
        style={{ background: contactOnly ? "rgba(138,138,133,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${contactOnly ? "#8A8A8550" : "rgba(255,255,255,0.08)"}` }}
        onClick={() => setContactOnly(!contactOnly)}>
        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all" style={{ background: contactOnly ? "linear-gradient(135deg,#8A8A85,#D71921)" : "rgba(255,255,255,0.06)", border: contactOnly ? "none" : "1px solid rgba(255,255,255,0.15)" }}>
          {contactOnly && <svg width="10" height="10" fill="none" stroke="#000" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Just email me instead</p>
          <p className="text-xs text-white/35 mt-0.5">Skip add-on selection — I'll discuss everything via email</p>
        </div>
      </div>

      <button
        onClick={() => onConfirm([...selectedAddons], contactOnly)}
        className="w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all duration-200 hover:scale-[1.01] hover:brightness-110"
        style={{ background: `linear-gradient(135deg, ${typeObj.color}, #8A8A85)` }}>
        {contactOnly ? "Continue to Summary →" : selectedAddons.size > 0 ? `Continue with ${selectedAddons.size} Add-on${selectedAddons.size !== 1 ? "s" : ""} →` : "Continue with Base Package →"}
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// QUOTE MODAL
// ─────────────────────────────────────────────
function QuoteModal({ template, typeObj, selectedAddons, contactOnly, onClose }) {
  const accent = typeObj.color;
  const addonLabels = (ADDONS_BY_TYPE[typeObj.id] || [])
    .filter(a => selectedAddons.includes(a.id))
    .map(a => a.label);

  const subject = encodeURIComponent(`Website Quote — ${typeObj.label} · ${template.name} Template`);
  const bodyLines = contactOnly
    ? `Hi Kim,\n\nI'm interested in the "${template.name}" template for a ${typeObj.label} website.\n\nI'd like to discuss the details with you directly.\n\nPackage: ₱${template.price.toLocaleString()}\nDelivery: ${typeObj.deliveryDays} days\n\nPlease get back to me!\n\n`
    : `Hi Kim,\n\nI'm interested in the "${template.name}" template for a ${typeObj.label} website.\n\nBase Features (always included):\n${template.baseFeatures.map(f => `• ${f.label}`).join("\n")}\n\n${addonLabels.length > 0 ? `Add-ons I'd like:\n${addonLabels.map(f => `• ${f}`).join("\n")}\n\n` : "No add-ons selected.\n\n"}Base Package: ₱${template.price.toLocaleString()}\nEstimated Delivery: ${typeObj.deliveryDays} days\n\nPlease get back to me!\n\n`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }}>
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: "#0d0d1a", border: `1px solid ${accent}40` }}>

        <div className="px-8 pt-8 pb-6" style={{ background: `linear-gradient(135deg, ${accent}18, rgba(255,255,255,0.02))` }}>
          <div className="flex items-center justify-between mb-4">
            <span className="mono text-xs text-white/30 uppercase tracking-widest">Quote Summary</span>
            <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{typeObj.icon}</span>
            <div>
              <p className="text-xl font-extrabold" style={{ color: "var(--text)" }}>{template.name} Template</p>
              <p className="text-sm text-white/40 mt-0.5">{typeObj.label}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <span className="mono text-xs px-2.5 py-1 rounded-full" style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
              ₱{template.price.toLocaleString()} base
            </span>
            <span className="mono text-xs px-2.5 py-1 rounded-full text-white/35" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {typeObj.deliveryDays} days est.
            </span>
          </div>
        </div>

        <div className="px-8 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {contactOnly ? (
            <div className="text-center py-4">
              <p className="text-2xl mb-2">✉️</p>
              <p className="text-sm text-white/55">You've chosen to discuss features directly via email.</p>
              <p className="text-xs text-white/30 mt-1 mono">Kim will get back to you within 24 hours.</p>
            </div>
          ) : (
            <div className="space-y-5 max-h-52 overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: `${accent}40 transparent` }}>
              {/* Base features */}
              <div>
                <p className="mono text-xs text-white/30 uppercase tracking-widest mb-2">Always Included</p>
                <div className="space-y-1.5">
                  {template.baseFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/55">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${accent}20`, border: `1px solid ${accent}40` }}>
                        <svg width="7" height="7" fill="none" stroke={accent} strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span style={{ fontSize: 11 }}>{f.icon}</span> {f.label}
                    </div>
                  ))}
                </div>
              </div>
              {/* Add-ons */}
              {addonLabels.length > 0 && (
                <div>
                  <p className="mono text-xs text-white/30 uppercase tracking-widest mb-2">Add-ons Selected</p>
                  <div className="space-y-1.5">
                    {addonLabels.map((label) => (
                      <div key={label} className="flex items-center gap-2 text-sm" style={{ color: accent }}>
                        <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${accent}25`, border: `1px solid ${accent}50` }}>
                          <svg width="7" height="7" fill="none" stroke={accent} strokeWidth="3" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </span>
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {addonLabels.length === 0 && (
                <p className="text-xs text-white/25 mono italic">No add-ons selected — base package only.</p>
              )}
            </div>
          )}
        </div>

        <div className="px-8 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
          <div className="flex justify-between items-center">
            <span className="font-bold text-white text-sm">Base Package Price</span>
            <span className="text-2xl font-extrabold mono" style={{ color: accent }}>₱{template.price.toLocaleString()}</span>
          </div>
          <p className="text-xs text-white/20 mt-1.5">* Final price confirmed after project discussion. Additional features may adjust pricing.</p>
        </div>

        <div className="px-8 pb-8 pt-4">
          <a
            href={`mailto:ebora.kimivan@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyLines)}`}
            className="w-full py-3.5 rounded-xl font-bold text-black text-sm text-center transition-all hover:scale-[1.02] block hover:brightness-110"
            style={{ background: `linear-gradient(135deg, ${accent}, #8A8A85)` }}>
            Send Quote to Kim →
          </a>
          <p className="text-center text-xs text-white/20 mono mt-3">Opens your email client with everything pre-filled.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// TEMPLATE EXPLORER — fullscreen swipeable preview
// ─────────────────────────────────────────────
function TemplateExplorer({ tmpl, allTemplates, onClose, onPick }) {
  const htmlFileMap = {
    'rest-1': [{ label: 'Home', file: '/templates/ember_restaurant_design.html' }],
    'rest-2': [{ label: 'Home', file: '/templates/bloom_cafe_design.html' }],
    'rest-3': [{ label: 'Home', file: '/templates/spot_restaurant_design.html' }],
    're-1':   [{ label: 'Home', file: '/templates/apex_realestate_design.html' }],
    're-2':   [{ label: 'Home', file: '/templates/terrain_realestate_design.html' }],
    're-3':   [{ label: 'Home', file: '/templates/scout_realestate_design.html' }],
    'gym-1':  [{ label: 'Home', file: '/templates/forge_design.html' }],
    'gym-2':  [{ label: 'Home', file: '/templates/kinetic_design.html' }],
    'gym-3':  [{ label: 'Home', file: '/templates/pump_design.html' }],
    'ec-1':  [{ label: 'Home', file: '/templates/vault-ecommerce-store.html' }],
    'ec-2':  [{ label: 'Home', file: '/templates/luxe-ecommerce-store.html' }],
    'ec-3':  [{ label: 'Home', file: '/templates/shelf-ecommerce-store.html' }],

    // ── EVENTS TEMPLATES ──
    'ev-1':  [{ label: 'Home', file: '/templates/velvet_noir_design.html' }],
    'ev-2':  [{ label: 'Home', file: '/templates/gala_editorial_design.html' }],
    'ev-3':  [{ label: 'Home', file: '/templates/bloom_garden_design.html' }],
  };

  // Which template index are we on in the allTemplates list
  const [tmplIdx, setTmplIdx] = useState(() => allTemplates.findIndex(t => t.id === tmpl.id));
  const currentTmpl = allTemplates[tmplIdx];
  const htmlFiles = htmlFileMap[currentTmpl.id] || [];
  const [pageIdx, setPageIdx] = useState(0);

  // Touch / swipe state (for swiping between templates)
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Reset page when template changes
  useEffect(() => { setPageIdx(0); }, [tmplIdx]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const goPrev = () => {
    setTmplIdx(i => Math.max(0, i - 1));
    setDragOffset(0);
  };
  const goNext = () => {
    setTmplIdx(i => Math.min(allTemplates.length - 1, i + 1));
    setDragOffset(0);
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };
  const onTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (!isDragging.current && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      isDragging.current = true;
    }
    if (isDragging.current) {
      e.preventDefault();
      setDragOffset(dx);
    }
  };
  const onTouchEnd = (e) => {
    if (isDragging.current && Math.abs(dragOffset) > 60) {
      if (dragOffset < 0) goNext();
      else goPrev();
    }
    setDragOffset(0);
    touchStartX.current = null;
    isDragging.current = false;
  };

  const showIframe = htmlFiles.length > 0;
  const accent = currentTmpl.accent;

  return (
    <motion.div
      key="template-explorer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(12px)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.4)" }}>
        <div className="flex items-center gap-3">
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
            <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div>
            <p className="text-white font-bold text-sm leading-none">{currentTmpl.name}</p>
            <p className="mono text-xs mt-0.5" style={{ color: accent }}>{currentTmpl.tagline}</p>
          </div>
        </div>

        {/* Template dots */}
        <div className="flex items-center gap-2">
          {allTemplates.map((t, i) => (
            <button key={t.id} onClick={() => setTmplIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === tmplIdx ? "28px" : "8px",
                height: "8px",
                background: i === tmplIdx ? accent : "rgba(255,255,255,0.2)",
                boxShadow: i === tmplIdx ? `0 0 10px ${accent}80` : "none",
              }} />
          ))}
        </div>

        <button
          onClick={() => { onClose(); onPick(currentTmpl); }}
          className="px-4 py-2 rounded-xl font-bold text-black text-xs transition-all hover:scale-105 hover:brightness-110"
          style={{ background: `linear-gradient(135deg, ${accent}, #8A8A85)` }}>
          Pick This →
        </button>
      </div>

      {/* Swipeable iframe area */}
      <div
        className="flex-1 relative overflow-hidden select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: "pan-y" }}
      >
        {/* Drag transform wrapper */}
        <div
          className="w-full h-full"
          style={{
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging.current ? "none" : "transform 0.3s cubic-bezier(0.4,0.2,0.2,1)",
          }}
        >
          {showIframe ? (
            <iframe
              key={currentTmpl.id + "-" + pageIdx}
              src={htmlFiles[pageIdx]?.file}
              title={currentTmpl.name}
              className="w-full h-full"
              style={{ border: "none", display: "block" }}
            />
          ) : (
            <iframe
              key={currentTmpl.id + "-fallback"}
              srcDoc={TEMPLATE_HTML[currentTmpl.id] || ""}
              title={currentTmpl.name}
              className="w-full h-full"
              style={{ border: "none", display: "block" }}
            />
          )}
        </div>

        {/* Left / Right nav arrows (desktop) */}
        {tmplIdx > 0 && (
          <button onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: "rgba(0,0,0,0.75)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        )}
        {tmplIdx < allTemplates.length - 1 && (
          <button onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: "rgba(0,0,0,0.75)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        )}

        {/* Swipe hint — shows briefly then fades */}
        {allTemplates.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10">
            <motion.div
              initial={{ opacity: 0.7 }} animate={{ opacity: 0 }} transition={{ delay: 2, duration: 1.2 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full mono text-xs"
              style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
              swipe to explore
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom bar — template name + index */}
      <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.4)" }}>
        <p className="mono text-xs text-white/30">
          {tmplIdx + 1} / {allTemplates.length} templates · Press ← → to navigate
        </p>
        <p className="mono text-xs font-semibold" style={{ color: accent }}>
          ₱{currentTmpl.price.toLocaleString()} base
        </p>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN SERVICES SECTION
// ─────────────────────────────────────────────
export function ServicesSection() {
  const [step, setStep] = useState("choose");
  const [selectedWebType, setSelectedWebType] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [contactOnly, setContactOnly] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [explorerTmpl, setExplorerTmpl] = useState(null);

  const typeObj = WEBSITE_TYPES.find((t) => t.id === selectedWebType);
  const templates = selectedWebType ? TEMPLATES[selectedWebType] : [];

  const reset = () => {
    setStep("choose");
    setSelectedWebType(null);
    setSelectedTemplate(null);
    setSelectedAddons([]);
    setContactOnly(false);
    setShowQuote(false);
  };

  const handleBack = () => {
    if (step === "premade-type" || step === "custom") reset();
    else if (step === "premade-templates") { setStep("premade-type"); setSelectedTemplate(null); }
    else if (step === "feature-picker") { setStep("premade-templates"); }
  };

  return (
    <>
      <AnimatePresence>
        {showQuote && selectedTemplate && typeObj && (
          <QuoteModal
            template={selectedTemplate}
            typeObj={typeObj}
            selectedAddons={selectedAddons}
            contactOnly={contactOnly}
            onClose={() => setShowQuote(false)}
          />
        )}
        {explorerTmpl && selectedWebType && (
          <TemplateExplorer
            key="template-explorer"
            tmpl={explorerTmpl}
            allTemplates={TEMPLATES[selectedWebType] || []}
            onClose={() => setExplorerTmpl(null)}
            onPick={(tmpl) => { setExplorerTmpl(null); setSelectedTemplate(tmpl); setStep("feature-picker"); }}
          />
        )}
      </AnimatePresence>

      <section id="services" className="relative py-24">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="max-w-6xl mx-auto px-6 relative">

          {/* Header */}
          <div className="mb-14">
            <span className="mono text-xs text-white/25 tracking-widest uppercase">04 / Services</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
              <span style={{ color: "var(--text)" }}>Get a </span>
              <span className="gradient-text">Quote</span>
            </h2>
            <p className="text-white/40 mt-3 text-sm max-w-xl leading-relaxed">
              Choose a premade design package or reach out for a fully custom build.
            </p>
          </div>

          {/* Back button */}
          {step !== "choose" && step !== "feature-picker" && (
            <button onClick={handleBack} className="flex items-center gap-2 mb-8 text-xs text-white/35 hover:text-white/70 transition-colors mono">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
              {step === "premade-templates" ? "Back to website types" : "Start over"}
            </button>
          )}

          <div style={{ minHeight: 480 }}>
            <AnimatePresence mode="wait">

              {/* ── STEP 1: Choose premade vs custom ── */}
              {step === "choose" && (
                <motion.div key="choose" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.45, ease: [0.4, 0.2, 0.2, 1] }} className="grid md:grid-cols-2 gap-5">
                  <button onClick={() => setStep("premade-type")} className="text-left rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.01] group" style={{ borderColor: "rgba(215,25,33,0.25)", background: "linear-gradient(135deg, rgba(215,25,33,0.06), rgba(255,255,255,0.01))", boxShadow: "0 0 40px rgba(215,25,33,0.06)" }}>
                    <div className="text-4xl mb-4">🎨</div>
                    <p className="font-extrabold text-white text-xl mb-2">Premade Design</p>
                    <p className="text-sm text-white/45 leading-relaxed mb-5">Choose from 3 ready-made templates per website type. Fixed pricing, faster delivery.</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Restaurant", "Real Estate", "Gym", "E-Commerce", "Events"].map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-lg text-white/40 mono" style={{ background: "rgba(215,25,33,0.07)", border: "1px solid rgba(215,25,33,0.15)" }}>{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#D71921" }}>
                      Browse templates <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  </button>

                  <button onClick={() => setStep("custom")} className="text-left rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.01] group" style={{ borderColor: "rgba(138,138,133,0.25)", background: "linear-gradient(135deg, rgba(138,138,133,0.06), rgba(255,255,255,0.01))", boxShadow: "0 0 40px rgba(138,138,133,0.06)" }}>
                    <div className="text-4xl mb-4">⚡</div>
                    <p className="font-extrabold text-white text-xl mb-2">Custom Design</p>
                    <p className="text-sm text-white/45 leading-relaxed mb-5">Have a unique vision? Let's discuss your exact requirements and build something from scratch.</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Unique layout", "Your branding", "Any feature"].map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-lg text-white/40 mono" style={{ background: "rgba(138,138,133,0.07)", border: "1px solid rgba(138,138,133,0.15)" }}>{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#8A8A85" }}>
                      Get in touch <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  </button>
                </motion.div>
              )}

              {/* ── STEP 2: Pick website type ── */}
              {step === "premade-type" && (
                <motion.div key="premade-type" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.45, ease: [0.4, 0.2, 0.2, 1] }}>
                  <p className="mono text-xs text-white/30 uppercase tracking-widest mb-6 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0" style={{ background: "linear-gradient(135deg,#D71921,#8A8A85)" }}>1</span>
                    What kind of website do you need?
                  </p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {WEBSITE_TYPES.map((t) => (
                      <button key={t.id}
                        onClick={() => { setSelectedWebType(t.id); setStep("premade-templates"); }}
                        className="text-left rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1"
                        style={{ borderColor: t.color + "35", background: `linear-gradient(135deg, ${t.color}08, rgba(255,255,255,0.01))` }}>
                        <div className="text-3xl mb-3">{t.icon}</div>
                        <p className="font-bold text-white text-sm mb-2 leading-tight">{t.label}</p>
                        <p className="text-xs text-white/35 leading-relaxed mb-4">{t.desc}</p>
                        <div className="flex items-center gap-1 text-xs mono" style={{ color: t.color }}>
                          3 templates <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: Pick template ── */}
              {step === "premade-templates" && typeObj && (
                <motion.div key="premade-templates" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.45, ease: [0.4, 0.2, 0.2, 1] }}>
                  <p className="mono text-xs text-white/30 uppercase tracking-widest mb-2 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0" style={{ background: "linear-gradient(135deg,#D71921,#8A8A85)" }}>2</span>
                    {typeObj.icon} {typeObj.label} — Pick a Template
                  </p>
                  <p className="text-xs text-white/25 mono mb-8 ml-9">Choose the package that fits your needs and budget.</p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {templates.map((tmpl) => (
                      <motion.div key={tmpl.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
                        className="rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                        <TemplatePreview tmpl={tmpl} />

                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-extrabold text-white text-lg">{tmpl.name}</h3>
                            <span className="ml-auto mono text-xs" style={{ color: tmpl.accent }}>↗</span>
                          </div>
                          <p className="text-xs mono mb-2" style={{ color: tmpl.accent }}>{tmpl.tagline}</p>
                          <p className="text-xs text-white/45 leading-relaxed mb-4 flex-1">{tmpl.desc}</p>

                          <div className="mb-4 space-y-1.5">
                            {tmpl.baseFeatures.slice(0, 4).map((f, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-white/45">
                                <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${tmpl.accent}20` }}>
                                  <svg width="6" height="6" fill="none" stroke={tmpl.accent} strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                                </span>
                                <span style={{ fontSize: 11 }}>{f.icon}</span> {f.label}
                              </div>
                            ))}
                            {tmpl.baseFeatures.length > 4 && (
                              <p className="text-xs mono pl-5" style={{ color: tmpl.accent }}>+{tmpl.baseFeatures.length - 4} more included</p>
                            )}
                            <p className="text-xs mono pl-5 mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                              + {(ADDONS_BY_TYPE[selectedWebType] || []).length} optional add-ons available
                            </p>
                          </div>

                          <div className="flex items-center justify-between mb-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            <div>
                              <p className="mono text-xs text-white/25">Base price</p>
                              <p className="mono font-extrabold text-xl" style={{ color: tmpl.accent }}>₱{tmpl.price.toLocaleString()}</p>
                            </div>
                            <p className="mono text-xs text-white/30">{typeObj.deliveryDays} days</p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => setExplorerTmpl(tmpl)}
                              className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
                              style={{ border: `1px solid ${tmpl.accent}50`, color: tmpl.accent, background: `${tmpl.accent}10` }}>
                              👁 Explore
                            </button>
                            <button
                              onClick={() => { setSelectedTemplate(tmpl); setStep("feature-picker"); }}
                              className="flex-1 py-3 rounded-xl font-bold text-black text-sm transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
                              style={{ background: `linear-gradient(135deg, ${tmpl.accent}, #8A8A85)` }}>
                              Pick This →
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 4: Feature picker ── */}
              {step === "feature-picker" && typeObj && selectedTemplate && (
                <FeaturePicker
                  key="feature-picker"
                  typeId={selectedWebType}
                  typeObj={typeObj}
                  template={selectedTemplate}
                  onBack={handleBack}
                  onConfirm={(addons, isContactOnly) => {
                    setSelectedAddons(addons);
                    setContactOnly(isContactOnly);
                    setShowQuote(true);
                  }}
                />
              )}

              {/* ── Custom ── */}
              {step === "custom" && (
                <motion.div key="custom" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.45, ease: [0.4, 0.2, 0.2, 1] }} className="max-w-xl mx-auto">
                  <div className="rounded-3xl p-8 md:p-10 text-center" style={{ background: "linear-gradient(135deg, rgba(138,138,133,0.08), rgba(215,25,33,0.04))", border: "1px solid rgba(138,138,133,0.25)" }}>
                    <div className="text-5xl mb-5">⚡</div>
                    <h3 className="text-2xl font-extrabold text-white mb-3">Let's Build Something Custom</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-sm mx-auto">Have a unique idea or specific requirements? Send me an email and we'll discuss the details — layout, features, timeline, and pricing.</p>
                    <a href="mailto:ebora.kimivan@gmail.com?subject=Custom Website Project"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black text-sm transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
                      style={{ background: "linear-gradient(135deg, #8A8A85, #D71921)", boxShadow: "0 0 40px rgba(138,138,133,0.2)" }}>
                      ✉️ ebora.kimivan@gmail.com
                    </a>
                    <p className="mt-6 text-xs text-white/25 mono">I'll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────
// PERSONALITY MODAL DATA
// ─────────────────────────────────────────────
const PERSONALITY_DATA = {
  coffee: {
    title: "Coffee Lover",
    accent: "#c8956c",
    accentGlow: "rgba(200,149,108,0.18)",
    accentBorder: "rgba(200,149,108,0.35)",
    sections: [
      {
        heading: "My Go-To Drinks",
        items: [
          { label: "Iced Oat Milk Latte", sub: "The everyday essential" },
          { label: "Cold Brew", sub: "When I need max focus" },
          { label: "Caramel Macchiato", sub: "Sweet treat mode" },
          { label: "Café Americano", sub: "Black, no sugar, deep work" },
        ],
      },
      {
        heading: "Shops I Actually Buy From",
        items: [
          { label: "Starbucks", sub: "Classic & consistent" },
          { label: "Coffee Bean", sub: "Underrated, chill vibes" },
          { label: "Figaro", sub: "Local fave, affordable" },
          { label: "Bo's Coffee", sub: "Filipino pride" },
          { label: "Local Cafés in Batangas", sub: "Hidden gems > chains" },
        ],
      },
    ],
  },
  anime: {
    title: "Anime & Games",
    accent: "#D71921",
    accentGlow: "rgba(215,25,33,0.15)",
    accentBorder: "rgba(215,25,33,0.35)",
    sections: [
      {
        heading: "Anime I've Watched & Loved",
        items: [
          { label: "Attack on Titan", sub: "Best ending in anime, period" },
          { label: "Fullmetal Alchemist: Brotherhood", sub: "The GOAT, no debate" },
          { label: "Jujutsu Kaisen", sub: "Animation that breaks the internet" },
          { label: "Demon Slayer", sub: "Mugen Train arc destroyed me" },
          { label: "Death Note", sub: "Changed how I think about smart characters" },
          { label: "Your Lie in April", sub: "I was not emotionally prepared" },
        ],
      },
      {
        heading: "Games I Play",
        items: [
          { label: "Valorant", sub: "FPS grind, occasional rage" },
          { label: "Genshin Impact", sub: "Gacha problem. Send help." },
          { label: "GTA V / Online", sub: "Chaos, always chaos" },
          { label: "Minecraft", sub: "Never stopped since 2013" },
          { label: "EA FC / FIFA", sub: "Weekend tournament ritual" },
        ],
      },
    ],
  },
  remote: {
    title: "Open for Remote Work",
    accent: "#8A8A85",
    accentGlow: "rgba(138,138,133,0.15)",
    accentBorder: "rgba(138,138,133,0.35)",
    sections: [
      {
        heading: "What I Can Do Remotely",
        items: [
          { label: "Frontend Development", sub: "React, Tailwind, responsive UI builds" },
          { label: "Backend & APIs", sub: "Laravel, Node.js, REST APIs" },
          { label: "UI/UX Design + Dev", sub: "From Figma mockup to live site" },
          { label: "Business Websites", sub: "Restaurants, clinics, agencies" },
          { label: "AI-Assisted Projects", sub: "Prompt engineering, LLM integration" },
          { label: "Bug Fixes & Maintenance", sub: "Legacy code cleanup, feature additions" },
        ],
      },
      {
        heading: "Work Setup & Availability",
        items: [
          { label: "Philippine Time (UTC+8)", sub: "Overlap-friendly with AU, SG, JP" },
          { label: "Async-first, always responsive", sub: "24-hr reply window max" },
          { label: "Tools: VS Code, Figma, GitHub, Notion", sub: "Standard modern stack" },
          { label: "Available: Freelance · Internship · Part-time", sub: "Open to contract or long-term" },
        ],
      },
    ],
  },
  aiAssisted: {
    title: "AI-Assisted Dev",
    accent: "#8A8A85",
    accentGlow: "rgba(138,138,133,0.15)",
    accentBorder: "rgba(138,138,133,0.35)",
    sections: [
      {
        heading: "How I Use It",
        items: [
          { label: "Clear, structured prompts", sub: "Writing prompts that get usable output on the first try" },
          { label: "Reviewing generated code", sub: "Reading it carefully, spotting issues, not copy-pasting blind" },
          { label: "Adapting to the project", sub: "Reshaping AI output to fit what the project actually needs" },
        ],
      },
    ],
  },
  problemSolver: {
    title: "Problem Solver",
    accent: "#8A8A85",
    accentGlow: "rgba(138,138,133,0.15)",
    accentBorder: "rgba(138,138,133,0.35)",
    sections: [
      {
        heading: "How I Work Through Issues",
        items: [
          { label: "Docs first", sub: "Official documentation before anything else" },
          { label: "Cross-referencing", sub: "Stack Overflow, GitHub issues, community threads" },
          { label: "Context-fit solutions", sub: "Adapting answers to my specific setup, not copying blindly" },
        ],
      },
    ],
  },
  clientReady: {
    title: "Client-Ready Work",
    accent: "#8A8A85",
    accentGlow: "rgba(138,138,133,0.15)",
    accentBorder: "rgba(138,138,133,0.35)",
    sections: [
      {
        heading: "Real Client Work",
        items: [
          { label: "Small business sites", sub: "Restaurants, clinics, agencies — real deployments" },
          { label: "Mobile-first delivery", sub: "Clean presentation, working contact flows" },
          { label: "Scope-aware execution", sub: "Delivering within a reasonable, realistic scope" },
        ],
      },
    ],
  },
};

// ─────────────────────────────────────────────
// PERSONALITY MODAL COMPONENT
// ─────────────────────────────────────────────
function PersonalityModal({ modalKey, onClose }) {
  const data = PERSONALITY_DATA[modalKey];
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.88, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="w-full max-w-lg rounded-3xl overflow-hidden"
          style={{
            background: "rgba(10, 10, 24, 0.98)",
            border: `1px solid ${data.accentBorder}`,
            boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.7), 0 0 60px ${data.accentGlow}`,
            maxHeight: "85vh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-7 pt-7 pb-5 flex items-center justify-between"
            style={{ background: `linear-gradient(135deg, ${data.accentGlow}, rgba(255,255,255,0.01))`, borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
            <div>
              <h3 className="text-white font-extrabold text-xl leading-tight">{data.title}</h3>
              <p className="mono text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>Click anywhere outside to close</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              aria-label="Close modal"
            >
              <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto px-7 py-5 space-y-6" style={{ maxHeight: "calc(85vh - 90px)" }}>
            {data.sections.map((section, si) => (
              <div key={si}>
                <p className="mono text-xs uppercase tracking-widest mb-3"
                  style={{ color: data.accent, opacity: 0.8 }}>
                  {section.heading}
                </p>
                <div className="space-y-2">
                  {section.items.map((item, ii) => (
                    <motion.div
                      key={ii}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: si * 0.08 + ii * 0.04, duration: 0.3 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{
                        background: `rgba(255,255,255,0.03)`,
                        border: `1px solid rgba(255,255,255,0.06)`,
                      }}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white leading-tight">{item.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>{item.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* Footer accent line */}
            <div className="pt-2 pb-1">
              <div className="h-px w-full rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${data.accent}50, transparent)` }} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const options = [
    { key: "system", label: "System", icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
    )},
    { key: "light", label: "Light", icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
    )},
    { key: "dark", label: "Dark", icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
    )},
  ];
  return (
    <div className="flex items-center gap-0.5 p-0.5" style={{ border: "1px solid var(--border-strong)", borderRadius: "8px", background: "var(--bg-elevated)" }}>
      {options.map((o) => {
        const active = theme === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onToggle(o.key)}
            aria-label={o.label}
            title={o.label}
            className="flex items-center justify-center transition-all duration-200"
            style={{
              width: 26, height: 26,
              borderRadius: "6px",
              background: active ? "#D71921" : "transparent",
              color: active ? "#fff" : "var(--text-muted)",
            }}
          >
            {o.icon}
          </button>
        );
      })}
    </div>
  );
}

function HalftonePhoto({ src, alt, size = 280 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const dim = size;
      canvas.width = dim * dpr;
      canvas.height = dim * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = dim;
      off.height = dim;
      const octx = off.getContext("2d");
      const scale = Math.max(dim / img.width, dim / img.height);
      const w = img.width * scale, h = img.height * scale;
      octx.drawImage(img, (dim - w) / 2, (dim - h) / 2, w, h);
      const imageData = octx.getImageData(0, 0, dim, dim).data;

      ctx.clearRect(0, 0, dim, dim);
      const cell = 5;
      for (let y = 0; y < dim; y += cell) {
        for (let x = 0; x < dim; x += cell) {
          let total = 0, count = 0;
          for (let dy = 0; dy < cell; dy++) {
            for (let dx = 0; dx < cell; dx++) {
              const px = x + dx, py = y + dy;
              if (px >= dim || py >= dim) continue;
              const i = (py * dim + px) * 4;
              total += 0.299 * imageData[i] + 0.587 * imageData[i + 1] + 0.114 * imageData[i + 2];
              count++;
            }
          }
          const avg = count ? total / count : 255;
          const darkness = 1 - avg / 255;
          const radius = (cell / 2) * Math.sqrt(darkness) * 1.05;
          if (radius > 0.35) {
            ctx.beginPath();
            ctx.arc(x + cell / 2, y + cell / 2, radius, 0, Math.PI * 2);
            ctx.fillStyle = "#0A0A0A";
            ctx.fill();
          }
        }
      }
    };
    img.src = src;
  }, [src, size]);

  return (
    <div style={{ width: size, height: size, background: "#EDEDE6", borderRadius: "4px", overflow: "hidden", flexShrink: 0 }}>
      <canvas ref={canvasRef} style={{ width: size, height: size, display: "block" }} role="img" aria-label={alt} />
    </div>
  );
}

function Lockscreen({ active, onFinish }) {
  const [phase, setPhase] = useState("boot"); // boot -> lock -> corners -> warp
  const [booted, setBooted] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [clock, setClock] = useState({ time: "", ampm: "", date: "", greeting: "" });
  const bootTimerRef = useRef(null);
  const highlightTimerRef = useRef(null);
  const phaseTimerRef = useRef(null);
  const finishTimerRef = useRef(null);
  const containerRef = useRef(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Boot sequence: reveal terminal lines, then loop a red highlight across them, then settle into the clock
  useEffect(() => {
    if (!active) return;
    setBooted(false);
    setHighlightIdx(0);
    if (prefersReducedMotion.current) {
      setPhase("lock");
      return;
    }
    setPhase("boot");
    const raf = requestAnimationFrame(() => setBooted(true));
    highlightTimerRef.current = setInterval(() => {
      setHighlightIdx((i) => (i + 1) % 3);
    }, 420);
    bootTimerRef.current = setTimeout(() => setPhase("lock"), 2800);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(highlightTimerRef.current);
      clearTimeout(bootTimerRef.current);
    };
  }, [active]);

  // Lock background scroll while the lockscreen is showing
  useEffect(() => {
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [active]);

  // Move focus onto the lockscreen when it appears, restore it on dismiss
  useEffect(() => {
    if (!active) return;
    const previouslyFocused = document.activeElement;
    containerRef.current?.focus();
    return () => { previouslyFocused?.focus?.(); };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const pad = (n) => n.toString().padStart(2, "0");
    const update = () => {
      const d = new Date();
      const h24 = d.getHours();
      const h12 = h24 % 12 || 12;
      const greeting = h24 < 5 ? "Late night" : h24 < 12 ? "Good morning" : h24 < 18 ? "Good afternoon" : "Good evening";
      setClock({
        time: `${h12}:${pad(d.getMinutes())}`,
        ampm: h24 >= 12 ? "PM" : "AM",
        date: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase(),
        greeting,
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    return () => {
      clearTimeout(bootTimerRef.current);
      clearInterval(highlightTimerRef.current);
      clearTimeout(phaseTimerRef.current);
      clearTimeout(finishTimerRef.current);
    };
  }, []);

  const triggerWarp = () => {
    if (phase === "boot") {
      clearTimeout(bootTimerRef.current);
      clearInterval(highlightTimerRef.current);
      setPhase("lock");
      return;
    }
    if (phase !== "lock") return;
    if (prefersReducedMotion.current) {
      // Skip the multi-stage animation entirely — straight fade
      setPhase("warp");
      finishTimerRef.current = setTimeout(() => onFinish?.(), 250);
      return;
    }
    setPhase("corners");
    phaseTimerRef.current = setTimeout(() => {
      setPhase("warp");
      finishTimerRef.current = setTimeout(() => onFinish?.(), 700);
    }, 380);
  };

  if (!active) return null;

  const reduced = prefersReducedMotion.current;
  const cornerBase = { position: "absolute", width: "clamp(10px, 3vw, 16px)", height: "clamp(10px, 3vw, 16px)", transition: reduced ? "none" : "opacity 0.4s ease, transform 0.4s ease", opacity: phase === "corners" ? 1 : 0, transform: phase === "corners" ? "scale(1)" : "scale(0.5)" };
  const cornerInset = "clamp(12px, 4vw, 20px)";
  const bootLine = (delay) => ({
    opacity: booted ? 1 : 0,
    transform: booted ? "translateY(0)" : "translateY(4px)",
    transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s, color 0.3s ease`,
  });
  const bootLines = [
    "> loading portfolio_",
    "> skills: react, laravel, ui/ux",
    "> status: open_to_work",
  ];

  return (
    <div
      ref={containerRef}
      onClick={triggerWarp}
      role="button"
      aria-label="Tap to enter site"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") triggerWarp(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 200, background: "#0A0A0A",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", opacity: phase === "warp" ? 0 : 1,
        transition: reduced ? "opacity 0.25s ease" : "opacity 0.6s ease",
        pointerEvents: phase === "warp" ? "none" : "auto",
        outline: "none",
      }}
    >
      {/* dot pattern — matches .dot-bg */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(138,138,133,0.35) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          transform: !reduced && phase === "warp" ? "scale(2.4)" : "scale(1)",
          opacity: phase === "warp" ? 0 : 1,
          transition: reduced ? "opacity 0.25s ease" : "transform 1s cubic-bezier(0.7,0,0.3,1), opacity 1s ease",
        }}
      />
      {/* grid lines — matches .grid-bg */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(138,138,133,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(138,138,133,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: !reduced && phase === "corners" ? 1 : 0,
          transition: reduced ? "none" : "opacity 0.6s ease",
        }}
      />
      {/* vignette — subtle dark falloff toward the edges */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
          opacity: phase === "warp" ? 0 : 1,
          transition: reduced ? "none" : "opacity 0.6s ease",
        }}
      />

      {/* corner brackets — matches .corner-tag accents */}
      <div style={{ ...cornerBase, top: cornerInset, left: cornerInset, borderTop: "1.5px solid #D71921", borderLeft: "1.5px solid #D71921", transitionDelay: reduced ? "0s" : "0.05s" }} />
      <div style={{ ...cornerBase, top: cornerInset, right: cornerInset, borderTop: "1.5px solid #D71921", borderRight: "1.5px solid #D71921", transitionDelay: reduced ? "0s" : "0.1s" }} />
      <div style={{ ...cornerBase, bottom: cornerInset, left: cornerInset, borderBottom: "1.5px solid #D71921", borderLeft: "1.5px solid #D71921", transitionDelay: reduced ? "0s" : "0.15s" }} />
      <div style={{ ...cornerBase, bottom: cornerInset, right: cornerInset, borderBottom: "1.5px solid #D71921", borderRight: "1.5px solid #D71921", transitionDelay: reduced ? "0s" : "0.2s" }} />

      {/* Boot sequence — terminal-style lines, with a red highlight looping across them */}
      {phase === "boot" && (
        <div style={{ position: "relative", textAlign: "left", fontFamily: "'Space Mono', monospace", fontSize: "clamp(11px, 2.6vw, 13px)" }}>
          {bootLines.map((line, i) => (
            <div
              key={line}
              style={{
                color: highlightIdx === i ? "#D71921" : "#6B6B66",
                marginTop: i === 0 ? 0 : "8px",
                ...bootLine(0.1 + i * 0.4),
              }}
            >
              {line}
            </div>
          ))}
        </div>
      )}

      <div style={{ position: "relative", textAlign: "center", padding: "0 24px", opacity: phase === "lock" ? 1 : 0, transition: "opacity 0.4s ease" }}>
        {/* Glyph light — pulsing dot row, nod to Nothing's Glyph interface */}
        {!reduced && (
          <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginBottom: "clamp(10px, 2.5vh, 16px)" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                style={{
                  width: 5, height: 5, borderRadius: "50%", background: "#D71921",
                  animation: "glyphPulse 1.6s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div style={{ color: "#5F5E5A", fontFamily: "'Space Mono', monospace", fontSize: "clamp(10px, 2vh, 11px)", letterSpacing: "2px", marginBottom: "clamp(6px, 1.5vh, 10px)" }}>
          {clock.date}
        </div>

        {/* Ambient glow behind the clock, looping regardless of tap state */}
        <div style={{ position: "relative" }}>
          {!reduced && (
            <div
              style={{
                position: "absolute", inset: "-20% -10%", zIndex: -1,
                background: "radial-gradient(ellipse at center, rgba(215,25,33,0.16), transparent 70%)",
                filter: "blur(20px)",
                animation: "ambientGlow 4s ease-in-out infinite",
              }}
            />
          )}
          <div style={{ color: "#F5F5F0", fontFamily: "'Space Mono', monospace", fontSize: "clamp(28px, min(9.5vw, 12vh), 60px)", fontWeight: 500, letterSpacing: "1px" }}>
            {clock.time} <span style={{ fontSize: "0.4em", color: "#8A8A85", letterSpacing: "1px" }}>{clock.ampm}</span>
          </div>
        </div>

        <div style={{ color: "#8A8A85", fontFamily: "'Space Mono', monospace", fontSize: "clamp(10px, 2vh, 11px)", marginTop: "clamp(6px, 1.5vh, 10px)" }}>
          {clock.greeting}
        </div>
        <div style={{ color: "#F5F5F0", fontSize: "clamp(13px, 2.5vh, 16px)", marginTop: "clamp(6px, 1.5vh, 10px)", fontWeight: 500 }}>Kim Ivan Ebora</div>
        <div style={{ color: "#8A8A85", fontSize: "clamp(10px, 2vh, 12px)", marginTop: "2px", letterSpacing: "1px", textTransform: "uppercase" }}>
          IT Graduate
        </div>

        {/* Stat widgets — quick-glance facts, like real lockscreen widgets */}
        <div style={{ display: "flex", gap: "8px", marginTop: "clamp(12px, 2.5vh, 18px)", width: "min(260px, 70vw)" }}>
          {[
            { val: "3", label: "Projects" },
            { val: "8", label: "Skills" },
            { val: "Open", label: "To Work", accent: true },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1, borderRadius: 6, padding: "6px 4px", textAlign: "center",
                border: `1px solid ${s.accent ? "rgba(215,25,33,0.35)" : "rgba(255,255,255,0.12)"}`,
              }}
            >
              <div style={{ color: s.accent ? "#D71921" : "#F5F5F0", fontFamily: "'Space Mono', monospace", fontSize: "clamp(11px, 1.8vh, 13px)", fontWeight: 500 }}>{s.val}</div>
              <div style={{ color: "#5F5E5A", fontSize: "clamp(7px, 1.2vh, 8px)", textTransform: "uppercase", marginTop: 2, letterSpacing: "0.5px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ color: "#5F5E5A", fontSize: "clamp(9px, 1.6vh, 10px)", marginTop: "clamp(10px, 2vh, 14px)", letterSpacing: "0.5px" }}>
          Batangas City · Available
        </div>

        <div style={{ color: "#8A8A85", fontSize: "11px", marginTop: "clamp(12px, 4vh, 24px)", letterSpacing: "0.5px", animation: reduced ? "none" : "breathe 2.2s ease-in-out infinite" }}>
          tap to enter
        </div>
      </div>

      <style>{`
        @keyframes glyphPulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes ambientGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.95; }
        }
      `}</style>
    </div>
  );
}

// ── Reviews — public star rating + comment, backed by Firestore ──
function StarInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className="text-2xl leading-none transition-transform hover:scale-110"
          style={{ color: (hover || value) >= n ? "#D71921" : "var(--border-strong)" }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ rating, size = "text-sm" }) {
  return (
    <span className={`${size} leading-none`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ color: n <= rating ? "#D71921" : "var(--border-strong)" }}>★</span>
      ))}
    </span>
  );
}

function timeAgo(date) {
  if (!date) return "";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const units = [
    ["year", 31536000], ["month", 2592000], ["day", 86400],
    ["hour", 3600], ["minute", 60],
  ];
  for (const [label, secs] of units) {
    const n = Math.floor(seconds / secs);
    if (n >= 1) return `${n} ${label}${n > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real users never fill this
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Pinned reviews float to the top; everything else stays newest-first
        list.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
        setReviews(list);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (website.trim() !== "") return; // honeypot tripped — silently drop
    const trimmedName = name.trim();
    const trimmedComment = comment.trim();

    if (!trimmedName) return setError("Please enter your name.");
    if (trimmedName.length > 50) return setError("Name is too long (max 50 characters).");
    if (rating < 1 || rating > 5) return setError("Please select a star rating.");
    if (!trimmedComment) return setError("Please write a short comment.");
    if (trimmedComment.length > 300) return setError("Comment is too long (max 300 characters).");

    setSubmitting(true);
    try {
      await addDoc(collection(db, "reviews"), {
        name: trimmedName,
        rating,
        comment: trimmedComment,
        createdAt: serverTimestamp(),
      });
      setName("");
      setRating(0);
      setComment("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError("Something went wrong submitting your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="mb-16">
          <span className="mono text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>05 — Reviews</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
            <span style={{ color: "var(--text)" }}>What People </span>
            <span className="gradient-text">Say</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
           Worked with me or have something to share? Leave a review below — I’d love to hear about your experience.
          </p>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mt-5">
              <StarDisplay rating={Math.round(avg)} size="text-lg" />
              <span className="mono text-sm" style={{ color: "var(--text-secondary)" }}>
                {avg.toFixed(1)} average · {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="rounded-2xl p-6 md:p-7" style={{ background: "var(--surface-solid)", border: "1px solid var(--border)" }}>
              {/* Honeypot — hidden from real users, bots tend to fill every field */}
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                aria-hidden="true"
              />

              <label className="block mb-4">
                <span className="mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Your rating</span>
                <div className="mt-2">
                  <StarInput value={rating} onChange={setRating} />
                </div>
              </label>

              <label className="block mb-4">
                <span className="mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  placeholder="Your name"
                  className="mt-2 w-full rounded-lg px-3 py-2.5 text-sm outline-none"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text)" }}
                />
              </label>

              <label className="block mb-4">
                <span className="mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Comment</span>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={300}
                  rows={4}
                  placeholder="What was it like working with me?"
                  className="mt-2 w-full rounded-lg px-3 py-2.5 text-sm outline-none resize-none"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text)" }}
                />
                <span className="mono text-xs mt-1 block text-right" style={{ color: "var(--text-muted)" }}>{comment.length}/300</span>
              </label>

              {error && <p className="text-xs mb-3" style={{ color: "#D71921" }}>{error}</p>}
              {submitted && <p className="text-xs mb-3" style={{ color: "#22c55e" }}>Thanks — your review is live!</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-all hover:brightness-110 disabled:opacity-50"
                style={{ background: "#D71921", color: "#fff" }}
              >
                {submitting ? "Submitting…" : "Submit Review"}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="flex flex-col gap-4 max-h-[520px] overflow-y-auto pr-1">
            {loading ? (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading reviews…</p>
            ) : reviews.length === 0 ? (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>No reviews yet — be the first to leave one.</p>
            ) : (
              reviews.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl p-5"
                  style={{
                    background: "var(--surface-solid)",
                    border: r.pinned ? "1px solid rgba(215,25,33,0.35)" : "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{r.name}</span>
                      {r.pinned && (
                        <span className="mono text-xs uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ color: "#D71921", border: "1px solid rgba(215,25,33,0.35)" }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <StarDisplay rating={r.rating} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{r.comment}</p>
                  {r.createdAt?.toDate && (
                    <p className="mono text-xs mt-2" style={{ color: "var(--text-muted)" }}>{timeAgo(r.createdAt.toDate())}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ theme, resolvedTheme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showLock, setShowLock] = useState(() => {
    try { return !sessionStorage.getItem("lockscreen_shown"); } catch { return true; }
  });

  // Close modal on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setActiveModal(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const full = "Kim Ivan Ebora.";
    let index = 0;
    let deleting = false;
    let timeoutId;

    const step = () => {
      setTypedText(full.slice(0, index));

      if (!deleting) {
        if (index < full.length) {
          index += 1;
          timeoutId = setTimeout(step, 90);
        } else {
          deleting = true;
          timeoutId = setTimeout(step, 1200);
        }
      } else {
        if (index > 0) {
          index -= 1;
          timeoutId = setTimeout(step, 50);
        } else {
          deleting = false;
          timeoutId = setTimeout(step, 500);
        }
      }
    };

    timeoutId = setTimeout(step, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Monthly visit count — real, via a free public counter API.
  // "Viewing now" is simulated (no backend/presence service wired up yet).
  const [monthlyVisits, setMonthlyVisits] = useState(null);
  const [viewingNow, setViewingNow] = useState(3);

  useEffect(() => {
    const monthKey = new Date().toISOString().slice(0, 7); // YYYY-MM
    fetch(`https://api.counterapi.dev/v1/kim-ebora-portfolio/visits-${monthKey}/up`)
      .then((r) => r.json())
      .then((data) => setMonthlyVisits(data?.count ?? null))
      .catch(() => setMonthlyVisits(null));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setViewingNow((v) => Math.max(1, Math.min(9, v + (Math.random() > 0.5 ? 1 : -1))));
    }, 9000);
    return () => clearInterval(id);
  }, []);

  return (
    <div data-theme={resolvedTheme} className="min-h-screen selection:bg-[#D71921]/30" style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'Space Grotesk', sans-serif", transition: "background 0.4s ease, color 0.4s ease" }}>

      <Lockscreen
        active={showLock}
        onFinish={() => {
          setShowLock(false);
          try { sessionStorage.setItem("lockscreen_shown", "1"); } catch {}
        }}
      />

      {/* Personality Modals */}
      <AnimatePresence>
        {activeModal && (
          <PersonalityModal key={activeModal} modalKey={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;500;700&family=DotGothic16&display=swap');
        :root {
          --bg: #0A0A0A;
          --bg-elevated: #ffffff08;
          --surface-solid: #161616;
          --text: #F5F5F0;
          --text-secondary: rgba(245,245,240,0.55);
          --text-muted: #8A8A85;
          --border: rgba(255,255,255,0.08);
          --border-strong: rgba(255,255,255,0.15);
          --dot-color: rgba(138,138,133,0.09);
        }
        [data-theme="light"] {
          --bg: #F2F1EC;
          --bg-elevated: #00000006;
          --surface-solid: #FAFAF7;
          --text: #0A0A0A;
          --text-secondary: rgba(10,10,10,0.6);
          --text-muted: #6B6B66;
          --border: rgba(10,10,10,0.1);
          --border-strong: rgba(10,10,10,0.2);
          --dot-color: rgba(107,107,102,0.12);
        }
        [data-theme="light"] [class~="text-white"],
        [data-theme="light"] [class*="text-white/80"] { color: rgba(10,10,10,0.85) !important; }
        [data-theme="light"] [class*="text-white/75"] { color: rgba(10,10,10,0.8) !important; }
        [data-theme="light"] [class*="text-white/70"] { color: rgba(10,10,10,0.75) !important; }
        [data-theme="light"] [class*="text-white/60"] { color: rgba(10,10,10,0.68) !important; }
        [data-theme="light"] [class*="text-white/55"] { color: rgba(10,10,10,0.6) !important; }
        [data-theme="light"] [class*="text-white/50"] { color: rgba(10,10,10,0.56) !important; }
        [data-theme="light"] [class*="text-white/45"] { color: rgba(10,10,10,0.52) !important; }
        [data-theme="light"] [class*="text-white/40"] { color: rgba(10,10,10,0.48) !important; }
        [data-theme="light"] [class*="text-white/35"] { color: rgba(10,10,10,0.44) !important; }
        [data-theme="light"] [class*="text-white/30"] { color: rgba(10,10,10,0.4) !important; }
        [data-theme="light"] [class*="text-white/25"] { color: rgba(10,10,10,0.36) !important; }
        [data-theme="light"] [class*="text-white/20"] { color: rgba(10,10,10,0.32) !important; }
        [data-theme="light"] [class~="hover:text-white"]:hover,
        [data-theme="light"] [class*="hover:text-white/70"]:hover { color: rgba(10,10,10,0.85) !important; }
        [data-theme="light"] [class*="bg-white/5"] { background: rgba(10,10,10,0.04) !important; }
        [data-theme="light"] [class*="bg-white/10"] { background: rgba(10,10,10,0.06) !important; }
        [data-theme="light"] [class*="bg-white/30"] { background: rgba(10,10,10,0.15) !important; }
        [data-theme="light"] [class*="hover:bg-white/5"]:hover { background: rgba(10,10,10,0.05) !important; }
        [data-theme="light"] [class*="hover:bg-white/10"]:hover { background: rgba(10,10,10,0.08) !important; }
        [data-theme="light"] [class*="border-white/5"] { border-color: rgba(10,10,10,0.08) !important; }
        [data-theme="light"] [class*="border-white/10"] { border-color: rgba(10,10,10,0.12) !important; }
        [data-theme="light"] [class*="border-white/15"] { border-color: rgba(10,10,10,0.16) !important; }
        [data-theme="light"] [class*="border-white/20"] { border-color: rgba(10,10,10,0.2) !important; }
        * { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: #8A8A8550; border-radius: 2px; }
        .dot-bg {
          background-image: radial-gradient(var(--dot-color) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(138,138,133,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(138,138,133,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes gradient-x { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes fade-slide-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink-cursor { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes badge-float-in { from { opacity: 0; transform: translateY(12px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes float-b1 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(-5px,-9px)} 66%{transform:translate(4px,-5px)} }
        @keyframes float-b2 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(6px,-7px)} 66%{transform:translate(-4px,5px)} }
        @keyframes float-b3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-7px,9px)} }
        @keyframes float-b4 { 0%,100%{transform:translate(0,0)} 40%{transform:translate(5px,8px)} 70%{transform:translate(-3px,-6px)} }
        @keyframes photo-ring { 0%,100%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes code-card-float { 0%,100%{transform:translate(0,0) rotate(-2deg)} 50%{transform:translate(-4px,-8px) rotate(-2deg)} }
        @keyframes git-badge-float { 0%,100%{transform:translate(0,0) rotate(1deg)} 50%{transform:translate(5px,6px) rotate(1deg)} }
        .float-anim { animation: float 7s ease-in-out infinite; }
        .gradient-text {
          color: #D71921;
        }
        .glass {
          background: var(--bg-elevated);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border);
        }
        .glass-nav {
          background: color-mix(in srgb, var(--bg) 88%, transparent);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
        }
        .corner-tag { position: relative; }
        .corner-tag::before, .corner-tag::after {
          content: ''; position: absolute; width: 8px; height: 8px;
        }
        .corner-tag::before { top: -1px; left: -1px; border-top: 1px solid #D71921; border-left: 1px solid #D71921; }
        .corner-tag::after { bottom: -1px; right: -1px; border-bottom: 1px solid #D71921; border-right: 1px solid #D71921; }
        .mono { font-family: 'Space Mono', monospace; }
        .stagger-1 { animation: fade-slide-up 0.55s ease both; animation-delay: 0.1s; }
        .stagger-2 { animation: fade-slide-up 0.55s ease both; animation-delay: 0.3s; }
        .stagger-3 { animation: fade-slide-up 0.55s ease both; animation-delay: 0.5s; }
        .stagger-4 { animation: fade-slide-up 0.55s ease both; animation-delay: 0.7s; }
        .stagger-5 { animation: fade-slide-up 0.55s ease both; animation-delay: 0.9s; }
        .stagger-6 { animation: fade-slide-up 0.55s ease both; animation-delay: 1.1s; }
        .stagger-7 { animation: fade-slide-up 0.55s ease both; animation-delay: 1.3s; }
        .cursor-blink { animation: blink-cursor 1s step-end infinite; }
        .badge-float-in { animation: badge-float-in 0.5s ease forwards; }
        .photo-ring-spin { animation: photo-ring 18s linear infinite; }
        .photo-card { animation: float 6s ease-in-out infinite; }
        .code-card-anim { animation: badge-float-in 0.5s ease forwards 1.1s, code-card-float 7s ease-in-out 2s infinite; opacity:0; }
        .git-badge-anim { animation: badge-float-in 0.5s ease forwards 2.5s, git-badge-float 8s ease-in-out 3.3s infinite; opacity:0; }
        .tech-badge-item { opacity: 0; }
        .tech-b1 { animation: badge-float-in 0.5s ease forwards 0.4s, float-b1 6s ease-in-out 1.2s infinite; }
        .tech-b2 { animation: badge-float-in 0.5s ease forwards 0.7s, float-b2 7s ease-in-out 1.5s infinite; }
        .tech-b3 { animation: badge-float-in 0.5s ease forwards 1.0s, float-b3 8s ease-in-out 1.8s infinite; }
        .tech-b4 { animation: badge-float-in 0.5s ease forwards 1.3s, float-b4 6.5s ease-in-out 2.1s infinite; }
        @media (max-width: 768px) {
          .code-card-anim {
            top: 10px !important;
            right: 10px !important;
            left: auto !important;
          }
          .tech-b1 {
            top: 10px !important;
            left: 10px !important;
            right: auto !important;
          }
          .tech-b2 {
            top: auto !important;
            bottom: 110px !important;
            right: 10px !important;
            left: auto !important;
          }
          .tech-b3 {
            bottom: 60px !important;
            left: 10px !important;
            right: auto !important;
          }
          .tech-b4 {
            bottom: 10px !important;
            right: 10px !important;
            left: auto !important;
          }
          .git-badge-anim {
            bottom: 10px !important;
            left: 10px !important;
            right: auto !important;
          }
        }
      `}</style>

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(138,138,133,0.12), transparent)", top: "8%", left: "2%", filter: "blur(80px)" }} />
        <div className="absolute w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(138,138,133,0.09), transparent)", top: "55%", right: "3%", filter: "blur(80px)" }} />
        <div className="absolute w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(215,25,33,0.06), transparent)", bottom: "15%", left: "38%", filter: "blur(60px)" }} />
      </div>

      {/* SIDEBAR (desktop) */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-40" style={{ width: "248px", borderRight: "1px solid var(--border)", background: "var(--bg)", padding: "28px 20px" }}>
        <span className="mono text-sm tracking-widest uppercase flex items-center gap-2 mb-8">
          <span style={{ width: 10, height: 10, border: "2px solid #D71921", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
          Kim Ivan Ebora
        </span>

        <nav className="flex flex-col gap-0.5">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} className="mono text-left px-2.5 py-2 text-xs tracking-widest uppercase rounded-md transition-all duration-200 text-white/50 hover:text-white hover:bg-white/5">
              {l}
            </button>
          ))}
        </nav>

        <div className="my-5" style={{ borderTop: "1px solid var(--border)" }} />

        <Link to="/freelance" className="mono px-2.5 py-2 text-xs tracking-widest uppercase rounded-md transition-all duration-200 hover:bg-white/5" style={{ color: "#D71921" }}>
          Let's Work Together
        </Link>

        <div className="flex-1" />

        {/* Visit stats */}
        <div className="mono text-xs mb-4" style={{ color: "var(--text-muted)" }}>
          <div className="flex items-center gap-2 mb-1">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#D71921", display: "inline-block", animation: "blink-cursor 2s step-end infinite" }} />
            <span>{viewingNow} viewing today</span>
          </div>
          <div>{monthlyVisits !== null ? monthlyVisits.toLocaleString() : "—"} visits this month</div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={() => setShowLock(true)}
            title="Replay lockscreen intro"
            aria-label="Replay lockscreen intro"
            className="flex items-center justify-center transition-all duration-200 hover:bg-white/5"
            style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border)", color: "var(--text-muted)", background: "transparent", cursor: "pointer" }}
          >
            ⏱
          </button>
        </div>

        <div className="mono text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          For work &amp; everything else, reach me at<br />
          <a href="mailto:ebora.kimivan@gmail.com" className="hover:text-[#D71921] transition-colors" style={{ color: "var(--text)" }}>ebora.kimivan@gmail.com</a>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <nav className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav" : ""}`} style={{ borderBottom: scrolled ? undefined : "1px solid var(--border)" }}>
        <div className="px-5 sm:px-8 py-4 max-w-3xl mx-auto flex items-center justify-between">
          <span className="mono text-sm tracking-widest uppercase flex items-center gap-2">
            <span style={{ width: 10, height: 10, border: "2px solid #D71921", borderRadius: "50%", display: "inline-block" }} />
            kim.dev
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              onClick={() => setShowLock(true)}
              title="Replay lockscreen intro"
              aria-label="Replay lockscreen intro"
              className="flex items-center justify-center transition-all duration-200 hover:bg-white/5"
              style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border)", color: "var(--text-muted)", background: "transparent", cursor: "pointer" }}
            >
              ⏱
            </button>
            <button className="text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="glass-nav px-5 sm:px-8 pb-5 max-w-3xl mx-auto flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l)} className="mono py-3 text-left text-xs tracking-widest uppercase text-white/60 hover:text-white border-b border-white/5 last:border-0">
                {l}
              </button>
            ))}
            <Link to="/freelance" onClick={() => setMenuOpen(false)} className="mono py-3 text-left text-xs tracking-widest uppercase border-b border-white/5" style={{ color: "#D71921" }}>
              Let's Work Together
            </Link>
            <div className="mono text-xs pt-3 flex items-center justify-between" style={{ color: "var(--text-muted)" }}>
              <span>{viewingNow} viewing today</span>
              <span>{monthlyVisits !== null ? monthlyVisits.toLocaleString() : "—"} this month</span>
            </div>
            <a
              href="mailto:ebora.kimivan@gmail.com"
              className="mono mt-3 py-2.5 text-xs tracking-widest uppercase text-center border transition-all hover:brightness-110"
              style={{ color: "#D71921", borderColor: "#D71921" }}
              onClick={() => setMenuOpen(false)}
            >
              Let's Talk
            </a>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT (offset by sidebar on desktop, lg+) */}
      <div className="lg:pl-[248px]">

      {/* ── HERO / ABOUT ── */}
      <section id="about" className="relative dot-bg pt-24 md:pt-28 pb-16 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-10 w-full">
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 md:items-start">
            <div className="flex items-center gap-4 sm:gap-5 md:shrink-0">
              <img
                src={myImage}
                alt="Kim Ivan B. Ebora"
                className="w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] md:w-[190px] md:h-[190px] lg:w-[220px] lg:h-[220px] object-cover object-top shrink-0"
                style={{ borderRadius: "4px", border: "1px solid var(--border)" }}
              />

              <h1 className="md:hidden mono text-2xl sm:text-3xl font-bold flex-1 min-w-0" style={{ letterSpacing: "0.5px" }}>
                {typedText}<span className="cursor-blink inline-block" style={{ width: "3px", height: "0.9em", background: "#D71921", verticalAlign: "-0.1em", marginLeft: "2px" }} />
              </h1>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="hidden md:block mono text-3xl md:text-4xl font-bold mb-3" style={{ letterSpacing: "0.5px" }}>
                {typedText}<span className="cursor-blink inline-block" style={{ width: "3px", height: "0.9em", background: "#D71921", verticalAlign: "-0.1em", marginLeft: "2px" }} />
              </h1>

              {/* Degree badge — full-width inline credential, matches the pill language */}
              <div className="mono text-xs rounded-lg px-3 py-2 inline-flex items-center gap-2 mb-4 mt-2 md:mt-0 flex-wrap" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text-secondary)" }}>BSIT – Network Technology</span>
                <span style={{ color: "var(--border-strong)" }}>·</span>
                <span style={{ color: "var(--text-muted)" }}>Batangas State University – Alangilan · 2026</span>
              </div>

              <p className="leading-relaxed max-w-xl text-[15px] mb-3" style={{ color: "var(--text-secondary)" }}>
                An aspiring IT professional passionate about learning, innovation, and web development —
                constantly exploring new technologies and sharpening his skills through hands-on
                experience and continuous research.
              </p>
              <p className="leading-relaxed max-w-xl text-[15px] mb-5" style={{ color: "var(--text-secondary)" }}>
                Based in Batangas City, Philippines. Currently open to opportunities and freelance work.
              </p>

              <div className="mono text-xs flex flex-wrap items-center gap-x-1 gap-y-2 mb-5" style={{ color: "var(--text-muted)" }}>
                <a href="https://github.com/Cayban" target="_blank" rel="noreferrer" className="hover:text-[#D71921] transition-colors px-1">github ↗</a>
                <span>·</span>
                <a href="https://www.linkedin.com/in/kim-ivan-ebora-a44014405" target="_blank" rel="noreferrer" className="hover:text-[#D71921] transition-colors px-1">linkedin ↗</a>
                <span>·</span>
                <a href="mailto:ebora.kimivan@gmail.com" className="hover:text-[#D71921] transition-colors px-1">email</a>
              </div>

              {/* Personality pills */}
              <div className="flex flex-wrap gap-2">
                <span className="mono text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-transform hover:scale-105 hover:text-white" style={{ border: "1px solid rgba(34,197,94,0.3)", color: "var(--text-secondary)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "blink-cursor 2s step-end infinite" }} />
                  Looking for opportunities
                </span>
                <span className="mono text-xs px-2.5 py-1 rounded-full transition-transform hover:scale-105 hover:text-white" style={{ border: "1px solid rgba(138,138,133,0.35)", color: "var(--text-secondary)" }}>
                  Open to remote work
                </span>
                <span className="mono text-xs px-2.5 py-1 rounded-full transition-transform hover:scale-105 hover:text-white" style={{ border: "1px solid rgba(215,25,33,0.4)", color: "var(--text-secondary)" }}>
                  anime &amp; games
                </span>
              </div>

              {/* Skill-highlight pills */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="mono text-xs px-2.5 py-1 rounded-full transition-transform hover:scale-105 hover:text-white" style={{ border: "1px solid rgba(138,138,133,0.35)", color: "var(--text-secondary)" }}>
                  AI-assisted dev
                </span>
                <span className="mono text-xs px-2.5 py-1 rounded-full transition-transform hover:scale-105 hover:text-white" style={{ border: "1px solid rgba(138,138,133,0.35)", color: "var(--text-secondary)" }}>
                  Problem solver
                </span>
                <span className="mono text-xs px-2.5 py-1 rounded-full transition-transform hover:scale-105 hover:text-white" style={{ border: "1px solid rgba(138,138,133,0.35)", color: "var(--text-secondary)" }}>
                  Client-ready work
                </span>
              </div>
            </div>
          </div>

          {/* STATS ROW */}
          <div className="mt-14 pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "1.75rem 0" }}>
              {[["3", "Projects Completed"], ["8", "Core Skills"], ["2+", "Years Coding"], ["100%", "Client Satisfaction"]].map(([val, label]) => (
                <div key={label}>
                  <div className="mono text-2xl font-bold">{val}</div>
                  <div className="mono text-xs uppercase tracking-widest mt-1" style={{ color: "var(--text-muted)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <button onClick={() => scrollTo("Projects")} className="mono px-6 py-3 text-xs uppercase tracking-widest transition-all duration-200 hover:brightness-110" style={{ background: "#D71921", color: "#fff" }}>
              View Projects →
            </button>
            <button onClick={() => scrollTo("Contact")} className="mono px-6 py-3 text-xs uppercase tracking-widest transition-all duration-200 border hover:bg-white/5" style={{ borderColor: "var(--border-strong)" }}>
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="relative py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <span className="mono text-xs text-white/25 tracking-widest uppercase">02 — Skills</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
              <span style={{ color: "var(--text)" }}>What I </span>
              <span className="gradient-text">Can Do</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-14">
            {/* Proficiency bars */}
            <div>
              <h3 className="mono text-xs text-white/30 uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="w-6 h-px bg-[#D71921]/50" /> Technical Skills
              </h3>
              <div className="space-y-5">
                {SKILLS_CAN_DO.map((s, i) => (
                  <SkillBar key={s.name} {...s} delay={i * 80} />
                ))}
              </div>

              {/* Tech tags */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="mono text-xs text-white/25 uppercase tracking-widest mb-4">Technologies &amp; Tools</p>
                <div className="flex flex-wrap gap-2">
                  {TECH_TAGS.map((t) => (
                    <span key={t} className="mono text-xs px-3 py-1.5 rounded-lg text-white/60 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Non-technical skills */}
            <div>
              <h3 className="mono text-xs text-white/30 uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="w-6 h-px bg-[#8A8A85]/50" /> Non-Technical Skills
              </h3>
              <div className="space-y-5">
                {SOFT_SKILLS.map((s, i) => (
                  <SkillBar key={s.name} {...s} delay={i * 80} />
                ))}
              </div>

              {/* Quote — aligned with Technologies on the other column */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="glass rounded-2xl p-6" style={{ border: "1px solid rgba(215,25,33,0.1)" }}>
                  <p className="text-sm text-white/45 leading-relaxed italic">
                    "I believe learning never stops. I'm always open to learning new tools, improving my skills, and exploring better ways to grow and contribute to every project."
                  </p>
                  <p className="mt-3 mono text-xs text-white/25">— Kim Ivan Ebora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE & CERTIFICATION ── */}
      <section id="experience" className="relative py-24">
        <div className="absolute inset-0 dot-bg opacity-40" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="mb-16">
            <span className="mono text-xs text-white/25 tracking-widest uppercase">03 — Experience &amp; Certification</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
              <span style={{ color: "var(--text)" }}>Where I've </span>
              <span className="gradient-text">Worked</span>
            </h2>
            <p className="text-white/40 mt-3 max-w-xl text-sm leading-relaxed">
              {EXPERIENCE.summary}
            </p>
          </div>

          <div className="max-w-3xl relative pl-9">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "var(--border)" }} />

            {/* Milestone: OJT Internship */}
            <div className="relative pb-14">
              <span className="absolute -left-9 top-1.5 w-3.5 h-3.5 rounded-full" style={{ background: "#D71921", border: "3px solid var(--bg)" }} />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {EXPERIENCE.role}
                </h3>
                <span className="mono text-xs flex-shrink-0 flex flex-col sm:items-end" style={{ color: "#D71921" }}>
                  {EXPERIENCE.duration}
                  <span className="text-white/30 mt-0.5">Feb 2026 – May 2026</span>
                </span>
              </div>
              <p className="text-sm text-white/40 mb-3">{EXPERIENCE.org}</p>
              <ul className="space-y-2.5">
                {EXPERIENCE.highlights.map((h) => (
                  <li key={h.title} className="text-sm leading-relaxed flex items-start gap-2.5" style={{ color: "var(--text-secondary)" }}>
                    <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ background: "#D71921" }} />
                    <span>
                      <span className="text-white/80 font-medium">{h.title}.</span> {h.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Milestone: Certification */}
            <div className="relative pb-2">
              <span className="absolute -left-9 top-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: "#22c55e", border: "3px solid var(--bg)" }} />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  NC II – Computer Systems Servicing
                </h3>
                <span className="mono text-xs flex-shrink-0 flex flex-col sm:items-end" style={{ color: "#22c55e" }}>
                  Certified
                  <span className="text-white/30 mt-0.5">July 2026 – September 2026</span>
                </span>
              </div>
              <p className="text-sm text-white/40">TESDA National Certificate II · Computer Servicing</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative py-24">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="mb-16">
            <span className="mono text-xs text-white/25 tracking-widest uppercase">04 — Projects</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
              <span style={{ color: "var(--text)" }}>Things I've </span>
              <span className="gradient-text">Built</span>
            </h2>
            <p className="text-white/40 mt-3 max-w-xl text-sm leading-relaxed">
              A collection of real-world projects developed for businesses, offices, and clinics — each solving a genuine problem with practical technology.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Featured card — LAD Enterprises */}
            <FeaturedCard project={PROJECTS[0]} />
            {/* Two smaller cards */}
            <div className="grid md:grid-cols-2 gap-5">
              <SmallCard project={PROJECTS[1]} />
              <SmallCard project={PROJECTS[2]} />
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="mono text-xs text-white/25 tracking-widest uppercase">06 — Contact</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
              <span style={{ color: "var(--text)" }}>Let's </span>
              <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-white/40 mt-3 text-sm">Open to freelance projects, collaborations, internships, and full-time opportunities.</p>
          </div>

          <style>{`
            @keyframes contactFadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes orbitSpin {
              from { transform: rotate(0deg) translateX(54px) rotate(0deg); }
              to   { transform: rotate(360deg) translateX(54px) rotate(-360deg); }
            }
            @keyframes cardReveal {
              from { opacity: 0; transform: translateX(-14px); }
              to   { opacity: 1; transform: translateX(0); }
            }
            @keyframes lineGrow {
              from { width: 0; }
              to   { width: 100%; }
            }
            .contact-wrap {
              animation: contactFadeUp 0.6s ease both;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 0;
              border-radius: 2rem;
              overflow: hidden;
              border: 1px solid rgba(255,255,255,0.07);
            }
            @media (max-width: 768px) {
              .contact-wrap { grid-template-columns: 1fr; }
            }
            .contact-left {
              padding: 2.5rem;
              background: rgba(215,25,33,0.04);
              border-right: 1px solid var(--border);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 2rem;
            }
            .contact-right {
              padding: 2.5rem;
              background: var(--bg-elevated);
              display: flex;
              flex-direction: column;
              gap: 0.875rem;
            }
            .contact-avatar {
              width: 64px;
              height: 64px;
              border-radius: 50%;
              background: linear-gradient(135deg, rgba(215,25,33,0.2), rgba(138,138,133,0.2));
              border: 1px solid rgba(215,25,33,0.2);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.6rem;
              position: relative;
            }
            .status-dot {
              position: absolute;
              bottom: 3px;
              right: 3px;
              width: 13px;
              height: 13px;
              border-radius: 50%;
              background: #22c55e;
              border: 2px solid #0d0d16;
            }
            .meta-row {
              display: flex;
              align-items: center;
              gap: 0.6rem;
              animation: cardReveal 0.5s ease both;
            }
            .meta-icon {
              width: 32px;
              height: 32px;
              border-radius: 8px;
              background: var(--bg-elevated);
              border: 1px solid var(--border);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 0.85rem;
              flex-shrink: 0;
            }
            .reach-card {
              display: flex;
              align-items: center;
              gap: 1rem;
              padding: 1rem 1.125rem;
              border-radius: 1rem;
              border: 1px solid var(--border);
              background: var(--bg-elevated);
              text-decoration: none;
              position: relative;
              overflow: hidden;
              transition: background 0.22s, border-color 0.22s, transform 0.22s;
              animation: cardReveal 0.45s ease both;
            }
            .reach-card::after {
              content: '';
              position: absolute;
              left: 0; top: 0; bottom: 0;
              width: 3px;
              border-radius: 0 2px 2px 0;
              background: var(--rc-accent, rgba(215,25,33,0.5));
              opacity: 0;
              transform: scaleY(0);
              transition: opacity 0.2s, transform 0.2s;
              transform-origin: center;
            }
            .reach-card:hover {
              background: var(--border);
              border-color: var(--border-strong);
              transform: translateX(4px);
            }
            .reach-card:hover::after {
              opacity: 1;
              transform: scaleY(1);
            }
            .reach-logo {
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 0.75rem;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.1rem;
              flex-shrink: 0;
              background: var(--rc-logo-bg, rgba(215,25,33,0.08));
              border: 1px solid var(--rc-logo-border, rgba(215,25,33,0.15));
              transition: transform 0.22s;
            }
            .reach-card:hover .reach-logo {
              transform: scale(1.1);
            }
            .reach-arrow {
              margin-left: auto;
              font-size: 0.8rem;
              opacity: 0.25;
              transition: opacity 0.2s, transform 0.2s;
              flex-shrink: 0;
            }
            .reach-card:hover .reach-arrow {
              opacity: 0.8;
              transform: translateX(3px);
            }
            .preferred-tag {
              font-size: 0.6rem;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              padding: 2px 7px;
              border-radius: 99px;
              background: rgba(215,25,33,0.12);
              color: #D71921;
              font-family: 'Courier New', monospace;
              line-height: 1.6;
            }
            .divider-label {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin: 0.25rem 0 0.5rem;
            }
            .divider-label::before,
            .divider-label::after {
              content: '';
              flex: 1;
              height: 1px;
              background: var(--border);
            }
          `}</style>

          <div className="contact-wrap">
            {/* LEFT — identity + meta */}
            <div className="contact-left">
              <div>
                <div className="contact-avatar mb-5">
                  👨‍💻
                  <div className="status-dot" />
                </div>
                <p className="text-white font-bold text-xl leading-snug">Kim Ivan Ebora</p>
                <p className="mono text-xs mt-1" style={{ color: "rgba(215,25,33,0.7)" }}>IT Student · Web Developer</p>
                <p className="text-white/35 text-xs mt-3 leading-relaxed max-w-xs">
                  Open to freelance, collabs, internships, and full-time roles. Let's build something great together.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  { icon: "📍", label: "Malalim, Batangas City, PH", delay: "0ms" },
                  { icon: "🕐", label: "Usually replies within 24 hrs", delay: "60ms" },
                  { icon: "✅", label: "Available for new projects", delay: "120ms" },
                ].map((m) => (
                  <div key={m.label} className="meta-row" style={{ animationDelay: m.delay }}>
                    <div className="meta-icon">{m.icon}</div>
                    <span className="text-white/40 text-xs">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — platform cards */}
            <div className="contact-right">
              <div>
                <p className="mono text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.2)" }}>Reach me via</p>
                <div className="divider-label">
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.05em" }}>choose a platform</span>
                </div>
              </div>

              {[
                {
                  label: "Email",
                  sub: "ebora.kimivan@gmail.com",
                  icon: "✉️",
                  href: "mailto:ebora.kimivan@gmail.com",
                  accent: "rgba(215,25,33,0.5)",
                  logoBg: "rgba(215,25,33,0.08)",
                  logoBorder: "rgba(215,25,33,0.18)",
                  preferred: true,
                  delay: "0ms",
                },
                {
                  label: "LinkedIn",
                  sub: "kim-ivan-ebora",
                  icon: "💼",
                  href: "https://www.linkedin.com/in/kim-ivan-ebora-a44014405",
                  accent: "rgba(10,102,194,0.7)",
                  logoBg: "rgba(10,102,194,0.1)",
                  logoBorder: "rgba(10,102,194,0.2)",
                  delay: "70ms",
                },
                {
                  label: "GitHub",
                  sub: "github.com/Cayban",
                  icon: "🐙",
                  href: "https://github.com/Cayban",
                  accent: "rgba(255,255,255,0.3)",
                  logoBg: "rgba(255,255,255,0.05)",
                  logoBorder: "rgba(255,255,255,0.1)",
                  delay: "140ms",
                },
              ].map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  target={p.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="reach-card"
                  style={{
                    animationDelay: p.delay,
                    "--rc-accent": p.accent,
                    "--rc-logo-bg": p.logoBg,
                    "--rc-logo-border": p.logoBorder,
                  }}
                >
                  <div className="reach-logo">{p.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span className="font-semibold text-sm" style={{ color: "var(--text)" }}>{p.label}</span>
                      {p.preferred && <span className="preferred-tag">preferred</span>}
                    </div>
                    <p className="mono text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{p.sub}</p>
                  </div>
                  <span className="reach-arrow" style={{ color: "var(--text)" }}>→</span>
                </a>
              ))}

              <p className="mono text-xs text-center mt-auto pt-3" style={{ color: "var(--text-muted)", opacity: 0.5, borderTop: "1px solid var(--border)" }}>
                All links open directly · No forms, no bots
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="mono text-xs" style={{ color: "var(--text-muted)", opacity: 0.6 }}>© 2026 · Kim Ivan B. Ebora · Built with React &amp; Tailwind</span>
          <div className="flex items-center gap-1">
            <a href="https://github.com/Cayban" target="_blank" rel="noreferrer" className="mono px-3 py-1.5 text-xs uppercase tracking-widest transition-colors rounded-lg hover:bg-white/5" style={{ color: "var(--text-muted)" }}>GitHub</a>
            <a href="https://www.linkedin.com/in/kim-ivan-ebora-a44014405" target="_blank" rel="noreferrer" className="mono px-3 py-1.5 text-xs uppercase tracking-widest transition-colors rounded-lg hover:bg-white/5" style={{ color: "var(--text-muted)" }}>LinkedIn</a>
            <a href="mailto:ebora.kimivan@gmail.com" className="mono px-3 py-1.5 text-xs uppercase tracking-widest transition-colors rounded-lg hover:bg-white/5" style={{ color: "var(--text-muted)" }}>Email</a>
            <Link to="/freelance" className="mono px-3 py-1.5 text-xs uppercase tracking-widest transition-colors rounded-lg hover:bg-white/5" style={{ color: "#D71921" }}>Let's Work Together</Link>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

/* ── FREELANCE (sideline) — separate page, not part of the main portfolio flow ── */
function FreelancePage({ theme, resolvedTheme, onToggleTheme }) {
  return (
    <div data-theme={resolvedTheme} className="min-h-screen selection:bg-[#D71921]/30" style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'Space Grotesk', sans-serif", transition: "background 0.4s ease, color 0.4s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;500;700&family=DotGothic16&display=swap');
        :root {
          --bg: #0A0A0A;
          --bg-elevated: #ffffff08;
          --surface-solid: #161616;
          --text: #F5F5F0;
          --text-secondary: rgba(245,245,240,0.55);
          --text-muted: #8A8A85;
          --border: rgba(255,255,255,0.08);
          --border-strong: rgba(255,255,255,0.15);
          --dot-color: rgba(138,138,133,0.09);
        }
        [data-theme="light"] {
          --bg: #F2F1EC;
          --bg-elevated: #00000006;
          --surface-solid: #FAFAF7;
          --text: #0A0A0A;
          --text-secondary: rgba(10,10,10,0.6);
          --text-muted: #6B6B66;
          --border: rgba(10,10,10,0.1);
          --border-strong: rgba(10,10,10,0.2);
          --dot-color: rgba(107,107,102,0.12);
        }
        [data-theme="light"] [class~="text-white"],
        [data-theme="light"] [class*="text-white/80"] { color: rgba(10,10,10,0.85) !important; }
        [data-theme="light"] [class*="text-white/70"] { color: rgba(10,10,10,0.75) !important; }
        [data-theme="light"] [class*="text-white/55"] { color: rgba(10,10,10,0.6) !important; }
        [data-theme="light"] [class*="text-white/50"] { color: rgba(10,10,10,0.56) !important; }
        [data-theme="light"] [class*="text-white/45"] { color: rgba(10,10,10,0.52) !important; }
        [data-theme="light"] [class*="text-white/40"] { color: rgba(10,10,10,0.48) !important; }
        [data-theme="light"] [class*="text-white/35"] { color: rgba(10,10,10,0.44) !important; }
        [data-theme="light"] [class*="text-white/30"] { color: rgba(10,10,10,0.4) !important; }
        [data-theme="light"] [class*="text-white/25"] { color: rgba(10,10,10,0.36) !important; }
        [data-theme="light"] [class*="text-white/20"] { color: rgba(10,10,10,0.32) !important; }
        [data-theme="light"] [class~="hover:text-white"]:hover { color: rgba(10,10,10,0.85) !important; }
        [data-theme="light"] [class*="border-white/5"] { border-color: rgba(10,10,10,0.08) !important; }
        [data-theme="light"] [class*="hover:bg-white/5"]:hover { background: rgba(10,10,10,0.05) !important; }
        * { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: #8A8A8550; border-radius: 2px; }
        .dot-bg {
          background-image: radial-gradient(var(--dot-color) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(138,138,133,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(138,138,133,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        @keyframes gradient-x { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .gradient-text { color: #D71921; }
        .glass-nav {
          background: color-mix(in srgb, var(--bg) 88%, transparent);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--border);
        }
        .mono { font-family: 'Space Mono', monospace; }
      `}</style>

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 dot-bg">
        <div className="absolute w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(138,138,133,0.12), transparent)", top: "8%", left: "2%", filter: "blur(80px)" }} />
        <div className="absolute w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(215,25,33,0.07), transparent)", top: "55%", right: "3%", filter: "blur(80px)" }} />
      </div>

      {/* Minimal top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="mono flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Portfolio
          </Link>
          <span className="mono text-sm tracking-widest text-white/35 uppercase hidden sm:block">Kim Ivan Ebora / Services</span>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </nav>

      <div className="pt-20">
        <ServicesSection />
      </div>

      <footer className="py-8" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="mono text-xs" style={{ color: "var(--text-muted)", opacity: 0.6 }}>© 2026 · Kim Ivan B. Ebora</span>
          <Link to="/" className="mono px-3 py-1.5 text-xs uppercase tracking-widest transition-colors rounded-lg hover:bg-white/5" style={{ color: "var(--text-muted)" }}>← Back to Portfolio</Link>
        </div>
      </footer>
    </div>
  );
}

function PortfolioApp() {
  const [themePref, setThemePref] = useState(() => {
    try {
      return localStorage.getItem("theme") || "system";
    } catch {
      return "system";
    }
  });
  const [systemTheme, setSystemTheme] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e) => setSystemTheme(e.matches ? "light" : "dark");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("theme", themePref);
    } catch {}
  }, [themePref]);

  const resolvedTheme = themePref === "system" ? systemTheme : themePref;

  const setThemeAnimated = (next) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => setThemePref(next));
    } else {
      setThemePref(next);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage theme={themePref} resolvedTheme={resolvedTheme} onToggleTheme={setThemeAnimated} />} />
      <Route path="/freelance" element={<FreelancePage theme={themePref} resolvedTheme={resolvedTheme} onToggleTheme={setThemeAnimated} />} />
    </Routes>
  );
}

export default PortfolioApp;