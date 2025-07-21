import { useState, useEffect } from "react";

const PedidoForm = ({ pedido, facturas, menus, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    id_factura: pedido?.id_factura || "",
    id_menu: pedido?.id_menu || "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si cambia el pedido (para editar), actualizar formulario
    setFormData({
      id_factura: pedido?.id_factura || "",
      id_menu: pedido?.id_menu || "",
    });
  }, [pedido]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id_factura || !formData.id_menu) {
      setError("Factura y Menú son obligatorios");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await onSuccess(formData);
    } catch (err) {
      setError(err.message || "Error al guardar pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Factura:
        <select
          name="id_factura"
          value={formData.id_factura}
          onChange={handleChange}
          required
        >
          <option value="">--Seleccione factura--</option>
          {facturas.map((f) => (
            <option key={f.id} value={f.id}>
              ID: {f.id} - Cliente: {f.id_cliente}
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Menú:
        <select
          name="id_menu"
          value={formData.id_menu}
          onChange={handleChange}
          required
        >
          <option value="">--Seleccione menú--</option>
          {menus.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre} - ${m.precio}
            </option>
          ))}
        </select>
      </label>
      <br />

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : pedido?.id ? "Actualizar" : "Crear"}
      </button>
      <button type="button" onClick={onCancel} disabled={loading}>
        Cancelar
      </button>
    </form>
  );
};

export default PedidoForm;
