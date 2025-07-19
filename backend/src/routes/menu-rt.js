import { Router } from "express";
import  prisma  from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  const menu = await prisma.menu.findMany();
  res.status(200).json(menu);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const menu = await prisma.menu.findUnique({
    where: {
      id: id
    }
  });
  res.status(200).json(menu);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const newMenu = await prisma.menu.create({
    data: data
  });
  res.status(201).json({
    message: "Menu creado con la id: " + newMenu.id,
    data: newMenu
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updMenu = await prisma.menu.update({
    where: {
      id: id
    },
    data: data
  });
  res.status(200).json({
    message: "Menu actualizado con la id: " + id,
    data: updMenu
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.menu.delete({
    where: {
      id: id
    }
  });
  res.status(200).json({
    message: "Menu eliminado con la id: " + id
  });
});

export default router;