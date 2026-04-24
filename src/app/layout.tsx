import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { DM_Sans, Geist_Mono } from "next/font/google";
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
