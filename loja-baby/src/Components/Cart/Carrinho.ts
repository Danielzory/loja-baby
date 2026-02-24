import type { Produto } from "../../types";

// O item do carrinho é TUDO do produto + o campo quantidade
export type ItemCarrinho = Produto & {
    quantidade: number;
};

// Interface para o estado do Carrinho
export interface CarrinhoContextType {
    itens: ItemCarrinho[];
    valorTotal: number;
    adicionarProduto: (produto: Produto) => void;
    removerProduto: (id: string) => void;
}