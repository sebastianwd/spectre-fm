/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.theaudiodb.com'],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  reactStrictMode: true,
  webpack: (config) => {
    if (!config.experiments) {
      config.experiments = {}
    }
    config.experiments.topLevelAwait = true
    return config
  },
}

module.exports = nextConfig
