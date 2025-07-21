import { useEffect, useState } from 'react';
import { menusService } from '../services/api';
import MenuForm from '../components/MenuForm';

const MenusPage = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const { data } = await menusService.getAll();
      setMenus(data);
      setError(null);
    } catch {
      setError('Error al cargar menús');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm('¿Eliminar este menú?')){
      try {
        await menusService.delete(id);
        fetchMenus();
      } catch {
        setError('Error al eliminar menú');
      }
    }
  };

  const handleEdit = (menu) => {
    setSelectedMenu(menu);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedMenu(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedMenu(null);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setSelectedMenu(null);
    fetchMenus();
  };

  if(loading && menus.length === 0) return <div>Cargando menús...</div>;
  if(error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h1>Menús</h1>

      {!showForm && (
        <button onClick={handleNew}>Nuevo Menú</button>
      )}

      {showForm ? (
        <MenuForm 
          menu={selectedMenu}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {menus.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.nombre}</td>
                <td>{m.precio.toFixed(2)}</td>
                <td>{m.categoria}</td>
                <td>{m.estado ? 'Activo' : 'Inactivo'}</td>
                <td>{m.descripcion || '-'}</td>
                <td>
                  <button onClick={() => handleEdit(m)}>Editar</button>
                  <button onClick={() => handleDelete(m.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MenusPage;
