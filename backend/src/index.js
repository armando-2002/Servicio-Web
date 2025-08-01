/*import express from "express";

import clienteR from "./routes/cliente-rt.js"; // Importaciones de archivos propios incluyen la extension .js
import facturaR from "./routes/factura-rt.js";
import menuR from "./routes/menu-rt.js";
import mesaR from "./routes/mesa-rt.js";
import pedidoR from "./routes/pedido-rt.js";
import reservaR from "./routes/reserva-rt.js";
import prisma from "./db.js"; // Importa Prisma para manejar la conexión

if (!process.env.PORT) {
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);

const app = express();

app.use(express.json());

app.use("/api/client", clienteR);
app.use("/api/bill", facturaR);
app.use("/api/menu", menuR);
app.use("/api/table", mesaR);
app.use("/api/order", pedidoR);
app.use("/api/booking", reservaR);

app.listen(PORT, () => {
  console.log(`Server en el puerto ${PORT}`);
  console.log(`https://localhost:${PORT}`)
});*/
import express from "express";
import clienteR from "./routes/cliente-rt.js";
import facturaR from "./routes/factura-rt.js";
import menuR from "./routes/menu-rt.js";
import mesaR from "./routes/mesa-rt.js";
import pedidoR from "./routes/pedido-rt.js";
import reservaR from "./routes/reserva-rt.js";
import prisma from "./db.js"; // Importa Prisma para manejar la conexión

// Configuración del puerto (con valor por defecto)
const PORT = process.env.PORT || 3000;

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/client", clienteR);
app.use("/api/bill", facturaR);
app.use("/api/menu", menuR);
app.use("/api/table", mesaR);
app.use("/api/order", pedidoR);
app.use("/api/booking", reservaR);

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Inicio del servidor con manejo de cierre adecuado
const server = app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`https://localhost:${PORT}`);
});

// Manejo de cierre de Prisma al terminar la aplicación
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});