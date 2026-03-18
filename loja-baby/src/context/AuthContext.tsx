import { createContext, useContext, useState, useEffect, type FC, type ReactNode } from "react";
// Importando os tipos do seu arquivo central de tipos
import type { User, LoginData, AuthContextType } from "../types"; 

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = "minha_loja_user";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  // 2. Efeito para buscar o usuário salvo ao iniciar o App (Persistência)
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem(STORAGE_KEY);
    if (usuarioSalvo) {
      try {
        setUsuario(JSON.parse(usuarioSalvo));
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setCarregando(false);
  }, []);

  // 3. Função de Login (Simulada por enquanto)
  const login = async (dados: LoginData) => {
    setCarregando(true);
    
    try {
      // Simulando um atraso de rede (como se estivesse indo ao banco)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulando a criação de um objeto User baseado no login
      // Na semana que vem, aqui entrará o fetch para o seu banco
      const usuarioLogado: User = {
        id: crypto.randomUUID(),
        nome: "Daniel Teste", // Nome fixo até termos o cadastro
        email: dados.email,
        telefone: "81999999999",
        endereco: "Rua do Teste, 123", // campo obrigatório no schema de usuário
        senha: "" // Nunca guardamos a senha no estado/storage por segurança
      };

      setUsuario(usuarioLogado);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioLogado));
    } finally {
      setCarregando(false);
    }
  };

  // 4. Função de Logout
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthContextType = {
    usuario,
    estaAutenticado: !!usuario, // Transforma o objeto em booleano (tem user? true : false)
    login,
    logout,
    carregando,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 5. Hook customizado para facilitar o uso nos componentes
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};