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
  const [buyCoin, setbuyCoin] = React.useState<myCoin>();
  const [coins, setCoins] = React.useState<coinApis[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [topCoins, setTopCoins] = React.useState<coinApis[]>();
  const [myCoins, setMyCoins] = React.useState<myCoin[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [isModalPortfolio, setIsModalPortfolio] = React.useState<boolean>(false);
  const [walletCost, setWalletCost] = React.useState<number>(0);
  const [currentCost, setCurrentCost] = React.useState<number>(0);
  const [updateCoins, setUpdateCoins] = React.useState<boolean>(true);
  const [difference, setDifference] = React.useState<string>("+0,00 (0,00 %)");
  const storageCoins: string | null = localStorage.getItem("coins");
  const navigate = useNavigate();
  React.useEffect(() => {
    getApi(currentPage).then((res) => {
      setCoins(res.mainApi);
      setTopCoins(res.topApi);
    });
  }, []);

  React.useEffect(() => {
    setWalletCost(
      myCoins.reduce(
        (sum: number, curr: walletCoins) =>
          sum + Number(curr.priceUsd) * Math.abs(Number(curr.count)),
        0,
      ),
    );
    if (search != "") {
      getSearchApi(currentPage, search).then((res) => {
        if (res == null) {
          navigate("/error");
          setSearch("");
        } else {
          setCoins(res);
        }
      });
    } else {
      getApi(currentPage).then((res) => {
        setCoins(res.mainApi);
      });
    }

    if (storageCoins && updateCoins) {
      setMyCoins(JSON.parse(storageCoins));
      setUpdateCoins(false);
    } else if (myCoins) {
      localStorage.setItem("coins", JSON.stringify(myCoins));
      setUpdateCoins(false);
    }
    if (storageCoins) {
      const localCoinsArr: string[] = JSON.parse(storageCoins).map((item: walletCoins) => {
        return item.id + "," + item.count;
      });
      getDiffApi(localCoinsArr).then((res) => setCurrentCost(res));
    }
    currentCost &&
      setDifference(
        convert(String(walletCost - currentCost)) +
          "$ (" +
          convert(String(Math.abs((walletCost - currentCost) / walletCost) * 100)) +
          " %)",
      );
  }, [currentPage, search, myCoins, walletCost, currentCost]);
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
