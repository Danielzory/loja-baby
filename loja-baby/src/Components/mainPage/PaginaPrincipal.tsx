import type { FC } from "react";
import { listaProdutos } from "../../sampleProdutos";
import Navbar from "../Navbar/Navbar";
import ProdutoCard from "../Card/ProdutoCard";
import "./Layout.css";

const PaginaPrincipal: FC = () => {
  return (
    <div className="layout">
      <Navbar />

      <main className="layout__main">
        <h2 style={{ marginBottom: 12, color: "#222" }}>Produtos</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
          }}
        >
          {listaProdutos.map((p) => (
            <ProdutoCard key={p.id} produto={p} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PaginaPrincipal;
