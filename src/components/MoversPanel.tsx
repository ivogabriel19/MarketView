import type { Crypto } from "../types/crypto"
import { useMarketData } from "../context/MarketDataContext"

interface Props {
  cryptos: Crypto[]
}

export default function MoversPanel() {

  const { cryptos } = useMarketData()

  if (!cryptos.length) return null

  const sorted = [...cryptos].sort(
    (a, b) =>
      b.price_change_percentage_24h -
      a.price_change_percentage_24h
  )

  const gainers = sorted.slice(0, 3)
  const losers = sorted.slice(-3).reverse()

  return (

    <div style={{
      display: "flex",
      gap: "40px",
      marginBottom: "40px"
    }}>

      <div>
        <h3>Top Gainers</h3>

        {gainers.map(c => (

          <div key={c.id}>

            {c.symbol.toUpperCase()} {" "}
            <span style={{ color: "#22c55e" }}>
              {c.price_change_percentage_24h.toFixed(2)}%
            </span>

          </div>

        ))}
      </div>

      <div>
        <h3>Top Losers</h3>

        {losers.map(c => (

          <div key={c.id}>

            {c.symbol.toUpperCase()} {" "}
            <span style={{ color: "#ef4444" }}>
              {c.price_change_percentage_24h.toFixed(2)}%
            </span>

          </div>

        ))}
      </div>

    </div>
  )
}