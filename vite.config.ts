import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion-vendor": ["framer-motion", "gsap", "lenis"],
          "three-vendor": ["three", "@react-three/fiber"],
          "radix-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-slot"],
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
        },
      },
    },
  },
});
