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
  const res = await fetch('http://localhost:3000/api/clientes');
  if (!res.ok) throw new Error('Error al obtener clientes');
  return res.json();
}

export async function crearCliente(data) {
  const res = await fetch('http://localhost:3000/api/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear cliente');
  return res.json();
}

