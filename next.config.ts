import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    turbopack: {
        root: process.env.TURBOPACK_ROOT,
    },
};

export default nextConfig;
