import {NextResponse} from 'next/server'

export async function GET() {
  return NextResponse.json({message: 'hey zap!'})
}

/*
  DEPRECATED: This API route is no longer used.

  We switched to Cloudflare Worker proxy because Featurable API is blocked
  from Russian IPs (Cloudflare returns 403).

  The client now fetches directly from the Worker:
  https://featurable-proxy.mbozhik.workers.dev/XXXX

  See: src/components/index/ReviewsModule.tsx

  WORKER:

const ALLOWED_WIDGET_ID = 'XXXX';
const FEATURABLE_BASE = 'https://featurable.com/api/v1/widgets';

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    const url = new URL(request.url);
    // Убираем начальный и конечный слэш, разбиваем по слэшам
    const pathParts = url.pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
    const widgetId = pathParts[0]; // Первый сегмент пути

    // Если ID не передан - показываем инструкцию
    if (!widgetId) {
      return new Response(JSON.stringify({
        error: 'Widget ID required',
        usage: `GET /${ALLOWED_WIDGET_ID}`,
        example: `${url.origin}/XXXX`
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Проверка ID
    if (widgetId !== ALLOWED_WIDGET_ID) {
      return new Response(JSON.stringify({
        error: 'Invalid widget ID',
        provided: widgetId,
        allowed: ALLOWED_WIDGET_ID
      }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    try {
      const featurableUrl = `${FEATURABLE_BASE}/${widgetId}`;
      const response = await fetch(featurableUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        return new Response(JSON.stringify({
          error: 'Failed to fetch from Featurable',
          status: response.status,
          statusText: response.statusText
        }), {
          status: 502,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Internal error',
        message: error.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
*/

//
//
//

// import {NextResponse} from 'next/server'

// const FEATURABLE_WIDGET_ID = process.env.NEXT_PUBLIC_FEATURABLE_WIDGET_ID
// const FEATURABLE_API_URL = `https://featurable.com/api/v1/widgets/${FEATURABLE_WIDGET_ID}`

// export async function GET() {
//   if (!FEATURABLE_WIDGET_ID) {
//     return NextResponse.json({error: 'Missing FEATURABLE_WIDGET_ID'}, {status: 500})
//   }

//   try {
//     const res = await fetch(FEATURABLE_API_URL)
//     if (!res.ok) throw new Error('Failed to fetch Featurable reviews')
//     const data = await res.json()
//     return NextResponse.json(data)
//   } catch (error) {
//     console.error('Failed to fetch Featurable reviews:', error)
//     return NextResponse.json({error: 'Failed to fetch Featurable reviews'}, {status: 500})
//   }
// }
