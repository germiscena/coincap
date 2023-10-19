export type coinApis = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Ht: string;
  vwap24Hr: string;
};
export type walletCoins = {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
  count: string;
};

export type myCoin = {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
  count: string;
  portfolioId: string;
};

export type graphApi = {
  date: string;
  priceUsd: string;
  time: number;
};

export type buyCoin = {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
};
export type SetMyCoins = (func: (prevCoins: myCoin[]) => myCoin[]) => void;
export type SetBlocked = (func: (prevBlocked: boolean) => boolean) => void;
export type SetIsModalBuy = (func: (prevIsModalBuy: boolean) => boolean) => void;
export type SetRemoveCoin = (func: (prevCoins: myCoin) => myCoin) => void;
export type setIsModalRemove = (func: (prevIsModalRemove: boolean) => boolean) => void;
export type setRemoveMaxCount = (func: (prevMaxCount: number) => number) => void;
export type SetBuyCoin = (func: (prevCoin: buyCoin) => buyCoin) => void;
export type setCoins = (func: (prevCoins: coinApis[]) => coinApis[]) => void;
