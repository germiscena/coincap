import styles from "./TableItem.module.scss";
import { useNavigate } from "react-router-dom";
import { coinApis } from "../../../types/types";
import { convert } from "../../../env";
import ButtonBuyCoins from "../ButtonBuyCoins/ButtonBuyCoins";

const TableItem = ({ item }: { item: coinApis }) => {
  const priceUsd: string = convert(item.priceUsd);
  const volumeUsd: string = convert(item.volumeUsd24Hr);
  const navigate = useNavigate();
  return (
    <tr className={styles.single} key={item.rank}>
      <th
        onClick={() => navigate(`/${item.symbol}`, { state: item })}
        style={{
          fontSize: "calc(10px + 0.5vw)",
          borderRight: "2px solid black",
        }}>
        {item.rank}
      </th>
      <th
        onClick={() => navigate(`/${item.symbol}`, { state: item })}
        style={{
          fontSize: "calc(10px + 0.5vw)",
          borderRight: "2px solid black",
        }}>
        {item.symbol}
      </th>
      <th
        onClick={() => navigate(`/${item.symbol}`, { state: item })}
        style={{
          fontSize: "calc(10px + 0.5vw)",
          borderRight: "2px solid black",
        }}>
        {item.name}
      </th>
      <th
        onClick={() => navigate(`/${item.symbol}`, { state: item })}
        style={{
          fontSize: "calc(10px + 0.5vw)",
          borderRight: "2px solid black",
        }}>
        {priceUsd}
      </th>
      <th
        onClick={() => navigate(`/${item.symbol}`, { state: item })}
        style={{
          fontSize: "calc(10px + 0.5vw)",
          borderRight: "2px solid black",
        }}>
        {volumeUsd}
      </th>
      <th
        style={{
          fontSize: "calc(10px + 0.5vw)",
        }}>
        <ButtonBuyCoins params={item} />
      </th>
    </tr>
  );
};

export default TableItem;
