import type { Crypto } from "../types/crypto"
import Sparkline from "./Sparkline"

interface Props {
  crypto: Crypto
}

export default function ExtendedCard({ crypto }: Props) {

  const prices: number[] = crypto.sparkline_in_7d.price

  const change = crypto.price_change_percentage_24h

  const changeColor = change >= 0 ? "#16a34a" : "#dc2626"

  return (

    <div
      style={{
        width: "420px",
        padding: "20px",
        borderRadius: "12px",
        background: "#111",
        color: "white"
      }}
    >

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

        <img src={crypto.image} width="32" />

        <h2>
          {crypto.name} ({crypto.symbol.toUpperCase()})
        </h2>

      </div>

      <h1>${crypto.current_price.toLocaleString()}</h1>

      <div style={{ color: changeColor }}>
        {change.toFixed(2)}%
      </div>

      <div style={{ marginTop: "10px" }}>

        <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>

        <p>Volume 24h: ${crypto.total_volume.toLocaleString()}</p>

        <p>Circulating Supply: {crypto.circulating_supply.toLocaleString()}</p>

      </div>

      <div style={{ height: "120px", marginTop: "20px" }}>
        <Sparkline prices={prices} change={0} />
      </div>

    </div>
  )
}