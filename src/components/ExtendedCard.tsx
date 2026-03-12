import type { Crypto } from "../types/crypto"
import Sparkline from "./Sparkline"

interface Props {
  crypto: Crypto
}

export default function ExtendedCard({ crypto }: Props) {

  const change = crypto.price_change_percentage_24h
  const changeColor = change >= 0 ? "#22c55e" : "#ef4444"

  const volumeRatio =
    crypto.total_volume / crypto.market_cap

  const distanceATH =
    ((crypto.current_price - crypto.ath) / crypto.ath) * 100

  return (

    <div
      style={{
        width: "320px",
        padding: "20px",
        borderRadius: "12px",
        background: "#111",
        color: "white"
      }}
    >

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

        <img src={crypto.image} width="28"/>

        <strong>
          {crypto.name} ({crypto.symbol.toUpperCase()})
        </strong>

      </div>

      <h2>${crypto.current_price.toLocaleString()}</h2>

      <div style={{ color: changeColor }}>
        {change.toFixed(2)}%
      </div>

      <div style={{ marginTop: "12px", fontSize: "14px" }}>

        <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>

        <p>Volume 24h: ${crypto.total_volume.toLocaleString()}</p>

        <p>Vol/Mcap: {volumeRatio.toFixed(3)}</p>

        <p>From ATH: {distanceATH.toFixed(2)}%</p>

      </div>

      <div style={{ height: "100px", marginTop: "16px" }}>
        <Sparkline coinId={crypto.id}/>
      </div>

    </div>
  )
}