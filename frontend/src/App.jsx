import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClientesPage from './pages/ClientesPage';
import MenuPage from './pages/MenuPage';
import MesasPage from './pages/MesasPage';
import PedidosPage from './pages/PedidosPage';
import ReservasPage from './pages/ReservasPage';
import FacturasPage from './pages/FacturasPage';
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/mesas" element={<MesasPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
          <Route path="/facturas" element={<FacturasPage />} />
          <Route path="/reservas" element={<ReservasPage />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
