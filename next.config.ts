import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // @react-three/fiber v8 utilise des internes React (ReactCurrentOwner) qui
  // explosent quand Webpack/Next résout deux instances de React. On force
  // Next à compiler r3f + three avec sa propre instance React.
  transpilePackages: ["@react-three/fiber", "three"],
};

export default nextConfig;
