import React from "react";
import styles from "../styles/Main.module.scss";
import AppContext from "../context";
import Pagination from "../components/Pagination";

const Main = ({ coins }) => {
  const { setCurrentPage } = React.useContext(AppContext);

  function changePage(i) {
    setCurrentPage(i);
  }
  return (
    <div>
      <table className={styles.table} style={{ width: "100%", borderSpacing: 0 }}>
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
                width: "20vw",

                borderBottom: "2px solid black",
              }}>
              Суточный оборот
            </th>
          </tr>
        </thead>
        <tbody>
          {coins.map((item) => {
            return (
              <tr key={item.rank}>
                <th style={{ fontSize: "calc(10px + 0.5vw)", borderRight: "2px solid black" }}>
                  {item.rank}
                </th>
                <th style={{ fontSize: "calc(10px + 0.5vw)", borderRight: "2px solid black" }}>
                  {item.symbol}
                </th>
                <th style={{ fontSize: "calc(10px + 0.5vw)", borderRight: "2px solid black" }}>
                  {item.name}
                </th>
                <th style={{ fontSize: "calc(10px + 0.5vw)", borderRight: "2px solid black" }}>
                  {item.priceUsd.slice(0, -10)}
                </th>
                <th style={{ fontSize: "calc(10px + 0.5vw)" }}>{Math.round(item.volumeUsd24Hr)}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination onChange={changePage} />
    </div>
  );
};

export default Main;
