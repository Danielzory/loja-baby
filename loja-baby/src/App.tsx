import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Importando o novo contexto
import { CarrinhoProvider } from "./context/CarrinhoContext";
import PaginaPrincipal from "./Components/mainPage/PaginaPrincipal.tsx";
import CarrinhoPage from "./Components/mainPage/CarrinhoPage.tsx";
import LoginPage from "./Components/Login/LoginPage.tsx";

function App() {
  return (
    <Router>
      {/* 1. AuthProvider envolve tudo para sabermos QUEM está acessando */}
      <AuthProvider>
        {/* 2. CarrinhoProvider vem depois, podendo usar dados do Auth no futuro */}
        <CarrinhoProvider>
          <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/carrinho" element={<CarrinhoPage />} />
            {/* 3. Nova rota para a página de Login */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </CarrinhoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
