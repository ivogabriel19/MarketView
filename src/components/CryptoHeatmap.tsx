import type { Crypto } from "../types/crypto"
import { useMarketData } from "../context/MarketDataContext"

interface Props {
  cryptos: Crypto[]
}

export default function CryptoHeatmap() {

  const { cryptos } = useMarketData()

  if (!cryptos.length) return null

  const maxCap =
    Math.max(...cryptos.map(c => c.market_cap))

  return (

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: "10px",
      marginTop: "30px"
    }}>

      {cryptos.map(c => {

        const size =
          (c.market_cap / maxCap) * 100

        const change =
          c.price_change_percentage_24h

        const color =
          change >= 0 ? "#14532d" : "#7f1d1d"

        return (

          <div
            key={c.id}
            style={{
              background: color,
              padding: `${10 + size * 0.2}px`,
              borderRadius: "8px",
              color: "white"
            }}
          >

            <strong>
              {c.symbol.toUpperCase()}
            </strong>

            <div>
              {change.toFixed(2)}%
            </div>

          </div>

        )

      })}

    </div>
  )
}