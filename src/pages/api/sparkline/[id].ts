import type { APIRoute } from "astro"

export const prerender = false

export const GET: APIRoute = async ({ params, url }) => {

  const id = params.id
  const days = url.searchParams.get("days") ?? "7"

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  )

  const data = await res.json()

  const prices =
    data.prices.map((p: number[]) => p[1])

  return new Response(JSON.stringify(prices), {
    headers: {
      "Content-Type": "application/json"
    }
  })
}