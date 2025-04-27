/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      // localhost
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/portal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
