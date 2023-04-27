import React, { RefObject } from "react";
import style from "./BuyCoins.module.scss";
import AppContext from "../context";

type myCoin = {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
  count: string;
};

const BuyCoins = ({ setModal, thisCoin }: any) => {
  const inputRef: RefObject<HTMLInputElement> = React.useRef(null);
  const { setMyCoins }: any = React.useContext(AppContext);
  function submit(id: string, symbol: string, name: string, priceUsd: string, count: string) {
    setMyCoins((prev: myCoin[]) => [...prev, { id, symbol, name, priceUsd, count }]);
    setModal(false);
  }
  return (
    <div className={style.backside}>
      <div className={style.modal}>
        <p onClick={() => setModal(false)} className={style.close}>
          X
        </p>
        <p className={style.coin}>{thisCoin.symbol}</p>
        <p className={style.title}>Введите количество, которое желаете приобрести:</p>
        <div className={style.input}>
          <input ref={inputRef} className={style.count} type='number' />
          <p
            onClick={() =>
              submit(
                thisCoin.id,
                thisCoin.symbol,
                thisCoin.name,
                thisCoin.priceUsd,
                inputRef.current!.value,
              )
            }
            className={style.accept}>
            OK
          </p>
        </div>
        <p className={style.coin}>
          1{thisCoin.symbol} = {thisCoin.priceUsd.slice(0, -14)}
        </p>
      </div>
    </div>
  );
};

export default BuyCoins;
