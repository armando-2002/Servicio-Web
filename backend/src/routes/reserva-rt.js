import { Router } from "express";
import prisma  from "../db.js";

const router = Router();

router.get("/",async(req,res)=>{
    const reserva =await prisma.reserva.findMany();
    res.json(reserva);
});

// POST /reserva
router.post("/", async (req, res) => {
  const { id_cliente, id_mesa, fecha, num_personas, estado } = req.body;
  try {
    const reserva = await prisma.reserva.create({
      data: {
        id_cliente,
        id_mesa,
        fecha: new Date(fecha),
        num_personas,
        estado,
      },
    });
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reserva", details: error });
  }
});
// PUT - Actualizar reserva por ID
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { id_cliente, id_mesa, fecha, num_personas, estado } = req.body;
  try {
    const reserva = await prisma.reserva.update({
      where: { id},
      data: {
        id_cliente,
        id_mesa,
        fecha: new Date(fecha),
        num_personas,
        estado,
      },
    });
    res.json(reserva);
  } catch (error) {
    res.status(400).json({ error: "No se pudo actualizar la reserva.", detalle: error.message });
  }
});

// DELETE - Eliminar reserva por ID
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.reserva.delete({ where: { id } });
    res.json({ message: "Reserva eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reserva" });
  }
});
export default router;

//put
//delete
//get
//post


