import { createContext, useContext, useEffect, useState } from "react"
import type { Crypto } from "../types/crypto"

interface MarketContextType {
  cryptos: Crypto[]
  loading: boolean
}

const MarketDataContext = createContext<MarketContextType>({
  cryptos: [],
  loading: true
})

export function MarketDataProvider({
  children,
  initialData
}: {
  children: React.ReactNode
  initialData?: Crypto[]
}) {

  const [cryptos, setCryptos] = useState<Crypto[]>(initialData ?? [])
  const [loading, setLoading] = useState(initialData ? false : true)

  async function fetchMarket() {
    try {
      const res = await fetch("/api/cryptos")
      const data: Crypto[] = await res.json()
      setCryptos(data)
      setLoading(false)
    } catch (err) {
      console.error("Market fetch failed", err)
    }
  }

  useEffect(() => {

    if (!initialData) {
      fetchMarket()
    }

    const interval = setInterval(fetchMarket, 30000)

    return () => clearInterval(interval)

  }, [])

  return (
    <MarketDataContext.Provider value={{ cryptos, loading }}>
      {children}
    </MarketDataContext.Provider>
  )
}

export function useMarketData() {
  return useContext(MarketDataContext)
}