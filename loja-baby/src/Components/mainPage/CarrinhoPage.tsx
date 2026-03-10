import type { FC } from "react";
import Navbar from "../Navbar/Navbar";
import Cart from "../Cart/Cart";
import styles from "./Layout.module.css";

const CarrinhoPage: FC = () => {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <h1 style={{ color: "#222", marginBottom: "2rem" }}>Meu Carrinho</h1>
        <div style={{ maxWidth: "600px" }}>
          <Cart />
        </div>
      </main>
    </div>
  );
};

export default CarrinhoPage;
