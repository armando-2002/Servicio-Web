const API_BASE_URL = 'http://localhost:3000'; // Asegúrate de usar el puerto correcto

export const fetchMenu = async () => {
  const res = await fetch(`${API_BASE_URL}/menu`);
  if (!res.ok) throw new Error('Error al obtener el menú');
  return await res.json();
};
