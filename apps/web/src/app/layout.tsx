import "@workspace/ui/globals.css";

import { SanityLive } from "@workspace/sanity/live";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { Footer } from "@/components/footer";
import { CombinedJsonLd } from "@/components/json-ld";
import { NavSwitch } from "@/components/nav-switch";
import { NoImageDrag } from "@/components/no-image-drag";
import { PageTransition } from "@/components/page-transition";
import { PreviewBar } from "@/components/preview-bar";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "PKM Consultants",
    template: "%s | PKM Consultants",
  },
  description:
    "PKM Consultants – MEPF design and engineering consultancy based in Chennai, India.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical local fonts to prevent layout shifts (CLS) and FOIT */}
        <link
          rel="preload"
          href="/fonts/metropolis/Metropolis-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/metropolis/Metropolis-Bold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/mosvita/Mosvita-Bold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/mosvita/Mosvita-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/piller/Pillar.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        {/* MaskRevealText starts hidden; show it when JavaScript is off */}
        <noscript>
          <style>{"[data-mask-text]{opacity:1!important}"}</style>
        </noscript>
      </head>
      {/*
        No Next.js font variables needed — Metropolis is loaded via @font-face
        in globals.css and set as --font-sans (the Tailwind default sans).
        Use font-lumierepolis or font-mosvita anywhere via Tailwind class.
      */}
      <body className="antialiased">
        <Providers>
          <NavSwitch />
          {children}
          <Footer />
          <PageTransition />
          <NoImageDrag />
          <SanityLive />
          <CombinedJsonLd includeOrganization includeWebsite />
          {(await draftMode()).isEnabled && (
            <>
              <PreviewBar />
              <VisualEditing />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
