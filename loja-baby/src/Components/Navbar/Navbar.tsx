import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  const location = useLocation();
  const { itens } = useCarrinho();

  const totalQuantidade = itens.reduce((acc, i) => acc + i.quantidade, 0);

  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          Loja Baby
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <Link
                to="/"
                className={`${styles.link} ${location.pathname === "/" ? styles.linkActive : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`${styles.link} ${location.pathname === "/login" ? styles.linkActive : ""}`}
              >
                Login
              </Link>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Filtro
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link
            to="/carrinho"
            className={`${styles.link} ${styles.cart} ${location.pathname === "/carrinho" ? styles.linkActive : ""}`}
          >
            Carrinho
            <span className={styles.cartBadge} aria-hidden>{totalQuantidade}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
