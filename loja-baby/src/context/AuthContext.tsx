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
      // Tenta autenticar na API (se estiver configurada), caso contrário
      // cai para um fallback local compatível com o comportamento anterior.
      const base = (import.meta as any).env?.VITE_API_BASE || "";
      if (base) {
        // Se `VITE_API_BASE` estiver configurado, confiar estritamente na API.
        try {
          const res = await fetch(`${base.replace(/\/$/, "")}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
          });

          if (res.ok) {
            const raw = await res.json();
            console.debug("Auth API response:", raw);

            const payload = raw.usuario || raw.user || raw;
            const userFromApi: User = {
              id: payload.id || payload._id || crypto.randomUUID(),
              nome:
                payload.nome ||
                payload.name ||
                [payload.first_name, payload.last_name].filter(Boolean).join(" ") ||
                payload.fullName ||
                payload.full_name ||
                "",
              email: payload.email || payload.username || dados.email,
              telefone:
                payload.telefone ||
                payload.phone ||
                payload.celular ||
                payload.mobile ||
                payload.telefone_celular ||
                "",
              endereco:
                payload.endereco ||
                payload.address ||
                payload.address_line_1 ||
                payload.address_line ||
                payload.endereco_completo ||
                payload.addressLine ||
                payload.address_line1 ||
                "",
              senha: ""
            };

            setUsuario(userFromApi);
            console.debug("Normalized userFromApi:", userFromApi);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userFromApi));
            return;
          }

          // Se a API respondeu com status não-ok (ex.: 401), lançar erro
          const errBody = await res.text().catch(() => "");
          const message = `Login failed (${res.status}): ${errBody}`;
          console.warn("Auth API returned non-ok status:", res.status, errBody);
          throw new Error(message);
        } catch (err) {
          // Lançar o erro para que o chamador trate (não fazer fallback quando VITE_API_BASE estiver setada)
          console.warn("Auth API inacessível ou erro de login:", err);
          throw err;
        }
      }

      // Fallback: cria um usuário local baseado no e-mail (nome não fixo)
      // Preservar valores já salvos no localStorage (ex.: endereco)
      await new Promise((resolve) => setTimeout(resolve, 800));
      const usuarioSalvoRaw = localStorage.getItem(STORAGE_KEY);
      let enderecoSalvo = "";
      let nomeSalvo = "";
      try {
        if (usuarioSalvoRaw) {
          const parsed = JSON.parse(usuarioSalvoRaw);
          enderecoSalvo = parsed?.endereco || "";
          nomeSalvo = parsed?.nome || "";
        }
      } catch (err) {
        // ignore parse errors
      }

      const localName = dados.email.split("@")[0] || "Usuário";
      const capitalized = localName.charAt(0).toUpperCase() + localName.slice(1);
      const usuarioLogado: User = {
        id: crypto.randomUUID(),
        nome: nomeSalvo || capitalized,
        email: dados.email,
        telefone: "",
        endereco: enderecoSalvo || "",
        senha: ""
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