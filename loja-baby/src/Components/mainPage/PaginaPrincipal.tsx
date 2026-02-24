import type { FC } from "react";
import { listaProdutos } from "../../sampleProdutos";
import ProdutoCard from "../Card/ProdutoCard";

const PaginaPrincipal: FC = () => {
  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
          borderBottom: "1px solid #eaeaea",
          background: "#fafafa",
        }}
      >
        <div style={{ fontWeight: 700, color: "#222" }}>Loja Baby</div>
        <nav>
          <ul
            style={{
              display: "flex",
              gap: "1rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <a href="#" style={{ color: "#333", textDecoration: "none" }}>
                Home
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "#333", textDecoration: "none" }}>
                Carrinho
              </a>
            </li>
            <li>
              <a href="#" style={{ color: "#333", textDecoration: "none" }}>
                Filtro
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main style={{ padding: 20 }}>
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
