import type { Project, LabEntry, TimelineEntry, NavItem, SocialLink } from "@/lib/types";

// ─── Navigation ──────────────────────────────────────────────
export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
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
    id: "exp-travel-guardian",
    type: "experience",
    categoryLabel: "Independent Development",
    title: "Travel Guardian",
    organization: "Real-Time Tourist Safety & Intelligence Platform",
    period: "2025 – PRESENT",
    description:
      "Architected an event-driven tourist safety application providing real-time risk level forecasting across geographical zones. Unified Leaflet.js for interactive risk mapping, machine learning models for safety prediction, and WebSocket channels for instant SOS alerts.",
    tags: ["WebSockets", "Leaflet.js", "Machine Learning", "Node.js", "TypeScript", "Real-Time SOS"],
    link: "https://github.com/aayush4518/gdg-project",
    current: true,
  },
  {
    id: "exp-gdg-reva",
    type: "experience",
    categoryLabel: "Community & Co-Curricular",
    title: "CyberSecurity & Tech Team Member",
    organization: "Google Developer Groups (GDG) Reva University",
    period: "10/2025 – 08/2026",
    description:
      "Contributed to AI initiatives and security engineering workshops. Collaborated with industry professionals to organize developer hackathons, technical seminars, and practical cybersecurity training for student engineers.",
    tags: ["AI Systems", "Cybersecurity", "Python", "Technical Seminars", "Hackathons"],
    current: true,
  },
  {
    id: "exp-devtrack",
    type: "experience",
    categoryLabel: "Professional Experience",
    title: "Web Development Member",
    organization: "DevTrack",
    period: "03/2025 – 01/2026",
    description:
      "Collaborated with industry mentors to engineer solutions for real-world problem statements. Developed strong foundations in production-grade web applications, component modularity, and modern web performance standards.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Production Engineering"],
  },
  {
    id: "exp-devdex",
    type: "experience",
    categoryLabel: "Independent Development",
    title: "DevDex",
    organization: "Developer Profile Gamification Platform",
    period: "2025",
    description:
      "Created an interactive developer card generator that translates GitHub commit telemetry, repositories, and activity into collectible trading cards. Built custom SVG and Canvas card renderers across themes including Cyber, RPG, and Pokémon styles.",
    tags: ["TypeScript", "GitHub API", "SVG Rendering", "Canvas", "Dynamic Theming"],
    link: "https://github.com/Senpai-Akash/DevDex",
  },
  {
    id: "exp-ai-panel",
    type: "experience",
    categoryLabel: "Independent Development",
    title: "AI Panel",
    organization: "Multi-Model LLM Comparison Suite",
    period: "2024 – 2025",
    description:
      "Engineered a concurrent multi-model benchmarking application enabling simultaneous prompt evaluation across distinct language models side-by-side. Designed streaming state pipelines, token latency metrics, and responsive comparison views.",
    tags: ["React", "TypeScript", "AI Streaming APIs", "Serverless", "Model Benchmarking"],
    link: "https://aipanel-alpha.vercel.app/",
  },
  {
    id: "exp-feedsmith",
    type: "experience",
    categoryLabel: "Research & Exploration",
    title: "FeedSmith",
    organization: "Recommendation Heuristics & Content Engine",
    period: "2024",
    description:
      "Investigated recommendation system dynamics and content curation algorithms. Designed filtering heuristics to analyze how user engagement metrics, collaborative filtering, and content ranking influence feed personalization.",
    tags: ["Python", "Machine Learning", "Recommendation Systems", "Content Filtering"],
    link: "https://github.com/Senpai-Akash/FeedSmith",
  },
  {
    id: "edu-reva",
    type: "education",
    categoryLabel: "Education",
    title: "B.Tech in Computer Science & Engineering",
    organization: "Reva University, Bengaluru",
    period: "07/2024 – PRESENT",
    description:
      "Pursuing Bachelor of Technology in Computer Science & Engineering with a 9.3 CGPA. Focusing on algorithmic complexity, data structures, operating systems, distributed architectures, and scalable full-stack development.",
    tags: ["Computer Science", "Algorithms", "Data Structures", "Operating Systems", "CGPA 9.3"],
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

