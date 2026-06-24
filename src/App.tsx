import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Navbar } from "./components/Navbar";
import { CookieBanner } from "./components/CookieBanner";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  useLenis();

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
    </>
  );
}
