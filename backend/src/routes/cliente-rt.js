import { Router } from "express";
import  prisma  from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  const clients = await prisma.cliente.findMany();
  res.json(clients);
});

export default router;