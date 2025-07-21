import { useState } from 'react';
import { clientesService } from '../services/api';

const ClienteForm = ({ cliente, onSuccess }) => {
  const [formData, setFormData] = useState({
    id: cliente?.id || '',
    nombre: cliente?.nombre || '',
    telefono: cliente?.telefono || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedFields, setFocusedFields] = useState({
    id: false,
    nombre: false,
    telefono: false
  });

  const handleFocus = (field) => {
    setFocusedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setFocusedFields(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'id' ? value.replace(/\D/, '') : value // Solo números para id
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.id || !formData.nombre || !formData.telefono) {
      setError('ID, Nombre y teléfono son obligatorios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        id: parseInt(formData.id, 10),
        nombre: formData.nombre,
        telefono: formData.telefono
      };

      if (cliente?.id) {
        await clientesService.update(cliente.id, payload);
      } else {
        await clientesService.create(payload);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="cliente-form">
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
  <label htmlFor="id">ID</label>
  <input
    id="id"
    name="id"
    value={formData.id}
    onChange={handleChange}
    required
    inputMode="numeric"
    pattern="[0-9]*"
    maxLength={10}
  />
</div>

<div className="form-group">
  <label htmlFor="nombre">Nombre completo</label>
  <input
    id="nombre"
    name="nombre"
    value={formData.nombre}
    onChange={handleChange}
    required
  />
</div>

<div className="form-group">
  <label htmlFor="telefono">Teléfono (único)</label>
  <input
    id="telefono"
    name="telefono"
    value={formData.telefono}
    onChange={handleChange}
    required
  />
</div>

      <button type="submit" disabled={loading}>
        {loading ? (cliente?.id ? 'Actualizando...' : 'Guardando...') : (cliente?.id ? 'Actualizar Cliente' : 'Crear Cliente')}
      </button>
    </form>
  );
};

export default ClienteForm;
