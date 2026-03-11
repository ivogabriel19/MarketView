import { useEffect, useState } from "react"

export function useSparkline(id: number): number[] {

  const [prices, setPrices] = useState<number[]>([])

  useEffect(() => {

    async function load() {
      const res = await fetch(`/api/sparkline/${id}`)
      const data: number[] = await res.json()
      setPrices(data)
    }

    load()

  }, [id])

  return prices
}