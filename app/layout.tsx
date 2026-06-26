import type { Metadata, Viewport } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Polices auto-hébergées par Next (zéro layout-shift, zéro requête Google) :
// Outfit pour le corps + display, Geist Mono pour les chiffres/data.
// Exposées en CSS vars → consommées par tailwind.config.ts (--font-outfit / --font-geist-mono).
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GemmaS · Référence africaine du numérique",
  description:
    "Agence digitale fondée à Cotonou, GemmaS conçoit des sites web, applications mobiles natives, logiciels sur mesure et solutions d'intelligence artificielle pour les structures qui veulent une présence numérique sérieuse, ancrée dans la réalité africaine et portée par une vision de long terme.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${outfit.variable} ${geistMono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
