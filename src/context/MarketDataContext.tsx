import { createContext, useContext, useEffect, useState } from "react";
import type { Crypto } from "../types/crypto";

interface MarketContextType {
  cryptos: Crypto[];
  loading: boolean;
}

const MarketDataContext = createContext<MarketContextType>({
  cryptos: [],
  loading: true,
});

export function MarketDataProvider({
  children
}: {
  children: React.ReactNode
}) {

  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchMarket() {
    try {

      const res = await fetch("/api/cryptos")
      const json = await res.json()

      const data: Crypto[] = json.data ?? json

      setCryptos(data)
      setLoading(false)

      console.log("market loaded", data.length)

    } catch (err) {
      console.error("Market fetch failed", err)
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchMarket()

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
  return useContext(MarketDataContext);
}
