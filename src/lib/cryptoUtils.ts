export function getTopMarketCap(cryptos: any, n = 5) {
  return cryptos.slice(0, n);
}

export function getTopGainers(cryptos: any, n = 5) {
  return [...cryptos]
    .sort(
      (a, b) =>
        b.quote.USD.percent_change_24h -
        a.quote.USD.percent_change_24h
    )
    .slice(0, n);
}

export function getTopLosers(cryptos: any, n = 5) {
  return [...cryptos]
    .sort(
      (a, b) =>
        a.quote.USD.percent_change_24h -
        b.quote.USD.percent_change_24h
    )
    .slice(0, n);
}