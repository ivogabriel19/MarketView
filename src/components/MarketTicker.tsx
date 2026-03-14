import { useEffect, useRef } from "react";
import { useMarketData } from "../context/MarketDataContext";

export default function MarketTicker() {

  const { cryptos } = useMarketData();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const el = ref.current;
    if (!el) return;

    let pos = 0;

    const loop = () => {
      pos -= 0.3;
      el.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(loop);
    };

    loop();

  }, []);

  if (!cryptos.length) return null;

  return (
    <div style={{
      overflow: "hidden",
      whiteSpace: "nowrap",
      borderBottom: "1px solid #333",
      padding: "8px 0",
    }}>
      <div
        ref={ref}
        style={{ display: "inline-flex", gap: "40px" }}
      >
        {cryptos.concat(cryptos).map((c, i) => {

          const change = c.price_change_percentage_24h;
          const color = change >= 0 ? "#22c55e" : "#ef4444";

          return (
            <div key={c.id + i}>
              {c.symbol.toUpperCase()} ${c.current_price}
              <span style={{ color }}>
                {" "}
                {change.toFixed(2)}%
              </span>
            </div>
          );

        })}
      </div>
    </div>
  );
}