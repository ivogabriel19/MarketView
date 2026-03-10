export interface Crypto {
  id: number
  name: string
  symbol: string
  cmc_rank: number
  quote: {
    USD: {
      price: number
      percent_change_24h: number
      market_cap: number
    }
  }
}