import React, { RefObject } from "react";
import style from "./ModalRemove.module.scss";
import AppContext from "../../../context";
import { convert } from "../../../env";
import { myCoin } from "../../../types/types";

const ModalRemove = () => {
  const inputRef: RefObject<HTMLInputElement> = React.useRef(null);
  const { setMyCoins, setIsModalRemove, removeCoin, removeMaxCount, myCoins }: any =
    React.useContext(AppContext);
  const [blocked, setBlocked] = React.useState(true);
  React.useEffect(() => {
    const handleInputChange = () => {
      const inputValue = inputRef.current?.value;
      if (inputValue && Number(inputValue) >= 0 && Number(inputValue) <= removeMaxCount) {
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

  function remove(id: string, maxCount: string, count: string) {
    setMyCoins((prevCoins: myCoin[]) => {
      return prevCoins
        .map((coin) => {
          if (coin.portfolioId === id) {
            if (count != maxCount) {
              if (Number(maxCount) - Number(count) >= 0) {
                return { ...coin, count: Number(maxCount) - Number(count) };
              } else {
                return coin;
              }
            } else {
              return null;
            }
          }
          return coin;
        })
        .filter(Boolean);
    });
    setBlocked(true);
    setIsModalRemove(false);
  }
  return (
    <div className={style.backside}>
      <div className={style.modal}>
        <p onClick={() => setIsModalRemove(false)} className={style.close}>
          X
        </p>
        <p className={style.coin}>{removeCoin.symbol}</p>
        <p className={style.title}>Введите количество, которое желаете продать:</p>
        <div className={style.input}>
          <input ref={inputRef} className={style.count} min='0' max='100' type='number' />
          <p
            onClick={() =>
              remove(removeCoin.portfolioId, removeCoin.count, inputRef.current!.value)
            }
            style={blocked ? { visibility: "hidden" } : { visibility: "visible" }}
            className={style.accept}>
            OK
          </p>
        </div>
        <p className={style.coin}>
          1{removeCoin.symbol} = {convert(removeCoin.priceUsd)}$
        </p>
      </div>
    </div>
  );
};

export default ModalRemove;
