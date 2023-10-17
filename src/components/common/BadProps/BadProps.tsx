import styles from "./BadProps.module.scss";
const BadProps = ({ text }: { text: string }) => {
  return <div className={styles.bad}>{text}</div>;
};

export default BadProps;
