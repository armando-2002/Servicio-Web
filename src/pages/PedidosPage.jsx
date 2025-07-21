import { useState, useEffect } from "react";
import PedidoForm from "../components/PedidoForm";
import { pedidosService, facturasService, menusService } from "../services/api";

const PedidosPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [menus, setMenus] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPedido, setEditingPedido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pedidosData, facturasData, menusData] = await Promise.all([
        pedidosService.getAll(),
        facturasService.getAll(),
        menusService.getAll(),
      ]);
      setPedidos(pedidosData.data || pedidosData);  // axios response: data
      setFacturas(facturasData.data || facturasData);
      setMenus(menusData.data || menusData);
      setError(null);
    } catch (err) {
      setError("Error cargando datos: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = () => {
    setEditingPedido(null);
    setShowForm(true);
  };

  const handleEditClick = (pedido) => {
    setEditingPedido(pedido);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este pedido?")) return;
    try {
      await pedidosService.delete(id);
      fetchData();
    } catch (err) {
      alert("Error al eliminar pedido: " + (err.message || err));
    }
  };

  const handleSuccess = async (formData) => {
    try {
      if (editingPedido) {
        await pedidosService.update(editingPedido.id, formData);
      } else {
        await pedidosService.create(formData);
      }
      setShowForm(false);
      setEditingPedido(null);
      fetchData();
    } catch (err) {
      alert("Error guardando pedido: " + (err.message || err));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPedido(null);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Pedidos</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Cargando datos...</p>}

      {!loading && (
        <>
          <button onClick={handleAddClick}>Nuevo Pedido</button>

          {showForm && (
            <PedidoForm
              pedido={editingPedido}
              facturas={facturas}
              menus={menus}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          )}

          <table
            border="1"
            cellPadding="5"
            style={{ marginTop: "1rem", width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Factura ID</th>
                <th>Menú</th>
                <th>Nombre Menú</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No hay pedidos
                  </td>
                </tr>
              )}
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.id_factura}</td>
                  <td>{p.menu_rel?.id || "N/A"}</td>
                  <td>{p.menu_rel?.nombre || "N/A"}</td>
                  <td>${p.menu_rel?.precio?.toFixed(2) || "0.00"}</td>
                  <td>
                    <button onClick={() => handleEditClick(p)}>Editar</button>{" "}
                    <button onClick={() => handleDeleteClick(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PedidosPage;
