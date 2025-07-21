import { useState, useEffect } from 'react';
import { menusService } from '../services/api';

const MenuForm = ({ menu, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: menu?.nombre || '',
    precio: menu?.precio || 0,
    estado: menu?.estado ?? true,
    categoria: menu?.categoria || '',
    descripcion: menu?.descripcion || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categorias = ['Entrada', 'Plato fuerte', 'Postre', 'Bebida']; // Ajusta según tus categorías reales

  useEffect(() => {
    if(menu){
      setFormData({
        nombre: menu.nombre,
        precio: menu.precio,
        estado: menu.estado,
        categoria: menu.categoria,
        descripcion: menu.descripcion || '',
      });
    }
  }, [menu]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'precio' ? parseFloat(value) : value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.nombre || formData.precio <= 0 || !formData.categoria) {
      setError('Nombre, precio mayor a 0 y categoría son obligatorios.');
      return;
    }

    setLoading(true);
    try {
      if(menu?.id){
        await menusService.update(menu.id, formData);
      } else {
        await menusService.create(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar menú');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="menu-form">
      {error && <div className="error-message">{error}</div>}

      <div>
        <label>Nombre:
          <input 
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>Precio:
          <input
            type="number"
            step="0.01"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
            min="0.01"
          />
        </label>
      </div>

      <div>
        <label>Categoría:
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>Estado:
          <input
            type="checkbox"
            name="estado"
            checked={formData.estado}
            onChange={handleChange}
          />
          {' '}Activo
        </label>
      </div>

      <div>
        <label>Descripción:
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            maxLength={300}
          />
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (menu?.id ? 'Actualizando...' : 'Guardando...') : (menu?.id ? 'Actualizar' : 'Crear')}
      </button>

      {onCancel && (
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default MenuForm;
