import type { Produto, ItemCarrinho } from "../types";

// Adicionar ou incrementar quantidade
export function adicionarAoCarrinho(
    carrinhoAtual: ItemCarrinho[], 
    produto: Produto
): ItemCarrinho[] {
    const itemExiste = carrinhoAtual.find(item => item.id === produto.id);

    if (itemExiste) {
        return carrinhoAtual.map(item =>
            item.id === produto.id 
                ? { ...item, quantidade: item.quantidade + 1 } 
                : item
        );
    }

    return [...carrinhoAtual, { ...produto, quantidade: 1 }];
}

// Calcular total usando reduce
export const calcularTotal = (itens: ItemCarrinho[]): number => {
    return itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
};