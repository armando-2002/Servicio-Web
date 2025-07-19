import React, { useEffect, useState } from 'react';
import { getClientes, crearCliente } from '../services/api';
import { toast } from 'react-toastify';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nombre: '', correo: '' });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      toast.error('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.correo.trim()) {
      toast.warning('Todos los campos son obligatorios');
      return;
    }

    try {
      await crearCliente(formData);
      toast.success('Cliente registrado con éxito');
      setFormData({ nombre: '', correo: '' });
      fetchClientes();
    } catch (error) {
      toast.error('Error al registrar el cliente');
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded max-w-4xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Clientes Registrados</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6 shadow-sm">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Correo</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Registrar Cliente
        </button>
      </form>

      {/* Tabla de clientes */}
      {loading ? (
        <p>Cargando clientes...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Correo</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td className="border px-4 py-2">{cliente.id}</td>
                <td className="border px-4 py-2">{cliente.nombre}</td>
                <td className="border px-4 py-2">{cliente.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
