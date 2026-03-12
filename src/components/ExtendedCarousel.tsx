import { useEffect, useState } from "react"
import type { Crypto } from "../types/crypto"
import ExtendedCard from "./ExtendedCard.tsx"

interface Props {
  cryptos: Crypto[]
}

export default function ExtendedCarousel({ cryptos }: Props) {

  const [index, setIndex] = useState<number>(0)

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex(i => (i + 1) % cryptos.length)
    }, 5000)

    return () => clearInterval(interval)

  }, [cryptos.length])

  const coin = cryptos[index]

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ExtendedCard crypto={coin} />
    </div>
  )
}