import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Native cross-fade on route navigation; browsers without support just skip it
    viewTransition: true,
  },
  /* config options here */
};

export default nextConfig;
