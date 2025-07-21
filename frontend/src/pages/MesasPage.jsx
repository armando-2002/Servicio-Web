import { useEffect, useState } from 'react';
import { mesasService } from '../services/api';
import MesaForm from '../components/MesaForm';

const MesasPage = () => {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState(null);

  const fetchMesas = async () => {
    setLoading(true);
    try {
      const { data } = await mesasService.getAll();
      setMesas(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar mesas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMesas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta mesa?')) {
      try {
        await mesasService.delete(id);
        fetchMesas();
      } catch (err) {
        setError('Error al eliminar la mesa');
      }
    }
  };

  const handleEdit = (mesa) => {
    setSelectedMesa(mesa);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedMesa(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedMesa(null);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedMesa(null);
    fetchMesas();
  };

  if (loading && mesas.length === 0) return <div>Cargando mesas...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Mesas</h1>

      {!showForm && (
        <button onClick={handleNew}>
          Nueva Mesa
        </button>
      )}

      {showForm ? (
        <MesaForm
          mesa={selectedMesa}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Capacidad</th>
              <th>Disponibilidad</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mesas.map(mesa => (
              <tr key={mesa.id}>
                <td>{mesa.id}</td>
                <td>{mesa.capacidad}</td>
                <td>{mesa.disponibilidad ? 'Disponible' : 'No disponible'}</td>
                <td>{mesa.descripcion || '-'}</td>
                <td>
                  <button onClick={() => handleEdit(mesa)}>Editar</button>
                  <button onClick={() => handleDelete(mesa.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MesasPage;
