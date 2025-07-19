// src/pages/MenuPage.jsx
import React, { useEffect, useState } from 'react';
import MenuList from '../components/MenuList';

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    estado: true,
    categoria: 'Entrada',
    descripcion: '',
    imagen: ''
  });

  const fetchMenu = async () => {
    try {
      const res = await fetch('http://localhost:3000/menu');
      const data = await res.json();
      setMenu(data);
    } catch (error) {
      console.error('Error al obtener el menú:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setShowForm(false);
    setFormData({
      nombre: '',
      precio: '',
      estado: true,
      categoria: 'Entrada',
      descripcion: '',
      imagen: ''
    });
    fetchMenu();
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Menú Actual</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {showForm ? 'Cancelar' : 'Agregar producto'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
        >
          <input
            className="border p-2 rounded"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={e => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Precio"
            type="number"
            step="0.01"
            value={formData.precio}
            onChange={e => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
            required
          />
          <select
            className="border p-2 rounded"
            value={formData.categoria}
            onChange={e => setFormData({ ...formData, categoria: e.target.value })}
          >
            {['Entrada', 'Principal', 'Postre', 'Bebida', 'Guarnicion', 'Especialidad'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            className="border p-2 rounded"
            placeholder="URL de imagen"
            value={formData.imagen}
            onChange={e => setFormData({ ...formData, imagen: e.target.value })}
          />
          <textarea
            className="border p-2 rounded col-span-1 md:col-span-2"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
            rows={3}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition col-span-1 md:col-span-2"
          >
            Guardar
          </button>
        </form>
      )}

      <MenuList menu={menu} />
    </div>
  );
}
