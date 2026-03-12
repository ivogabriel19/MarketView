import Sparkline from "./Sparkline";
import type { Crypto } from "../types/crypto";
import "./CryptoCard.css";
import { useEffect, useState } from "react";

interface Props {
  crypto: Crypto;
}

export default function CryptoCard({ crypto }: Props) {
  const [prevPrice, setPrevPrice] = useState(crypto.price);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (crypto.price > prevPrice) {
      setFlash("flash-green");
    }

    if (crypto.price < prevPrice) {
      setFlash("flash-red");
    }

    setPrevPrice(crypto.price);

    const t = setTimeout(() => setFlash(""), 500);

    return () => clearTimeout(t);
  }, [crypto.price]);

  const price = crypto.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const changePr = crypto.change24hPr.toFixed(2);
  const changeNt = crypto.change24hNt.toFixed(2);
  const color = crypto.change24hPr >= 0 ? "green" : "red";

  return (
    <div className="card">
      <div className="header">
        <img src={crypto.image} alt={crypto.name} width="24" height="24" />

        <div>
          <div>{crypto.name}</div>
          <div>{crypto.symbol}</div>
        </div>
        
        <div className={`price ${flash}`}>{price}</div>
      </div>

      <div className="card-data">
        <div className="numbers">
          {/* <div>{price}</div> */}
          <div style={{ color }}>{changePr}%</div>
          <div style={{ color }}>{changeNt} u$d</div>
        </div>

        {crypto.sparkline.length > 0 && (
          <div style={{ height: "60px" }}>
            <Sparkline prices={crypto.sparkline} change={crypto.change24hPr} />
          </div>
        )}
      </div>
    </div>
  );
}
