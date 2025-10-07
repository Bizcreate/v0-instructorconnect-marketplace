// file: next.config.mjs
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"]
  }
};
export default nextConfig;
