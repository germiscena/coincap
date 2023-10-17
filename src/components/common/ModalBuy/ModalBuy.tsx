import React, { RefObject } from "react";
import style from "./ModalBuy.module.scss";
import AppContext from "../../../context";
import { convert, closeModal, submit } from "../../../env";

const ModalBuy = () => {
  const inputRef: RefObject<HTMLInputElement> = React.useRef(null);
  const { setMyCoins, setIsModalBuy, buyCoin }: any = React.useContext(AppContext);
  const [blocked, setBlocked] = React.useState(true);
  React.useEffect(() => {
    const handleInputChange = () => {
      const inputValue = inputRef.current?.value;
      if (inputValue && Number(inputValue) >= 0 && Number(inputValue) <= 100) {
        setBlocked(false);
      } else {
        setBlocked(true);
      }
    };
    if (inputRef.current) {
      inputRef.current.addEventListener("input", handleInputChange);
      return () => {
        inputRef.current?.removeEventListener("input", handleInputChange);
      };
    }
  }, [inputRef.current]);

  return (
    <div onClick={(e) => closeModal(e, setIsModalBuy)} className={style.backside}>
      <div className={style.modal}>
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
                setMyCoins,
                setBlocked,
                setIsModalBuy,
              )
            }
            style={blocked ? { visibility: "hidden" } : { visibility: "visible" }}
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
