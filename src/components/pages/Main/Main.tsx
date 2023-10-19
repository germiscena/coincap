import React from "react";
import styles from "./Main.module.scss";
import AppContext from "../../../context";
import Pagination from "../../common/Pagination/Pagination";
import ModalBuy from "../../common/ModalBuy/ModalBuy";
import { coinApis } from "../../../types/types";
import TableItem from "../../common/TableItem/TableItem";
import BadProps from "../../common/BadProps/BadProps";

const Main = () => {
  const { coins, isModalBuy, falseSearch, setSort, sort }: any = React.useContext(AppContext);
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
                  onClick={() => (sort == "rank" ? setSort("rankAsc") : setSort("rank"))}
                  style={{
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                    fontSize: "calc(10px + 0.5vw)",
                    width: "10%",
                    cursor: "pointer",
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
                  onClick={() => (sort == "name" ? setSort("nameAsc") : setSort("name"))}
                  style={{
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                    fontSize: "calc(10px + 0.5vw)",
                    width: "10%",
                    cursor: "pointer",
                  }}>
                  Название
                </th>
                <th
                  onClick={() => (sort == "price" ? setSort("priceAsc") : setSort("price"))}
                  style={{
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                    fontSize: "calc(10px + 0.5vw)",
                    width: "10%",
                    cursor: "pointer",
                  }}>
                  Стоимость(USD)
                </th>
                <th
                  onClick={() =>
                    sort == "dayValue" ? setSort("dayValueAsc") : setSort("dayValue")
                  }
                  style={{
                    borderBottom: "2px solid black",
                    borderRight: "2px solid black",
                    fontSize: "calc(10px + 0.5vw)",
                    width: "10%",
                    cursor: "pointer",
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
