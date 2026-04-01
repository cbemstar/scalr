import Link from "next/link"
import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-background">
      <div className="container mx-auto px-4 py-14 sm:px-6">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="font-heading text-xl font-semibold tracking-tight">{siteConfig.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:gap-16 md:col-span-7 md:justify-end lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pages</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-muted-foreground transition-colors hover:text-brand"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="text-muted-foreground">{siteConfig.contact.location}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/80 pt-8 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All prices NZD + GST.
          </p>
        </div>
      </div>
    </footer>
  )
}
