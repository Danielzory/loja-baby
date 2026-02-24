import type { FC } from "react";
import type { Produto } from "../../types";
import "./ProdutoCard.css";

interface Props {
  produto: Produto;
}

const ProdutoCard: FC<Props> = ({ produto }) => {
  const precoFormatado = produto.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

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
      </div>
    </article>
  );
};

export default ProdutoCard;
