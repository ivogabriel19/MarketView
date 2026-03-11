import { useSparkline } from "../hooks/useSparkline"
import Sparkline from "./Sparkline"
import type { Crypto } from "../types/crypto"

interface Props {
  crypto: Crypto
}

export default function CryptoCard({ crypto }: Props) {

  const prices = useSparkline(crypto.id)

  const price = crypto.quote.USD.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })

  const change = crypto.quote.USD.percent_change_24h.toFixed(2)

  const color =
    crypto.quote.USD.percent_change_24h >= 0 ? "green" : "red"

  return (

    <div className="card">

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

      {prices.length > 0 && (
        <div style={{ height: "60px" }}>
          <Sparkline prices={prices} />
        </div>
      )}

    </div>
  )
}