import type { CoinMarketCapResponse, Crypto } from "../types/crypto"

const API_URL =
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

export async function getLatestCryptos(limit = 50): Promise<Crypto[]> {

  const res = await fetch(
    `${API_URL}?start=1&limit=${limit}&sort=market_cap&convert=USD`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": import.meta.env.CMC_API_KEY
      }
    }
  )

  if (!res.ok) {
    throw new Error("CoinMarketCap API error")
  }

  const json: CoinMarketCapResponse = await res.json()

  return json.data
}

export function getCryptoLogo(id: number) {
  return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`
}