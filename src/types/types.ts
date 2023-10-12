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
};

export type graphApi = {
  date: string;
  priceUsd: string;
  time: number;
};
