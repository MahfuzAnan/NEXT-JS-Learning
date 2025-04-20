/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    ppr: "incremental",
  },
  devIndicators: {
    position: "bottom-right",
  },
  serverExternalPackages: ["next-sanity", "sanity", "@sanity/vision"],
  webpack: (config) => {
    // Fix for issues with mixed CommonJS and ES modules
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

export default nextConfig;
