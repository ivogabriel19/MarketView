import { useState, useMemo } from "react"
import { useMarketData } from "../context/MarketDataContext"
import type { Crypto } from "../types/crypto"

type SortKey =
  | "market_cap"
  | "price_change_percentage_24h"
  | "total_volume"

type SortDirection = "asc" | "desc"

export default function RankingTable() {

  const { cryptos } = useMarketData()

  const [sortKey, setSortKey] =
    useState<SortKey>("market_cap")

  const [direction, setDirection] =
    useState<SortDirection>("desc")

  const handleSort = (key: SortKey) => {

    if (key === sortKey) {

      setDirection(d =>
        d === "desc" ? "asc" : "desc"
      )

    } else {

      setSortKey(key)
      setDirection("desc")

    }

  }

  const sorted = useMemo(() => {

    const sortedData = [...cryptos].sort(
      (a, b) => a[sortKey] - b[sortKey]
    )

    return direction === "desc"
      ? sortedData.reverse()
      : sortedData

  }, [cryptos, sortKey, direction])

  if (!cryptos.length) return null

  const arrow = (key: SortKey) => {
    if (key !== sortKey) return ""
    return direction === "desc" ? " ▼" : " ▲"
  }

  return (

    <div style={{ marginTop: "40px" }}>

      <h2 style={{ marginBottom: "16px" }}>
        Market Ranking
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px"
        }}
      >

        <thead>

          <tr
            style={{
              textAlign: "left",
              borderBottom: "1px solid #ddd"
            }}
          >

            <th>#</th>

            <th>Coin</th>

            <th>Price</th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleSort(
                  "price_change_percentage_24h"
                )
              }
            >
              24h {arrow("price_change_percentage_24h")}
            </th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleSort("market_cap")
              }
            >
              Market Cap {arrow("market_cap")}
            </th>

          </tr>

        </thead>

        <tbody>

          {sorted.map((c, i) => {

            const change =
              c.price_change_percentage_24h

            const color =
              change >= 0
                ? "#16a34a"
                : "#dc2626"

            return (

              <tr
                key={c.id}
                style={{
                  borderBottom: "1px solid #f1f1f1"
                }}
              >

                <td>{i + 1}</td>

                <td>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >

                    <img
                      src={c.image}
                      width={20}
                      height={20}
                    />

                    <strong>
                      {c.symbol.toUpperCase()}
                    </strong>

                  </div>

                </td>

                <td>
                  $
                  {c.current_price.toLocaleString()}
                </td>

                <td style={{ color }}>
                  {change.toFixed(2)}%
                </td>

                <td>
                  $
                  {c.market_cap.toLocaleString()}
                </td>

              </tr>

            )

          })}

        </tbody>

      </table>

    </div>

  )

}