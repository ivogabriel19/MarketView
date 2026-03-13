import { useMarketData } from "../context/MarketDataContext"

export default function TestMarket() {

  const { cryptos, loading } = useMarketData()

  console.log("cryptos", cryptos)

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {cryptos.map(c => (
        <p key={c.id}>
          {c.name} - ${c.current_price}
        </p>
      ))}
    </div>
  )
}