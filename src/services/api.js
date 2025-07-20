const API_BASE = 'http://localhost:3000/api';

const api = {
fetchClientes: async () => {
  const res = await fetch(`${API_BASE}/client`);
  return res.json();
},

fetchClienteById: async (clienteId) => {
  const res = await fetch(`${API_BASE}/client/${clienteId}`);
  if (!res.ok) throw new Error('Cliente no encontrado');
  return res.json();
},

fetchFacturasByClienteId: async (id) => {
    const res = await fetch(`${API_BASE}/bill/client/${id}`);
    return res.json();
  },

createCliente: async (data) => {
  const res = await fetch(`${API_BASE}/client`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
},

updateCliente: async (id, data) => {
  const res = await fetch(`${API_BASE}/client/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
},

deleteCliente: async (id) => {
  const res = await fetch(`${API_BASE}/client/${id}`, {
    method: 'DELETE'
  });
  return res.json();
},

  fetchMenu: async () => {
    const res = await fetch(`${API_BASE}/menu`);
    if (!res.ok) throw new Error('Error al obtener el menú');
    return res.json();
  },

  createMenu: async (data) => {
    const res = await fetch(`${API_BASE}/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al crear el producto');
    return res.json();
  },

  updateMenu: async (id, data) => {
    const res = await fetch(`${`${API_BASE}/menu`}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al actualizar el producto');
    return res.json();
  },

  deleteMenu: async (id) => {
    const res = await fetch(`${`${API_BASE}/menu`}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Error al eliminar el producto');
    return res.json();
  },
fetchMesas: async () => {
    const res = await fetch(`${API_BASE}/table`);
    return res.json();
  },

  createMesa: async (data) => {
    const res = await fetch(`${API_BASE}/table`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateMesa: async (id, data) => {
    const res = await fetch(`${API_BASE}/table/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteMesa: async (id) => {
    const res = await fetch(`${API_BASE}/table/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
  getPedidos: async () => {
    const res = await fetch(`${API_BASE}/order`);
    if (!res.ok) throw new Error("Error al obtener pedidos");
    return await res.json();
  },

fetchPedidosByFacturaId: async (facturaId) => {
  try {
    const res = await fetch(`${API_BASE}/bill/${facturaId}/order`);
    if (!res.ok) {
      throw new Error(`Error al obtener pedidos de la factura ${facturaId}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Error en fetchPedidosByFacturaId(${facturaId}):`, error);
    throw error;
  }
},

  createPedido: async (pedido) => {
    const res = await fetch(`${API_BASE}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    });
    if (!res.ok) throw new Error("Error al crear pedido");
    return await res.json();
  },

  updatePedido: async (id, pedido) => {
    const res = await fetch(`${API_BASE}/order/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    });
    if (!res.ok) throw new Error("Error al actualizar pedido");
    return await res.json();
  },

  deletePedido: async (id) => {
    const res = await fetch(`${API_BASE}/order/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar pedido");
    return await res.json();
  },
   fetchReservas: async () => {
    const res = await fetch(`${API_BASE}/booking`);
    return res.json();
  },

   createReserva: async (reserva) => {
    const res = await fetch(`${API_BASE}/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva),
    });
    return res.json();
  },

   updateReserva: async (id, reserva) => {
    const res = await fetch(`${API_BASE}/booking/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva),
    });
    return res.json();
  },

   deleteReserva: async (id) => {
    const res = await fetch(`${API_BASE}/booking/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

fetchFacturas: async () => {
  const response = await fetch(`${API_BASE}/bill`);
  if (!response.ok) throw new Error('Error al obtener todas las facturas');
  return await response.json();
},

fetchFacturasByCliente: async (clienteId) => {
  const res = await fetch(`${API_BASE}/bill/client/${clienteId}`);
  return res.json();
},

fetchFacturaById: async (id) => {
  const res = await fetch(`${API_BASE}/bill/${id}`);
  return res.json();
},

createFactura: async (facturaData) => {
  const response = await fetch(`${API_BASE}/bill`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(facturaData),
  });
  if (!response.ok) throw new Error('Error al crear factura');
  return await response.json();
},

updateFactura: async (id, data) => {
  const res = await fetch(`${API_BASE}/bill/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
},

deleteFactura: async (id) => {
  const res = await fetch(`${API_BASE}/bill/${id}`, {
    method: 'DELETE',
  });
  return res.json();
},
};

export default api;
