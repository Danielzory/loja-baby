import { z } from "zod";

// Usando Zod para definir o Schema (Fonte da Verdade)
export const ProdutoSchema = z.object({
    id: z.string().uuid(),
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    preco: z.number().positive("O preço deve ser maior que zero"),
    categoria: z.enum(["menino", "menina", "unissex"]),
    tamanho: z.enum(["P", "M", "G", "1", "2", "3", "4", "6", "8"]), // Idades ou tamanhos baby
    imagemUrl: z.string().url("URL de imagem inválida"),
    estoque: z.number().int().nonnegative()
});

// Inferindo o tipo para usar no TypeScript
export type Produto = z.infer<typeof ProdutoSchema>;


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