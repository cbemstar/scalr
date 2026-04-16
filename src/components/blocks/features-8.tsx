import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { Target, Check, BarChart3, Users, X } from "lucide-react";

export function Features() {
  return (
    <div className="relative w-full min-w-0">
      <div className="relative z-10 grid grid-cols-6 items-stretch gap-5 md:gap-6">
        {/* ── Card 1: Experience stat ── */}
        <Card className="relative col-span-full flex h-full overflow-hidden lg:col-span-2">
          <CardContent className="flex h-full min-h-0 w-full flex-col gap-6 text-left">
            <div className="relative flex aspect-square size-32 shrink-0 items-center justify-center self-start rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
              <span className="relative z-10 font-heading text-4xl font-semibold tabular-nums leading-none tracking-tight">
                6+
              </span>
            </div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Years in digital marketing
            </h2>
          </CardContent>
        </Card>

        {/* ── Card 2: Goals before pixels ── */}
        <Card className="relative col-span-full h-full overflow-hidden sm:col-span-3 lg:col-span-2">
          <CardContent className="flex h-full min-h-0 w-full flex-col gap-6 text-left">
            <div className="relative flex aspect-square size-32 shrink-0 items-center justify-center self-start rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
              <Target className="size-14 text-primary" strokeWidth={1.25} />
            </div>
            <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-2 text-left">
              <h2 className="font-heading text-lg font-medium tracking-tight text-foreground">
                Goals before pixels
              </h2>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                Analytics, conversion paths, and clear calls to action are part
                of the build — not an afterthought.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Card 3: Scoped packages ── */}
        <Card className="relative col-span-full h-full overflow-hidden sm:col-span-3 lg:col-span-2">
          <CardContent className="flex h-full min-h-0 w-full flex-col gap-6 text-left">
            <ul className="min-h-0 flex-1 space-y-3 text-left" role="list">
              {[
                "Defined scope",
                "Fixed price",
                "Clear deliverables",
                "No hidden extras",
              ].map((label) => (
                <li key={label} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-snug text-foreground">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
            <div className="relative z-10 flex shrink-0 flex-col gap-2 text-left">
              <h2 className="font-heading text-lg font-medium tracking-tight text-foreground">
                Scoped packages
              </h2>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                Transparent pricing and defined deliverables — so you know what
                you&apos;re getting before work starts.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Card 4: You can see what works ── */}
        <Card className="relative col-span-full h-full min-h-0 overflow-hidden lg:col-span-3">
          <CardContent className="grid min-h-0 grid-cols-1 gap-6 sm:grid-cols-2 sm:items-stretch sm:gap-8">
            <div className="relative z-10 flex min-h-0 flex-col gap-6 text-left sm:justify-between sm:gap-8">
              <div className="relative flex aspect-square size-12 shrink-0 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                <BarChart3 className="m-auto size-5" strokeWidth={1} />
              </div>
              <div className="space-y-2 text-left">
                <h2 className="font-heading text-lg font-medium tracking-tight text-foreground">
                  You can see what works
                </h2>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  GA4, Search Console, and conversion tracking set up where your
                  package includes them — so you have a baseline to improve from
                  after launch.
                </p>
                <p className="text-pretty text-xs leading-relaxed text-muted-foreground/85">
                  Chart numbers are illustrative — not a performance guarantee.
                </p>
              </div>
            </div>
            <div className="relative mt-2 h-fit min-h-0 rounded-xl border border-border bg-muted/20 p-6 sm:mt-0 sm:self-stretch">
              <div className="absolute left-3 top-2 flex gap-1">
                <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10" />
                <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10" />
                <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10" />
              </div>
              <div className="mt-3 space-y-4">
                <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <BarChart3 className="size-3.5 text-primary" />
                    Analytics
                  </span>
                  <span className="tabular-nums">Last 30 days</span>
                </div>
                {[
                  { label: "Visitors", value: "1,247", pct: 78 },
                  { label: "Enquiries", value: "34", pct: 45 },
                  { label: "Phone Calls", value: "18", pct: 30 },
                ].map((row) => (
                  <div key={row.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-medium tabular-nums text-foreground">
                        {row.value}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary/70"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Card 5: What we don't do ── */}
        <Card className="relative col-span-full h-full min-h-0 overflow-hidden lg:col-span-3">
          <CardContent className="grid min-h-0 grid-cols-1 gap-6 sm:grid-cols-2 sm:items-stretch sm:gap-8">
            <div className="relative z-10 flex min-h-0 flex-col gap-6 text-left sm:justify-between sm:gap-8">
              <div className="relative flex aspect-square size-12 shrink-0 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                <Users className="m-auto size-6" strokeWidth={1} />
              </div>
              <div className="space-y-2 text-left">
                <h2 className="font-heading text-lg font-medium tracking-tight text-foreground">
                  What we don&apos;t do
                </h2>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Clear boundaries help projects stay on time and on budget.
                </p>
              </div>
            </div>
            <div className="relative mt-2 flex min-h-0 flex-col justify-center rounded-xl border border-border bg-muted/20 p-6 sm:mt-0 sm:self-stretch">
              <ul
                className="flex flex-col gap-4 text-sm text-muted-foreground"
                role="list"
              >
                {siteConfig.about.principles.donts.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <X className="size-2.5" strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
