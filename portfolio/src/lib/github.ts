import type { GitHubUser, GitHubRepo, GitHubLanguageStats, ContributionCalendar } from "@/lib/types";

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_USERNAME = "Senpai-Akash";

// Cache duration: 1 hour (in seconds)
const CACHE_DURATION = 3600;

/**
 * Fetch with GitHub API headers and Next.js cache configuration.
 * Uses server-side fetching with revalidation.
 */
async function githubFetch<T>(endpoint: string): Promise<T | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    // Use GITHUB_TOKEN if available (server-side only)
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers,
      next: { revalidate: CACHE_DURATION },
    });

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} for ${endpoint}`
      );
      return null;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`GitHub API fetch failed for ${endpoint}:`, error);
    return null;
  }
}

/**
 * Fetch GitHub user profile.
 */
export async function getGitHubUser(): Promise<GitHubUser | null> {
  return githubFetch<GitHubUser>(`/users/${GITHUB_USERNAME}`);
}

/**
 * Fetch public repositories, sorted by most recently updated.
 */
export async function getGitHubRepos(
  limit: number = 10
): Promise<GitHubRepo[]> {
  const repos = await githubFetch<GitHubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=${limit}&type=owner`
  );
  return repos ?? [];
}

/**
 * Aggregate language distribution across all public repos.
 * Returns a map of language → percentage (0–100).
 */
export async function getLanguageStats(): Promise<GitHubLanguageStats> {
  const repos = await getGitHubRepos(30);
  const languageTotals: Record<string, number> = {};

  // Fetch languages for each repo in parallel
  const languagePromises = repos.map((repo) =>
    githubFetch<Record<string, number>>(
      `/repos/${GITHUB_USERNAME}/${repo.name}/languages`
    )
  );

  const results = await Promise.all(languagePromises);

  for (const langData of results) {
    if (!langData) continue;
    for (const [lang, bytes] of Object.entries(langData)) {
      languageTotals[lang] = (languageTotals[lang] ?? 0) + bytes;
    }
  }

  // Convert to percentages
  const totalBytes = Object.values(languageTotals).reduce(
    (sum, b) => sum + b,
    0
  );

  if (totalBytes === 0) return {};

  const stats: GitHubLanguageStats = {};
  for (const [lang, bytes] of Object.entries(languageTotals)) {
    const pct = (bytes / totalBytes) * 100;
    if (pct >= 1) {
      // Only include languages with ≥1%
      stats[lang] = Math.round(pct * 10) / 10;
    }
  }

  // Sort by percentage descending
  return Object.fromEntries(
    Object.entries(stats).sort(([, a], [, b]) => b - a)
  );
}

/**
 * Fetch the last 365 days of contribution calendar data via GitHub GraphQL API.
 * Requires GITHUB_TOKEN environment variable for authentication.
 * Returns null if the token is unavailable or the request fails.
 */
export async function getContributionCalendar(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  const query = `
    query ContributionCalendar($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
                weekday
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        query,
        variables: {
          username: GITHUB_USERNAME,
        },
      }),
      next: { revalidate: CACHE_DURATION },
    });

    if (!response.ok) {
      console.error(`GitHub GraphQL API error: ${response.status}`);
      return null;
    }

    const json = (await response.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: ContributionCalendar;
          };
        };
      };
      errors?: Array<{ message: string }>;
    };

    if (json.errors?.length) {
      console.error(
        "GitHub GraphQL errors:",
        json.errors.map((e) => e.message).join(", ")
      );
      return null;
    }

    return json.data?.user?.contributionsCollection?.contributionCalendar ?? null;
  } catch (error) {
    console.error("Failed to fetch contribution calendar:", error);
    return null;
  }
}
