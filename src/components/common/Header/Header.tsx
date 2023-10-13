import React from "react";
import styles from "./Header.module.scss";
import AppContext from "../../../context";
import { useLocation, useNavigate } from "react-router-dom";
import toMain from "../../../img/back.png";
import Search from "../../../img/search.svg";
import Wallet from "../../../img/wallet.svg";
import { coinApis } from "../../../types/types";
import Portfolio from "../PortfolioModal/Portfolio";
import { convert } from "../../../env";

const Header = () => {
  const {
    topCoins,
    search,
    setSearch,
    isModalPortfolio,
    setIsModalPortfolio,
    walletCost,
    difference,
  }: any = React.useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

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
          return (
            <p key={item.rank} className={styles.topList}>
              {item.rank} - {item.name} - {convert(item.priceUsd)} $
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
          {walletCost == 0 ? 0 : convert(String(walletCost))}$ {difference}
        </p>
      </div>
      {isModalPortfolio && <Portfolio />}
    </div>
  );
};

export default Header;
