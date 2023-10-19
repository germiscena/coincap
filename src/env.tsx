import {
  myCoin,
  SetMyCoins,
  SetBlocked,
  SetIsModalBuy,
  SetRemoveCoin,
  setRemoveMaxCount,
  setIsModalRemove,
  SetBuyCoin,
  coinApis,
  setCoins,
} from "./types/types";

export const API_URL: string = `https://api.coincap.io/v2/assets`;
export function convert(value: string) {
  const priceUsd: string =
    Number(value) < 1
      ? String(Number(value).toFixed(4))
      : Number(value) < 1000
      ? String(Number(value).toFixed(2))
      : Number(value) > 999 && Number(value) < 1000000
      ? `${(Number(value) / 1000).toFixed(2)}k`
      : Number(value) > 999999 && Number(value) < 999999999
      ? `${(Number(value) / 1000000).toFixed(2)}m`
      : `${(Number(value) / 1000000000).toFixed(2)}b`;
  return priceUsd;
}

export function closeModal(e: React.MouseEvent, func: (value: boolean) => void) {
  if (e.currentTarget == e.target) {
    func(false);
  }
}

export function submit(
  id: string,
  symbol: string,
  name: string,
  priceUsd: string,
  count: string,
  setMyCoins: SetMyCoins,
  setBlocked: SetBlocked,
  setIsModalBuy: SetIsModalBuy,
) {
  setMyCoins((prevCoins) => {
    if (Number(count) != 0) {
      return [
        ...prevCoins,
        { id, symbol, name, priceUsd, count, portfolioId: String(prevCoins.length) },
      ];
    } else {
      return prevCoins;
    }
  });
  setBlocked((prevBlocked) => true);
  setIsModalBuy((prevIsModalBuy) => false);
}

export function remove(
  id: string,
  symbol: string,
  name: string,
  priceUsd: string,
  count: string,
  portfolioId: string,
  setRemoveCoin: SetRemoveCoin,
  setIsModalRemove: setIsModalRemove,
  setRemoveMaxCount: setRemoveMaxCount,
) {
  setRemoveCoin((prevCoins) => ({
    id,
    symbol,
    name,
    priceUsd,
    count,
    portfolioId,
  }));
  setIsModalRemove((prevIsModalRemove) => true);
  setRemoveMaxCount((prevMaxCount) => Number(count));
}

export function addCoin(
  id: string,
  symbol: string,
  name: string,
  priceUsd: string,
  setBuyCoin: SetBuyCoin,
  setIsModalBuy: SetIsModalBuy,
) {
  setBuyCoin((prevCoin) => ({
    id,
    symbol,
    name,
    priceUsd,
  }));
  setIsModalBuy((prevIsModalBuy) => true);
}

export function sorting(sort: string, func: setCoins, coins: coinApis[]) {
  if (sort == "rank") {
    func((prevCoins) => coins.sort((a, b) => Number(a.rank) - Number(b.rank)));
  } else if (sort == "rankAsc") {
    func((prevCoins) => coins.sort((a, b) => Number(b.rank) - Number(a.rank)));
  } else if (sort == "name") {
    func((prevCoins) => coins.sort((a, b) => a.name.localeCompare(b.name)));
  } else if (sort == "nameAsc") {
    func((prevCoins) => coins.sort((a, b) => b.name.localeCompare(a.name)));
  } else if (sort == "price") {
    func((prevCoins) => coins.sort((a, b) => Number(a.priceUsd) - Number(b.priceUsd)));
  } else if (sort == "priceAsc") {
    func((prevCoins) => coins.sort((a, b) => Number(b.priceUsd) - Number(a.priceUsd)));
  } else if (sort == "dayValue") {
    func((prevCoins) => coins.sort((a, b) => Number(a.volumeUsd24Hr) - Number(b.volumeUsd24Hr)));
  } else if (sort == "dayValueAsc") {
    func((prevCoins) => coins.sort((a, b) => Number(b.volumeUsd24Hr) - Number(a.volumeUsd24Hr)));
  }
}

export function sortingData(sort: string, coins: coinApis[]) {
  if (sort == "rank") {
    return coins.sort((a, b) => Number(a.rank) - Number(b.rank));
  } else if (sort == "rankAsc") {
    return coins.sort((a, b) => Number(b.rank) - Number(a.rank));
  } else if (sort == "name") {
    return coins.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort == "nameAsc") {
    return coins.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort == "price") {
    return coins.sort((a, b) => Number(a.priceUsd) - Number(b.priceUsd));
  } else if (sort == "priceAsc") {
    return coins.sort((a, b) => Number(b.priceUsd) - Number(a.priceUsd));
  } else if (sort == "dayValue") {
    return coins.sort((a, b) => Number(a.volumeUsd24Hr) - Number(b.volumeUsd24Hr));
  } else if (sort == "dayValueAsc") {
    return coins.sort((a, b) => Number(b.volumeUsd24Hr) - Number(a.volumeUsd24Hr));
  }
}

export function getItemsForPage(array: coinApis[], pageNumber: number, itemsPerPage: number) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
}
