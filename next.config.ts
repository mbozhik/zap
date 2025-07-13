import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
