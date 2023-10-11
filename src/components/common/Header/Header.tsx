import React from "react";
import styles from "./Header.module.scss";
import AppContext from "../../../context";
import { useLocation, useNavigate } from "react-router-dom";
import toMain from "../../../img/back.png";
import Search from "../../../img/search.svg";
import Wallet from "../../../img/wallet.svg";
import { coinApis, walletCoins } from "../../../types/types";
import Portfolio from "../PortfolioModal/Portfolio";
import { convert } from "../../../env";

const Header = () => {
  const {
    topCoins,
    myCoins,
    setMyCoins,
    search,
    setSearch,
    isModalPortfolio,
    setIsModalPortfolio,
  }: any = React.useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [walletCost, setWalletCost] = React.useState<number>(0);
  const [updateCoins, setUpdateCoins] = React.useState<boolean>(true);
  const coins = localStorage.getItem("coins");
  React.useEffect(() => {
    setWalletCost(
      myCoins.reduce(
        (sum: number, curr: walletCoins) =>
          sum + Number(curr.priceUsd) * Math.abs(Number(curr.count)),
        0,
      ),
    );
    if (coins && updateCoins) {
      setMyCoins(JSON.parse(coins));
      setUpdateCoins(false);
    } else if (!coins && myCoins) {
      localStorage.setItem("coins", JSON.stringify(myCoins));
      setUpdateCoins(false);
    } else {
      localStorage.setItem("coins", JSON.stringify(myCoins));
    }
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
        <img
          onClick={() => setIsModalPortfolio(true)}
          src={Wallet}
          alt='wallet'
          className={styles.wallet}
        />
        <p className={styles.money}>
          {walletCost == 0 ? 0 : convert(String(walletCost))} USD +2,38 (1,80 %)
        </p>
      </div>
      {isModalPortfolio && <Portfolio />}
    </div>
  );
};

export default Header;
