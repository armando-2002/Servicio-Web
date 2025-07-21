import { Router } from "express";
import * as ReservaCt from "../controllers/reserva-ct.js"
const router = Router();
router.get("/", ReservaCt.getAllReservas);
router.get("/:id", ReservaCt.getReservaById);
router.post("/", ReservaCt.createReserva);
router.put("/:id", ReservaCt.updateReserva);
router.delete("/:id", ReservaCt.deleteReserva);

export default router;