import React from "react";
import styles from "./Main.module.scss";
import AppContext from "../../../context";
import Pagination from "../../common/Pagination/Pagination";
import ModalBuy from "../../common/ModalBuy/ModalBuy";
import { coinApis } from "../../../types/types";
import TableItem from "../../common/TableItem/TableItem";
import BadProps from "../../common/BadProps/BadProps";

const Main = () => {
  const { coins, isModalBuy, falseSearch }: any = React.useContext(AppContext);
  return (
    <>
      {falseSearch ? (
        <BadProps text={"К сожалению данной, монеты не найдено!"} />
      ) : (
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
                    width: "15vw",
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                  }}>
                  Символ
                </th>
                <th
                  style={{
                    width: "25vw",
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                  }}>
                  Название
                </th>
                <th
                  style={{
                    width: "25vw",
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
                <th style={{ width: "10vw", borderBottom: "2px solid black" }}>Купить</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((item: coinApis) => {
                return <TableItem key={item.id} item={item} />;
              })}
            </tbody>
          </table>
          {isModalBuy && <ModalBuy />}
          <Pagination />
        </div>
      )}
    </>
  );
};

export default Main;
