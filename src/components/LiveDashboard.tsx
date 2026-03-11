import { useEffect, useState } from "react"
import type { Crypto } from "../types/crypto"
import CryptoCard from "./CryptoCard.tsx"

export default function LiveDashboard() {

  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchData() {

    const res = await fetch("/api/cryptos")
    const data: Crypto[] = await res.json()

    setCryptos(data)
    setLoading(false)
  }

  useEffect(() => {

    fetchData()

    const interval = setInterval(fetchData, 60000)

    return () => clearInterval(interval)

  }, [])

  if (loading) {
    return <div>Loading prices...</div>
  }

  return (

    <div>

      <h2>Live Market</h2>

      <div className="grid">

        {cryptos.slice(0, 10).map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}

      </div>

    </div>

  )
}