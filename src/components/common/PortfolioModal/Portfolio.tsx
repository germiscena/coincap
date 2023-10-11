import React from "react";
import styles from "./Portfolio.module.scss";
import AppContext from "../../../context";
import { myCoin } from "../../../types/types";
import { convert } from "../../../env";
import ButtonBuyCoins from "../ButtonBuyCoins/ButtonBuyCoins";
import ModalBuy from "../ModalBuy/ModalBuy";

const Portfolio = () => {
  const { myCoins, setIsModalPortfolio, isModalBuy }: any = React.useContext(AppContext);
  return (
    <div className={styles.portfolio}>
      <div className={styles.modal}>
        <div className={styles.head}>
          <h3>Моё портфолио</h3>
          <button onClick={() => setIsModalPortfolio(false)}>X</button>
        </div>
        <div className={styles.coins}>
          {myCoins.map((item: myCoin) => {
            return (
              <div key={item.name} className={styles.coinInfo}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.count}>{item.count}</p>
                <p className={styles.singlePrice}>{convert(item.priceUsd)}</p>
                <p className={styles.totalPrice}>
                  {convert(String(Number(item.count) * Number(item.priceUsd)))}
                </p>
                <ButtonBuyCoins params={item} />
              </div>
            );
          })}
        </div>
      </div>
      {isModalBuy && <ModalBuy />}
    </div>
  );
};

export default Portfolio;
