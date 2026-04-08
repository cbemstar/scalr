import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { LiquidGlassRegistryProvider } from "@/components/providers/liquid-glass-provider";
import { StringTuneProvider } from "@/components/providers/string-tune-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@wrksz/themes/next";
import { siteConfig } from "@/config/site";
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

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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
        geistMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
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
