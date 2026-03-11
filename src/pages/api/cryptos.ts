import type { APIRoute } from "astro"
import { getLatestCryptos } from "../../lib/coinmarketcap"
import type { Crypto } from "../../types/crypto"

let cache: Crypto[] | null = null
let lastFetch = 0

const CACHE_TIME = 60 * 1000 

export const GET: APIRoute = async () => {

  const now = Date.now()

  if (cache && now - lastFetch < CACHE_TIME) {

    return new Response(
      JSON.stringify(cache),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

  }

  const cryptos = await getLatestCryptos(50)

  cache = cryptos
  lastFetch = now

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