import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

function ReservasPage() {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [nuevaReserva, setNuevaReserva] = useState({
    id_cliente: '',
    id_mesa: '',
    fecha: '',
    num_personas: '',
    estado: '',
  });
  const [editandoId, setEditandoId] = useState(null);

  const ESTADOS = ['Confirmada', 'Cancelada', 'Completada'];

  useEffect(() => {
    cargarReservas();
    cargarClientes();
    cargarMesas();
  }, []);

  const cargarReservas = async () => {
    try {
      const data = await api.fetchReservas();
      console.log("Reservas cargadas:", data);
      setReservas(data);
    } catch (error) {
      toast.error('Error al cargar reservas');
    }
  };

  const cargarClientes = async () => {
    try {
      const data = await api.fetchClientes();
      setClientes(data);
    } catch (error) {
      toast.error('Error al cargar clientes');
    }
  };

  const cargarMesas = async () => {
    try {
      const data = await api.fetchMesas();
      setMesas(data);
    } catch (error) {
      toast.error('Error al cargar mesas');
    }
  };

  const handleChange = (e) => {
    setNuevaReserva({ ...nuevaReserva, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editandoId) {
      await api.updateReserva(editandoId, {
        ...nuevaReserva,
        num_personas: parseInt(nuevaReserva.num_personas, 10),
      });
      toast.success('Reserva actualizada');
      setEditandoId(null);
    } else {
      // Crear la reserva
      const reservaCreada = await api.createReserva({
        ...nuevaReserva,
        num_personas: parseInt(nuevaReserva.num_personas, 10),
      });

      // Crear la factura automáticamente
      await api.createFactura({
        id_reserva: reservaCreada.id,
        id_cliente: reservaCreada.id_cliente,
        fecha: reservaCreada.fecha,
        total: 0, // Puedes cambiar esto si tienes lógica de cálculo
      });

      toast.success('Reserva y factura creadas');
    }

    // Resetear formulario y recargar
    setNuevaReserva({
      id_cliente: '',
      id_mesa: '',
      fecha: '',
      num_personas: '',
      estado: '',
    });
    cargarReservas();
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error al procesar reserva');
  }
};

  const handleEditar = (reserva) => {
    setNuevaReserva({ ...reserva });
    setEditandoId(reserva.id);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reserva?')) {
      try {
        await api.deleteReserva(id);
        toast.success('Reserva eliminada');
        cargarReservas();
      } catch (error) {
        toast.error('Error al eliminar reserva');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Reservas</h2>

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <select
          name="id_cliente"
          value={nuevaReserva.id_cliente}
          onChange={handleChange}
          className="border p-1 w-full"
        >
          <option value="">Seleccionar cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <select
          name="id_mesa"
          value={nuevaReserva.id_mesa}
          onChange={handleChange}
          className="border p-1 w-full"
        >
          <option value="">Seleccionar mesa</option>
          {mesas.map((m) => (
            <option key={m.id} value={m.id}>
              Mesa #{m.id} – Capacidad: {m.capacidad}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="fecha"
          value={nuevaReserva.fecha}
          onChange={handleChange}
          className="border p-1 w-full"
        />

        <input
          name="num_personas"
          value={nuevaReserva.num_personas}
          onChange={handleChange}
          placeholder="Número de personas"
          className="border p-1 w-full"
        />

        <select
          name="estado"
          value={nuevaReserva.estado}
          onChange={handleChange}
          className="border p-1 w-full"
        >
          <option value="">Seleccionar estado</option>
          {ESTADOS.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          {editandoId ? 'Actualizar' : 'Crear Reserva'}
        </button>
      </form>

      <ul>
        {reservas.map((r) => (
          <li key={r.id} className="border p-2 my-1 flex justify-between items-center">
            <span>
              #{r.id} – Cliente: {r.id_cliente}, Mesa: {r.id_mesa}, Fecha: {new Date(r.fecha).toLocaleDateString()}, Personas: {r.num_personas}, Estado: {r.estado}
            </span>
            <div className="space-x-2">
              <button onClick={() => handleEditar(r)} className="bg-yellow-400 px-2 py-1 rounded">Editar</button>
              <button onClick={() => handleEliminar(r.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservasPage;
