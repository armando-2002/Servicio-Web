import  prisma  from "../db.js";

export const getMenus = async (req, res) => {
  const menu = await prisma.menu.findMany();
  res.status(200).json(menu);
};

export const getMenu = async (req, res) => {
  const id =  parseInt(req.params.id, 10);
  const menu = await prisma.menu.findUnique({
    where: {
      id: id
    }
  });
  res.status(200).json(menu);
};

export const createMenu = async (req, res) => {
  const data = req.body;
  const newMenu = await prisma.menu.create({
    data: data
  });
  res.status(201).json({
    message: "Menu creado con la id: " + newMenu.id,
    data: newMenu
  });
};

export const updateMenu = async (req, res) => {
  const id =  parseInt(req.params.id, 10);
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
};

export const deleteMenu = async (req, res) => {
  const id =  parseInt(req.params.id, 10);
  await prisma.menu.delete({
    where: {
      id: id
    }
  });
  res.status(200).json({
    message: "Menu eliminado con la id: " + id
  });
};