import type { FC } from "react";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";
import H2 from "../H2/H2";
import styles from "./Layout.module.css";

const CarrinhoPage: FC = () => {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <H2>Meu Carrinho</H2>
        <Cart />
      </main>
    </div>
  );
};

export default CarrinhoPage;
