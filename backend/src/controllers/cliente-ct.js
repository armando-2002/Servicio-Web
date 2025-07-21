import  prisma  from "../db.js";

export const getClients = async (req, res) => {
  const clients = await prisma.cliente.findMany();
  res.status(200).json(clients);
};

export const getClient = async (req, res) => {
  const id = parseInt(req.params.id, 10);
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
};

export const createClient = async (req, res) => {
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
};

export const updateClient = async (req, res) => {
  const id =  parseInt(req.params.id, 10);
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
};

export const deleteClient = async (req, res) => {
  const id =  parseInt(req.params.id, 10);
  await prisma.cliente.delete({
    where: {
      id: id
    }
  });
  res.status(200).json({
    message: "Cliente eliminado con la id: " + id
  });
};