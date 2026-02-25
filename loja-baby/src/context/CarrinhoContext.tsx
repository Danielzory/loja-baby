import { createContext, useContext, useState, type FC, type ReactNode } from "react";
import type { Produto, ItemCarrinho, CarrinhoContextType } from "../types";
import { adicionarAoCarrinho, calcularTotal } from "../logic/AddNoCarrinho";

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

interface CarrinhoProviderProps {
  children: ReactNode;
}

export const CarrinhoProvider: FC<CarrinhoProviderProps> = ({ children }) => {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionarProduto = (produto: Produto) => {
    setItens((carrinhoAtual) => adicionarAoCarrinho(carrinhoAtual, produto));
  };

  const removerProduto = (id: string) => {
    setItens((carrinhoAtual) => carrinhoAtual.filter((item) => item.id !== id));
  };

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
