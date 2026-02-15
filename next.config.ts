import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false, //doppelter rendern um bugs zu finden
    turbopack:  {
      root: "C:\\Users\\fabia\\Desktop\\Informatik\\Projekte\\chess\\Chess-Database"
    }
};

export default nextConfig;
