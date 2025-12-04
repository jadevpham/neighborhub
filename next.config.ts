import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "colabnity.com",
        port: "",
        pathname: "/api/v1/files/**",
      },
    ],
  },
  
};

export default nextConfig;
