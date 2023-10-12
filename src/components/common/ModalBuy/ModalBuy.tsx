import React, { RefObject } from "react";
import style from "./ModalBuy.module.scss";
import AppContext from "../../../context";
import { convert } from "../../../env";
import { myCoin } from "../../../types/types";

const ModalBuy = () => {
  const inputRef: RefObject<HTMLInputElement> = React.useRef(null);
  const { setMyCoins, setIsModalBuy, buyCoin }: any = React.useContext(AppContext);
  function submit(id: string, symbol: string, name: string, priceUsd: string, count: string) {
    setMyCoins((prevCoins: myCoin[]) => {
      const existingCoin: myCoin | undefined = prevCoins.find((coin) => coin.name === name);
      if (existingCoin) {
        return prevCoins.map((coin) =>
          coin.name === name
            ? { ...coin, count: String(Number(coin.count) + Number(count)) }
            : coin,
        );
      } else {
        if (Number(count) != 0) {
          return [...prevCoins, { id, symbol, name, priceUsd, count }];
        } else {
          return prevCoins;
        }
      }
    });
    setIsModalBuy(false);
  }
  return (
    <div className={style.backside}>
      <div className={style.modal}>
        <p onClick={() => setIsModalBuy(false)} className={style.close}>
          X
        </p>
        <p className={style.coin}>{buyCoin.symbol}</p>
        <p className={style.title}>Введите количество, которое желаете приобрести:</p>
        <div className={style.input}>
          <input ref={inputRef} className={style.count} min='0' max='100' type='number' />
          <p
            onClick={() =>
              submit(
                buyCoin.id,
                buyCoin.symbol,
                buyCoin.name,
                buyCoin.priceUsd,
                inputRef.current!.value,
              )
            }
            className={style.accept}>
            OK
          </p>
        </div>
        <p className={style.coin}>
          1{buyCoin.symbol} = {convert(buyCoin.priceUsd)}$
        </p>
      </div>
    </div>
  );
};

export default ModalBuy;
