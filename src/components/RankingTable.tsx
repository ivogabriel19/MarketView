import { useState, useMemo } from "react"
import type { Crypto } from "../types/crypto"
import { useMarketData } from "../context/MarketDataContext"

type SortKey =
  | "market_cap"
  | "price_change_percentage_24h"
  | "total_volume"

interface Props {
  cryptos: Crypto[]
}

export default function RankingTable() {

  const { cryptos } = useMarketData()

  if (!cryptos.length) return null

  const [sortKey, setSortKey] =
    useState<SortKey>("market_cap")

  const sorted = useMemo(() => {

    return [...cryptos].sort((a, b) =>
      b[sortKey] - a[sortKey]
    )

  }, [cryptos, sortKey])

  return (

    <div>

      <h2>Market Ranking</h2>

      <div style={{ marginBottom: "10px" }}>

        <button onClick={() => setSortKey("market_cap")}>
          Market Cap
        </button>

        <button onClick={() => setSortKey("price_change_percentage_24h")}>
          24h Change
        </button>

        <button onClick={() => setSortKey("total_volume")}>
          Volume
        </button>

      </div>

      <table style={{ width: "100%" }}>

        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h</th>
            <th>Market Cap</th>
          </tr>
        </thead>

        <tbody>

          {sorted.map((c, i) => {

            const change =
              c.price_change_percentage_24h

            const color =
              change >= 0 ? "#22c55e" : "#ef4444"

            return (

              <tr key={c.id}>

                <td>{i + 1}</td>

                <td>
                  {c.symbol.toUpperCase()}
                </td>

                <td>
                  ${c.current_price.toLocaleString()}
                </td>

                <td style={{ color }}>
                  {change.toFixed(2)}%
                </td>

                <td>
                  ${c.market_cap.toLocaleString()}
                </td>

              </tr>

            )

          })}

        </tbody>

      </table>

    </div>
  )
}