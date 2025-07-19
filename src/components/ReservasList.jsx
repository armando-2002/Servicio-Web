// src/components/ReservasList.jsx
import React, { useEffect, useState } from 'react';
import { getReservas } from '../services/api';

export default function ReservasList() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    getReservas().then(setReservas);
  }, []);

  return (
    <div className="p-4 rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-2">Reservas hechas</h2>
      <ul>
        {reservas.map((r) => (
          <li key={r.id} className="border-b py-2">
            Cliente #{r.id_cliente} | Mesa #{r.id_mesa} | {new Date(r.fecha).toLocaleString()} | {r.estado}
          </li>
        ))}
      </ul>
    </div>
  );
}
