import { useState, useEffect } from "react";

const FacturaForm = ({ factura, clientes, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    id_cliente: factura?.id_cliente || "",
    precio_final: factura?.precio_final || "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      id_cliente: factura?.id_cliente || "",
      precio_final: factura?.precio_final || "",
    });
  }, [factura]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id_cliente) {
      setError("Debe seleccionar un cliente.");
      return;
    }
    if (!formData.precio_final || isNaN(formData.precio_final)) {
      setError("Precio final debe ser un número válido.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await onSuccess({
        ...formData,
        precio_final: parseFloat(formData.precio_final),
      });
    } catch (err) {
      setError(err.message || "Error al guardar factura.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>
        Cliente:
        <select
          name="id_cliente"
          value={formData.id_cliente}
          onChange={handleChange}
          required
        >
          <option value="">-- Seleccione cliente --</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre} ({c.telefono})
            </option>
          ))}
        </select>
      </label>
      <br />

      <label>
        Precio Final:
        <input
          type="number"
          step="0.01"
          name="precio_final"
          value={formData.precio_final}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : factura?.id ? "Actualizar" : "Crear"}
      </button>
      <button type="button" onClick={onCancel} disabled={loading}>
        Cancelar
      </button>
    </form>
  );
};

export default FacturaForm;
