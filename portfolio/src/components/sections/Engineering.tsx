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

              {/* Language breakdown */}
              {languageEntries.length > 0 && (
                <div>
                  <h4 className="label-mono text-text-muted mb-3">Top Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {languageEntries.map(([lang, pct]) => (
                      <div
                        key={lang}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border bg-surface/20 text-xs font-mono text-text-secondary"
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: languageColors[lang] ?? "#6b7280",
                          }}
                        />
                        <span>{lang}</span>
                        <span className="text-text-muted">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Right: Recent Repositories */}
          <AnimatedSection delay={0.25}>
            <div>
              <h3 className="label-mono text-accent mb-4 sm:mb-6">Recent Repositories</h3>
              {repos.length > 0 ? (
                <div className="grid gap-3">
                  {repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-3.5 sm:p-4 rounded-lg border border-border hover:border-border-strong hover:bg-surface/30 active:bg-surface/40 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium text-text-primary group-hover:text-highlight transition-colors truncate">
                            {repo.name}
                          </h4>
                          {repo.description && (
                            <p className="mt-1 text-xs text-text-muted line-clamp-2 leading-relaxed">
                              {repo.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            {repo.language && (
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{
                                    backgroundColor:
                                      languageColors[repo.language] ?? "#6b7280",
                                  }}
                                />
                                <span className="text-xs text-text-muted">
                                  {repo.language}
                                </span>
                              </div>
                            )}
                            {repo.stargazers_count > 0 && (
                              <div className="flex items-center gap-1">
                                <GitStar />
                                <span className="text-xs text-text-muted">
                                  {repo.stargazers_count}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 bg-border/20 rounded-lg animate-pulse"
                    />
                  ))}
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
