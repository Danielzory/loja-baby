import type { FC } from "react";
import type { Produto } from "../../types";
import { useCarrinho } from "../../context/CarrinhoContext";
import "./ProdutoCard.css";

interface Props {
  produto: Produto;
}

const ProdutoCard: FC<Props> = ({ produto }) => {
  const { adicionarProduto } = useCarrinho();
  
  const precoFormatado = produto.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const handleAdicionarAoCarrinho = () => {
    adicionarProduto(produto);
  };

  return (
    <article className="produto-card" aria-label={`Produto ${produto.nome}`}>
      <div className="produto-card__image">
        <img
          className="produto-card__img"
          src={produto.imagemUrl}
          alt={produto.nome}
        />
      </div>

      <div className="produto-card__body">
        <h3 className="produto-card__title">{produto.nome}</h3>
        <p className="produto-card__meta">Categoria: {produto.categoria}</p>
        <p className="produto-card__meta">Tamanho: {produto.tamanho}</p>

        <div className="produto-card__price">{precoFormatado}</div>

        <button
          className="produto-card__btn-carrinho"
          onClick={handleAdicionarAoCarrinho}
          aria-label={`Adicionar ${produto.nome} ao carrinho`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="produto-card__icon-carrinho"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Adicionar ao Carrinho
        </button>
      </div>
    </article>
  );
};

export default ProdutoCard;
