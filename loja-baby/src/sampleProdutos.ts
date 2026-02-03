import type { Produto } from "./types";

const sampleProdutos: Produto[] = [
    {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        nome: "Camiseta Azul",
        preco: 59.9,
        categoria: "menino",
        tamanho: "M",
        imagemUrl: "https://example.com/camiseta-azul.jpg",
        estoque: 10
    },
    {
        id: "6b1b36c6-4d3b-4a9f-8f2b-1f2d3c4b5a66",
        nome: "Vestido Floral",
        preco: 79.5,
        categoria: "menina",
        tamanho: "P",
        imagemUrl: "https://example.com/vestido-floral.jpg",
        estoque: 5
    },
    {
        id: "1e2d3c4b-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
        nome: "Macacão Unissex",
        preco: 99.0,
        categoria: "unissex",
        tamanho: "1",
        imagemUrl: "https://example.com/macacao-unissex.jpg",
        estoque: 8
    }
];

export default sampleProdutos;
