import React from "react";
import styles from "./Item.module.scss";
import { useLocation } from "react-router-dom";

const Item = () => {
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

  const [loading, setLoading] = React.useState(true);
  const location = useLocation();
  const {
    rank,
    symbol,
    name,
    supply,
    marketCapUsd,
    volumeUsd24Hr,
    priceUsd,
    changePercent24Hr,
    vwap24Hr,
  }: coinApis = location.state;

  React.useEffect(() => {
    location.state && setLoading(false);
  }, [location.state]);

  return (
    <div>
      {loading ? (
        <h1>Пожалуйста подождите!</h1>
      ) : (
        <>
          <h2 className={styles.title}>{location.state.name}</h2>
          <div className={styles.box}>
            <div className={styles.graph}></div>
            <div className={styles.information}>
              <p className={styles.paragraphs}>Позиция в топе: {rank}</p>
              <p className={styles.paragraphs}>Символ: {symbol}</p>
              <p className={styles.paragraphs}>Полное название: {name}</p>
              <p className={styles.paragraphs}>Доступно к торговле: {supply.slice(0, -15)}</p>
              <p className={styles.paragraphs}>Стоимость торгов: {marketCapUsd.slice(0, -15)}</p>
              <p className={styles.paragraphs}>
                Объем торгов за последние 24 часа: {volumeUsd24Hr}
              </p>
              <p className={styles.paragraphs}>Цена в USD: {priceUsd}</p>
              <p className={styles.paragraphs}>
                Изменения за последние 24 часа: {changePercent24Hr.slice(0, -15)}
              </p>
              <p className={styles.paragraphs}>
                Цена торгов за последние 24 часа: {vwap24Hr.slice(0, -15)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
