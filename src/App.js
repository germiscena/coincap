import React from "react";
import styles from "./styles/App.module.scss";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Item from "./pages/Item.jsx";
import axios from "axios";
import AppContext from "./context";

function App() {
  const [coins, setCoins] = React.useState([{}]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [topCoins, setTopCoins] = React.useState([{}]);

  React.useEffect(() => {
    axios
      .get(
        `https://api.coincap.io/v2/assets?limit=10&page=${currentPage}&offset=${
          10 * (-1 + currentPage)
        }`,
      )
      .then((res) => res.data)
      .then((res) => {
        setCoins(res.data);
        setIsLoading(false);
      });

    axios
      .get("https://api.coincap.io/v2/assets?limit=3")
      .then((res) => res.data)
      .then((res) => setTopCoins(res.data));
  }, [currentPage]);

  return isLoading ? (
    <div style={{ textAlign: "center", marginTop: "30vh", fontSize: "50px" }}>
      Подождите, идет загрузка!
    </div>
  ) : (
    <AppContext.Provider value={{ coins, topCoins, currentPage, setCurrentPage }}>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route exact path='/' element={<Main coins={coins} />} />
          <Route exact path='/item' element={<Item />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
