import type { FC } from "react";
import { useCarrinho } from "../../context/CarrinhoContext";
import { gerarMensagemWhatsapp } from "../../logic/Finalizacao";
import type { Pedido } from "../../logic/Finalizacao";
import styles from "./Cart.module.css";

const Cart: FC = () => {
  const { itens, valorTotal, removerProduto } = useCarrinho();

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
    // build a simple pedido object; client and payment details can be extended later
    const pedido: Pedido = {
      itens,
      total: valorTotal,
      metodoPagamento: "pix",
      cliente: {
        nome: "",
        endereco: "",
      },
    };

    const mensagem = gerarMensagemWhatsapp(pedido);
    const url = `https://wa.me/5581986302720?text=${encodeURIComponent(
      mensagem
    )}`;
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
                    Tamanho: <strong>{item.tamanho}</strong>
                  </p>
                  <div style={{ fontSize: "12px", color: "#999" }}>
                    <span>
                      {formatarPreco(item.preco)}
                    </span>
                    <span>
                      × {item.quantidade}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                  <div className={styles.itemPreco}>
                    {formatarPreco(item.preco * item.quantidade)}
                  </div>
                  <button
                    className={styles.itemButtonRemove}
                    onClick={() => handleRemover(item.id)}
                    aria-label={`Remover ${item.nome} do carrinho`}
                    title="Remover do carrinho"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: "16px", borderTop: "1px solid #f0f0f0", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#222" }}>Total:</span>
              <span style={{ fontSize: "18px", fontWeight: "700", color: "#111" }}>
                {formatarPreco(valorTotal)}
              </span>
            </div>
          </div>

          <button
            className={styles.footerButton}
            onClick={handleFinalizar}
          >
            Finalizar Compra
          </button>
        </>
      )}
    </aside>
  );
};

export default Cart;
