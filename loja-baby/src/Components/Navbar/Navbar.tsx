import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
import "./Navbar.css";

const Navbar: FC = () => {
  const location = useLocation();
  const { itens } = useCarrinho();

  const totalQuantidade = itens.reduce((acc, i) => acc + i.quantidade, 0);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          Loja Baby
        </Link>

        <nav className="navbar__nav">
          <ul className="navbar__list">
            <li>
              <Link
                to="/"
                className={`navbar__link ${location.pathname === "/" ? "navbar__link--active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <a href="#" className="navbar__link">
                Filtro
              </a>
            </li>
          </ul>
        </nav>

        <div className="navbar__actions">
          <Link
            to="/carrinho"
            className={`navbar__link navbar__cart ${location.pathname === "/carrinho" ? "navbar__link--active" : ""}`}
          >
            Carrinho
            <span className="navbar__cart-badge" aria-hidden>{totalQuantidade}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
