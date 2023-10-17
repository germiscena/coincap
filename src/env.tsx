import {
  myCoin,
  SetMyCoins,
  SetBlocked,
  SetIsModalBuy,
  SetRemoveCoin,
  setRemoveMaxCount,
  setIsModalRemove,
  SetBuyCoin,
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
