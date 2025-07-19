// src/components/FacturaForm.jsx
import React, { useState } from 'react';
import { postFactura } from '../services/api';

export default function FacturaForm() {
  const [clienteId, setClienteId] = useState('');
  const [precioFinal, setPrecioFinal] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clienteId || !precioFinal) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    try {
      await postFactura({
        id_cliente: Number(clienteId),
        precio_final: Number(precioFinal),
      });
      setMensaje('Factura registrada exitosamente.');
      setClienteId('');
      setPrecioFinal('');
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Registrar Factura</h2>
      <input
        type="number"
        placeholder="ID Cliente"
        className="border p-2 rounded w-full mb-2"
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio Final"
        className="border p-2 rounded w-full mb-2"
        value={precioFinal}
        onChange={(e) => setPrecioFinal(e.target.value)}
      />
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Guardar Factura
      </button>
      {mensaje && <p className="mt-2 text-sm text-blue-600">{mensaje}</p>}
    </form>
  );
}
