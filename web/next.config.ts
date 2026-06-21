import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Bound compiler concurrency and memory use on Windows workstations.
    cpus: 2,
    memoryBasedWorkersCount: false,
    workerThreads: true,
    webpackMemoryOptimizations: true,
    optimizePackageImports: ["lucide-react"],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
