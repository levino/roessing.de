/**
 * @type {import('next').NextConfig}
 **/
import withMdx from '@next/mdx'

const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  i18n: {
    locales: ["de"],
    defaultLocale: "de",
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default withMdx()(nextConfig)
