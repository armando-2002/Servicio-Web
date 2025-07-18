import { Router } from "express";
import  prisma  from "../db.js";


const router = Router();

router.get("/",async(req,res)=>{
    const pedido =await prisma.pedido.findMany();
    res.json(pedido);
});
// POST /pedido
router.post("/", async (req, res) => {
  const { id_factura, id_menu } = req.body;
  try {
    const pedido = await prisma.pedido.create({
      data: {
        id_factura,
        id_menu,
      },
    });
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pedido", details: error });
  }
});
export default router;
//get
//post