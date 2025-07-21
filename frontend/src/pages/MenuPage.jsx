import React, { useEffect, useState } from 'react';
import api from '../services/api';

const categorias = ['Entrada', 'Principal', 'Postre', 'Bebida', 'Guarnicion', 'Especialidad'];

const MenuPage = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    estado: true,
    categoria: 'Entrada',
    descripcion: ''
  });
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarMenu();
  }, []);

  const cargarMenu = async () => {
    try {
      const data = await api.fetchMenu();
      setProductos(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los productos del menú');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setNuevoProducto({ ...nuevoProducto, [name]: val });
  };

  const handleAgregar = async () => {
    try {
      if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.categoria) {
        setError('Por favor, completa todos los campos obligatorios.');
        return;
      }

      if (editandoId) {
        // Actualizar producto
        await api.updateMenu(editandoId, {
          ...nuevoProducto,
          precio: parseFloat(nuevoProducto.precio),
          estado: Boolean(nuevoProducto.estado),
        });
        setEditandoId(null);
      } else {
        // Crear producto
        await api.createMenu({
          ...nuevoProducto,
          precio: parseFloat(nuevoProducto.precio),
          estado: Boolean(nuevoProducto.estado),
        });
      }

      setNuevoProducto({
        nombre: '',
        precio: '',
        estado: true,
        categoria: 'Entrada',
        descripcion: ''
      });
      setError('');
      cargarMenu();
    } catch (err) {
      console.error(err);
      setError('Error al guardar el producto.');
    }
  };

  const handleEditar = (producto) => {
    setNuevoProducto({
      nombre: producto.nombre,
      precio: producto.precio,
      estado: producto.estado,
      categoria: producto.categoria,
      descripcion: producto.descripcion || ''
    });
    setEditandoId(producto.id);
    setError('');
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await api.deleteMenu(id);
        cargarMenu();
      } catch (err) {
        console.error(err);
        setError('Error al eliminar el producto.');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Menú</h2>

      {/* Formulario */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">{editandoId ? 'Editar Producto' : 'Agregar Producto'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoProducto.nombre}
            onChange={handleChange}
            className="border px-3 py-1 rounded"
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={nuevoProducto.precio}
            onChange={handleChange}
            className="border px-3 py-1 rounded"
          />
          <select
            name="categoria"
            value={nuevoProducto.categoria}
            onChange={handleChange}
            className="border px-3 py-1 rounded"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <textarea
            name="descripcion"
            placeholder="Descripción (opcional)"
            value={nuevoProducto.descripcion}
            onChange={handleChange}
            className="border px-3 py-1 rounded col-span-1 md:col-span-2"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="estado"
              checked={nuevoProducto.estado}
              onChange={handleChange}
              className="accent-green-600"
            />
            Disponible
          </label>
        </div>
        <button
          onClick={handleAgregar}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editandoId ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
        {editandoId && (
          <button
            onClick={() => {
              setNuevoProducto({
                nombre: '',
                precio: '',
                estado: true,
                categoria: 'Entrada',
                descripcion: ''
              });
              setEditandoId(null);
              setError('');
            }}
            className="mt-3 ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Lista */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Productos Registrados</h3>
        <table className="w-full text-left border-t">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id} className="border-t">
                <td>{prod.nombre}</td>
                <td>${prod.precio.toFixed(2)}</td>
                <td>{prod.categoria}</td>
                <td>{prod.estado ? 'Activo' : 'Inactivo'}</td>
                <td>{prod.descripcion || '-'}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleEditar(prod)}
                    className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(prod.id)}
                    className="bg-red-500 px-2 py-1 text-white rounded hover:bg-red-600"
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

export default MenuPage;
