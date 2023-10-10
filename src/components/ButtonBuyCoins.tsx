import React from "react";
import AppContext from "../context";

const ButtonBuyCoins = ({ params }: any) => {
  const { setIsModalBuy, setbuyCoin }: any = React.useContext(AppContext);
  function addCoin(id: string, symbol: string, name: string, priceUsd: string) {
    setbuyCoin({ id, symbol, name, priceUsd });
    setIsModalBuy(true);
    console.log(id, symbol, name, priceUsd, "HELL");
    console.log(params, "PATA");
  }
  return (
    <p
      style={{
        margin: "0",
        cursor: "pointer",
        width: "100%",
        marginTop: "-3px",
      }}
      onClick={() => addCoin(params.id, params.symbol, params.name, params.priceUsd)}>
      +
    </p>
  );
};

export default ButtonBuyCoins;
