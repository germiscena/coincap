import React from "react";
import styles from "./Item.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getGraphApi } from "../../../getApi";
import Graph from "../../common/Graph/Graph";
import AppContext from "../../../context";
import ModalBuy from "../../common/ModalBuy/ModalBuy";
import { graphApi } from "../../../types/types";
import BadProps from "../../common/BadProps/BadProps";
import ItemInfo from "../../common/ItemInfo/ItemInfo";

const Item = () => {
  const { isModalBuy }: any = React.useContext(AppContext);

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
        <BadProps text={"Пожалуйста, подождите!"} />
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
            <div>
              <ItemInfo state={location.state} />
            </div>
          </div>
          {isModalBuy && <ModalBuy />}
        </>
      )}
    </div>
  );
};

export default Item;
