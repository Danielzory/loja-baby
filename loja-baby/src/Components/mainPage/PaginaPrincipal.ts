import type { Produto } from '../types';
// Props para a página principal
export type PaginaPrincipalProps = {
    produtos: Produto[];
};

// Mostra cada produto no console usando forEach
export function mostrarProdutos(produtos: Produto[]): void {
    produtos.forEach((produto) => {
        console.log(
            `ID: ${produto.id} | Nome: ${produto.nome} | Preço: R$ ${produto.preco} | Categoria: ${produto.categoria} | Tamanho: ${produto.tamanho} | Estoque: ${produto.estoque}`
        );
    });
}

// Retorna todos os produtos (exemplo de uso do forEach para construir um array de retorno)
export function obterProdutosCadastrados(produtos: Produto[]): Produto[] {
    const lista: Produto[] = [];
    produtos.forEach((p) => lista.push(p));
    return lista;
}

// Exemplo rápido (descomente para testar localmente):
// import sampleProdutos from './sampleProdutos'
// mostrarProdutos(sampleProdutos);
