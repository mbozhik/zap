import {NextResponse} from 'next/server'

const FEATURABLE_WIDGET_ID = process.env.NEXT_PUBLIC_FEATURABLE_WIDGET_ID
const FEATURABLE_API_URL = `https://featurable.com/api/v1/widgets/${FEATURABLE_WIDGET_ID}`

type CacheData = {
  data: unknown
  expires: number
}

let cache: CacheData | null = null
const CACHE_TTL = 1000 * 60 * 60 * 24 * 2 // 2 days

export async function GET() {
  const now = Date.now()
  if (cache && cache.expires > now) {
    return NextResponse.json(cache.data, {
      headers: {
        'X-Cache': 'HIT',
        'Cache-Control': `public, max-age=${CACHE_TTL / 1000}`,
      },
    })
  }

  if (!FEATURABLE_WIDGET_ID) {
    return NextResponse.json({error: 'Missing FEATURABLE_WIDGET_ID'}, {status: 500})
  }

  try {
    const res = await fetch(FEATURABLE_API_URL, {next: {revalidate: CACHE_TTL / 1000}})
    if (!res.ok) throw new Error('Failed to fetch Featurable reviews')
    const data = await res.json()
    cache = {data, expires: now + CACHE_TTL}
    return NextResponse.json(data, {
      headers: {
        'X-Cache': 'MISS',
        'Cache-Control': `public, max-age=${CACHE_TTL / 1000}`,
      },
    })
  } catch (error) {
    console.error('Failed to fetch Featurable reviews:', error)
    return NextResponse.json({error: 'Failed to fetch Featurable reviews'}, {status: 500})
  }
}
