import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { DM_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
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

const GTM_ID = "GTM-KP2CJWGH";
const GA_MEASUREMENT_ID = "G-CJHK94P41H";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
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
        dmSans.variable,
        geistMono.variable,
        scalrLogo.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,400..800;1,400..800&display=swap"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`}
        </Script>
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
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
