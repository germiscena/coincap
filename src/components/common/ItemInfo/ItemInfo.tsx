import styles from "./ItemInfo.module.scss";
import { convert } from "../../../env";
import ButtonBuyCoins from "../ButtonBuyCoins/ButtonBuyCoins";
const ItemInfo = ({ state }: any) => {
  return (
    <div className={styles.paragraphs}>
      <p className={styles.paragraph}>Позиция в топе: {state.rank}</p>
      <p className={styles.paragraph}>Символ: {state.symbol}</p>
      <p className={styles.paragraph}>Полное название: {state.name}</p>
      <p className={styles.paragraph}>Доступно к торговле: {convert(state.supply)}</p>
      <p className={styles.paragraph}>Стоимость торгов: {convert(state.marketCapUsd)}</p>
      <p className={styles.paragraph}>
        Объем торгов за последние 24 часа: {convert(state.volumeUsd24Hr)}
      </p>
      <p className={styles.paragraph}>Цена в USD: {convert(state.priceUsd)}</p>
      <p className={styles.paragraph}>
        Изменения за последние 24 часа: {convert(state.changePercent24Hr)}
      </p>
      <p className={styles.paragraph}>
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
