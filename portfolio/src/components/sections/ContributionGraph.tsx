import { getContributionCalendar } from "@/lib/github";
import { ContributionGraphClient } from "@/components/sections/ContributionGraphClient";
import { siteConfig } from "@/lib/data";

export async function ContributionGraph() {
  const calendar = await getContributionCalendar();

  if (!calendar) {
    return (
      <div className="rounded-xl border border-border bg-bg/60 p-6 md:p-8 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-border/50">
          <div>
            <h3 className="label-mono text-accent mb-1">GitHub Contributions</h3>
            <p className="text-xl font-heading font-semibold text-text-primary">
              Contribution Activity
            </p>
          </div>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-accent hover:text-highlight transition-colors flex items-center gap-1 self-start sm:self-auto"
          >
            <span>@{siteConfig.githubUsername}</span>
            <span>↗</span>
          </a>
        </div>

        <div className="rounded-lg border border-border-strong/40 bg-surface/20 p-6 text-center max-w-xl mx-auto my-4 space-y-3">
          <div className="w-10 h-10 rounded-full bg-surface-subtle flex items-center justify-center mx-auto text-accent">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </div>
          <h4 className="text-sm font-medium text-text-primary">
            Sorry for the inconvienence. Will fix or update soon
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            To display real live contribution history from GitHub, set your{" "}
            <code className="text-accent bg-surface-subtle px-1.5 py-0.5 rounded font-mono text-[11px]">
              GITHUB_TOKEN
            </code>{" "}
            in your <code className="text-accent bg-surface-subtle px-1.5 py-0.5 rounded font-mono text-[11px]">.env.local</code> file.
          </p>
          <div className="pt-2">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-hover text-text-primary text-xs font-medium rounded-lg border border-border transition-colors"
            >
              View contributions directly on GitHub
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-bg/60 p-6 md:p-8 backdrop-blur-sm">
      <ContributionGraphClient
        calendar={calendar}
        username={siteConfig.githubUsername}
        githubUrl={siteConfig.githubUrl}
      />
    </div>
  );
}

