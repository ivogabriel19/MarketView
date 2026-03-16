import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import type { ChartOptions } from "chart.js"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

interface Props {
  coinId: string
}

export default function Sparkline({ coinId }: Props) {

  const [prices, setPrices] = useState<number[]>([])
  const [days, setDays] = useState<"1" | "7" | "30">("7")
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function load() {

      try {

        const res = await fetch(`/api/sparkline/${coinId}?days=${days}`)
        const data = await res.json()

        if (Array.isArray(data)) {
          setPrices(data)
        } else {
          console.warn("sparkline invalid response", data)
          setPrices([])
        }

      } catch (err) {

        console.error("sparkline fetch failed", err)
        setPrices([])

      } finally {

        setLoading(false)

      }

    }

    load()

  }, [coinId, days])


  if (loading) {
    return <div style={{ height: 80 }}>loading...</div>
  }

  if (!prices.length) {
    return <div style={{ height: 80 }}>no data</div>
  }

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
    backgroundColor: "rgb(222, 222, 222)",

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