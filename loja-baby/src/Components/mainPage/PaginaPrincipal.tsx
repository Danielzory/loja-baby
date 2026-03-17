import type { FC } from "react";
import { listaProdutos } from "../../sampleProdutos";
import Navbar from "../Navbar/Navbar";
import ProdutoCard from "../Card/ProdutoCard";
import H2 from "../H2/H2";
import styles from "./Layout.module.css";

const PaginaPrincipal: FC = () => {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <H2>Catálogo de Produtos</H2>

        <div style={{ width: "80%", margin: "0 auto" }}>
          <div className={styles.produtosGrid}>
            {listaProdutos.map((p) => (
              <ProdutoCard key={p.id} produto={p} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaginaPrincipal;
