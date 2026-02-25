import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import PaginaPrincipal from "./Components/mainPage/PaginaPrincipal.tsx";
import CarrinhoPage from "./Components/mainPage/CarrinhoPage.tsx";

function App() {
  return (
    <Router>
      <CarrinhoProvider>
        <Routes>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
        </Routes>
      </CarrinhoProvider>
    </Router>
  );
}

export default App;
