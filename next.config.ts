// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_WEATHERBIT_API_KEY: process.env.NEXT_PUBLIC_WEATHERBIT_API_KEY,
  },
};

module.exports = nextConfig;
