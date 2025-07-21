import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
      <Link to="/" style={{ marginRight: "1rem", fontWeight: "bold" }}>Inicio</Link>
      <Link to="/clientes" style={{ marginRight: "1rem" }}>Clientes</Link>
      <Link to="/mesas" style={{ marginRight: "1rem" }}>Mesas</Link>
      <Link to="/reservas" style={{ marginRight: "1rem" }}>Reservas</Link>
      <Link to="/menus" style={{ marginRight: "1rem" }}>Menús</Link>
      <Link to="/pedidos" style={{ marginRight: "1rem" }}>Pedidos</Link>
      <Link to="/facturas">Facturas</Link>
    </nav>
  );
};

export default Navbar;
