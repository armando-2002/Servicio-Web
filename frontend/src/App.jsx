import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import ClientesPage from './pages/ClientesPage';
import ReservasPage from './pages/ReservasPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="logo">🍽️</div>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/menu">Menú</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/reservas">Reservas</Link>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<div className="welcome">Bienvenido al Restaurante</div>} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/reservas" element={<ReservasPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
