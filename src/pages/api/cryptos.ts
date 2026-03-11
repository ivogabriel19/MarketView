import type { APIRoute } from "astro"
import { getLatestCryptos } from "../../lib/coinmarketcap"

export const GET: APIRoute = async () => {

  const cryptos = await getLatestCryptos(50)

  return new Response(
    JSON.stringify(cryptos),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60"
      }
    }
  )
}