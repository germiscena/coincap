import React from "react";
import styles from "./ButtonRemoveCoins.module.scss";
import AppContext from "../../../context";

const ButtonRemoveCoins = ({ params }: any) => {
  const { setIsModalRemove, setRemoveCoin, setRemoveMaxCount }: any = React.useContext(AppContext);
  function remove(
    id: string,
    symbol: string,
    name: string,
    priceUsd: string,
    count: string,
    portfolioId: string,
  ) {
    setRemoveCoin({ id, symbol, name, priceUsd, count, portfolioId });
    setIsModalRemove(true);
    setRemoveMaxCount(Number(count));
  }
  return (
    <p
      className={styles.remove}
      onClick={() =>
        remove(
          params.id,
          params.symbol,
          params.name,
          params.priceUsd,
          params.count,
          params.portfolioId,
        )
      }>
      -
    </p>
  );
};

export default ButtonRemoveCoins;
