import { Router } from "express";
import * as BillCt from "../controllers/factura-ct.js"

const router = Router();

router.get("/", BillCt.getBills);

router.get("/:id", BillCt.getBill);

router.post("/", BillCt.createBill);

router.put("/:id", BillCt.updateBill);

router.delete("/:id", BillCt.deleteBill);

export default router;