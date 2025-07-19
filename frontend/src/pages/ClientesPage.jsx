import React, { useState } from 'react';

export default function ClientesPage() {
  const [formData, setFormData] = useState({ id: '', nombre: '', telefono: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/cliente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ id: '', nombre: '', telefono: '' });
  };

  return (
    <div>
      <h2>Registrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="ID" value={formData.id} onChange={e => setFormData({ ...formData, id: parseInt(e.target.value) })} />
        <input placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
        <input placeholder="Teléfono" value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
