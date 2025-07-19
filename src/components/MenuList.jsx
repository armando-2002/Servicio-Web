// src/components/MenuList.jsx
import React, { useEffect, useState } from 'react';
import { getMenu } from '../services/api.js';

export default function MenuList() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu().then(setMenu);
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Menú Disponible</h2>
      <div className="grid grid-cols-2 gap-4">
        {menu.map((item) => (
          <div key={item.id} className="border rounded p-2 flex flex-col items-center">
            <img
              src={`https://source.unsplash.com/200x120/?${item.nombre}`}
              alt={item.nombre}
              className="rounded mb-2"
            />
            <p className="font-semibold">{item.nombre}</p>
            <p>${item.precio.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{item.categoria}</p>
          </div>
        ))}
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Agregar Producto
      </button>
    </div>
  );
}
