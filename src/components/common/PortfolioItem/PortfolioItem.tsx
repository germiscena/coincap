import styles from "./PortfolioItem.module.scss";
import ButtonBuyCoins from "../ButtonBuyCoins/ButtonBuyCoins";
import ButtonRemoveCoins from "../ButtonRemoveCoins/ButtonRemoveCoins";
import { convert } from "../../../env";
import AppContext from "../../../context";
import React from "react";
import { myCoin } from "../../../types/types";

const PortfolioItem = ({ item, id }: { item: myCoin; id: number }) => {
  const { singleCurrentCoinCost }: any = React.useContext(AppContext);
  return (
    <div key={id} className={styles.coinInfo}>
      <p style={{ width: "20%" }} className={styles.column}>
        {item.name}
      </p>
      <p style={{ width: "10%" }} className={styles.column}>
        {item.count}
      </p>
      <p style={{ width: "20%" }} className={styles.column}>
        {convert(item.priceUsd)}
      </p>
      <p style={{ width: "20%" }} className={styles.column}>
        {convert(singleCurrentCoinCost[id])}
      </p>
      <p style={{ width: "20%" }} className={styles.column}>
        {convert(String(Number(item.count) * Number(item.priceUsd)))}
      </p>
      <div style={{ width: "10%" }} className={styles.lastColumn}>
        <ButtonBuyCoins params={item} />
        <ButtonRemoveCoins params={item} />
      </div>
    </div>
  );
};

export default PortfolioItem;
