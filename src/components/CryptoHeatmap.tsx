import type { Crypto } from "../types/crypto"
import { useMarketData } from "../context/MarketDataContext"

interface Props {
  cryptos: Crypto[]
}

function heatColor(change: number) {

  const max = 10; // clamp del rango
  const value = Math.max(-max, Math.min(max, change));

  const intensity = Math.abs(value) / max;

  if (value > 0) {

    const green = Math.round(120 + 100 * intensity);
    const alpha = 0.15 + intensity * 0.6;

    return `rgba(34, ${green}, 94, ${alpha})`;

  }

  if (value < 0) {

    const red = Math.round(180 + 60 * intensity);
    const alpha = 0.15 + intensity * 0.6;

    return `rgba(${red}, 30, 30, ${alpha})`;

  }

  return "rgba(0,0,0,0.05)";
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

        const size = (c.market_cap / maxCap) * 100
        const change = c.price_change_percentage_24h
        const color = heatColor(change)

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