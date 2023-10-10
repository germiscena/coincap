import React, { RefObject } from "react";
import style from "../styles/ModalBuy.module.scss";
import AppContext from "../context";
import { convert } from "../env";
type myCoin = {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
  count: string;
};

const ModalBuy = () => {
  const inputRef: RefObject<HTMLInputElement> = React.useRef(null);
  const { setMyCoins, setIsModalBuy, buyCoin }: any = React.useContext(AppContext);
  console.log(buyCoin, "MODAL");
  function submit(id: string, symbol: string, name: string, priceUsd: string, count: string) {
    setMyCoins((prev: myCoin[]) => [...prev, { id, symbol, name, priceUsd, count }]);
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
          <input ref={inputRef} className={style.count} min='0' type='number' />
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
