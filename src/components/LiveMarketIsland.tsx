import { useEffect, useState } from "react"
import CryptoCard from "./CryptoCard"
import type { Crypto } from "../types/crypto"
import "./LiveMarketIsland.css"

export default function LiveMarketIsland({ initial }: { initial: Crypto[] }) {

  const [cryptos, setCryptos] = useState(initial)

  useEffect(() => {

    const fetchData = () => {
      fetch("/api/cryptos")
        .then(r => r.json())
        .then(setCryptos)
    }

    const interval = setInterval(fetchData, 30000)

    return () => clearInterval(interval)

  }, [])

  return (
    <>
      {cryptos.map(c => (
        <CryptoCard key={c.id} crypto={c} />
      ))}
    </>
  )
}