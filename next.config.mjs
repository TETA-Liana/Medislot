
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // appDir is now stable in recent versions, but keeping config minimal is safe
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;
