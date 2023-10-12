import React from "react";
import styles from "./Main.module.scss";
import AppContext from "../../../context";
import Pagination from "../../common/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import ModalBuy from "../../common/ModalBuy/ModalBuy";
import { convert } from "../../../env";
import ButtonBuyCoins from "../../common/ButtonBuyCoins/ButtonBuyCoins";
import { coinApis } from "../../../types/types";

const Main = () => {
  const { setCurrentPage, coins, isModalBuy }: any = React.useContext(AppContext);
  const navigate = useNavigate();

  function changePage(i: number) {
    setCurrentPage(i);
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th
              style={{
                width: "10vw",
                borderRight: "2px solid black",
                borderBottom: "2px solid black",
              }}>
              №
            </th>
            <th
              style={{
                width: "20vw",
                borderRight: "2px solid black",
                borderBottom: "2px solid black",
              }}>
              Символ
            </th>
            <th
              style={{
                width: "30vw",
                borderRight: "2px solid black",
                borderBottom: "2px solid black",
              }}>
              Название
            </th>
            <th
              style={{
                width: "20vw",
                borderRight: "2px solid black",
                borderBottom: "2px solid black",
              }}>
              Стоимость(USD)
            </th>
            <th
              style={{
                width: "15vw",

                borderBottom: "2px solid black",
                borderRight: "2px solid black",
              }}>
              Суточный оборот(USD)
            </th>
            <th style={{ width: "5vw", borderBottom: "2px solid black" }}>Купить</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((item: coinApis) => {
            const priceUsd: string = convert(item.priceUsd);
            const volumeUsd: string = convert(item.volumeUsd24Hr);
            return (
              <tr className={styles.single} key={item.rank}>
                <th
                  onClick={() => navigate(`/${item.symbol}`, { state: item })}
                  style={{
                    fontSize: "calc(10px + 0.5vw)",
                    borderRight: "2px solid black",
                  }}>
                  {item.rank}
                </th>
                <th
                  onClick={() => navigate(`/${item.symbol}`, { state: item })}
                  style={{
                    fontSize: "calc(10px + 0.5vw)",
                    borderRight: "2px solid black",
                  }}>
                  {item.symbol}
                </th>
                <th
                  onClick={() => navigate(`/${item.symbol}`, { state: item })}
                  style={{
                    fontSize: "calc(10px + 0.5vw)",
                    borderRight: "2px solid black",
                  }}>
                  {item.name}
                </th>
                <th
                  onClick={() => navigate(`/${item.symbol}`, { state: item })}
                  style={{
                    fontSize: "calc(10px + 0.5vw)",
                    borderRight: "2px solid black",
                  }}>
                  {priceUsd}
                </th>
                <th
                  onClick={() => navigate(`/${item.symbol}`, { state: item })}
                  style={{
                    fontSize: "calc(10px + 0.5vw)",
                    borderRight: "2px solid black",
                  }}>
                  {volumeUsd}
                </th>
                <th
                  style={{
                    fontSize: "calc(10px + 0.5vw)",
                  }}>
                  <ButtonBuyCoins params={item} />
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isModalBuy && <ModalBuy />}
      <Pagination onChange={changePage} />
    </div>
  );
};

export default Main;
