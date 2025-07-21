import prisma from "../db.js";



  export const getAllReservas= async (req, res) => {
    try {
      const reservas = await prisma.reserva.findMany();
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las reservas", details: error });
    }
  };

  export const getReservaById= async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const reserva = await prisma.reserva.findUnique({
        where: { id }
      });
      
      if (!reserva) {
        return res.status(404).json({ error: "Reserva no encontrada" });
      }
      
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la reserva", details: error });
    }
  };

 export const createReserva= async (req, res) => {
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
  };

  export const updateReserva=async (req, res) => {
    const id = parseInt(req.params.id);
    const { id_cliente, id_mesa, fecha, num_personas, estado } = req.body;
    try {
      const reserva = await prisma.reserva.update({
        where: { id },
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
  };

  export const deleteReserva= async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      await prisma.reserva.delete({ where: { id } });
      res.json({ message: "Reserva eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la reserva" });
    }
  
};