import type { APIRoute } from "astro"

export const prerender = false

export const GET: APIRoute = async ({ params }) => {

  const id = params.id

  const days = params.days || "7"

  try {

    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    )

    const data = await res.json()

    if (!data?.prices) {
      return new Response(
        JSON.stringify({ error: "No price data" }),
        { status: 400 }
      )
    }

    const prices = data.prices.map((p: number[]) => p[1])

    return new Response(
      JSON.stringify(prices),
      { headers: { "Content-Type": "application/json" } }
    )

  } catch (err) {

    console.error("Sparkline API error", err)

    return new Response(
      JSON.stringify({ error: "sparkline fetch failed" }),
      { status: 500 }
    )

  }

}