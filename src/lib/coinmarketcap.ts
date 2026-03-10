const API_URL = "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

export async function getLatestCryptos(limit = 10) {
  const res = await fetch(`${API_URL}?limit=${limit}`, {
    headers: {
      "X-CMC_PRO_API_KEY": import.meta.env.CMC_API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("CoinMarketCap API error");
  }

  const json = await res.json();

  return json.data;
}