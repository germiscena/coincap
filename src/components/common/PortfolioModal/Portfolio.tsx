import React from "react";
import styles from "./Portfolio.module.scss";
import AppContext from "../../../context";
import { myCoin } from "../../../types/types";
import { closeModal } from "../../../env";
import ModalBuy from "../ModalBuy/ModalBuy";
import ModalRemove from "../ModalRemove/ModalRemove";
import PortfolioItem from "../PortfolioItem/PortfolioItem";

const Portfolio = () => {
  const { myCoins, setIsModalPortfolio, isModalBuy, isModalRemove }: any =
    React.useContext(AppContext);

  return (
    <div onClick={(e) => closeModal(e, setIsModalPortfolio)} className={styles.portfolio}>
      <div className={styles.modal}>
        <div className={styles.head}>
          <h3>Моё портфолио</h3>
        </div>
        <div className={styles.coins}>
          <div className={styles.coinInfo}>
            <p style={{ width: "20%" }} className={styles.column}>
              Название
            </p>
            <p style={{ width: "10%" }} className={styles.column}>
              Количество
            </p>
            <p style={{ width: "20%" }} className={styles.column}>
              Цена покупки
            </p>
            <p style={{ width: "20%" }} className={styles.column}>
              Нынешняя цена
            </p>
            <p style={{ width: "20%" }} className={styles.column}>
              Итоговая цена покупки
            </p>
            <p style={{ width: "10%" }} className={styles.column}>
              Купить\продать
            </p>
          </div>
          {myCoins.map((item: myCoin, id: number) => {
            return <PortfolioItem item={item} key={id} id={id} />;
          })}
        </div>
      </div>
      {isModalBuy && <ModalBuy />}
      {isModalRemove && <ModalRemove />}
    </div>
  );
};

export default Portfolio;
