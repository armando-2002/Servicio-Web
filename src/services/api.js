import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const clientesService = {
  getAll: () => api.get('/client'),
  getById: (id) => api.get(`/client/${id}`),
  create: (data) => api.post('/client', data), // Asegúrate que la ruta es correcta
  update: (id, data) => api.put(`/client/${id}`, data),
  delete: (id) => api.delete(`/client/${id}`),
};
export const mesasService = {
  getAll: () => api.get('/table'),
  getById: (id) => api.get(`/table/${id}`),
  create: (data) => api.post('/table', data),
  update: (id, data) => api.put(`/table/${id}`, data),
  delete: (id) => api.delete(`/table/${id}`),
};
export const reservasService = {
  getAll: () => api.get('/booking'),
  getById: (id) => api.get(`/booking/${id}`),
  create: (data) => api.post('/booking', data),
  update: (id, data) => api.put(`/booking/${id}`, data),
  delete: (id) => api.delete(`/booking/${id}`),
};
export const menusService = {
  getAll: () => api.get('/menu'),
  getById: (id) => api.get(`/menu/${id}`),
  create: (data) => api.post('/menu', data),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
};
export const pedidosService = {
  getAll: () => api.get("/order"),
  getById: (id) => api.get(`/order/${id}`),
  create: (data) => api.post("/order", data),
  update: (id, data) => api.put(`/order/${id}`, data),
  delete: (id) => api.delete(`/order/${id}`),
};
export const facturasService = {
  getAll: () => api.get("/bill"),
  getById: (id) => api.get(`/bill/${id}`),
  create: (data) => api.post("/bill", data),
  update: (id, data) => api.put(`/bill/${id}`, data),
  delete: (id) => api.delete(`/bill/${id}`),
};
export default api;