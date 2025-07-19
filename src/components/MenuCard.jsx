import React from 'react';
import { BadgePercent, UtensilsCrossed } from 'lucide-react';

const MenuCard = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={item.imagen || 'https://via.placeholder.com/300x200.png?text=Sin+Imagen'}
        alt={item.nombre}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{item.nombre}</h3>
        <p className="text-sm text-gray-500 mb-2">{item.categoria}</p>
        <p className="text-sm text-gray-700 mb-2">{item.descripcion}</p>
        <div className="flex items-center justify-between">
          <span className="text-green-600 font-bold text-lg">${item.precio.toFixed(2)}</span>
          {item.estado ? (
            <BadgePercent className="text-green-500" title="Disponible" />
          ) : (
            <UtensilsCrossed className="text-red-400" title="No disponible" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
