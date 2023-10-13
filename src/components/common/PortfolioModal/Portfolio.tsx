import React from "react";
import styles from "./Portfolio.module.scss";
import AppContext from "../../../context";
import { myCoin } from "../../../types/types";
import { convert } from "../../../env";
import ButtonBuyCoins from "../ButtonBuyCoins/ButtonBuyCoins";
import ModalBuy from "../ModalBuy/ModalBuy";
import ButtonRemoveCoins from "../ButtonRemoveCoins/ButtonRemoveCoins";
import ModalRemove from "../ModalRemove/ModalRemove";

const Portfolio = () => {
  const { myCoins, setIsModalPortfolio, isModalBuy, singleCurrentCoinCost, isModalRemove }: any =
    React.useContext(AppContext);
  return (
    <div className={styles.portfolio}>
      <div className={styles.modal}>
        <div className={styles.head}>
          <h3>Моё портфолио</h3>
          <button onClick={() => setIsModalPortfolio(false)}>X</button>
        </div>
        <div className={styles.coins}>
          <div className={styles.coinInfo}>
            <p className={styles.column}>Название</p>
            <p className={styles.column}>Количество</p>
            <p className={styles.column}>Цена покупки</p>
            <p className={styles.column}>Нынешняя цена</p>
            <p className={styles.column}>Итоговая цена покупки</p>
            <p className={styles.column}>Купить\продать</p>
          </div>
          {myCoins.map((item: myCoin, id: number) => {
            return (
              <div key={id} className={styles.coinInfo}>
                <p className={styles.column}>{item.name}</p>
                <p className={styles.column}>{item.count}</p>
                <p className={styles.column}>{convert(item.priceUsd)}</p>
                <p className={styles.column}>{convert(singleCurrentCoinCost[id])}</p>
                <p className={styles.column}>
                  {convert(String(Number(item.count) * Number(item.priceUsd)))}
                </p>
                <div className={styles.lastColumn}>
                  <ButtonBuyCoins params={item} />
                  <ButtonRemoveCoins params={item} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModalBuy && <ModalBuy />}
      {isModalRemove && <ModalRemove />}
    </div>
  );
};

export default Portfolio;
