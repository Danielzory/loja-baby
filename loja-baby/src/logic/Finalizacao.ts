import type { ItemCarrinho } from "../types";

export interface Pedido {
    itens: ItemCarrinho[];
    total: number;
    metodoPagamento: "pix" | "cartao_maquineta" | "link_pagamento";
    cliente: {
        nome: string;
        endereco: string;
    };
}

/**
 * Exemplo de como gerar a mensagem para o WhatsApp.
 * Aqui usamos o Utility Type 'Pick' para extrair dados simples.
 */
export function gerarMensagemWhatsapp(pedido: Pedido): string {
    const resumoItens = pedido.itens
        .map(item => `${item.quantidade}x ${item.nome} - R$ ${item.preco}`)
        .join("\n");

    return `Olá! Gostaria de finalizar o pedido:
---
${resumoItens}
---
Total: R$ ${pedido.total}
Pagamento: ${pedido.metodoPagamento}
Cliente: ${pedido.cliente.nome}
Endereço: ${pedido.cliente.endereco}`;
}