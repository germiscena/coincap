import React from "react";
import styles from "./Item.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getGraphApi } from "../../../getApi";
import Graph from "../../common/Graph/Graph";
import { convert } from "../../../env";
import ButtonBuyCoins from "../../common/ButtonBuyCoins/ButtonBuyCoins";
import AppContext from "../../../context";
import ModalBuy from "../../common/ModalBuy/ModalBuy";

const Item = () => {
  const { isModalBuy }: any = React.useContext(AppContext);

  type graphApi = {
    date: string;
    priceUsd: string;
    time: number;
  };
  const [loading, setLoading] = React.useState<boolean>(true);
  const [graphData, setGraphData] = React.useState<graphApi[]>([]);
  const [graphPeriod, setGraphPeriod] = React.useState<string>("d1");
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (location.state == null) {
      navigate("/error");
    } else {
      setLoading(false);
      setGraphData([]);
      getGraphApi(location.state.id, graphPeriod).then((res) =>
        res.forEach((data: any) =>
          setGraphData((prev: any) => [...prev, String(Number(data.priceUsd).toFixed(2))]),
        ),
      );
    }
  }, [location.state, graphPeriod]);

  return (
    <div>
      {loading && location.state == null ? (
        <h1>Пожалуйста подождите!</h1>
      ) : (
        <>
          <h2 className={styles.title}>{location.state.name}</h2>
          <div className={styles.box}>
            <div className={styles.graph}>
              <Graph info={graphData} />
              <div>
                <button onClick={() => setGraphPeriod("m1")} className={styles.button}>
                  минута
                </button>
                <button onClick={() => setGraphPeriod("h1")} className={styles.button}>
                  час
                </button>
                <button onClick={() => setGraphPeriod("d1")} className={styles.button}>
                  день
                </button>
              </div>
            </div>
            <div className={styles.information}>
              <p className={styles.paragraphs}>Позиция в топе: {location.state.rank}</p>
              <p className={styles.paragraphs}>Символ: {location.state.symbol}</p>
              <p className={styles.paragraphs}>Полное название: {location.state.name}</p>
              <p className={styles.paragraphs}>
                Доступно к торговле: {convert(location.state.supply)}
              </p>
              <p className={styles.paragraphs}>
                Стоимость торгов: {convert(location.state.marketCapUsd)}
              </p>
              <p className={styles.paragraphs}>
                Объем торгов за последние 24 часа: {convert(location.state.volumeUsd24Hr)}
              </p>
              <p className={styles.paragraphs}>Цена в USD: {convert(location.state.priceUsd)}</p>
              <p className={styles.paragraphs}>
                Изменения за последние 24 часа: {convert(location.state.changePercent24Hr)}
              </p>
              <p className={styles.paragraphs}>
                Цена торгов за последние 24 часа: {convert(location.state.vwap24Hr)}
              </p>
              <div className={styles.buyButton}>
                <p>Купить монету</p>
                <div className={styles.buyButtonBox}>
                  <ButtonBuyCoins params={location.state} />
                </div>
              </div>
            </div>
          </div>
          {isModalBuy && <ModalBuy />}
        </>
      )}
    </div>
  );
};

export default Item;
