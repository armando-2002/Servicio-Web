import prisma from "../db.js";


  export const getAllPedidos= async (req, res) => {
    try {
      const pedidos = await prisma.pedido.findMany({
        include: {
          factura_rel: true,
          menu_rel: true
        }
      });
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ 
        error: "Error al obtener los pedidos",
        details: error.message 
      });
    }
  };

  export const getPedidoById= async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    try {
      const pedido = await prisma.pedido.findUnique({
        where: { id },
        include: {
          factura_rel: true,
          menu_rel: true
        }
      });
      
      if (!pedido) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }
      
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ 
        error: "Error al obtener el pedido",
        details: error.message 
      });
    }
  };

  export const createPedido = async (req, res) => {
  let { id_factura, id_menu } = req.body;

  // Convertir a números
  id_factura = Number(id_factura);
  id_menu = Number(id_menu);

  if (!id_factura || !id_menu) {
    return res.status(400).json({ 
      error: "Todos los campos son obligatorios (id_factura, id_menu)" 
    });
  }

  if (isNaN(id_factura) || isNaN(id_menu)) {
    return res.status(400).json({ 
      error: "Los IDs deben ser números válidos" 
    });
  }

  try {
    // Verificar existencia de factura y menú
    const [facturaExistente, menuExistente] = await Promise.all([
      prisma.factura.findUnique({ where: { id: id_factura } }),
      prisma.menu.findUnique({ where: { id: id_menu } }),
    ]);

    if (!facturaExistente) {
      return res.status(404).json({ error: "Factura no encontrada" });
    }

    if (!menuExistente) {
      return res.status(404).json({ error: "Menú no encontrado" });
    }

    const pedido = await prisma.pedido.create({
      data: { 
        id_factura,
        id_menu 
      },
      include: {
        factura_rel: true,
        menu_rel: true
      }
    });
    
    res.status(201).json(pedido);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        error: "Ya existe un pedido con estos datos" 
      });
    }
    res.status(500).json({ 
      error: "Error al crear el pedido",
      details: error.message 
    });
  }
};

export const updatePedido = async (req, res) => {
  const id = Number(req.params.id);
  let { id_factura, id_menu } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }

  // Solo convertir si existen (para poder actualizar parcialmente)
  if (id_factura !== undefined) id_factura = Number(id_factura);
  if (id_menu !== undefined) id_menu = Number(id_menu);

  if (id_factura === undefined && id_menu === undefined) {
    return res.status(400).json({ 
      error: "Debe proporcionar al menos un campo para actualizar (id_factura o id_menu)" 
    });
  }

  try {
    const pedidoExistente = await prisma.pedido.findUnique({ where: { id } });
    if (!pedidoExistente) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    if (id_factura !== undefined) {
      const facturaExistente = await prisma.factura.findUnique({ where: { id: id_factura } });
      if (!facturaExistente) {
        return res.status(404).json({ error: "Factura no encontrada" });
      }
    }

    if (id_menu !== undefined) {
      const menuExistente = await prisma.menu.findUnique({ where: { id: id_menu } });
      if (!menuExistente) {
        return res.status(404).json({ error: "Menú no encontrado" });
      }
    }

    const pedido = await prisma.pedido.update({
      where: { id },
      data: { 
        id_factura: id_factura !== undefined ? id_factura : pedidoExistente.id_factura,
        id_menu: id_menu !== undefined ? id_menu : pedidoExistente.id_menu
      },
      include: {
        factura_rel: true,
        menu_rel: true
      }
    });
    
    res.json(pedido);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        error: "Ya existe un pedido con estos datos" 
      });
    }
    res.status(500).json({ 
      error: "Error al actualizar el pedido",
      details: error.message 
    });
  }
};


  export const deletePedido= async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    try {
      // Verificar si el pedido existe antes de eliminar
      const pedidoExistente = await prisma.pedido.findUnique({ where: { id } });
      if (!pedidoExistente) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }

      await prisma.pedido.delete({ where: { id } });
      res.json({ message: "Pedido eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ 
        error: "Error al eliminar el pedido",
        details: error.message 
      });
    }
  
};