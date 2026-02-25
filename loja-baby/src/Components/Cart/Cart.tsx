import type { FC } from "react";
import { useCarrinho } from "../../context/CarrinhoContext";
import "./Cart.css";

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

  return (
    <aside className="carrinho">
      <div className="carrinho__header">
        <h2 className="carrinho__titulo">Carrinho</h2>
        <span className="carrinho__badge">{itens.length}</span>
      </div>

      {itens.length === 0 ? (
        <div className="carrinho__vazio">
          <p>Seu carrinho está vazio</p>
        </div>
      ) : (
        <>
          <div className="carrinho__itens">
            {itens.map((item) => (
              <div key={item.id} className="carrinho__item">
                <div className="carrinho__item-info">
                  <h3 className="carrinho__item-nome">{item.nome}</h3>
                  <p className="carrinho__item-detalhes">
                    Tamanho: <strong>{item.tamanho}</strong>
                  </p>
                  <div className="carrinho__item-precos">
                    <span className="carrinho__item-unitario">
                      {formatarPreco(item.preco)}
                    </span>
                    <span className="carrinho__item-quantidade">
                      × {item.quantidade}
                    </span>
                  </div>
                </div>

                <div className="carrinho__item-coluna-direita">
                  <div className="carrinho__item-subtotal">
                    {formatarPreco(item.preco * item.quantidade)}
                  </div>
                  <button
                    className="carrinho__item-remover"
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

          <div className="carrinho__resumo">
            <div className="carrinho__linha-resumo">
              <span>Subtotal:</span>
              <span>{formatarPreco(valorTotal)}</span>
            </div>
            <div className="carrinho__linha-total">
              <span className="carrinho__label-total">Total:</span>
              <span className="carrinho__valor-total">
                {formatarPreco(valorTotal)}
              </span>
            </div>
          </div>

          <button className="carrinho__btn-finalizar">
            Finalizar Compra
          </button>
        </>
      )}
    </aside>
  );
};

export default Cart;
