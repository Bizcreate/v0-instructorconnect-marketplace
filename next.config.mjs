// file: next.config.mjs  (ensure prisma bundles on server runtime)
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"]
  }
};
export default nextConfig;
