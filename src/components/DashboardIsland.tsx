import MarketTicker from "./MarketTicker"
import LiveMarketIsland from "./LiveMarketIsland"
import MoversPanel from "./MoversPanel"
import RankingTable from "./RankingTable"
import ExtendedCarousel from "./ExtendedCarousel"
import CryptoHeatmap from "./CryptoHeatmap"

import { MarketDataProvider } from "../context/MarketDataContext"
import TestMarket from "./TestMarket"

export default function DashboardIsland() {

  return (
    <MarketDataProvider>

      {/* <TestMarket /> */}

      <MarketTicker />

      <section>
        <h1>Crypto Dashboard</h1>
        <LiveMarketIsland />
      </section>

      <section>
        <MoversPanel />
      </section>

      <section>
        <RankingTable />
      </section>

      <section>
        <ExtendedCarousel />
      </section>

      <section>
        <CryptoHeatmap />
      </section>

    </MarketDataProvider>
  )
}