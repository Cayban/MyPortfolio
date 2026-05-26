import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// KTTM screenshots
import kttmHome from "./assets/kttmhomeSample3.png";
import kttmLogin from "./assets/kttmloginSample.png";
import kttmLogin2 from "./assets/kttmloginSample2.png";

// Castillo Clinic screenshots
import pedHome from "./assets/pedatricsample.png";
import pedHome2 from "./assets/pediatricSample2.png";
import pedHome3 from "./assets/pediatricSample3.png";

const NAV_LINKS = ["About", "Skills", "Projects", "Services", "Contact"];

const SKILLS_CAN_DO = [
  { name: "Web Development", icon: "🌐", level: 85 },
  { name: "Backend Development", icon: "⚙️", level: 80 },
  { name: "Database Management", icon: "🗄️", level: 78 },
  { name: "UI/UX Design", icon: "🎨", level: 72 },
  { name: "System Integration", icon: "🔗", level: 75 },
  { name: "AI-Assisted Dev", icon: "🤖", level: 82 },
  { name: "Technical Problem Solving", icon: "🔧", level: 85 },
  { name: "Business Web Dev", icon: "💼", level: 78 },
];

const TECH_TAGS = [
  "HTML", "CSS", "JavaScript", "Tailwind CSS",
  "Node.js", "Laravel", "PHP Blade",
  "React.js", "PostgreSQL", "Firebase",
];

const SKILLS_LEARNING = [
  { name: "TypeScript", icon: "📘" },
  { name: "Next.js", icon: "🔲" },
  { name: "Docker", icon: "🐳" },
  { name: "React Native", icon: "📱" },
  { name: "GraphQL", icon: "◈" },
  { name: "Cloud Services", icon: "☁️" },
];

