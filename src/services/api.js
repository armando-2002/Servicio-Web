// src/api.js
const API_BASE = 'http://localhost:3000/api';

export const getReservas = async () => {
  const res = await fetch(`${API_BASE}/reservas`);
  return await res.json();
};

export const getMenu = async () => {
  const res = await fetch(`${API_BASE}/menu`);
  return await res.json();
};

export const postFactura = async (factura) => {
  const res = await fetch(`${API_BASE}/facturas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(factura),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al registrar factura');
  return data;
};

export async function getClientes() {
  const response = await fetch('http://localhost:3000/api/clientes');
  if (!response.ok) {
    throw new Error('Error al obtener clientes');
  }
  return response.json();
}

