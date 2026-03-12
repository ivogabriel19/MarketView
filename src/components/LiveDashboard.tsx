import { useEffect, useState } from "react"
import CryptoCard from "./CryptoCard"
import type { Crypto } from "../types/crypto"
import "./LiveDashboard.css"

export default function LiveDashboard() {

  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    fetch("/api/cryptos")
      .then(r => r.json())     
      .then(data => {
        setCryptos(data)
        setLoading(false)
      })  
  }

  useEffect(() => {
    fetchData()

  const interval = setInterval(fetchData, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>

      <h2>Live Market</h2>

      <div className="grid">
        {loading && Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="card skeleton"/>
        ))}

        {!loading && cryptos.map(c => (
          <CryptoCard key={c.id} crypto={c}/>
        ))}
      </div>

    </div>
  )
}