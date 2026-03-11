import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from "chart.js"

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale)

interface Props {
  prices: number[]
}

export default function Sparkline({ prices }: Props) {

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

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    }
  }

  return <Line data={data} options={options}/>
}