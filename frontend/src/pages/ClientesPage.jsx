import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientesService } from '../services/api';
import ClienteForm from '../components/ClienteForm';

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const { data } = await clientesService.getAll();
      setClientes(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este cliente?')) {
      try {
        await clientesService.delete(id);
        fetchClientes();
      } catch (err) {
        setError('Error al eliminar cliente');
      }
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedCliente(null);
    fetchClientes();
  };

  if (loading && clientes.length === 0) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Clientes</h1>
      
      <button onClick={() => {
        setSelectedCliente(null);
        setShowForm(true);
      }}>
        Nuevo Cliente
      </button>

      {showForm && (
        <ClienteForm 
          cliente={selectedCliente} 
          onSuccess={handleSuccess}
        />
      )}

      <table>
  <thead>
    <tr>
      <th>ID</th> {/* Columna añadida para el ID */}
      <th>Nombre</th>
      <th>Teléfono</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {clientes.map(cliente => (
      <tr key={cliente.id}>
        <td>{cliente.id}</td> {/* Mostrar el ID */}
        <td>{cliente.nombre}</td>
        <td>{cliente.telefono}</td>
        <td>
          <button onClick={() => {
            setSelectedCliente(cliente);
            setShowForm(true);
          }}>
            Editar
          </button>
          <button onClick={() => handleDelete(cliente.id)}>
            Eliminar
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default ClientesPage;