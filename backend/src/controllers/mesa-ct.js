import prisma from "../db.js";




  export const getAllMesas= async (req, res) => {
    try {
      const mesas = await prisma.mesa.findMany();
      res.json(mesas);
    } catch (error) {
      res.status(500).json({ 
        error: "Error al obtener las mesas",
        details: error.message 
      });
    }
  };

  
  export const getMesaById= async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    try {
      const mesa = await prisma.mesa.findUnique({
        where: { id }
      });
      
      if (!mesa) {
        return res.status(404).json({ error: "Mesa no encontrada" });
      }
      
      res.json(mesa);
    } catch (error) {
      res.status(500).json({ 
        error: "Error al obtener la mesa",
        details: error.message 
      });
    }
  };

  
  export const createMesa= async (req, res) => {
    const { capacidad, disponibilidad, descripcion } = req.body;

    // Validaciones básicas
    if (typeof capacidad !== 'number' || capacidad <= 0) {
      return res.status(400).json({ 
        error: "La capacidad debe ser un número positivo mayor que cero" 
      });
    }

    if (typeof disponibilidad !== 'boolean') {
      return res.status(400).json({ 
        error: "La disponibilidad debe ser un valor booleano (true/false)" 
      });
    }

    if (descripcion && descripcion.length > 200) {
      return res.status(400).json({ 
        error: "La descripción no puede exceder los 200 caracteres" 
      });
    }

    try {
      const mesa = await prisma.mesa.create({
        data: {
          capacidad,
          disponibilidad,
          descripcion: descripcion || null, // Guarda null si no se proporciona
        },
      });
      res.status(201).json(mesa);
    } catch (error) {
      res.status(500).json({ 
        error: "Error al crear la mesa",
        details: error.message 
      });
    }
  };

  
  export const updateMesa= async (req, res) => {
    const id = parseInt(req.params.id);
    const { capacidad, disponibilidad, descripcion } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    // Validaciones de campos
    if (capacidad && (typeof capacidad !== 'number' || capacidad <= 0)) {
      return res.status(400).json({ 
        error: "La capacidad debe ser un número positivo mayor que cero" 
      });
    }

    if (disponibilidad && typeof disponibilidad !== 'boolean') {
      return res.status(400).json({ 
        error: "La disponibilidad debe ser un valor booleano (true/false)" 
      });
    }

    if (descripcion && descripcion.length > 200) {
      return res.status(400).json({ 
        error: "La descripción no puede exceder los 200 caracteres" 
      });
    }

    try {
      // Verificar si la mesa existe
      const mesaExistente = await prisma.mesa.findUnique({ where: { id } });
      if (!mesaExistente) {
        return res.status(404).json({ error: "Mesa no encontrada" });
      }

      const mesa = await prisma.mesa.update({
        where: { id },
        data: { 
          capacidad: capacidad || mesaExistente.capacidad,
          disponibilidad: disponibilidad !== undefined ? disponibilidad : mesaExistente.disponibilidad,
          descripcion: descripcion !== undefined ? descripcion : mesaExistente.descripcion,
        },
      });
      res.json(mesa);
    } catch (error) {
      res.status(500).json({ 
        error: "Error al actualizar la mesa",
        details: error.message 
      });
    }
  };
  
  export const deleteMesa= async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    try {
      // Verificar si la mesa existe antes de eliminar
      const mesaExistente = await prisma.mesa.findUnique({ where: { id } });
      if (!mesaExistente) {
        return res.status(404).json({ error: "Mesa no encontrada" });
      }

      await prisma.mesa.delete({ where: { id } });
      res.json({ message: "Mesa eliminada correctamente" });
    } catch (error) {
      // Manejar error de restricción de clave foránea
      if (error.code === 'P2003') {
        return res.status(400).json({ 
          error: "No se puede eliminar la mesa porque tiene reservas asociadas" 
        });
      }
      res.status(500).json({ 
        error: "Error al eliminar la mesa",
        details: error.message 
      });
    }
  };

