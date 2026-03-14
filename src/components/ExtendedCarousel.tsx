import { useEffect, useRef } from "react"
import type { Crypto } from "../types/crypto"
import ExtendedCard from "./ExtendedCard"
import { useMarketData } from "../context/MarketDataContext"

interface Props {
  cryptos: Crypto[]
}

export default function ExtendedCarousel() {

  const { cryptos } = useMarketData()


  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const interval = setInterval(() => {

      const el = containerRef.current
      if (!el) return

      el.scrollBy({
        left: 340,
        behavior: "smooth"
      })

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      }

    }, 6000)

    return () => clearInterval(interval)

  }, [])

  if (!cryptos.length) return null

  return (

    <div
      ref={containerRef}
      style={{
        display: "flex",
        gap: "20px",
        overflowX: "auto",
        padding: "20px",
        scrollSnapType: "x mandatory"
      }}
    >

      {cryptos.map((coin) => (

        <div
          key={coin.id}
          style={{ scrollSnapAlign: "start" }}
        >
          <ExtendedCard crypto={coin}/>
        </div>

      ))}

    </div>

  )
}