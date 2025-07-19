import React, { useState, useEffect } from 'react';

export default function ReservasPage() {
  const [clientes, setClientes] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [formData, setFormData] = useState({
    id_cliente: '',
    id_mesa: '',
    fecha: '',
    num_personas: '',
    estado: 'Confirmada'
  });

  const fetchData = async () => {
    const clientesRes = await fetch('http://localhost:3000/cliente');
    const mesasRes = await fetch('http://localhost:3000/mesa');
    setClientes(await clientesRes.json());
    setMesas(await mesasRes.json());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear la reserva
    const reservaRes = await fetch('http://localhost:3000/reserva', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const nuevaReserva = await reservaRes.json();

    if (nuevaReserva?.id) {
      // Crear la factura relacionada a la reserva
      const factura = {
        id_reserva: nuevaReserva.id,
        fecha_emision: new Date().toISOString(),
        total: calcularTotal(formData.num_personas),
        estado: 'Emitida'
      };

      await fetch('http://localhost:3000/factura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(factura)
      });

      alert('Reserva y factura creadas correctamente.');
    } else {
      alert('Error al crear la reserva.');
    }
  };

  const calcularTotal = (num_personas) => {
    const precioPorPersona = 10; // Puedes ajustar este valor
    return num_personas * precioPorPersona;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="reserva-container">
      <h2>Crear Reserva</h2>
      <form onSubmit={handleSubmit} className="reserva-form">
        <select required onChange={e => setFormData({ ...formData, id_cliente: parseInt(e.target.value) })}>
          <option value="">Seleccionar Cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <select required onChange={e => setFormData({ ...formData, id_mesa: parseInt(e.target.value) })}>
          <option value="">Seleccionar Mesa</option>
          {mesas.filter(m => m.disponibilidad).map(m => (
            <option key={m.id} value={m.id}>Mesa {m.id} - Capacidad {m.capacidad}</option>
          ))}
        </select>

        <input required type="datetime-local" onChange={e => setFormData({ ...formData, fecha: e.target.value })} />
        <input required type="number" min="1" placeholder="Número de personas" onChange={e => setFormData({ ...formData, num_personas: parseInt(e.target.value) })} />

        <select required onChange={e => setFormData({ ...formData, estado: e.target.value })}>
          {['Confirmada', 'Cancelada', 'Completada'].map(est => (
            <option key={est} value={est}>{est}</option>
          ))}
        </select>

        <button type="submit">Guardar Reserva</button>
      </form>
    </div>
  );
}
