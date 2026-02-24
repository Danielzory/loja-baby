import type { Produto } from "./types";


export const listaProdutos: Produto[] = [
    {
        id: crypto.randomUUID(),
        nome: "Conjunto Moletom Ursinho",
        preco: 89.90,
        categoria: "unissex",
        tamanho: "2",
        imagemUrl: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop",
        estoque: 10
    },
    {
        id: crypto.randomUUID(),
        nome: "Vestido Floral Primavera",
        preco: 120.00,
        categoria: "menina",
        tamanho: "4",
        imagemUrl: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800&auto=format&fit=crop",
        estoque: 5
    },
    {
        id: crypto.randomUUID(),
        nome: "Camisa Polo Classic Blue",
        preco: 55.00,
        categoria: "menino",
        tamanho: "6",
        imagemUrl: "https://images.unsplash.com/photo-1519278444390-66a15929f8ca?q=80&w=800&auto=format&fit=crop",
        estoque: 15
    },
    {
        id: crypto.randomUUID(),
        nome: "Jardineira Jeans Kids",
        preco: 95.00,
        categoria: "unissex",
        tamanho: "3",
        imagemUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop",
        estoque: 8
    },
    {
        id: crypto.randomUUID(),
        nome: "Cardigan de Tricô Rosa",
        preco: 78.00,
        categoria: "menina",
        tamanho: "2",
        imagemUrl: "https://images.unsplash.com/photo-1515488764276-3d2662939bf3?q=80&w=800&auto=format&fit=crop",
        estoque: 12
    },
    {
        id: crypto.randomUUID(),
        nome: "Conjunto Praia Tubarão",
        preco: 69.90,
        categoria: "menino",
        tamanho: "M",
        imagemUrl: "https://images.unsplash.com/photo-1503944583220-8150b7e3c3a1?q=80&w=800&auto=format&fit=crop",
        estoque: 7
    },
    {
        id: crypto.randomUUID(),
        nome: "Pijama Algodão Estrelas",
        preco: 45.90,
        categoria: "unissex",
        tamanho: "4",
        imagemUrl: "https://images.unsplash.com/photo-1555008889-74ee5b0253ee?q=80&w=800&auto=format&fit=crop",
        estoque: 20
    },
    {
        id: crypto.randomUUID(),
        nome: "Casaco Puffer Amarelo",
        preco: 145.00,
        categoria: "unissex",
        tamanho: "8",
        imagemUrl: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?q=80&w=800&auto=format&fit=crop",
        estoque: 4
    }
];