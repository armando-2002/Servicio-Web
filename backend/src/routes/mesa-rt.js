import { Router } from "express";
import * as MesaCt from "../controllers/mesa-ct.js"
const router = Router();
router.get("/",MesaCt.getAllMesas);
router.get("/:id",MesaCt.getMesaById);
router.post("/",MesaCt.createMesa);
router.put("/:id", MesaCt.updateMesa);
router.delete("/:id", MesaCt.deleteMesa);
export default router;
