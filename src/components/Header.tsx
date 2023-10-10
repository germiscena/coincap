import React from "react";
import styles from "../styles/Header.module.scss";
import AppContext from "../context";
import Wallet from "../img/wallet.svg";
import { useLocation, useNavigate } from "react-router-dom";
import toMain from "../img/back.png";
import Search from "../img/search.svg";

const Header = () => {
  type coinApis = {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
  };
  type walletCoins = {
    id: string;
    symbol: string;
    name: string;
    priceUsd: string;
    count: string;
  };

  const { topCoins, myCoins, search, setSearch }: any = React.useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [walletCost, setWalletCost] = React.useState<number>(0);
  React.useEffect(() => {
    setWalletCost(
      myCoins.reduce(
        (sum: number, curr: walletCoins) =>
          sum + Number(curr.priceUsd) * Math.abs(Number(curr.count)),
        0,
      ),
    );
  }, [myCoins]);
  return (
    <div className={styles.header}>
      {location.pathname != "/" ? (
        <img className={styles.back} onClick={() => navigate("/")} src={toMain} alt='back' />
      ) : (
        ""
      )}
      <div className={styles.logo}>CoinCap</div>
      <div className={styles.inputBox}>
        <img className={styles.search} src={Search} alt='search' />
        <input
          type='text'
          placeholder='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.top}>
        {topCoins.map((item: coinApis) => {
          const priceUsd =
            Number(item.priceUsd) > 999
              ? `${(Number(item.priceUsd) / 1000).toFixed(2)}k`
              : Number(item.priceUsd).toFixed(2);
          return (
            <p key={item.rank} className={styles.topList}>
              {item.rank} - {item.name} - {priceUsd} $
            </p>
          );
        })}
      </div>
      <div className={styles.portfolio}>
        <img src={Wallet} alt='wallet' className={styles.wallet} />
        <p className={styles.money}>
          {walletCost == 0 ? 0 : walletCost.toString().slice(0, -10)} USD +2,38 (1,80 %)
        </p>
      </div>
    </div>
  );
};

export default Header;
