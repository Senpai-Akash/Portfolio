import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getGitHubUser, getGitHubRepos, getLanguageStats } from "@/lib/github";
import { formatNumber, languageColors } from "@/lib/utils";
import { GitStar } from "@/components/sections/EngineeringClient";
import { ContributionGraph } from "@/components/sections/ContributionGraph";

export async function Engineering() {
  const [user, repos, languages] = await Promise.all([
    getGitHubUser(),
    getGitHubRepos(4),
    getLanguageStats(),
  ]);

  const languageEntries = Object.entries(languages).slice(0, 8);

  return (
    <section id="engineering" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-surface-subtle/30">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeader title="ENGINEERING" />
        </AnimatedSection>

        {/* Full-Width GitHub Contribution Graph */}
        <AnimatedSection delay={0.1} className="mb-10 sm:mb-12 lg:mb-16">
          <ContributionGraph />
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8 sm:gap-12 lg:gap-16">
          {/* Left: Stats & Languages */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-8 sm:space-y-10">
              {/* Profile summary */}
              {user ? (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-4">
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-highlight transition-colors inline-flex items-center gap-1.5"
                    >
                      <span className="label-mono">@{user.login}</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <StatCard label="Repositories" value={formatNumber(user.public_repos)} />
                    <StatCard label="Followers" value={formatNumber(user.followers)} />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="h-4 w-24 bg-border/50 rounded animate-pulse" />
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="h-20 bg-border/30 rounded-lg animate-pulse" />
                    <div className="h-20 bg-border/30 rounded-lg animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3.5 sm:p-4 rounded-lg border border-border bg-bg/50">
      <p className="text-xl sm:text-2xl font-heading font-semibold text-highlight">{value}</p>
      <p className="text-[11px] sm:text-xs font-mono text-text-muted mt-1">{label}</p>
    </div>
  );
}
