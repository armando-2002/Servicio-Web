import React, { useEffect, useState } from "react";
import api from "../services/api";

function FacturasPage() {
  const [facturas, setFacturas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [nuevaFactura, setNuevaFactura] = useState({
    id_cliente: "",
  });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarFacturas();
    cargarClientes();
  }, []);

const cargarFacturas = async () => {
  try {
    const data = await api.fetchFacturas();

    const facturasConPedidos = await Promise.all(
      data.map(async (factura) => {
        try {
          const pedidos = await api.fetchPedidosByFacturaId(factura.id);
          return { ...factura, pedidos };
        } catch (error) {
          console.warn(`No se pudieron cargar pedidos para la factura ${factura.id}`, error);
          return { ...factura, pedidos: [] }; // ← si falla, igual se retorna con pedidos vacíos
        }
      })
    );

    setFacturas(facturasConPedidos);
  } catch (error) {
    console.error("Error al cargar facturas con pedidos:", error);
  }
};


  const cargarClientes = async () => {
    try {
      const data = await api.fetchClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  };

  const handleChange = (e) => {
    setNuevaFactura({
      ...nuevaFactura,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const { id_cliente } = nuevaFactura;
  if (!id_cliente) return;

  try {
    if (editando) {
      await api.updateFactura(editando, {
        id_cliente: parseInt(id_cliente),
      });
      setEditando(null);
    } else {
      await api.createFactura({
        id_cliente: parseInt(id_cliente),
        precio_final: 0,
        pedidos: [], // ← pedidos vacíos al crear
      });
    }
    setNuevaFactura({ id_cliente: "" });
    cargarFacturas();
  } catch (error) {
    console.error("Error al guardar la factura:", error);
  }
};

  const handleEdit = (factura) => {
    setNuevaFactura({
      id_cliente: factura.id_cliente,
    });
    setEditando(factura.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteFactura(id);
      cargarFacturas();
    } catch (error) {
      console.error("Error al eliminar la factura:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Facturas</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold">Cliente</label>
          <select
            name="id_cliente"
            value={nuevaFactura.id_cliente}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre} (ID: {cliente.id})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {editando ? "Actualizar Factura" : "Crear Factura"}
        </button>
      </form>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Cliente</th>
            <th className="border px-4 py-2">Pedidos</th>
            <th className="border px-4 py-2">Precio Final</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((factura) => (
            <tr key={factura.id}>
              <td className="border px-4 py-2">{factura.id}</td>
              <td className="border px-4 py-2">
                {clientes.find((c) => c.id === factura.id_cliente)?.nombre || "Desconocido"}
              </td>
              <td className="border px-4 py-2">
                {factura.pedidos && factura.pedidos.length > 0
                  ? factura.pedidos.map((p) => `#${p.id}`).join(", ")
                  : "Sin pedidos"}
              </td>
              <td className="border px-4 py-2">
                ${factura.precio_final?.toFixed(2) || "0.00"}
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(factura)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(factura.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
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
}

export default FacturasPage;
