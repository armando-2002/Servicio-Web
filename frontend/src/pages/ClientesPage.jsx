import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({ id: '', nombre: '', telefono: '' });
  const [editandoId, setEditandoId] = useState(null);
  const [facturas, setFacturas] = useState({});
  const [error, setError] = useState('');
  const [busquedaId, setBusquedaId] = useState('');

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const data = await api.fetchClientes();
      setClientes(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los clientes');
    }
  };

  const handleChange = (e) => {
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
  };

  const handleAgregar = async () => {
    try {
      const { id, nombre, telefono } = nuevoCliente;
      if (!id || !nombre || !telefono) {
        setError('Todos los campos son obligatorios');
        return;
      }

      await api.createCliente({
        id: parseInt(id),
        nombre,
        telefono
      });

      setNuevoCliente({ id: '', nombre: '', telefono: '' });
      setError('');
      cargarClientes();
    } catch (err) {
      console.error(err);
      setError('Error al agregar el cliente');
    }
  };

  const handleEditar = (cliente) => {
    setEditandoId(parseInt(cliente.id));
    setNuevoCliente({ ...cliente, id: String(cliente.id) });
  };

  const handleActualizar = async () => {
    try {
      await api.updateCliente(parseInt(editandoId), {
        nombre: nuevoCliente.nombre,
        telefono: nuevoCliente.telefono
      });
      setEditandoId(null);
      setNuevoCliente({ id: '', nombre: '', telefono: '' });
      cargarClientes();
    } catch (err) {
      console.error(err);
      setError('Error al actualizar el cliente');
    }
  };

  const handleEliminar = async (id) => {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        await api.deleteCliente(parseInt(id));
        cargarClientes();
      } catch (err) {
        console.error(err);
        setError('Error al eliminar el cliente');
      }
    }
  };

  const verFacturas = async (clienteId) => {
    try {
      const data = await api.fetchFacturasByClienteId(parseInt(clienteId));
      setFacturas((prev) => ({ ...prev, [clienteId]: data }));
    } catch (err) {
      console.error(err);
      setError('Error al obtener facturas del cliente');
    }
  };

  const buscarCliente = async () => {
    try {
      if (!busquedaId) {
        cargarClientes();
        return;
      }

      const cliente = await api.fetchClienteById(parseInt(busquedaId));
      setClientes(cliente ? [cliente] : []);
      setFacturas({});
    } catch (err) {
      console.error(err);
      setError('Error al buscar cliente');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>

      {/* Buscador */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Buscar por ID"
            value={busquedaId}
            onChange={(e) => setBusquedaId(e.target.value)}
            className="border px-2 py-1 rounded w-40"
          />
          <button
            onClick={buscarCliente}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Buscar
          </button>
          <button
            onClick={cargarClientes}
            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Ver Todos
          </button>
        </div>
      </div>

      {/* Formulario */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">{editandoId ? 'Editar Cliente' : 'Agregar Cliente'}</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="number"
            name="id"
            placeholder="ID"
            disabled={!!editandoId}
            value={nuevoCliente.id}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoCliente.nombre}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={nuevoCliente.telefono}
            onChange={handleChange}
            className="border px-2 py-1 rounded"
          />
          {editandoId ? (
            <button
              onClick={handleActualizar}
              className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700"
            >
              Actualizar
            </button>
          ) : (
            <button
              onClick={handleAgregar}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Agregar
            </button>
          )}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Tabla de clientes */}
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <React.Fragment key={cliente.id}>
                <tr className="border-t">
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.telefono}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => verFacturas(cliente.id)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      Ver Facturas
                    </button>
                    <button
                      onClick={() => handleEditar(cliente)}
                      className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(cliente.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
                {facturas[cliente.id] && (
                  <tr>
                    <td colSpan="4">
                      <div className="mt-2 ml-4 bg-gray-100 p-2 rounded">
                        <h4 className="font-semibold">Facturas:</h4>
                        {facturas[cliente.id].length === 0 ? (
                          <p>No hay facturas registradas.</p>
                        ) : (
                          <ul className="list-disc pl-5">
                            {facturas[cliente.id].map((factura) => (
                              <li key={factura.id}>
                                Factura #{factura.id} - Total: ${factura.precio_final.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientesPage;
