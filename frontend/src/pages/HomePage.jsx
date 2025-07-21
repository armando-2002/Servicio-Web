import fondoRestaurante from '../assets/restaurante2.jpeg';
import "../App.css";

const HomePage = () => {
  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${fondoRestaurante})` }}
    >
      <h1 className="home-heading">Bienvenido al Restaurante</h1>
      <p className="home-paragraph">
        Administra fácilmente tus clientes, pedidos, menús, reservas, mesas y facturas con nuestra aplicación web.
      </p>
    </div>
  );
};

export default HomePage;
