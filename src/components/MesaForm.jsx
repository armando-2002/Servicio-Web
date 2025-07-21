import { useState, useEffect } from 'react';
import { mesasService } from "../services/api";


const MesaForm = ({ mesa, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    capacidad: mesa?.capacidad || '',
    disponibilidad: mesa?.disponibilidad ?? true,
    descripcion: mesa?.descripcion || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mesa) {
      setFormData({
        capacidad: mesa.capacidad,
        disponibilidad: mesa.disponibilidad,
        descripcion: mesa.descripcion || '',
      });
    }
  }, [mesa]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'capacidad' ? Number(value) : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones simples
    if (!formData.capacidad || formData.capacidad <= 0) {
      setError('Capacidad debe ser un número positivo');
      return;
    }

    setLoading(true);

    try {
      if (mesa?.id) {
        await mesasService.update(mesa.id, formData);
      } else {
        await mesasService.create(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar la mesa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mesa-form">
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>
          Capacidad:
          <input
            type="number"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
            min="1"
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Disponibilidad:
          <input
            type="checkbox"
            name="disponibilidad"
            checked={formData.disponibilidad}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Descripción (opcional):
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            maxLength={200}
          />
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (mesa?.id ? 'Actualizando...' : 'Guardando...') : (mesa?.id ? 'Actualizar Mesa' : 'Crear Mesa')}
      </button>

      {onCancel && (
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default MesaForm;
