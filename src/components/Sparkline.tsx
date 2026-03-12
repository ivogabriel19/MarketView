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
  change: number
}

export default function Sparkline({ prices, change }: Props) {

  if (!prices || prices.length === 0) return null

  
  const color = change >= 0
    ? "#16c784"   // verde
    : "#ea3943"   // rojo

  const data = {
    labels: prices.map((_, i) => i),
    datasets: [
      {
        data: prices,
        borderColor: color,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3
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