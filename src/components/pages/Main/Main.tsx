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
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                    fontSize: "calc(10px + 0.5vw)",
                    width: "10%",
                  }}>
                  №
                </th>
                <th
                  style={{
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                    fontSize: "calc(10px + 0.5vw)",
                    width: "10%",
                  }}>
                  Символ
                </th>
                <th
                  style={{
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                    fontSize: "calc(10px + 0.5vw)",
                    width: "10%",
                  }}>
                  Название
                </th>
                <th
                  style={{
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                    fontSize: "calc(10px + 0.5vw)",
                    width: "10%",
                  }}>
                  Стоимость(USD)
                </th>
                <th
                  style={{
                    borderBottom: "2px solid black",
                    borderRight: "2px solid black",
                    fontSize: "calc(10px + 0.5vw)",
                    width: "10%",
                  }}>
                  Суточный оборот(USD)
                </th>
                <th
                  style={{
                    borderBottom: "2px solid black",
                    fontSize: "calc(10px + 0.5vw)",
                    width: "10%",
                  }}>
                  Купить
                </th>
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
