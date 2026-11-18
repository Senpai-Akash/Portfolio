import type { Project, LabEntry, TimelineEntry, NavItem, SocialLink } from "@/lib/types";

// ─── Navigation ──────────────────────────────────────────────
export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Engineering", href: "#engineering" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
];

// ─── Projects ────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "ai-panel",
    title: "AI Panel",
    category: "AI / Developer Tools",
    description:
      "Multi-model AI comparison platform. Run prompts across different language models side-by-side and evaluate responses in real time.",
    technologies: ["React", "TypeScript", "AI APIs", "Vercel"],
    githubUrl: "https://github.com/Senpai-Akash/AI-Panel",
    demoUrl: "https://aipanel-alpha.vercel.app/",
    featured: true,
    order: 1,
  },
  {
    id: "feedsmith",
    title: "FeedSmith",
    category: "Social / Recommendation Systems",
    description:
      "Exploring personalised social media recommendation feeds. Investigating how content curation algorithms shape user experience.",
    technologies: ["Python", "Machine Learning", "Recommendation Systems"],
    githubUrl: "https://github.com/Senpai-Akash/FeedSmith",
    featured: true,
    order: 2,
  },
];

// ─── Lab Entries ─────────────────────────────────────────────
export const labEntries: LabEntry[] = [
  // Add entries as experiments are created
  // Example structure:
  // {
  //   id: "experiment-1",
  //   title: "Experiment Title",
  //   description: "Brief description of the experiment.",
  //   tags: ["tag1", "tag2"],
  //   status: "experiment",
  //   date: "2024",
  // },
];

// ─── Timeline ────────────────────────────────────────────────
export const timelineEntries: TimelineEntry[] = [
  {
    id: "exp-1",
    type: "experience",
    title: "CyberSecurity & Tech Member",
    organization: "Google Developer Groups (GDG) Reva University",
    period: "10/2025 – 08/2026",
    description:
      "Contributed to AI-based initiatives and cybersecurity workshops. Collaborated with industry professionals to coordinate technical hackathons, architecture seminars, and hands-on developer training.",
    tags: ["AI Systems", "Cybersecurity", "Python", "Hackathons", "Seminars"],
    current: true,
  },
  {
    id: "exp-2",
    type: "experience",
    title: "Web Development Member",
    organization: "DevTrack",
    period: "03/2025 – 01/2026",
    description:
      "Tackled real-world engineering challenges in close collaboration with industry experts. Built foundational knowledge and practices in production-grade web applications, maintainable architectures, and modern web standards.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Production Web"],
  },
  {
    id: "exp-3",
    type: "experience",
    title: "Full Stack Developer & Open Source Builder",
    organization: "Independent Engineering",
    period: "2024 – Present",
    description:
      "Engineered interactive web platforms including AI-Panel (multi-model side-by-side LLM benchmark suite), Travel Guardian (real-time tourist safety with Leaflet.js maps & WebSocket SOS alerts), and DevDex (developer profile cards).",
    tags: ["Full Stack", "React", "Node.js", "WebSockets", "Docker", "REST APIs"],
    current: true,
  },
  {
    id: "exp-4",
    type: "education",
    title: "B.Tech in Computer Science & Engineering",
    organization: "Reva University, Bengaluru",
    period: "07/2024 – Present",
    description:
      "Pursuing Bachelor of Technology in Computer Science and Engineering with a 9.3 CGPA. Focusing on data structures, algorithmic design, systems architecture, operating systems, and scalable web technologies.",
    tags: ["Computer Science", "Algorithms", "Data Structures", "DBMS", "CGPA 9.3"],
    current: true,
  },
];

// ─── Social Links ────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    url: "https://github.com/Senpai-Akash",
    icon: "github",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/akashanderson", 
    icon: "linkedin",
  },
  {
    label: "Email",
    url: "mailto:akashanderson889@gmail.com", 
    icon: "mail",
  },
];

// ─── Site Metadata ───────────────────────────────────────────
export const siteConfig = {
  name: "Akash",
  title: "Akash — Software Developer & Engineering Enthusiast",
  description:
    "Personal portfolio of Akash. Software developer, engineering enthusiast, and builder of thoughtful digital products.",
  githubUsername: "Senpai-Akash",
  githubUrl: "https://github.com/Senpai-Akash",
} as const;

