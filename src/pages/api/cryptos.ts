import type { APIRoute } from "astro"
import type { Crypto } from "../../types/crypto"

export const prerender = false

export const GET: APIRoute = async () => {

  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
  )

  const data: Crypto[] = await res.json()

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300"
    }
  })
}