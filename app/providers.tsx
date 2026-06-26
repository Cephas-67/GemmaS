"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useLenis } from "@/hooks/useLenis";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";

// Boot Lenis dans un composant vide pour garder le hook côté client
// sans imposer "use client" à toute la page.
function LenisBoot() {
  useLenis();
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      <LanguageProvider>
        <LenisBoot />
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
        <Toaster
          position="bottom-right"
          theme="system"
          toastOptions={{
            className:
              "border border-border bg-background text-foreground rounded-xl shadow-lg",
          }}
        />
      </LanguageProvider>
    </ThemeProvider>
  );
}
