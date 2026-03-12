import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import type { ChartOptions } from "chart.js"

interface Props {
  coinId: string
}

export default function Sparkline({ coinId }: Props) {

  const [prices, setPrices] =
    useState<number[]>([])

  const [days, setDays] =
    useState<"1" | "7" | "30">("7")

  useEffect(() => {

    fetch(`/api/sparkline/${coinId}?days=${days}`)
      .then(r => r.json())
      .then(setPrices)

  }, [coinId, days])

  const data = {
    labels: prices.map((_, i) => i),
    datasets: [
      {
        data: prices,
        borderColor: "#4ade80",
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  }

  const options: ChartOptions<"line"> = {

    responsive: true,

    plugins: {
      legend: { display: false }
    },

    scales: {
      x: { display: false },
      y: { display: false }
    }

  }

  return (

    <div>

      <div style={{ marginBottom: "8px" }}>

        <button onClick={() => setDays("1")}>
          24h
        </button>

        <button onClick={() => setDays("7")}>
          7d
        </button>

        <button onClick={() => setDays("30")}>
          30d
        </button>

      </div>

      <Line data={data} options={options}/>

    </div>

  )
}