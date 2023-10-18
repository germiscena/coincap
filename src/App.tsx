import React from "react";
import styles from "./App.module.scss";
import Header from "./components/common/Header/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./components/pages/Main/Main";
import Item from "./components/pages/Item/Item";
import AppContext from "./context";
import { getApi, getDiffApi, getSearchApi } from "./getApi";
import Error from "./components/pages/Error";
import { coinApis, myCoin, walletCoins } from "./types/types";
import { convert } from "./env";

function App() {
  const [isModalBuy, setIsModalBuy] = React.useState<boolean>(false);
  const [isModalRemove, setIsModalRemove] = React.useState<boolean>(false);
  const [buyCoin, setbuyCoin] = React.useState<myCoin>();
  const [removeCoin, setRemoveCoin] = React.useState<myCoin>();
  const [removeMaxCount, setRemoveMaxCount] = React.useState<number>();
  const [coins, setCoins] = React.useState<coinApis[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageCount, setPageCount] = React.useState<number>(1);
  const [topCoins, setTopCoins] = React.useState<coinApis[]>();
  const [myCoins, setMyCoins] = React.useState<myCoin[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [falseSearch, setFalseSearch] = React.useState<boolean>(false);
  const [isModalPortfolio, setIsModalPortfolio] = React.useState<boolean>(false);
  const [walletCost, setWalletCost] = React.useState<number>(0);
  const [currentCost, setCurrentCost] = React.useState<number>(0);
  const [singleCurrentCoinCost, setSingleCurrentCoinCost] = React.useState<string[]>([]);
  const [updateCoins, setUpdateCoins] = React.useState<boolean>(true);
  const [difference, setDifference] = React.useState<string>("+0,00 (0,00 %)");
  const storageCoins: string | null = localStorage.getItem("coins");

  React.useEffect(() => {
    let trimmedSearch = search.trim();
    if (trimmedSearch !== "") {
      getSearchApi(currentPage, trimmedSearch).then((res) => {
        if (res == null) {
          setFalseSearch(true);
        } else {
          setPageCount(Math.ceil(res.len / 10));
          setCoins(res.data);
          setFalseSearch(false);
        }
      });
    } else {
      setFalseSearch(false);
      if (topCoins) {
        getApi(currentPage).then((res) => {
          setCoins(res.mainApi);
          setPageCount(10);
        });
      } else {
        getApi(currentPage).then((res) => {
          setCoins(res.mainApi);
          setTopCoins(res.topApi);
          setPageCount(10);
        });
      }
    }
  }, [currentPage, search, topCoins]);

  React.useEffect(() => {
    function getDifference() {
      if (storageCoins) {
        const localCoinsArr: string[] = JSON.parse(storageCoins).map((item: walletCoins) => {
          return item.id + "," + item.count;
        });
        getDiffApi(localCoinsArr).then((res) => {
          setCurrentCost(res.totalPrice);
          setSingleCurrentCoinCost(res.singlePrices);
        });
      }

      currentCost &&
        setDifference(
          (currentCost - walletCost > 0
            ? "+" + convert(String(currentCost - walletCost))
            : convert(String(currentCost - walletCost))) +
            "$ (" +
            convert(String(Math.abs((currentCost - walletCost) / walletCost) * 100)) +
            " %)",
        );
    }
    getDifference();
  }, [currentCost, walletCost, currentPage]);

  React.useEffect(() => {
    setWalletCost(
      myCoins.reduce(
        (sum: number, curr: walletCoins) =>
          sum + Number(curr.priceUsd) * Math.abs(Number(curr.count)),
        0,
      ),
    );
    if (storageCoins && updateCoins) {
      setMyCoins(JSON.parse(storageCoins));
      setUpdateCoins(false);
    } else if (myCoins) {
      localStorage.setItem("coins", JSON.stringify(myCoins));
      setUpdateCoins(false);
    }
  }, [myCoins]);

  return coins.length == 0 ? (
    <div style={{ textAlign: "center", marginTop: "30vh", fontSize: "50px" }}>
      Подождите, идет загрузка!
    </div>
  ) : (
    <AppContext.Provider
      value={{
        coins,
        topCoins,
        currentPage,
        setCurrentPage,
        myCoins,
        setMyCoins,
        search,
        setSearch,
        isModalBuy,
        setIsModalBuy,
        buyCoin,
        setbuyCoin,
        isModalPortfolio,
        setIsModalPortfolio,
        walletCost,
        setWalletCost,
        currentCost,
        setCurrentCost,
        difference,
        singleCurrentCoinCost,
        removeCoin,
        setRemoveCoin,
        isModalRemove,
        setIsModalRemove,
        removeMaxCount,
        setRemoveMaxCount,
        pageCount,
        setPageCount,
        falseSearch,
      }}>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/:name' element={<Item />} />
          <Route path='/error' element={<Error />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
