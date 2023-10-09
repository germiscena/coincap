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
            const priceUsd: string =
              Number(item.priceUsd) < 0.01
                ? String(Number(item.priceUsd).toFixed(5))
                : Number(item.priceUsd) < 1000
                ? String(Number(item.priceUsd).toFixed(2))
                : Number(item.priceUsd) > 999 && Number(item.priceUsd) < 1000000
                ? `${(Number(item.priceUsd) / 1000).toFixed(2)}k`
                : Number(item.priceUsd) > 999999 && Number(item.priceUsd) < 999999999
                ? `${(Number(item.priceUsd) / 1000000).toFixed(2)}m`
                : `${(Number(item.priceUsd) / 1000000000).toFixed(2)}b`;
            const volumeUsd: string =
              Number(item.volumeUsd24Hr) < 0.01
                ? String(Number(item.volumeUsd24Hr).toFixed(5))
                : Number(item.volumeUsd24Hr) < 1000
                ? String(Number(item.volumeUsd24Hr).toFixed(2))
                : Number(item.volumeUsd24Hr) > 999 && Number(item.volumeUsd24Hr) < 1000000
                ? `${(Number(item.volumeUsd24Hr) / 1000).toFixed(2)}k`
                : Number(item.volumeUsd24Hr) > 999999 && Number(item.volumeUsd24Hr) < 999999999
                ? `${(Number(item.volumeUsd24Hr) / 1000000).toFixed(2)}m`
                : `${(Number(item.volumeUsd24Hr) / 1000000000).toFixed(2)}b`;
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
