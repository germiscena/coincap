import React from "react";
import styles from "./App.module.scss";
import Header from "./components/common/Header/Header";
import { Routes, Route } from "react-router-dom";
import Main from "./components/pages/Main/Main";
import Item from "./components/pages/Item/Item";
import AppContext from "./context";
import { getApi } from "./getApi";
import Error from "./components/pages/Error";
import { coinApis, myCoin } from "./types/types";

function App() {
  const [isModalBuy, setIsModalBuy] = React.useState<boolean>(false);
  const [buyCoin, setbuyCoin] = React.useState<myCoin>();
  const [coins, setCoins] = React.useState<coinApis[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [topCoins, setTopCoins] = React.useState<coinApis[]>();
  const [myCoins, setMyCoins] = React.useState<myCoin[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [isModalPortfolio, setIsModalPortfolio] = React.useState<boolean>(false);
  React.useEffect(() => {
    getApi(currentPage, search).then((res) => {
      setCoins(res.mainApi);
      setTopCoins(res.topApi);
    });
  }, [currentPage, search]);
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
