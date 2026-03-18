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

// Schema completo para Cadastro (Sign Up)
export const UserSchema = z.object({
    id: z.string().uuid().optional(), // Opcional porque no cadastro o ID ainda não existe
    nome: z.string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .max(50, "Nome muito longo"),
    email: z.string()
        .email("Insira um e-mail válido"),
    telefone: z.string()
        .min(10, "Telefone inválido (mínimo 10 dígitos)")
        .regex(/^\d+$/, "O telefone deve conter apenas números"), // Garante que não entrem letras
    senha: z.string()
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
    endereco: z.string()
        .min(5, "O endereço deve ter pelo menos 5 caracteres")    
});

// Inferindo o tipo para o TypeScript (PascalCase para seguir o padrão)
export type User = z.infer<typeof UserSchema>;

// Schema específico para Login (Reaproveitando campos do UserSchema)
export const LoginSchema = UserSchema.pick({
    email: true,
    senha: true
});

// Tipo para o formulário de Login
export type LoginData = z.infer<typeof LoginSchema>;

//Interface para o contexto de autenticação
export interface AuthContextType {
  usuario: User | null;
  estaAutenticado: boolean;
  login: (dados: LoginData) => Promise<void>;
  logout: () => void;
  carregando: boolean;
}