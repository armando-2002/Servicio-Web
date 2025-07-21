import { Router } from "express";
import * as PedidoCt from "../controllers/pedido-ct.js"
const router = Router();
router.get("/", PedidoCt.getAllPedidos);
router.get("/:id", PedidoCt.getPedidoById);
router.post("/", PedidoCt.createPedido);
router.put("/:id", PedidoCt.updatePedido);
router.delete("/:id", PedidoCt.deletePedido);

export default router;