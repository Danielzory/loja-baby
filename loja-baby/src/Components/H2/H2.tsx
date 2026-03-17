import type { FC } from "react";
import styles from "./H2.module.css";

interface Props {
  children: string;
}

const H2: FC<Props> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default H2;
