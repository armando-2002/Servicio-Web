import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClientesPage from "./pages/ClientesPage";
import MesasPage from "./pages/MesasPage";
import ReservasPage from "./pages/ReservasPage";
import MenusPage from "./pages/MenusPage";
import PedidosPage from "./pages/PedidosPage";
import FacturasPage from "./pages/FacturasPage";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <main style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/mesas" element={<MesasPage />} />
            <Route path="/reservas" element={<ReservasPage />} />
            <Route path="/menus" element={<MenusPage />} />
            <Route path="/pedidos" element={<PedidosPage />} />
            <Route path="/facturas" element={<FacturasPage />} />
            <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
