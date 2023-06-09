import React from "react";
import styles from "./App.module.scss";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Item from "./pages/Item";
import AppContext from "./context";
import { getApi, getTopApi } from "./getApi";

function App() {
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
    changePercent24Hr: string;
    vwap24Hr: string;
  };

  type myCoin = {
    id: string;
    symbol: string;
    name: string;
    priceUsd: string;
    count: string;
  };

  const [coins, setCoins] = React.useState<coinApis[]>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [topCoins, setTopCoins] = React.useState<coinApis[]>();
  const [myCoins, setMyCoins] = React.useState<myCoin[]>([]);

  React.useEffect(() => {
    getApi(currentPage).then((res) => {
      setCoins(res);
      setIsLoading(false);
    });

    getTopApi().then((res) => setTopCoins(res.data));
  }, [currentPage]);
  console.log(myCoins);
  return isLoading ? (
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
      }}>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/:name' element={<Item />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
