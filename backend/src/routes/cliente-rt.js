import { Router } from "express";
import  prisma  from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  const clients = await prisma.cliente.findMany();
  res.status(200).json(clients);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const client = await prisma.cliente.findUnique({
    where: {
      id: id
    },
    include: {
      factura: true,
      reserva: true
    }
  });
  res.status(200).json(client);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const newClient = await prisma.cliente.create({
    data: data,
    include: {
      factura: true,
      reserva: true,
    }
  });
  res.status(201).json({
    message: "Cliente creado con la id: " + newClient.id,
    data: newClient
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updClient = await prisma.cliente.update({
    where: {
      id: id
    },
    data: data,
    include: {
      factura: true,
      reserva: true,
    }
  });
  res.status(200).json({
    message: "Cliente actualizado con la id: " + id,
    data: updClient
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.cliente.delete({
    where: {
      id: id
    }
  });
  res.status(200).json({
    message: "Cliente eliminado con la id: " + id
  });
});

export default router;