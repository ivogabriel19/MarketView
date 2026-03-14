import { useEffect, useState } from "react"
import CryptoCard from "./CryptoCard"
import type { Crypto } from "../types/crypto"
import "./LiveMarketIsland.css"
import { useMarketData } from "../context/MarketDataContext"

export default function LiveMarketIsland() {

  const { cryptos } = useMarketData()

  if (!cryptos.length) return null

  return (
    <>
    <div className="grid">
      {cryptos.map(c => (
        <CryptoCard key={c.id} crypto={c} />
      ))}
    </div>
    </>
  )
}