import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const MesasPage = () => {
  const [mesas, setMesas] = useState([]);
  const [nuevaMesa, setNuevaMesa] = useState({
    capacidad: '',
    disponibilidad: true,
    descripcion: ''
  });
  const [mesaEditando, setMesaEditando] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarMesas();
  }, []);

  const cargarMesas = async () => {
    try {
      const data = await api.fetchMesas();
      setMesas(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar las mesas.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setNuevaMesa({ ...nuevaMesa, [name]: val });
  };

  const handleAgregar = async () => {
    try {
      if (!nuevaMesa.capacidad) {
        setError('La capacidad es obligatoria.');
        return;
      }

      await api.createMesa({
        ...nuevaMesa,
        capacidad: parseInt(nuevaMesa.capacidad),
        disponibilidad: Boolean(nuevaMesa.disponibilidad)
      });

      toast.success('Mesa agregada');
      setNuevaMesa({ capacidad: '', disponibilidad: true, descripcion: '' });
      setError('');
      cargarMesas();
    } catch (err) {
      console.error(err);
      toast.error('Error al agregar la mesa');
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta mesa?')) return;
    try {
      await api.deleteMesa(id);
      toast.success('Mesa eliminada');
      cargarMesas();
    } catch (err) {
      console.error(err);
      toast.error('Error al eliminar la mesa');
    }
  };

  const handleEditar = (mesa) => {
    setMesaEditando(mesa.id);
    setNuevaMesa({
      capacidad: mesa.capacidad,
      disponibilidad: mesa.disponibilidad,
      descripcion: mesa.descripcion || ''
    });
  };

  const handleActualizar = async () => {
    try {
      await api.updateMesa(mesaEditando, {
        capacidad: parseInt(nuevaMesa.capacidad),
        disponibilidad: Boolean(nuevaMesa.disponibilidad),
        descripcion: nuevaMesa.descripcion
      });
      toast.success('Mesa actualizada');
      setMesaEditando(null);
      setNuevaMesa({ capacidad: '', disponibilidad: true, descripcion: '' });
      cargarMesas();
    } catch (err) {
      console.error(err);
      toast.error('Error al actualizar la mesa');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mesas</h2>

      {/* Formulario */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">{mesaEditando ? 'Editar Mesa' : 'Agregar Mesa'}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="number"
            name="capacidad"
            placeholder="Capacidad"
            value={nuevaMesa.capacidad}
            onChange={handleChange}
            className="border px-3 py-1 rounded"
          />
          <textarea
            name="descripcion"
            placeholder="Descripción (opcional)"
            value={nuevaMesa.descripcion}
            onChange={handleChange}
            className="border px-3 py-1 rounded col-span-1 sm:col-span-2"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="disponibilidad"
              checked={nuevaMesa.disponibilidad}
              onChange={handleChange}
              className="accent-green-600"
            />
            Disponible
          </label>
        </div>
        <div className="mt-3 flex gap-3">
          {mesaEditando ? (
            <>
              <button
                onClick={handleActualizar}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Actualizar
              </button>
              <button
                onClick={() => {
                  setMesaEditando(null);
                  setNuevaMesa({ capacidad: '', disponibilidad: true, descripcion: '' });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={handleAgregar}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Agregar Mesa
            </button>
          )}
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Lista de mesas */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Mesas Registradas</h3>
        <table className="w-full text-left border-t">
          <thead>
            <tr>
              <th>ID</th>
              <th>Capacidad</th>
              <th>Disponible</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mesas.map((mesa) => (
              <tr key={mesa.id} className="border-t">
                <td>{mesa.id}</td>
                <td>{mesa.capacidad}</td>
                <td>{mesa.disponibilidad ? 'Sí' : 'No'}</td>
                <td>{mesa.descripcion || '-'}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleEditar(mesa)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(mesa.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MesasPage;
