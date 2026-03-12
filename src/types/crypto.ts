export interface CryptoQuote {
  price: number
  percent_change_24h: number
  market_cap: number
}

export interface Crypto {
  id: string
  name: string
  symbol: string
  price: number
  change24hNt: number
  change24hPr: number
  sparkline: number[]
  image: string
}

export interface CoinMarketCapResponse {
  data: Crypto[]
}