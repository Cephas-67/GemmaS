import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le projet vit dans un dossier parent qui a son propre package-lock.json :
  // sans cette ligne, Next prend ce dossier parent pour racine du projet.
  outputFileTracingRoot: path.resolve(process.cwd()),
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // @react-three/fiber v8 utilise des internes React (ReactCurrentOwner) qui
  // explosent quand Webpack/Next résout deux instances de React. On force
  // Next à compiler r3f + three avec sa propre instance React.
  transpilePackages: ["@react-three/fiber", "three"],
  // Les routes de preview (glass-test, poles-test, team-test) servent au
  // developpement : en production elles renvoient vers l accueil plutot que
  // d'etre publiques et indexables.
  async redirects() {
    if (process.env.NODE_ENV !== "production") return [];
    return ["glass-test", "poles-test", "team-test"].map((route) => ({
      source: `/${route}`,
      destination: "/",
      permanent: false,
    }));
  },
};

export default nextConfig;
