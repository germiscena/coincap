import React from "react";
import styles from "./Main.module.scss";
import AppContext from "../context";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import BuyCoins from "../components/BuyCoins";

type coinApis = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Ht: string;
  vwap24Hr: string;
};
type myCoin = {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
};

const Main = () => {
  const { setCurrentPage, coins }: any = React.useContext(AppContext);
  const [isModalBuy, setIsModalBuy] = React.useState(false);
  const [thisCoin, setThisCoin] = React.useState<myCoin>();

  const navigate = useNavigate();

  function changePage(i: number) {
    setCurrentPage(i);
  }
  function buyCoin(id: string, symbol: string, name: string, priceUsd: string) {
    setThisCoin({ id, symbol, name, priceUsd });
    setIsModalBuy(true);
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
              Стоимость
            </th>
            <th
              style={{
                width: "15vw",

                borderBottom: "2px solid black",
                borderRight: "2px solid black",
              }}>
              Суточный оборот
            </th>
            <th style={{ width: "5vw", borderBottom: "2px solid black" }}>Купить</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((item: coinApis) => {
            return (
              <tr className={styles.single} key={item.rank}>
                <th
                  onClick={() => navigate(`/${item.symbol}`, { state: item })}
                  style={{ fontSize: "calc(10px + 0.5vw)", borderRight: "2px solid black" }}>
                  {item.rank}
                </th>
                <th
                  onClick={() => navigate(`/${item.symbol}`, { state: item })}
                  style={{ fontSize: "calc(10px + 0.5vw)", borderRight: "2px solid black" }}>
                  {item.symbol}
                </th>
                <th
                  onClick={() => navigate(`/${item.symbol}`, { state: item })}
                  style={{ fontSize: "calc(10px + 0.5vw)", borderRight: "2px solid black" }}>
                  {item.name}
                </th>
                <th
                  onClick={() => navigate(`/${item.symbol}`, { state: item })}
                  style={{ fontSize: "calc(10px + 0.5vw)", borderRight: "2px solid black" }}>
                  {item.priceUsd.slice(0, -10)}
                </th>
                <th
                  onClick={() => navigate(`/${item.symbol}`, { state: item })}
                  style={{ fontSize: "calc(10px + 0.5vw)", borderRight: "2px solid black" }}>
                  {item.volumeUsd24Hr.slice(0, -15)}
                </th>
                <th
                  style={{
                    fontSize: "calc(10px + 0.5vw)",
                  }}>
                  <p
                    onClick={() => buyCoin(item.id, item.symbol, item.name, item.priceUsd)}
                    className={styles.buy}>
                    +
                  </p>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isModalBuy && <BuyCoins thisCoin={thisCoin} setModal={setIsModalBuy} />}
      <Pagination onChange={changePage} />
    </div>
  );
};

export default Main;
