import { MarketDataProvider } from "../context/MarketDataContext"

export default function MarketProviderIsland({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <MarketDataProvider>
      {children}
    </MarketDataProvider>
  )
}