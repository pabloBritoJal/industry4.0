/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "randomuser.me", "miro.medium.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imageio.forbes.com",
        port: "",
        pathname: "/blogs-images/bernardmarr/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },
};

module.exports = nextConfig;
