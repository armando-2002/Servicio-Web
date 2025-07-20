import  prisma  from "../db.js";

export const getBills = async (req, res) => {
  const bills = await prisma.factura.findMany();
  res.status(200).json(bills);
};

export const getBill = async (req, res) => {
  const id = req.params.id;
  const bill = await prisma.factura.findUnique({
    where: {
      id: id
    },
    include: {
      pedidos: true
    }
  });
  res.status(200).json(bill);
};

export const createBill = async (req, res) => {
  const data = req.body;
  const newBill = await prisma.factura.create({
    data: data,
    include: {
      pedidos: true
    }
  });
  res.status(201).json({
    message: "Factura creada con la id: " + newBill.id,
    data: newBill
  });
};

export const updateBill = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updBill = await prisma.factura.update({
    where: {
      id: id
    },
    data: data,
    include: {
      pedidos
    }
  });
  res.status(200).json({
    message: "Factura actualizada con la id: " + id,
    data: updBill
  });
};

export const deleteBill = async (req, res) => {
  const id = req.params.id;
  await prisma.factura.delete({
    where: {
      id: id
    }
  });
  res.status(200).json({
    message: "Factura eliminada con la id: " + id
  });
};