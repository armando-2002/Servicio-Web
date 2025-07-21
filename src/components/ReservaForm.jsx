import { useState, useEffect } from 'react';
import { reservasService } from '../services/api';
import { clientesService } from '../services/api'; // Para cargar clientes
import { mesasService } from '../services/api';       // Para cargar mesas

const estadosReserva = ["PENDIENTE", "CONFIRMADA", "CANCELADA", "FINALIZADA"]; // según tu enum en Prisma

const ReservaForm = ({ reserva, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    id_cliente: reserva?.id_cliente || '',
    id_mesa: reserva?.id_mesa || '',
    fecha: reserva?.fecha ? reserva.fecha.slice(0,16) : '', // para input datetime-local
    num_personas: reserva?.num_personas || 1,
    estado: reserva?.estado || "PENDIENTE",
  });

  const [clientes, setClientes] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar clientes y mesas para dropdowns
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const { data } = await clientesService.getAll();
        setClientes(data);
      } catch {
        setError("Error cargando clientes");
      }
    };
    const fetchMesas = async () => {
      try {
        const { data } = await mesasService.getAll();
        setMesas(data);
      } catch {
        setError("Error cargando mesas");
      }
    };
    fetchClientes();
    fetchMesas();
  }, []);

  useEffect(() => {
    if (reserva) {
      setFormData({
        id_cliente: reserva.id_cliente,
        id_mesa: reserva.id_mesa,
        fecha: reserva.fecha ? reserva.fecha.slice(0,16) : '',
        num_personas: reserva.num_personas,
        estado: reserva.estado,
      });
    }
  }, [reserva]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "num_personas" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.id_cliente || !formData.id_mesa || !formData.fecha) {
      setError("Cliente, mesa y fecha son obligatorios");
      return;
    }
    if (formData.num_personas <= 0) {
      setError("Número de personas debe ser mayor a 0");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        fecha: new Date(formData.fecha).toISOString()
      };

      if (reserva?.id) {
        await reservasService.update(reserva.id, payload);
      } else {
        await reservasService.create(payload);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Error al guardar la reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reserva-form">
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>
          Cliente:
          <select name="id_cliente" value={formData.id_cliente} onChange={handleChange} required>
            <option value="">Seleccione un cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          Mesa:
          <select name="id_mesa" value={formData.id_mesa} onChange={handleChange} required>
            <option value="">Seleccione una mesa</option>
            {mesas.map(m => (
              <option key={m.id} value={m.id}>
                {`Mesa ${m.id} - Capacidad: ${m.capacidad} - ${m.disponibilidad ? "Disponible" : "No disponible"}`}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          Fecha y hora:
          <input
            type="datetime-local"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Número de personas:
          <input
            type="number"
            name="num_personas"
            value={formData.num_personas}
            min="1"
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Estado:
          <select name="estado" value={formData.estado} onChange={handleChange} required>
            {estadosReserva.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? (reserva?.id ? 'Actualizando...' : 'Guardando...') : (reserva?.id ? 'Actualizar Reserva' : 'Crear Reserva')}
      </button>

      {onCancel && (
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default ReservaForm;
