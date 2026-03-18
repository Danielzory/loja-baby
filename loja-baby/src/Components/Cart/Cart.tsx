import type { FC } from "react";
import { useCarrinho } from "../../context/CarrinhoContext";
import { useAuth } from "../../context/AuthContext"; // Importando o Auth
import { useNavigate } from "react-router-dom"; // Para mandar pro login
import { gerarMensagemWhatsapp } from "../../logic/Finalizacao";
import type { Pedido } from "../../logic/Finalizacao";
import styles from "./Cart.module.css";

const Cart: FC = () => {
  const { itens, valorTotal, removerProduto } = useCarrinho();
  const { usuario } = useAuth(); // Pegando o estado do login
  const navigate = useNavigate();

  const handleRemover = (id: string) => {
    removerProduto(id);
  };

  const formatarPreco = (valor: number): string => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleFinalizar = () => {
    if (!usuario) {
      alert("Por favor, faça login para finalizar seu pedido! 🛍️");
      navigate("/login");
      return;
    }

    const pedido: Pedido = {
      itens,
      total: valorTotal,
      metodoPagamento: "pix",
      cliente: {
        nome: usuario.nome, // Agora pegamos o nome real
        endereco: usuario.endereco, 
      },
    };

    const mensagem = gerarMensagemWhatsapp(pedido);
    const url = `https://wa.me/5581986302720?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  return (
    <aside className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Carrinho</h2>
        <span className={styles.badge}>{itens.length}</span>
      </div>

      {itens.length === 0 ? (
        <div className={styles.empty}>
          <p>Seu carrinho está vazio</p>
        </div>
      ) : (
        <>
          <div className={styles.items}>
            {itens.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemNome}>{item.nome}</h3>
                  <p className={styles.itemDetalhes}>
                    {item.quantidade} × {formatarPreco(item.preco)} <strong>{formatarPreco(item.preco * item.quantidade)}</strong>
                  </p>
                </div>

                <button
                  className={styles.itemButtonRemove}
                  onClick={() => handleRemover(item.id)}
                  aria-label={`Remover ${item.nome} do carrinho`}
                  title="Remover"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.footerTotal}>
              <span className={styles.footerTotalLabel}>Total:</span>
              <span className={styles.footerTotalValue}>
                {formatarPreco(valorTotal)}
              </span>
            </div>

            {/* Botão Dinâmico */}
            {usuario ? (
              <button
                className={styles.footerButton}
                onClick={handleFinalizar}
              >
                Finalizar via WhatsApp
              </button>
            ) : (
              <button
                className={styles.footerButtonDisabled}
                onClick={() => navigate("/login")}
              >
                Faça Login para Finalizar
              </button>
            )}

            {!usuario && (
              <p className={styles.loginHint}>
                * É necessário estar logado para finalizar a compra.
              </p>
            )}
          </div>
        </>
      )}
    </aside>
  );
};

export default Cart;