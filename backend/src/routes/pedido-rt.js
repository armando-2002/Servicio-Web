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
// PUT - Actualizar pedido por ID
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { id_factura, id_menu } = req.body;
  try {
    const pedido = await prisma.pedido.update({
      where: { id },
      data: { id_factura, id_menu },
    });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
});

// DELETE - Eliminar pedido por ID
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.pedido.delete({ where: { id } });
    res.json({ message: "Pedido eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el pedido" });
  }
});
export default router;
//get
//post