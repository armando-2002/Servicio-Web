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


export default router;
//fasfad