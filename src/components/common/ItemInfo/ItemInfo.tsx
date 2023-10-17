import styles from "./ItemInfo.module.scss";
import { convert } from "../../../env";
import ButtonBuyCoins from "../ButtonBuyCoins/ButtonBuyCoins";
const ItemInfo = ({ state }: any) => {
  return (
    <div>
      <p className={styles.paragraphs}>Позиция в топе: {state.rank}</p>
      <p className={styles.paragraphs}>Символ: {state.symbol}</p>
      <p className={styles.paragraphs}>Полное название: {state.name}</p>
      <p className={styles.paragraphs}>Доступно к торговле: {convert(state.supply)}</p>
      <p className={styles.paragraphs}>Стоимость торгов: {convert(state.marketCapUsd)}</p>
      <p className={styles.paragraphs}>
        Объем торгов за последние 24 часа: {convert(state.volumeUsd24Hr)}
      </p>
      <p className={styles.paragraphs}>Цена в USD: {convert(state.priceUsd)}</p>
      <p className={styles.paragraphs}>
        Изменения за последние 24 часа: {convert(state.changePercent24Hr)}
      </p>
      <p className={styles.paragraphs}>
        Цена торгов за последние 24 часа: {convert(state.vwap24Hr)}
      </p>
      <div className={styles.buyButton}>
        <p>Купить монету</p>
        <ButtonBuyCoins params={state} />
      </div>
    </div>
  );
};

export default ItemInfo;
