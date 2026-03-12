import { useEffect, useState } from "react"
import CryptoCard from "./CryptoCard"
import type { Crypto } from "../types/crypto"
import "./LiveDashboard.css"

export default function LiveDashboard() {

  const [cryptos, setCryptos] = useState<Crypto[]>([])

  useEffect(() => {
    fetch("/api/cryptos")
      .then(r => r.json())
      .then(setCryptos)
  }, [])

  return (
    <div>

      <h2>Live Market</h2>

      <div className="grid">
        {cryptos.map(c => (
          <CryptoCard key={c.id} crypto={c} />
        ))}
      </div>

    </div>
  )
}