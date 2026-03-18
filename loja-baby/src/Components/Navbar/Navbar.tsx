import type { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
import { useAuth } from "../../context/AuthContext"; // Importando o Auth
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itens } = useCarrinho();
  const { usuario, logout } = useAuth(); // Pegando usuário e função de sair

  const totalQuantidade = itens.reduce((acc, i) => acc + i.quantidade, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.container}>
      <div className={styles.inner}>
  <Link to="/" className={styles.logo}>Loja Baby</Link>

  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li><Link to="/" className={`${styles.link} ${location.pathname === "/" ? styles.linkActive : ""}`}>Home</Link></li>
      <li><a href="#" className={styles.link}>Filtro</a></li>
      {/* Removemos o Login/Olá daqui para não quebrar o centro */}
    </ul>
  </nav>

  <div className={styles.actions}>
    {/* ADICIONADO AQUI: Status do Usuário */}
    {usuario ? (
      <div className={styles.userItem}>
        <span className={styles.welcome}>
          Olá, <strong>{usuario.nome.split(" ")[0]}</strong>!
        </span>
        <button onClick={handleLogout} className={styles.logoutBtn}>Sair</button>
      </div>
    ) : (
      <Link to="/login" className={styles.link} style={{marginRight: '1rem'}}>
        Login
      </Link>
    )}

    <Link to="/carrinho" className={`${styles.link} ${styles.cart}`}>
      Carrinho
      <span className={styles.cartBadge}>{totalQuantidade}</span>
    </Link>
  </div>
</div>
    </header>
  );
};

export default Navbar;