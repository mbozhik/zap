import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
