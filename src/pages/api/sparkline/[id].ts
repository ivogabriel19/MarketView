import type { APIRoute } from "astro"

export const prerender = false

export const GET: APIRoute = async ({ params }) => {

  const id = params.id as string

  const res = await fetch(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/historical?id=${id}&interval=5m&count=24`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": import.meta.env.CMC_API_KEY
      }
    }
  )

  const json = await res.json()

  // 👇 proteger contra respuestas inválidas
  if (!json.data || !json.data[id]) {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" }
    })
  }

  const prices = json.data[id].quotes.map((q: any) => q.quote.USD.price)

  return new Response(JSON.stringify(prices), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300"
    }
  })
}