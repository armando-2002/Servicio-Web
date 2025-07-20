import { Link } from 'react-router-dom';
import { Home, Users, Utensils, Table2, ShoppingCart, CalendarCheck2, FileText } from 'lucide-react';

const HomePage = () => {
  const opciones = [
    { path: '/clientes', label: 'Clientes', icon: <Users className="w-6 h-6" /> },
    { path: '/menu', label: 'Menú', icon: <Utensils className="w-6 h-6" /> },
    { path: '/mesas', label: 'Mesas', icon: <Table2 className="w-6 h-6" /> },
    { path: '/pedidos', label: 'Pedidos', icon: <ShoppingCart className="w-6 h-6" /> },
    { path: '/reservas', label: 'Reservas', icon: <CalendarCheck2 className="w-6 h-6" /> },
    { path: '/facturas', label: 'Facturas', icon: <FileText className="w-6 h-6" /> }, // ✅ Nuevo botón
  ];

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Bienvenido al Sistema de Restaurante</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {opciones.map(({ path, label, icon }) => (
          <Link
            to={path}
            key={label}
            className="bg-white hover:bg-red-100 border border-gray-200 shadow-md p-6 rounded-xl flex flex-col items-center gap-2 transition-all"
          >
            <div className="text-red-600">{icon}</div>
            <span className="text-lg font-medium text-gray-700">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
