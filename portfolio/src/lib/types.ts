// Type definitions for the portfolio

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

export interface LabEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "experiment" | "prototype" | "research" | "concept";
  date?: string;
  url?: string;
}

export interface TimelineEntry {
  id: string;
  type: "education" | "experience" | "certification" | "achievement";
  title: string;
  organization: string;
  period: string;
  description?: string;
  current?: boolean;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

export interface GitHubLanguageStats {
  [language: string]: number;
}

