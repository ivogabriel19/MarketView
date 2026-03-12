export interface CryptoQuote {
  price: number
  percent_change_24h: number
  market_cap: number
}

export interface Crypto {
  id: string
  symbol: string
  name: string
  image: string

  current_price: number
  market_cap: number
  total_volume: number

  price_change_percentage_24h: number

  circulating_supply: number

  ath: number
  ath_change_percentage: number

  sparkline_in_7d: {
    price: number[]
  }
}

export interface CoinMarketCapResponse {
  data: Crypto[]
}