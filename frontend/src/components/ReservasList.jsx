import React, { useEffect, useState } from 'react';
import { FaUserClock } from 'react-icons/fa';

const ReservasList = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/reservas') // Ajusta la ruta a tu backend
      .then(res => res.json())
      .then(data => setReservas(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="reservas-container">
      <h2 className="reservas-title"><FaUserClock className="icon-title" /> Listado de Reservas</h2>
      <table className="reservas-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Mesa</th>
            <th>Fecha</th>
            <th>Personas</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.cliente_rel.nombre}</td>
              <td>{reserva.mesa_rel.id}</td>
              <td>{new Date(reserva.fecha).toLocaleString()}</td>
              <td>{reserva.num_personas}</td>
              <td>
                <span className={`status-badge ${reserva.estado.toLowerCase()}`}>
                  {reserva.estado}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservasList;
