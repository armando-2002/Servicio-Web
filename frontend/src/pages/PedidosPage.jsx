import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const PedidosPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [formData, setFormData] = useState({
    id_factura: "",
    id_menu: "",
  });
  const [facturas, setFacturas] = useState([]);
  const [menus, setMenus] = useState([]);
  const [editId, setEditId] = useState(null);
  const [precioSeleccionado, setPrecioSeleccionado] = useState(null);

  useEffect(() => {
    loadPedidos();
    loadFacturas();
    loadMenus();
  }, []);

  const loadPedidos = async () => {
    try {
      const data = await api.getPedidos(); // Se espera que incluya factura_rel y menu_rel
      setPedidos(data);
    } catch (error) {
      toast.error("Error al cargar los pedidos");
    }
  };

  const loadFacturas = async () => {
    try {
      const data = await api.fetchFacturas();
      setFacturas(data);
    } catch (error) {
      toast.error("Error al cargar las facturas");
    }
  };

  const loadMenus = async () => {
    try {
      const data = await api.fetchMenu();
      setMenus(data);
    } catch (error) {
      toast.error("Error al cargar los menús");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "id_menu") {
      const menu = menus.find((m) => m.id === parseInt(value));
      setPrecioSeleccionado(menu?.precio ?? null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pedido = {
      id_factura: parseInt(formData.id_factura),
      id_menu: parseInt(formData.id_menu),
    };

    try {
      if (editId) {
        await api.updatePedido(editId, pedido);
        toast.success("Pedido actualizado");
      } else {
        await api.createPedido(pedido);
        toast.success("Pedido creado");
      }
      setFormData({ id_factura: "", id_menu: "" });
      setPrecioSeleccionado(null);
      setEditId(null);
      loadPedidos();
    } catch (error) {
      toast.error("Error al guardar el pedido");
    }
  };

  const handleEdit = (pedido) => {
    setEditId(pedido.id);
    setFormData({
      id_factura: pedido.id_factura,
      id_menu: pedido.id_menu,
    });

    const menu = menus.find((m) => m.id === pedido.id_menu);
    setPrecioSeleccionado(menu?.precio ?? null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este pedido?")) {
      try {
        await api.deletePedido(id);
        toast.success("Pedido eliminado");
        loadPedidos();
      } catch (error) {
        toast.error("Error al eliminar el pedido");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestión de Pedidos</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <select
          name="id_factura"
          value={formData.id_factura}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        >
          <option value="">Seleccionar factura</option>
          {facturas.map((factura) => (
            <option key={factura.id} value={factura.id}>
              #{factura.id} - ${factura.precio_final}
            </option>
          ))}
        </select>

        <div>
          <select
            name="id_menu"
            value={formData.id_menu}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          >
            <option value="">Seleccionar ítem del menú</option>
            {menus.map((menu) => (
              <option key={menu.id} value={menu.id}>
                #{menu.id} - {menu.nombre} (${menu.precio})
              </option>
            ))}
          </select>
          {precioSeleccionado !== null && (
            <p className="text-green-600 text-sm mt-1">
              Precio seleccionado: ${precioSeleccionado.toFixed(2)}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editId ? "Actualizar" : "Crear"} Pedido
        </button>
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Factura (ID / Precio)</th>
            <th className="border p-2">Menú (ID / Nombre / Precio)</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id} className="text-center">
              <td className="border p-2">{pedido.id}</td>
              <td className="border p-2">
                #{pedido.id_factura} / ${pedido.factura_rel?.precio_final?.toFixed(2) ?? "N/A"}
              </td>
              <td className="border p-2">
                #{pedido.id_menu} / {pedido.menu_rel?.nombre ?? "N/A"} / $
                {pedido.menu_rel?.precio?.toFixed(2) ?? "N/A"}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(pedido)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(pedido.id)}
                  className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600"
                >
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

export default PedidosPage;
