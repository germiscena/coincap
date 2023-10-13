import React from "react";
import AppContext from "../../../context";
import styles from "./ButtonBuyCoins.module.scss";

const ButtonBuyCoins = ({ params }: any) => {
  const { setIsModalBuy, setbuyCoin }: any = React.useContext(AppContext);
  function addCoin(id: string, symbol: string, name: string, priceUsd: string) {
    setbuyCoin({ id, symbol, name, priceUsd });
    setIsModalBuy(true);
  }
  return (
    <p
      className={styles.buy}
      onClick={() => addCoin(params.id, params.symbol, params.name, params.priceUsd)}>
      +
    </p>
  );
};

export default ButtonBuyCoins;
