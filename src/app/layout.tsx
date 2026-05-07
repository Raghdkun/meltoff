import type { Metadata, Viewport } from "next";
import {
  Montserrat,
  Cormorant_Garamond,
  Geist,
  Cairo,
  Caveat,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const display = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const arabic = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700"],
});

const script = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Meltoff — Yerba Mate & Coffee | Born in Sweida",
  description:
    "Meltoff. Sip & Melt Off. Yerba mate and specialty drinks born in the mountains of Sweida. From the mountains, for the soul.",
};

export const viewport: Viewport = {
  themeColor: "#ede0c8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${body.variable} ${arabic.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:text-sand focus:px-5 focus:py-3 focus:text-xs focus:tracking-[0.32em] focus:uppercase focus:outline-none focus:ring-2 focus:ring-ember"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
