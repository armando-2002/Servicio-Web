import express from "express";

import clienteR from "./routes/cliente-rt.js"; // Importaciones de archivos propios incluyen la extension .js
import facturaR from "./routes/factura-rt.js";
import menuR from "./routes/menu-rt.js";
import mesaR from "./routes/mesa-rt.js";
import pedidoR from "./routes/pedido-rt.js";
import reservaR from "./routes/reserva-rt.js";

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
});