/**
 * T é o tipo do objeto (Produto)
 * K é uma chave que obrigatoriamente existe dentro de T
 */
function filtrarProdutos<T, K extends keyof T>(
    lista: T[], 
    chave: K, 
    valor: T[K]
): T[] {
    return lista.filter(item => item[chave] === valor);
}

// Exemplo de uso:
// const meninos = filtrarProdutos(estoque, "categoria", "menino");
// const tamanho4 = filtrarProdutos(estoque, "tamanho", "4");