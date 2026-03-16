import { useState, useMemo } from "react"
import { useMarketData } from "../context/MarketDataContext"
import type { Crypto } from "../types/crypto"

type ColumnKey =
  | "price"
  | "price_change_percentage_24h"
  | "price_change_percentage_7d"
  | "market_cap"
  | "total_volume"
  | "circulating_supply"
  | "max_supply"
  | "ath"
  | "atl"
  | "fdv"

type SortDirection = "asc" | "desc"

export default function RankingTable() {

  const { cryptos } = useMarketData()

  const columnDefs = {

    price: {
      label: "Price",
      value: (c: Crypto) => c.current_price,
      render: (c: Crypto) =>
        `$${c.current_price.toLocaleString()}`
    },

    price_change_percentage_24h: {
      label: "24h",
      value: (c: Crypto) =>
        c.price_change_percentage_24h,
      render: (c: Crypto) => {

        const v =
          c.price_change_percentage_24h

        const color =
          v >= 0 ? "#16a34a" : "#dc2626"

        return (
          <span style={{ color }}>
            {v.toFixed(2)}%
          </span>
        )
      }
    },

    price_change_percentage_7d: {
      label: "7d",
      value: (c: Crypto) =>
        c.price_change_percentage_7d_in_currency,
      render: (c: Crypto) => {

        const v =
          c.price_change_percentage_7d_in_currency ?? 0

        const color =
          v >= 0 ? "#16a34a" : "#dc2626"

        return (
          <span style={{ color }}>
            {v.toFixed(2)}%
          </span>
        )
      }
    },

    market_cap: {
      label: "Market Cap",
      value: (c: Crypto) => c.market_cap,
      render: (c: Crypto) =>
        `$${c.market_cap.toLocaleString()}`
    },

    total_volume: {
      label: "Volume",
      value: (c: Crypto) => c.total_volume,
      render: (c: Crypto) =>
        `$${c.total_volume.toLocaleString()}`
    },

    circulating_supply: {
      label: "Circulating",
      value: (c: Crypto) =>
        c.circulating_supply,
      render: (c: Crypto) =>
        c.circulating_supply?.toLocaleString() ?? "-"
    },

    max_supply: {
      label: "Max Supply",
      value: (c: Crypto) =>
        c.max_supply ?? 0,
      render: (c: Crypto) =>
        c.max_supply?.toLocaleString() ?? "-"
    },

    ath: {
      label: "ATH",
      value: (c: Crypto) => c.ath ?? 0,
      render: (c: Crypto) =>
        `$${c.ath?.toLocaleString?.() ?? "-"}`
    },

    atl: {
      label: "ATL",
      value: (c: Crypto) => c.atl ?? 0,
      render: (c: Crypto) =>
        `$${c.atl?.toLocaleString?.() ?? "-"}`
    },

    fdv: {
      label: "FDV",
      value: (c: Crypto) =>
        c.fully_diluted_valuation ?? 0,
      render: (c: Crypto) =>
        `$${c.fully_diluted_valuation?.toLocaleString?.() ?? "-"}`
    }

  }

  const allColumns =
    Object.keys(columnDefs) as ColumnKey[]

  const [visibleColumns, setVisibleColumns] =
    useState<ColumnKey[]>([
      "price",
      "price_change_percentage_24h",
      "market_cap"
    ])

  const [sortKey, setSortKey] =
    useState<ColumnKey>("market_cap")

  const [direction, setDirection] =
    useState<SortDirection>("desc")

  const [configOpen, setConfigOpen] =
    useState(false)

  function toggleColumn(key: ColumnKey) {

    setVisibleColumns(cols =>

      cols.includes(key)
        ? cols.filter(c => c !== key)
        : [...cols, key]

    )

  }

  function handleSort(key: ColumnKey) {

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
      (a, b) => {

        const va =
          columnDefs[sortKey].value(a) ?? 0

        const vb =
          columnDefs[sortKey].value(b) ?? 0

        return va - vb

      }
    )

    return direction === "desc"
      ? sortedData.reverse()
      : sortedData

  }, [cryptos, sortKey, direction])

  const arrow = (key: ColumnKey) => {

    if (key !== sortKey) return ""

    return direction === "desc"
      ? " ▼"
      : " ▲"

  }

  function handleDragStart(
    e: React.DragEvent,
    col: ColumnKey
  ) {

    e.dataTransfer.setData("col", col)

  }

  function handleDrop(
    e: React.DragEvent,
    target: ColumnKey
  ) {

    const source =
      e.dataTransfer.getData("col") as ColumnKey

    if (source === target) return

    const newCols =
      [...visibleColumns]

    const from =
      newCols.indexOf(source)

    const to =
      newCols.indexOf(target)

    newCols.splice(from, 1)
    newCols.splice(to, 0, source)

    setVisibleColumns(newCols)

  }

  if (!cryptos.length) return null

  return (

    <div style={{ marginTop: 40, position: "relative" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <h2>Market Ranking</h2>

        <button
          onClick={() =>
            setConfigOpen(o => !o)
          }
          style={{
            fontSize: 18,
            cursor: "pointer",
            background: "none",
            border: "none"
          }}
        >
          ⋮
        </button>

      </div>

      {configOpen && (

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 40,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: 6,
            padding: 12,
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 10
          }}
        >

          {allColumns.map(col => (

            <label
              key={col}
              style={{
                display: "block",
                marginBottom: 6,
                cursor: "pointer"
              }}
            >

              <input
                type="checkbox"
                checked={visibleColumns.includes(
                  col
                )}
                onChange={() =>
                  toggleColumn(col)
                }
              />

              {" "}
              {columnDefs[col].label}

            </label>

          ))}

          <p
            style={{
              fontSize: 11,
              opacity: 0.6,
              marginTop: 8
            }}
          >
            drag headers to reorder
          </p>

        </div>

      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 12
        }}
      >

        <thead>

          <tr
            style={{
              borderBottom: "1px solid #ddd"
            }}
          >

            <th>#</th>

            <th>Coin</th>

            {visibleColumns.map(col => (

              <th
                key={col}
                draggable
                onDragStart={e =>
                  handleDragStart(e, col)
                }
                onDragOver={e =>
                  e.preventDefault()
                }
                onDrop={e =>
                  handleDrop(e, col)
                }
                onClick={() =>
                  handleSort(col)
                }
                style={{ cursor: "pointer" }}
              >

                {columnDefs[col].label}
                {arrow(col)}

              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {sorted.map((c, i) => (

            <tr
              key={c.id}
              style={{
                borderBottom:
                  "1px solid #f1f1f1"
              }}
            >

              <td>{i + 1}</td>

              <td>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                  }}
                >

                  <img
                    src={c.image}
                    width={20}
                  />

                  <strong>
                    {c.symbol.toUpperCase()}
                  </strong>

                </div>

              </td>

              {visibleColumns.map(col => (

                <td key={col}>

                  {columnDefs[col].render(c)}

                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}