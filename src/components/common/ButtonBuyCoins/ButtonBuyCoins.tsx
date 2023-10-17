import React from "react";
import AppContext from "../../../context";
import styles from "./ButtonBuyCoins.module.scss";
import { addCoin } from "../../../env";

const ButtonBuyCoins = ({ params }: any) => {
  const { setIsModalBuy, setbuyCoin }: any = React.useContext(AppContext);
  return (
    <p
      className={styles.buy}
      onClick={() =>
        addCoin(params.id, params.symbol, params.name, params.priceUsd, setbuyCoin, setIsModalBuy)
      }>
      +
    </p>
  );
};

export default ButtonBuyCoins;
