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
  // Add entries as information is provided
  // Example structure:
  // {
  //   id: "edu-1",
  //   type: "education",
  //   title: "Degree Title",
  //   organization: "University Name",
  //   period: "2020 – 2024",
  //   description: "Brief description.",
  // },
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

