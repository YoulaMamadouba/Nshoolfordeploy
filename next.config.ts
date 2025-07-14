import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'framer-motion'],
  },
  images: {
    domains: ['fonts.gstatic.com'],
  },
  webpack: (config, { isServer }) => {
    // Optimisation pour les polices Google Fonts
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    
    return config;
  },
};

export default nextConfig;
