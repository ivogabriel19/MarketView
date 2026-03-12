import type { Crypto } from "../types/crypto";
import "./CryptoCard.css";
import { useEffect, useState } from "react";

interface Props {
  crypto: Crypto;
}

export default function CryptoCard({ crypto }: Props) {
  const [prevPrice, setPrevPrice] = useState<number>(crypto.current_price);
  const [flash, setFlash] = useState<string>("");

  useEffect(() => {
    if (crypto.current_price > prevPrice) {
      setFlash("flash-green");
    }

    if (crypto.current_price < prevPrice) {
      setFlash("flash-red");
    }

    setPrevPrice(crypto.current_price);

    const t = setTimeout(() => setFlash(""), 500);

    return () => clearTimeout(t);
  }, [crypto.current_price, prevPrice]);

  const price: string = crypto.current_price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const changePr: string = crypto.price_change_percentage_24h.toFixed(2);

  const color: string =
    crypto.price_change_percentage_24h >= 0 ? "green" : "red";

  return (
    <div className="card">
      <div className="header">
        <img src={crypto.image} alt={crypto.name} width="24" height="24" />

        <div>
          <div>{crypto.name}</div>
          <div>{crypto.symbol.toUpperCase()}</div>
        </div>
      </div>

        <div className="numbers">
          <div className={`price ${flash}`}>{price}</div>

          <div style={{ color, textAlign: "right" }}>{changePr}%</div>
        </div>
    </div>
  );
}
