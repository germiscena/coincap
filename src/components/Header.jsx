import React from "react";
import styles from "../styles/Header.module.scss";
import AppContext from "../context";
import Wallet from "../wallet.svg";

const Header = () => {
  const { topCoins } = React.useContext(AppContext);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>CoinCap</div>
      <div className={styles.top}>
        <p className={styles.topList}>
          1 - {topCoins[0].name} - {topCoins[0].priceUsd}$
        </p>
        <p className={styles.topList}>
          2 - {topCoins[1].name} - {topCoins[1].priceUsd}$
        </p>
        <p className={styles.topList}>
          3 - {topCoins[2].name} - {topCoins[2].priceUsd}$
        </p>
      </div>
      <div className={styles.portfolio}>
        <img src={Wallet} alt='wallet' className={styles.wallet} />
        <p className={styles.money}>134,32 USD +2,38 (1,80 %)</p>
      </div>
    </div>
  );
};

export default Header;
