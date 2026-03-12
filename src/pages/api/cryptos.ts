import type { APIRoute } from "astro"

export const prerender = false

export const GET: APIRoute = async () => {

  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
  )

  const data = await res.json()

  const cryptos = data.map((c: any) => ({
    id: c.id,
    name: c.name,
    symbol: c.symbol.toUpperCase(),
    price: c.current_price,
    change24hPr: c.price_change_percentage_24h,
    change24hNt: c.price_change_24h,
    sparkline: c.sparkline_in_7d.price,
    image: c.image
  }))

  return new Response(JSON.stringify(cryptos), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300"
    }
  })
}