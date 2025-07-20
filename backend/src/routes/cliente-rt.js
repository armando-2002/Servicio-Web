import { Router } from "express";
import * as ClientCt from "../controllers/cliente-ct.js"

const router = Router();


router.get("/", ClientCt.getClients);

router.get("/:id", ClientCt.getClient);

router.post("/", ClientCt.createClient);

router.put("/:id", ClientCt.updateClient);

router.delete("/:id", ClientCt.deleteClient);

export default router;