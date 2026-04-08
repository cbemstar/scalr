import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import {
  Target,
  Check,
  BarChart3,
  Users,
  X,
} from "lucide-react"

export function Features() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative">
        <div className="relative z-10 grid grid-cols-6 items-stretch gap-4">
          {/* ── Card 1: Experience stat ── */}
          <Card className="relative col-span-full flex h-full overflow-hidden lg:col-span-2">
            <CardContent className="relative m-auto size-fit pt-6">
              <div className="relative flex h-24 w-56 items-center">
                <svg
                  className="text-muted absolute inset-0 size-full"
                  viewBox="0 0 254 104"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="mx-auto block w-fit text-5xl font-semibold tabular-nums">
                  6+
                </span>
              </div>
              <h2 className="mt-6 text-center font-heading text-2xl font-semibold sm:text-3xl">
                Years in digital marketing
              </h2>
            </CardContent>
          </Card>

          {/* ── Card 2: Goals before pixels ── */}
          <Card className="relative col-span-full h-full overflow-hidden sm:col-span-3 lg:col-span-2">
            <CardContent className="flex h-full min-h-0 flex-col pt-6">
              <div className="relative mx-auto flex aspect-square size-32 shrink-0 items-center justify-center rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                <Target className="size-14 text-primary" strokeWidth={1.25} />
              </div>
              <div className="relative z-10 mt-6 flex flex-1 flex-col justify-end space-y-2 text-center">
                <h2 className="font-heading text-lg font-medium text-foreground">
                  Goals before pixels
                </h2>
                <p className="text-pretty text-sm text-muted-foreground sm:text-base">
                  Analytics, conversion paths, and clear calls to action are
                  part of the build — not an afterthought.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 3: Scoped packages ── */}
          <Card className="relative col-span-full h-full overflow-hidden sm:col-span-3 lg:col-span-2">
            <CardContent className="flex h-full min-h-0 flex-col pt-6">
              <div className="flex-1 pt-2 lg:px-4">
                <ul className="space-y-3" role="list">
                  {[
                    "Defined scope",
                    "Fixed price",
                    "Clear deliverables",
                    "No hidden extras",
                  ].map((label) => (
                    <li key={label} className="flex items-center gap-2.5">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-foreground">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative z-10 mt-8 space-y-2 text-center sm:mt-auto sm:pt-6">
                <h2 className="font-heading text-lg font-medium text-foreground">
                  Scoped packages
                </h2>
                <p className="text-pretty text-sm text-muted-foreground sm:text-base">
                  Transparent pricing and defined deliverables — so you know
                  what you&apos;re getting before work starts.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 4: You can see what works ── */}
          <Card className="relative col-span-full h-full min-h-0 overflow-hidden lg:col-span-3">
            <CardContent className="grid min-h-0 grid-cols-1 gap-6 pt-6 sm:grid-cols-2 sm:items-stretch">
              <div className="relative z-10 flex min-h-0 flex-col justify-between gap-10 sm:h-full sm:gap-8 lg:gap-6">
                <div className="relative flex aspect-square size-12 shrink-0 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                  <BarChart3 className="m-auto size-5" strokeWidth={1} />
                </div>
                <div className="space-y-2">
                  <h2 className="font-heading text-lg font-medium text-foreground">
                    You can see what works
                  </h2>
                  <p className="text-pretty text-sm text-muted-foreground sm:text-base">
                    GA4, Search Console, and conversion tracking set up so you
                    have a baseline after launch.
                  </p>
                </div>
              </div>
              <div className="relative mt-2 h-fit min-h-0 rounded-tl-xl border-l border-t border-border p-6 sm:-mb-6 sm:-mr-6 sm:mt-0 sm:self-stretch">
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
                        <span className="text-muted-foreground">
                          {row.label}
                        </span>
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
            <CardContent className="grid min-h-0 grid-cols-1 gap-6 pt-6 sm:grid-cols-2 sm:items-stretch">
              <div className="relative z-10 flex min-h-0 flex-col justify-between gap-10 sm:h-full sm:gap-8 lg:gap-6">
                <div className="relative flex aspect-square size-12 shrink-0 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                  <Users className="m-auto size-6" strokeWidth={1} />
                </div>
                <div className="space-y-2">
                  <h2 className="font-heading text-lg font-medium text-foreground">
                    What we don&apos;t do
                  </h2>
                  <p className="text-pretty text-sm text-muted-foreground sm:text-base">
                    Clear boundaries help projects stay on time and on budget.
                  </p>
                </div>
              </div>
              <div className="relative mt-2 min-h-0 rounded-tl-xl border-t border-border p-6 sm:-mb-6 sm:-mr-6 sm:mt-0 sm:flex sm:flex-col sm:justify-center sm:self-stretch sm:border-l sm:border-t sm:border-border">
                <ul className="flex flex-col gap-4 text-sm text-muted-foreground" role="list">
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
    </div>
  )
}
