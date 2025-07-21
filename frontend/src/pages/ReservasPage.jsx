import { useEffect, useState } from 'react';
import { reservasService } from '../services/api';
import ReservaForm from '../components/ReservaForm';

const ReservasPage = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);

  const fetchReservas = async () => {
    setLoading(true);
    try {
      const { data } = await reservasService.getAll();
      setReservas(data);
      setError(null);
    } catch {
      setError('Error al cargar reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta reserva?')) {
      try {
        await reservasService.delete(id);
        fetchReservas();
      } catch {
        setError('Error al eliminar reserva');
      }
    }
  };

  const handleEdit = (reserva) => {
    setSelectedReserva(reserva);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedReserva(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedReserva(null);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedReserva(null);
    fetchReservas();
  };

  if (loading && reservas.length === 0) return <div>Cargando reservas...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Reservas</h1>

      {!showForm && (
        <button onClick={handleNew}>Nueva Reserva</button>
      )}

      {showForm ? (
        <ReservaForm
          reserva={selectedReserva}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Mesa</th>
              <th>Fecha</th>
              <th>Personas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.id_cliente}</td> {/* Aquí podrías mostrar nombre cliente si cargas más datos */}
                <td>{r.id_mesa}</td>
                <td>{new Date(r.fecha).toLocaleString()}</td>
                <td>{r.num_personas}</td>
                <td>{r.estado}</td>
                <td>
                  <button onClick={() => handleEdit(r)}>Editar</button>
                  <button onClick={() => handleDelete(r.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservasPage;
