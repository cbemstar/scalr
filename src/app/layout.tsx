import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import { PostHogEnsure } from "@/components/providers/posthog-ensure";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { LiquidGlassRegistryProvider } from "@/components/providers/liquid-glass-provider";
import { StringTuneProvider } from "@/components/providers/string-tune-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@wrksz/themes/next";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { buildSiteJsonLdGraph } from "@/lib/structured-data";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const scalrLogo = localFont({
  src: "./fonts/scalr.woff2",
  variable: "--font-logo",
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

const defaultTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: defaultTitle,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/social/scalr-facebook-cover.png",
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: ["/social/scalr-facebook-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NZ"
      className={cn(
        "h-full antialiased font-sans",
        geistSans.variable,
        openSans.variable,
        geistMono.variable,
        scalrLogo.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <Script id="posthog-inline-snippet" strategy="beforeInteractive">{`
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_kqinxiuga267iKspeVswbfffTeNHyftJNjYNgr969Vua',{api_host:'https://us.i.posthog.com', defaults:'2026-01-30'})
`}</Script>
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd data={buildSiteJsonLdGraph(siteConfig)} />
        <PostHogEnsure />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storage="localStorage"
          disableTransitionOnChange
        >
          <LiquidGlassRegistryProvider>
            <LenisProvider>
              <StringTuneProvider>
                <TooltipProvider>{children}</TooltipProvider>
              </StringTuneProvider>
            </LenisProvider>
          </LiquidGlassRegistryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
