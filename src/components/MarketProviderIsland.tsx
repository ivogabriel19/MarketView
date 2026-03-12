import { MarketDataProvider } from "../context/MarketDataContext"
import type { Crypto } from "../types/crypto"

export default function MarketProviderIsland({
  initialData,
  children
}: {
  initialData: Crypto[]
  children: React.ReactNode
}) {

  return (
    <MarketDataProvider initialData={initialData}>
      {children}
    </MarketDataProvider>
  )
}