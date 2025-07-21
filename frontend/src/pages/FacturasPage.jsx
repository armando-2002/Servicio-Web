import { useState, useEffect } from "react";
import { facturasService, clientesService } from "../services/api";
import FacturaForm from "../components/FacturaForm";

const FacturasPage = () => {
  const [facturas, setFacturas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState(null);

  const fetchFacturas = async () => {
    setLoading(true);
    try {
      const { data } = await facturasService.getAll();
      setFacturas(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar facturas");
    } finally {
      setLoading(false);
    }
  };

  const fetchClientes = async () => {
    try {
      const { data } = await clientesService.getAll();
      setClientes(data);
    } catch {
      // opcional manejar error
    }
  };

  useEffect(() => {
    fetchFacturas();
    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta factura?")) {
      try {
        await facturasService.delete(id);
        fetchFacturas();
      } catch {
        setError("Error al eliminar factura");
      }
    }
  };

  const handleSuccess = async (formData) => {
    if (selectedFactura?.id) {
      await facturasService.update(selectedFactura.id, formData);
    } else {
      await facturasService.create(formData);
    }
    setShowForm(false);
    setSelectedFactura(null);
    fetchFacturas();
  };

  return (
    <div>
      <h1>Facturas</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={() => {
          setSelectedFactura(null);
          setShowForm(true);
        }}
      >
        Nueva Factura
      </button>

      {showForm && (
        <FacturaForm
          factura={selectedFactura}
          clientes={clientes}
          onSuccess={handleSuccess}
          onCancel={() => {
            setShowForm(false);
            setSelectedFactura(null);
          }}
        />
      )}

      <table border="1" cellPadding="5" cellSpacing="0" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Precio Final</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((factura) => (
            <tr key={factura.id}>
              <td>{factura.id}</td>
              <td>{factura.id_cliente}</td> {/* Opcional mostrar más info del cliente si haces include */}
              <td>${factura.precio_final.toFixed(2)}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedFactura(factura);
                    setShowForm(true);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => handleDelete(factura.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacturasPage;
