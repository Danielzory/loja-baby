import { createContext, useContext, useState, useEffect, type FC, type ReactNode } from "react";
import type { Produto, ItemCarrinho, CarrinhoContextType } from "../types";
import { adicionarAoCarrinho, calcularTotal } from "../logic/AddNoCarrinho";

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);
const STORAGE_KEY = "carrinho_items";

interface CarrinhoProviderProps {
  children: ReactNode;
}

export const CarrinhoProvider: FC<CarrinhoProviderProps> = ({ children }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>(() => {
    // Carregar do localStorage ao inicializar
    try {
      const carrinhoSalvo = localStorage.getItem(STORAGE_KEY);
      return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
    } catch {
      return [];
    }
  });

  const adicionarProduto = (produto: Produto) => {
    setItens((carrinhoAtual) => adicionarAoCarrinho(carrinhoAtual, produto));
  };

  const removerProduto = (id: string) => {
    setItens((carrinhoAtual) => carrinhoAtual.filter((item) => item.id !== id));
  };

  // Salvar no localStorage sempre que itens mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
  }, [itens]);

  const valorTotal = calcularTotal(itens);

  const value: CarrinhoContextType = {
    itens,
    valorTotal,
    adicionarProduto,
    removerProduto,
  };

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (context === undefined) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
};
