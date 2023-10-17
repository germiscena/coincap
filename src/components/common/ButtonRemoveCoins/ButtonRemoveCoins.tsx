import React from "react";
import styles from "./ButtonRemoveCoins.module.scss";
import AppContext from "../../../context";
import { remove } from "../../../env";

const ButtonRemoveCoins = ({ params }: any) => {
  const { setIsModalRemove, setRemoveCoin, setRemoveMaxCount }: any = React.useContext(AppContext);

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
          setRemoveCoin,
          setIsModalRemove,
          setRemoveMaxCount,
        )
      }>
      -
    </p>
  );
};

export default ButtonRemoveCoins;