const PROJECTS = [
  {
    title: "LAD Enterprises",
    desc: "Redesigned and modernized an existing business website for LAD Enterprises — transforming their outdated web presence into a clean, professional, and fully responsive site.",
    stack: ["PHP Blade", "Laravel"],
    lang: "Laravel",
    color: "#00f5d4",
    icon: "🏢",
    github: null,
    live: "https://lad-enterprises.com",
    liveLabel: "lad-enterprises.com",
  },
  {
    title: "KTTM Records System",
    desc: "An office records management system designed to replace manual paperwork and Google Sheets with a structured, reliable digital solution for handling day-to-day records efficiently.",
    stack: ["PHP Blade", "Laravel"],
    lang: "Laravel",
    color: "#7b2fff",
    icon: "📂",
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
    color: "#f72585",
    icon: "🏥",
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

function SkillBar({ name, icon, level, delay }) {
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
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center gap-2 text-sm font-medium text-white/80">
          <span>{icon}</span> {name}
        </span>
        <span className="text-xs font-mono text-cyan-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <div
          className="h-full rounded-full transition-all ease-out"
          style={{
            width: animated ? `${level}%` : "0%",
            transitionDuration: "1.2s",
            background: "linear-gradient(90deg, #00f5d4, #7b2fff)",
          }}
        />
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
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #030712 0%, transparent 50%)` }} />
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

// Featured (large) project card — used for LAD Enterprises
function FeaturedCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-3xl border overflow-hidden transition-all duration-500 flex flex-col md:flex-row"
      style={{
        borderColor: hovered ? project.color + "55" : "rgba(255,255,255,0.08)",
        background: hovered ? `linear-gradient(135deg, ${project.color}0d, rgba(255,255,255,0.02))` : "rgba(255,255,255,0.02)",
        boxShadow: hovered ? `0 30px 80px ${project.color}18` : "none",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left — decorative placeholder (no screenshot for LAD) */}
      <div className="md:w-1/2 relative overflow-hidden flex-shrink-0" style={{ minHeight: "280px", background: "#07070f" }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}18 0%, #030712 70%)` }} />
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.015) 30px, rgba(255,255,255,0.015) 31px)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="text-6xl">{project.icon}</div>
          <div className="px-4 py-2 rounded-xl mono text-xs" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
            Live Website
          </div>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${project.color}, #7b2fff)`, color: "#000" }}>
              Visit Site
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          )}
        </div>
      </div>

      {/* Right — content */}
      <div className="flex-1 p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="mono text-xs px-2.5 py-1 rounded-full" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
              ⭐ Featured Project
            </span>
            <span className="mono text-xs text-white/25">{project.lang}</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white mb-3">{project.title}</h3>
          <p className="text-white/55 leading-relaxed text-sm mb-6">{project.desc}</p>
          {project.live && (
            <p className="mono text-xs mb-6" style={{ color: project.color }}>
              🔗 <a href={project.live} target="_blank" rel="noreferrer" className="hover:underline">{project.liveLabel}</a>
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
        borderColor: hovered ? project.color + "55" : "rgba(255,255,255,0.08)",
        background: hovered ? `linear-gradient(160deg, ${project.color}0d, rgba(255,255,255,0.02))` : "rgba(255,255,255,0.02)",
        boxShadow: hovered ? `0 24px 60px ${project.color}18` : "none",
        transform: hovered ? "translateY(-5px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ImageCarousel images={project.images} color={project.color} height={200} />

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{project.icon}</span>
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
    color: "#f72585",
    deliveryDays: "7–12",
  },
  {
    id: "ecommerce",
    label: "E-Commerce / Online Store",
    icon: "🛒",
    desc: "Product grids, cart, filters, and checkout — sell anything online.",
    color: "#00f5d4",
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
      accent: "#f72585",
      bg: "linear-gradient(135deg, #0d0005, #1a0010)",
      preview: { palette: ["#f72585", "#ff6b9d", "#0d0005"], style: "Dark · High energy · Bold type", mockSections: ["💪 Hero", "💳 Plans", "📆 Schedule", "🏋️ Trainers"] },
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
      accent: "#f72585",
      bg: "linear-gradient(135deg, #05000a, #100018)",
      preview: { palette: ["#f72585", "#a855f7", "#05000a"], style: "Boutique · Editorial · Full-featured", mockSections: ["🧘 Hero", "✅ Booking", "👥 Trainers", "🛒 Merch"] },
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
      accent: "#f72585",
      bg: "linear-gradient(135deg, #0d0005, #0d0005)",
      preview: { palette: ["#f72585", "#ff6b9d", "#111"], style: "Minimal · Fast delivery · Mobile-first", mockSections: ["💪 Hero", "💳 Plans", "📆 Schedule"] },
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
      accent: "#00f5d4",
      bg: "linear-gradient(135deg, #000d0b, #001a16)",
      preview: { palette: ["#00f5d4", "#00b89c", "#000d0b"], style: "Dark · Clean grid · Minimal checkout", mockSections: ["🛍️ Hero", "🔍 Filter", "📄 Products", "🛒 Cart"] },
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
      accent: "#00f5d4",
      bg: "linear-gradient(135deg, #000a08, #001812)",
      preview: { palette: ["#00f5d4", "#fff", "#000a08"], style: "Fashion · Editorial · Full-featured", mockSections: ["✨ Hero", "🛍️ Catalog", "❤️ Wishlist", "💳 Checkout"] },
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
      accent: "#00f5d4",
      bg: "linear-gradient(135deg, #000d0b, #001209)",
      preview: { palette: ["#00f5d4", "#00b89c", "#111"], style: "Minimal · Simple order flow · Starter", mockSections: ["🛍️ Hero", "📦 Products", "📲 Order CTA"] },
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
    .bottom button{background:linear-gradient(135deg,#3b82f6,#7b2fff);color:#fff;font-size:7px;font-weight:700;padding:3px 9px;border-radius:5px;border:none;cursor:pointer}
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
    nav{display:flex;align-items:center;justify-content:space-between;padding:7px 14px;border-bottom:1px solid #f7258525}
    .logo{color:#f72585;font-weight:900;font-size:12px;letter-spacing:1px}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none;margin-left:10px}
    .hero{display:flex;align-items:center;justify-content:space-between;padding:10px 14px 8px;background:linear-gradient(135deg,#f7258530,transparent);position:relative;overflow:hidden}
    .hero::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(45deg,transparent,transparent 8px,rgba(255,255,255,0.02) 8px,rgba(255,255,255,0.02) 9px)}
    .hero-text{position:relative;z-index:1}
    .eyebrow{font-size:7px;color:#f72585;letter-spacing:3px;margin-bottom:3px}
    h1{font-size:20px;font-weight:900;line-height:1;text-transform:uppercase;margin-bottom:6px}
    .btns{display:flex;gap:6px}
    .btn-p{background:#f72585;color:#000;font-size:8px;font-weight:900;padding:5px 12px;border-radius:6px;border:none;cursor:pointer;text-transform:uppercase;letter-spacing:.5px}
    .btn-s{background:#f7258520;color:#f72585;font-size:8px;padding:5px 12px;border-radius:6px;border:1px solid #f7258540;cursor:pointer}
    .hero-emoji{font-size:52px;opacity:.7;position:relative;z-index:1}
    .plans{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding:7px 14px}
    .plan{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:6px 5px;text-align:center}
    .plan.hot{background:#f7258520;border-color:#f7258550}
    .plan-name{font-size:7.5px;font-weight:700;color:rgba(255,255,255,0.5);margin-bottom:2px}
    .plan.hot .plan-name{color:#f72585}
    .plan-price{font-size:13px;font-weight:900;color:#fff}
    .plan.hot .plan-price{color:#f72585}
    .plan-per{font-size:6px;color:rgba(255,255,255,0.3)}
    .schedule{display:flex;gap:4px;padding:0 14px}
    .day{flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:4px 3px;text-align:center}
    .day-label{font-size:7px;font-weight:700;color:#f72585}
    .day-class{font-size:6.5px;color:rgba(255,255,255,0.4)}
    .day-time{font-size:6px;color:rgba(255,255,255,0.25)}
  </style></head><body>
    <nav><span class="logo">⚡ FORGE GYM</span><div><a href="#">Plans</a><a href="#">Schedule</a><a href="#">Trainers</a><a href="#">Free Trial</a></div></nav>
    <div class="hero">
      <div class="hero-text">
        <p class="eyebrow">TRAIN · FORGE · CONQUER</p>
        <h1>Build the<br>Body You<br><span style="color:#f72585">Deserve</span></h1>
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
    nav{display:flex;align-items:center;justify-content:space-between;padding:7px 14px;border-bottom:1px solid #f7258520}
    .logo{font-weight:900;font-size:11px;letter-spacing:2px;background:linear-gradient(135deg,#f72585,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none;margin-left:10px}
    .hero{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 14px 6px;align-items:center}
    .eyebrow{font-size:7px;color:#a855f7;letter-spacing:2px;margin-bottom:3px}
    h1{font-size:16px;font-weight:900;line-height:1.1;margin-bottom:5px}
    h1 em{color:#f72585;font-style:normal}
    .sub{font-size:7px;color:rgba(255,255,255,0.4);line-height:1.5;margin-bottom:7px}
    .btns{display:flex;gap:5px}
    .btn-p{background:linear-gradient(135deg,#f72585,#a855f7);color:#fff;font-size:7.5px;font-weight:700;padding:4px 10px;border-radius:6px;border:none;cursor:pointer}
    .btn-s{background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.5);font-size:7.5px;padding:4px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);cursor:pointer}
    .classes{background:rgba(255,255,255,0.03);border:1px solid #a855f720;border-radius:8px;padding:7px}
    .class-title{font-size:8px;font-weight:700;color:#a855f7;margin-bottom:5px}
    .class-item{display:flex;align-items:center;justify-content:space-between;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.05)}
    .class-item:last-child{border-bottom:none}
    .class-name{font-size:7.5px;color:#fff}
    .class-time{font-size:6.5px;color:rgba(255,255,255,0.35)}
    .class-slots{font-size:6px;color:#f72585;background:#f7258515;border:1px solid #f7258525;border-radius:3px;padding:1px 4px}
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
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #f7258520}
    .logo{color:#f72585;font-weight:900;font-size:12px;text-transform:uppercase;letter-spacing:2px}
    .nav-links a{color:rgba(255,255,255,0.35);font-size:8px;text-decoration:none;margin-left:10px}
    .hero{display:flex;align-items:center;gap:12px;padding:12px 14px 8px;background:linear-gradient(135deg,#f7258520,transparent)}
    .hero-text h1{font-size:22px;font-weight:900;text-transform:uppercase;line-height:1}
    .hero-text h1 em{color:#f72585;font-style:normal;display:block}
    .hero-text p{font-size:7.5px;color:rgba(255,255,255,0.4);margin:4px 0 8px}
    .trial-btn{background:#f72585;color:#000;font-size:9px;font-weight:900;padding:6px 14px;border-radius:7px;border:none;cursor:pointer;text-transform:uppercase;letter-spacing:1px}
    .hero-badge{background:#f7258515;border:1px solid #f7258530;border-radius:10px;padding:8px 10px;text-align:center;min-width:60px}
    .hero-badge .big{font-size:20px;font-weight:900;color:#f72585;line-height:1}
    .hero-badge small{font-size:6px;color:rgba(255,255,255,0.4)}
    .plans{display:flex;gap:6px;padding:0 14px 8px}
    .plan{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:8px 6px;text-align:center}
    .plan.hot{background:#f7258520;border-color:#f72585}
    .plan-name{font-size:7.5px;color:rgba(255,255,255,0.5);margin-bottom:3px;font-weight:700}
    .plan.hot .plan-name{color:#f72585}
    .plan-price{font-size:16px;font-weight:900;color:#fff}
    .plan.hot .plan-price{color:#f72585}
    .plan-price sub{font-size:8px;font-weight:400}
    .plan-perks{margin-top:4px}
    .plan-perks p{font-size:6px;color:rgba(255,255,255,0.35);margin-bottom:1px}
    .cta-strip{background:linear-gradient(135deg,#f7258530,#f7258510);border-top:1px solid #f7258525;padding:8px 14px;display:flex;align-items:center;justify-content:space-between}
    .cta-strip p{font-size:8px;font-weight:700;color:#fff}
    .cta-strip small{font-size:6.5px;color:rgba(255,255,255,0.4)}
    .cta-strip button{background:#f72585;color:#000;font-size:8px;font-weight:700;padding:5px 12px;border-radius:6px;border:none;cursor:pointer}
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
    nav{display:flex;align-items:center;justify-content:space-between;padding:7px 14px;border-bottom:1px solid #00f5d425}
    .logo{color:#00f5d4;font-weight:900;font-size:12px;letter-spacing:2px}
    .nav-right{display:flex;align-items:center;gap:8px}
    .nav-right a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none}
    .cart-btn{position:relative;cursor:pointer}
    .cart-btn span{font-size:14px}
    .cart-count{position:absolute;top:-4px;right:-4px;background:#00f5d4;color:#000;font-size:7px;font-weight:900;width:12px;height:12px;border-radius:50%;display:flex;align-items:center;justify-content:center}
    .banner{padding:7px 14px;background:linear-gradient(135deg,#00f5d430,transparent);display:flex;align-items:center;justify-content:space-between}
    .banner h2{font-size:16px;font-weight:900;line-height:1.1}
    .banner h2 em{color:#00f5d4;font-style:normal}
    .banner-badge{background:#00f5d4;color:#000;font-size:7px;font-weight:900;padding:3px 8px;border-radius:5px;display:inline-block;margin-bottom:4px}
    .banner-btn{background:#00f5d4;color:#000;font-size:8px;font-weight:700;padding:5px 12px;border-radius:6px;border:none;cursor:pointer;margin-top:5px;display:block}
    .banner-img{font-size:48px;opacity:.8}
    .filters{display:flex;gap:5px;padding:5px 14px}
    .f-tag{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:2px 8px;font-size:7px;color:rgba(255,255,255,0.4);cursor:pointer}
    .f-tag.active{background:#00f5d420;border-color:#00f5d440;color:#00f5d4;font-weight:700}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:5px 14px}
    .card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:7px;overflow:hidden}
    .card-img{height:44px;display:flex;align-items:center;justify-content:center;font-size:24px;background:linear-gradient(135deg,#00f5d415,rgba(255,255,255,0.02))}
    .card-body{padding:5px}
    .c-name{font-size:7px;color:rgba(255,255,255,0.55);margin-bottom:1px}
    .c-price{font-size:9px;font-weight:800;color:#00f5d4}
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
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #00f5d420}
    .logo{font-weight:900;font-size:12px;letter-spacing:3px;background:linear-gradient(135deg,#00f5d4,#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .nav-mid{display:flex;gap:10px}
    .nav-mid a{color:rgba(255,255,255,0.4);font-size:7.5px;text-decoration:none;letter-spacing:.5px}
    .nav-right{display:flex;align-items:center;gap:8px}
    .nav-right span{font-size:12px;cursor:pointer}
    .hero{display:grid;grid-template-columns:1fr 1fr;height:110px}
    .hero-left{padding:12px 14px;background:linear-gradient(135deg,#00f5d420,transparent);display:flex;flex-direction:column;justify-content:center}
    .hero-left .tag{font-size:6.5px;color:#00f5d4;letter-spacing:2px;margin-bottom:4px}
    .hero-left h1{font-size:18px;font-weight:900;line-height:1.05}
    .hero-left h1 em{color:#00f5d4;font-style:normal}
    .hero-left p{font-size:7px;color:rgba(255,255,255,0.4);margin:4px 0 6px}
    .hero-left button{background:#00f5d4;color:#000;font-size:7.5px;font-weight:700;padding:4px 12px;border-radius:6px;border:none;cursor:pointer;align-self:flex-start}
    .hero-right{background:#00f5d410;display:flex;align-items:center;justify-content:center;font-size:52px;border-left:1px solid #00f5d420}
    .products{display:flex;gap:5px;padding:6px 14px}
    .prod{flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:8px;overflow:hidden;position:relative}
    .prod-img{height:42px;display:flex;align-items:center;justify-content:center;font-size:22px;background:linear-gradient(135deg,#00f5d412,rgba(255,255,255,0.02))}
    .prod-body{padding:4px 5px}
    .prod-name{font-size:7px;color:rgba(255,255,255,0.5)}
    .prod-price{font-size:9px;font-weight:800;color:#00f5d4}
    .wish{position:absolute;top:4px;right:4px;font-size:9px;cursor:pointer}
    .sale-tag{position:absolute;top:4px;left:4px;background:#00f5d4;color:#000;font-size:6px;font-weight:700;padding:1px 4px;border-radius:3px}
    .footer-strip{padding:5px 14px;background:rgba(0,245,212,0.05);border-top:1px solid #00f5d415;display:flex;gap:12px}
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
    nav{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid #00f5d420}
    .logo{color:#00f5d4;font-weight:800;font-size:11px}
    .nav-right{display:flex;gap:10px;align-items:center}
    .nav-right a{color:rgba(255,255,255,0.35);font-size:7.5px;text-decoration:none}
    .hero{padding:12px 14px 8px;display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,#00f5d415,transparent)}
    .hero-text h1{font-size:18px;font-weight:900;line-height:1.05;margin-bottom:5px}
    .hero-text h1 em{color:#00f5d4;font-style:normal}
    .hero-text p{font-size:7.5px;color:rgba(255,255,255,0.4);margin-bottom:8px}
    .order-options{display:flex;gap:5px}
    .wa-btn{background:#25d366;color:#fff;font-size:7.5px;font-weight:700;padding:5px 10px;border-radius:6px;border:none;cursor:pointer}
    .em-btn{background:#00f5d420;color:#00f5d4;font-size:7.5px;font-weight:700;padding:5px 10px;border-radius:6px;border:1px solid #00f5d430;cursor:pointer}
    .hero-img{font-size:50px;opacity:.7}
    .section-title{font-size:8px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:2px;text-transform:uppercase;padding:0 14px 5px}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:0 14px}
    .card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:7px;overflow:hidden;cursor:pointer}
    .card:hover{border-color:#00f5d430}
    .card-img{height:42px;display:flex;align-items:center;justify-content:center;font-size:22px;background:#00f5d412}
    .card-body{padding:5px}
    .c-name{font-size:7px;color:rgba(255,255,255,0.5);margin-bottom:1px}
    .c-price{font-size:9px;font-weight:800;color:#00f5d4}
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
        <span className="w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0" style={{ background: `linear-gradient(135deg, ${typeObj.color}, #7b2fff)` }}>3</span>
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
        style={{ background: contactOnly ? "rgba(123,47,255,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${contactOnly ? "#7b2fff50" : "rgba(255,255,255,0.08)"}` }}
        onClick={() => setContactOnly(!contactOnly)}>
        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all" style={{ background: contactOnly ? "linear-gradient(135deg,#7b2fff,#00f5d4)" : "rgba(255,255,255,0.06)", border: contactOnly ? "none" : "1px solid rgba(255,255,255,0.15)" }}>
          {contactOnly && <svg width="10" height="10" fill="none" stroke="#000" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Just email me instead</p>
          <p className="text-xs text-white/35 mt-0.5">Skip add-on selection — I'll discuss everything via email</p>
        </div>
      </div>

      <button
        onClick={() => onConfirm([...selectedAddons], contactOnly)}
        className="w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all duration-200 hover:scale-[1.01] hover:brightness-110"
        style={{ background: `linear-gradient(135deg, ${typeObj.color}, #7b2fff)` }}>
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
              <p className="text-xl font-extrabold text-white">{template.name} Template</p>
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
            href={`mailto:kimiebora@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyLines)}`}
            className="w-full py-3.5 rounded-xl font-bold text-black text-sm text-center transition-all hover:scale-[1.02] block hover:brightness-110"
            style={{ background: `linear-gradient(135deg, ${accent}, #7b2fff)` }}>
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
      style={{ background: "rgba(3,7,18,0.97)", backdropFilter: "blur(12px)" }}
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
          style={{ background: `linear-gradient(135deg, ${accent}, #7b2fff)` }}>
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
              <span className="text-white">Get a </span>
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
                  <button onClick={() => setStep("premade-type")} className="text-left rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.01] group" style={{ borderColor: "rgba(0,245,212,0.25)", background: "linear-gradient(135deg, rgba(0,245,212,0.06), rgba(255,255,255,0.01))", boxShadow: "0 0 40px rgba(0,245,212,0.06)" }}>
                    <div className="text-4xl mb-4">🎨</div>
                    <p className="font-extrabold text-white text-xl mb-2">Premade Design</p>
                    <p className="text-sm text-white/45 leading-relaxed mb-5">Choose from 3 ready-made templates per website type. Fixed pricing, faster delivery.</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Restaurant", "Real Estate", "Gym", "E-Commerce", "Events"].map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-lg text-white/40 mono" style={{ background: "rgba(0,245,212,0.07)", border: "1px solid rgba(0,245,212,0.15)" }}>{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#00f5d4" }}>
                      Browse templates <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  </button>

                  <button onClick={() => setStep("custom")} className="text-left rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.01] group" style={{ borderColor: "rgba(123,47,255,0.25)", background: "linear-gradient(135deg, rgba(123,47,255,0.06), rgba(255,255,255,0.01))", boxShadow: "0 0 40px rgba(123,47,255,0.06)" }}>
                    <div className="text-4xl mb-4">⚡</div>
                    <p className="font-extrabold text-white text-xl mb-2">Custom Design</p>
                    <p className="text-sm text-white/45 leading-relaxed mb-5">Have a unique vision? Let's discuss your exact requirements and build something from scratch.</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Unique layout", "Your branding", "Any feature"].map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-lg text-white/40 mono" style={{ background: "rgba(123,47,255,0.07)", border: "1px solid rgba(123,47,255,0.15)" }}>{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#7b2fff" }}>
                      Get in touch <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                  </button>
                </motion.div>
              )}

              {/* ── STEP 2: Pick website type ── */}
              {step === "premade-type" && (
                <motion.div key="premade-type" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.45, ease: [0.4, 0.2, 0.2, 1] }}>
                  <p className="mono text-xs text-white/30 uppercase tracking-widest mb-6 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0" style={{ background: "linear-gradient(135deg,#00f5d4,#7b2fff)" }}>1</span>
                    What kind of website do you need?
                  </p>
                  <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0" style={{ background: "linear-gradient(135deg,#00f5d4,#7b2fff)" }}>2</span>
                    {typeObj.icon} {typeObj.label} — Pick a Template
                  </p>
                  <p className="text-xs text-white/25 mono mb-8 ml-9">Choose the package that fits your needs and budget.</p>
                  <div className="grid md:grid-cols-3 gap-5">
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
                              style={{ background: `linear-gradient(135deg, ${tmpl.accent}, #7b2fff)` }}>
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
                  <div className="rounded-3xl p-8 md:p-10 text-center" style={{ background: "linear-gradient(135deg, rgba(123,47,255,0.08), rgba(0,245,212,0.04))", border: "1px solid rgba(123,47,255,0.25)" }}>
                    <div className="text-5xl mb-5">⚡</div>
                    <h3 className="text-2xl font-extrabold text-white mb-3">Let's Build Something Custom</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-sm mx-auto">Have a unique idea or specific requirements? Send me an email and we'll discuss the details — layout, features, timeline, and pricing.</p>
                    <a href="mailto:kimiebora@gmail.com?subject=Custom Website Project"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black text-sm transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
                      style={{ background: "linear-gradient(135deg, #7b2fff, #00f5d4)", boxShadow: "0 0 40px rgba(123,47,255,0.2)" }}>
                      ✉️ kimiebora@gmail.com
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

function PortfolioApp() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-white selection:bg-cyan-400/30" style={{ background: "#030712", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: #7b2fff50; border-radius: 2px; }
        .grid-bg {
          background-image:
            linear-gradient(rgba(0,245,212,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,212,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes gradient-x { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .float-anim { animation: float 7s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(135deg, #00f5d4, #7b2fff, #f72585);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-x 5s ease infinite;
        }
        .glass {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .glass-nav {
          background: rgba(3,7,18,0.88);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .mono { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(123,47,255,0.12), transparent)", top: "8%", left: "2%", filter: "blur(80px)" }} />
        <div className="absolute w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(0,245,212,0.1), transparent)", top: "55%", right: "3%", filter: "blur(80px)" }} />
        <div className="absolute w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(247,37,133,0.08), transparent)", bottom: "15%", left: "38%", filter: "blur(60px)" }} />
      </div>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="mono text-sm tracking-widest text-white/35 uppercase">kim.dev</span>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l)} className="px-4 py-2 text-sm rounded-lg transition-all duration-200 text-white/50 hover:text-white hover:bg-white/5 font-medium">
                {l}
              </button>
            ))}
            <a href="mailto:kimiebora@gmail.com" className="ml-3 px-5 py-2 text-sm rounded-lg font-semibold text-black transition-all duration-200 hover:scale-105 hover:brightness-110" style={{ background: "linear-gradient(135deg, #00f5d4, #7b2fff)" }}>
              Hire Me
            </a>
          </div>
          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="glass-nav md:hidden px-6 pb-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l)} className="py-3 text-left text-sm text-white/60 hover:text-white border-b border-white/5 last:border-0">
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO / ABOUT ── */}
      <section id="about" className="relative min-h-screen grid-bg flex items-center pt-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 w-full py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6 text-xs mono text-white/45">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to opportunities
              </div>

              <p className="mono text-xs tracking-widest text-white/30 uppercase mb-3">IT Student · Network Technology</p>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-2">
                <span className="text-white">Kim Ivan</span>
              </h1>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                <span className="gradient-text">Ebora.</span>
              </h1>

              <p className="text-white/55 leading-relaxed max-w-md text-base">
                An aspiring IT professional passionate about learning, innovation, and web development — constantly exploring new technologies and sharpening his skills through hands-on experience and continuous research.
              </p>

              <div className="flex items-center gap-2 mt-4 text-sm text-white/35">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Malalim, Batangas City, Philippines</span>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <button onClick={() => scrollTo("Projects")} className="px-6 py-3 rounded-xl font-semibold text-black text-sm transition-all duration-200 hover:scale-105" style={{ background: "linear-gradient(135deg, #00f5d4, #7b2fff)", boxShadow: "0 0 30px rgba(0,245,212,0.2)" }}>
                  View Projects →
                </button>
                <button onClick={() => scrollTo("Contact")} className="px-6 py-3 rounded-xl font-semibold text-white text-sm glass transition-all duration-200 hover:border-white/20">
                  Get in Touch
                </button>
              </div>

              <div className="flex gap-8 mt-12 pt-8 border-t border-white/5">
                {[["3", "Projects Completed"], ["8", "Core Skills"], ["2+", "Years of Coding"]].map(([val, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-black text-white">{val}</div>
                    <div className="text-xs text-white/35 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avatar card */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div
                  className="w-64 h-64 md:w-72 md:h-72 rounded-3xl glass float-anim flex flex-col items-center justify-center relative overflow-hidden"
                  style={{ border: "1px solid rgba(0,245,212,0.18)" }}
                >
                  <div className="absolute inset-0 opacity-15" style={{ background: "linear-gradient(135deg, #7b2fff, #00f5d4)" }} />
                  <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(0,245,212,0.015) 24px, rgba(0,245,212,0.015) 25px)" }} />
                  <div className="relative z-10 text-center px-4">
                    <div className="text-6xl mb-3">👨‍💻</div>
                    <p className="text-white font-bold text-sm">Kim Ivan B. Ebora</p>
                    <p className="text-white/35 text-xs mt-1 mono">IT Student · Network Tech</p>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 glass rounded-xl px-3 py-2 text-xs mono text-cyan-400" style={{ border: "1px solid rgba(0,245,212,0.2)" }}>
                  &lt;/code&gt;
                </div>
                <div className="absolute -bottom-3 -left-3 glass rounded-xl px-3 py-2 text-xs mono text-purple-400" style={{ border: "1px solid rgba(123,47,255,0.2)" }}>
                  git push ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="relative py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <span className="mono text-xs text-white/25 tracking-widest uppercase">02 / Skills</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
              <span className="text-white">What I </span>
              <span className="gradient-text">Can Do</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-14">
            {/* Proficiency bars */}
            <div>
              <h3 className="mono text-xs text-white/30 uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="w-6 h-px bg-cyan-400/50" /> Current Skill Set
              </h3>
              <div className="space-y-5">
                {SKILLS_CAN_DO.map((s, i) => (
                  <SkillBar key={s.name} {...s} delay={i * 80} />
                ))}
              </div>

              {/* Tech tags */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="mono text-xs text-white/25 uppercase tracking-widest mb-4">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {TECH_TAGS.map((t) => (
                    <span key={t} className="mono text-xs px-3 py-1.5 rounded-lg text-white/60 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning next */}
            <div>
              <h3 className="mono text-xs text-white/30 uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="w-6 h-px bg-purple-400/50" /> Currently Learning
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SKILLS_LEARNING.map((s) => (
                  <div key={s.name} className="glass rounded-xl p-4 flex items-center gap-3 hover:border-white/15 transition-all duration-300 hover:scale-105 group" style={{ cursor: "default" }}>
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">{s.name}</p>
                      <p className="mono text-xs text-white/25 mt-0.5">In progress</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 glass rounded-2xl p-6" style={{ border: "1px solid rgba(0,245,212,0.1)" }}>
                <p className="text-sm text-white/45 leading-relaxed italic">
                  "I believe learning never stops. I actively explore new frameworks, tools, and best practices to stay current and deliver better solutions with every project."
                </p>
                <p className="mt-3 mono text-xs text-white/25">— Kim Ivan Ebora</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative py-24">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="mb-16">
            <span className="mono text-xs text-white/25 tracking-widest uppercase">03 / Projects</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
              <span className="text-white">Things I've </span>
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

      <ServicesSection />

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="mono text-xs text-white/25 tracking-widest uppercase">05 / Contact</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
              <span className="text-white">Let's </span>
              <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-white/40 mt-3 text-sm">Open to freelance projects, collaborations, internships, and full-time opportunities.</p>
          </div>

          <div className="glass rounded-3xl p-8 md:p-12" style={{ border: "1px solid rgba(0,245,212,0.1)", background: "linear-gradient(135deg, rgba(0,245,212,0.025), rgba(123,47,255,0.025))" }}>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                { icon: "✉️", label: "Email", value: "kimiebora@gmail.com", href: "mailto:kimiebora@gmail.com" },
                { icon: "📍", label: "Location", value: "Malalim, Batangas City, PH", href: null },
                { icon: "💼", label: "LinkedIn", value: "kim-ivan-ebora", href: "https://www.linkedin.com/in/kim-ivan-ebora-a44014405" },
                { icon: "🐙", label: "GitHub", value: "github.com/Cayban", href: "https://github.com/Cayban" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: "rgba(0,245,212,0.07)", border: "1px solid rgba(0,245,212,0.15)" }}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="mono text-xs text-white/25 uppercase tracking-wider">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noreferrer" className="text-sm text-white/65 hover:text-cyan-400 transition-colors mt-0.5 block font-medium">{c.value}</a>
                    ) : (
                      <p className="text-sm text-white/65 mt-0.5 font-medium">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="border-t border-white/5 pt-8">
              <h3 className="mono text-xs text-white/30 uppercase tracking-widest mb-6">Send a Message</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  onFocus={e => e.target.style.borderColor = "rgba(0,245,212,0.4)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  onFocus={e => e.target.style.borderColor = "rgba(0,245,212,0.4)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
              <textarea
                rows={4}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all resize-none mb-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                onFocus={e => e.target.style.borderColor = "rgba(0,245,212,0.4)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
              />
              <a
                href="mailto:kimiebora@gmail.com"
                className="w-full py-4 rounded-xl font-bold text-black text-sm transition-all duration-200 hover:scale-[1.01] hover:brightness-110 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #00f5d4, #7b2fff)", boxShadow: "0 0 40px rgba(0,245,212,0.12)", display: "flex" }}
              >
                Send Message →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="mono text-xs text-white/20">© 2025 · Kim Ivan B. Ebora · Built with React & Tailwind</span>
          <div className="flex items-center gap-1">
            <a href="https://github.com/Cayban" target="_blank" rel="noreferrer" className="px-3 py-1.5 text-xs text-white/30 hover:text-white/70 transition-colors rounded-lg hover:bg-white/5">GitHub</a>
            <a href="https://www.linkedin.com/in/kim-ivan-ebora-a44014405" target="_blank" rel="noreferrer" className="px-3 py-1.5 text-xs text-white/30 hover:text-white/70 transition-colors rounded-lg hover:bg-white/5">LinkedIn</a>
            <a href="mailto:kimiebora@gmail.com" className="px-3 py-1.5 text-xs text-white/30 hover:text-white/70 transition-colors rounded-lg hover:bg-white/5">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 

export default PortfolioApp;