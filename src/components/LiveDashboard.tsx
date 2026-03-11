import { useEffect, useState } from "react"
import type { Crypto } from "../types/crypto"

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
        {cryptos.slice(0, 10).map((crypto) => {

          const price = crypto.quote.USD.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
          })

          const change = crypto.quote.USD.percent_change_24h.toFixed(2)

          const color =
            crypto.quote.USD.percent_change_24h >= 0 ? "green" : "red"

          return (
            <div className="card" key={crypto.id}>

              <div className="header">
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                />

                <div>
                  <div>{crypto.name}</div>
                  <div>{crypto.symbol}</div>
                </div>
              </div>

              <div>{price}</div>

              <div style={{ color }}>
                {change}%
              </div>

            </div>
          )
        })}
      </div>

      <style >{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
        }

        .card {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 16px;
          background: white;
        }

        .header {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        img {
          width: 28px;
        }
      `}</style>
    </div>
  )
}