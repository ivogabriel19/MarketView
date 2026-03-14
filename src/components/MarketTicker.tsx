import { useEffect, useRef } from "react";
import { useMarketData } from "../context/MarketDataContext";

export default function MarketTicker() {

  const { cryptos } = useMarketData();
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useEffect(() => {

    const el = trackRef.current;
    if (!el || !cryptos.length) return;

    let pos = 0;
    let frame: number;

    const speed = 0.35;
    const width = el.scrollWidth / 2;

    const step = () => {

      if (!paused.current) {
        pos -= speed;
      }

      if (Math.abs(pos) >= width) {
        pos += width;
      }

      el.style.transform = `translate3d(${pos}px,0,0)`;

      frame = requestAnimationFrame(step);

    };

    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);

  }, [cryptos]);

  if (!cryptos.length) return null;

  const price = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const percent = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const renderCoins = () =>
    cryptos.map((c) => {

      const change = c.price_change_percentage_24h ?? 0;
      const color = change >= 0 ? "#16a34a" : "#dc2626";

      return (
        <div
          key={c.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flex: "0 0 auto",
            fontSize: "14px"
          }}
        >
          <img src={c.image} width={18} height={18} style={{borderRadius:"50%"}} />

          <strong>{c.symbol.toUpperCase()}</strong>

          ${price.format(c.current_price)}

          <span style={{ color }}>
            {percent.format(change)}%
          </span>
        </div>
      );
    });

  return (

    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#ffffff",
        borderBottom: "1px solid #ddd",
        overflow: "hidden"
      }}
    >

      <div
        onMouseEnter={() => paused.current = true}
        onMouseLeave={() => paused.current = false}
        style={{
          padding: "10px 20px",
          overflow: "hidden"
        }}
      >

        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "40px",
            width: "max-content",
            willChange: "transform"
          }}
        >

          {renderCoins()}
          {renderCoins()}

        </div>

      </div>

    </div>

  );
}