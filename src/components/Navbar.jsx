import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-red-600 text-white px-6 py-4 flex gap-6">
      <Link to="/">Home</Link>
      <Link to="/clientes">Clientes</Link>
      <Link to="/menu">Menú</Link>
      <Link to="/mesas">Mesas</Link>
      <Link to="/pedidos">Pedidos</Link>
      <Link to="/facturas">Facturas</Link>
      <Link to="/reservas">Reservas</Link>
    </nav>
  );
};

export default Navbar;
