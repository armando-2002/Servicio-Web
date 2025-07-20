import { Router } from "express";
import  prisma  from "../db.js";

const router = Router();
;

router.get("/",async(req,res)=>{
    const mesa =await prisma.mesa.findMany();
    res.json(mesa);
});
// POST /mesa
router.post("/", async (req, res) => {
  const { capacidad, disponibilidad, descripcion } = req.body;
  try {
    const mesa = await prisma.mesa.create({
      data: {
        capacidad,
        disponibilidad,
        descripcion,
      },
    });
    res.status(201).json(mesa);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la mesa", details: error });
  }
});
// PUT - Actualizar mesa por ID
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { capacidad, disponibilidad, descripcion } = req.body;
  try {
    const mesa = await prisma.mesa.update({
      where: { id },
      data: { capacidad, disponibilidad, descripcion },
    });
    res.json(mesa);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la mesa" });
  }
});

// DELETE - Eliminar mesa por ID
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.mesa.delete({ where: { id } });
    res.json({ message: "Mesa eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la mesa" });
  }
});

export default router;
//fasfad