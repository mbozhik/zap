import {NextRequest, NextResponse} from 'next/server'

const GOOGLE_PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

export async function GET(request: NextRequest) {
  try {
    if (!GOOGLE_PLACE_ID || !GOOGLE_API_KEY) {
      return NextResponse.json({error: 'Missing Google Places API configuration'}, {status: 500})
    }

    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({error: 'Failed to fetch reviews'}, {status: 500})
  }
}
