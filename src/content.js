// Portfolio content is maintained in this file; there is no content editor.
export const SEED_PROJECTS = [
  { id: "realm-keeper", slug: "realm-keeper", order: 0, title: "Realm Keeper",
    desc: "A free, unofficial Crystal Realms companion by KLEI Labs. Plan farming projects, compare returns, and keep timers, market prices, and realms in one place.",
    role: "Personal project · KLEI Labs", stack: ["React", "Vite", "Android"],
    live: "https://titoayban.itch.io/realm-keeper", liveLabel: "Open Realm Keeper",
    images: ["/projects/realm-1.png"] },
  { id: "lad", slug: "lad-enterprises", order: 1, title: "LAD Enterprises",
    desc: "My first professional client project: a redesign of an existing business website for LAD Enterprises, delivered as a cleaner, fully responsive site.",
    role: "Project Manager & Frontend Developer",
    did: [
      "Managed the project end to end while a teammate took the lead on programming, as he wanted to try leading",
      "Worked as Frontend Developer and Web Design Contributor, collaborating with an internship partner to redesign and improve the existing website",
      "Refined website content, interface details, visual layout, navigation, and overall user experience",
      "Assisted with final deployment adjustments to prepare the website for release",
    ],
    stack: ["PHP Blade", "Laravel"], live: "https://lad-enterprises.com", liveLabel: "lad-enterprises.com",
    images: ["/projects/lad-1.png", "/projects/lad-2.png", "/projects/lad-3.png"] },
  { id: "kttm", slug: "kttm-records-system", order: 2, title: "KTTM Records System",
    desc: "An office records management system for the Knowledge & Technology Transfer Management Office, replacing manual paperwork and Google Sheets with a structured digital database.",
    role: "Lead Developer (OJT)",
    did: [
      "Led the development of a Laravel and PostgreSQL-based office database system with CRUD, data management, and analytics features",
      "Organized and validated nearly 3,000 Intellectual Property records, including copyright forms, to keep office data accurate and well-structured",
      "Assisted staff with basic computer, software, and system troubleshooting",
    ],
    stack: ["Laravel", "PHP Blade", "PostgreSQL"], live: "", liveLabel: "",
    images: ["/projects/kttm-1.png", "/projects/kttm-2.png", "/projects/kttm-3.png"] },
  { id: "castillo", slug: "castillo-children-clinic", order: 3, title: "Castillo Children Clinic",
    desc: "A web-based pediatric clinic system (Pediatric Analysis System) built as another team's capstone project, covering appointment scheduling, patient records, and data exchange with a smart wellness kiosk.",
    role: "Frontend Developer (contributor)",
    did: [
      "Improved the user interface to enhance layout, navigation, and overall user experience",
      "Supported backend and database improvements for clinic-related records",
      "Integrated API communication between the clinic system and the kiosk system to enable online data transfer between both platforms",
    ],
    stack: ["React.js", "Tailwind CSS", "Node.js"], live: "", liveLabel: "",
    images: ["/projects/castillo-1.png", "/projects/castillo-2.png", "/projects/castillo-3.png"] },
];
export const SEED_EXPERIENCE = [{
  id: "ojt", order: 1, role: "OJT Intern", org: "KTTM Office — Batangas State University",
  duration: "500 Hours · On-the-Job Training", period: "Feb 2026 – May 2026",
  summary: "500 hours immersed in real office operations — handling IP records, building the systems the office actually needed, providing tech support, and picking up my first freelance client along the way.",
  highlights: [
    { title: "IP Records & Database System", desc: "Assisted in processing and organizing copyright and intellectual property documents, then helped build the office a proper database system to replace their reliance on Google Sheets and Google Drive — later developed further into the KTTM Records System." },
    { title: "IT & Technical Support", desc: "Handled day-to-day technical issues around the office — PC formatting, file backups, and troubleshooting software problems — plus produced graphic design work, infographics, and PPT presentations using Canva." },
    { title: "First Freelance Client", desc: "Gained my first client during the internship — my supervisor's own business. I rebuilt his existing website using the same tech stack from the KTTM system, improved on the original design, and hosted it live as LAD Enterprises." },
  ],
}];
export const SEED_CERTS = [{ id: "nc2", order: 1, title: "NC II – Computer Systems Servicing", issuer: "TESDA National Certificate II · Computer Servicing", status: "Passed", date: "September 2026", url: "" }];
