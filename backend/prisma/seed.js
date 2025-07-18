import prisma from "../src/db.js";

async function main() {
  console.log("🌱 Iniciando inserción de datos de prueba...");

  // MENÚS
  const menus = await prisma.menu.createMany({
    data: [
      { nombre: "Ensalada César", precio: 5.5, estado: true, categoria: "Entrada", descripcion: "Clásica ensalada con aderezo César" },
      { nombre: "Lomo Saltado", precio: 8.0, estado: true, categoria: "Principal", descripcion: "Salteado peruano de carne y verduras" },
      { nombre: "Tarta de Chocolate", precio: 4.2, estado: true, categoria: "Postre", descripcion: "Tarta con cobertura de chocolate oscuro" },
      { nombre: "Jugo de Naranja", precio: 2.0, estado: true, categoria: "Bebida", descripcion: "Jugo natural recién exprimido" },
      { nombre: "Papas Fritas", precio: 3.0, estado: true, categoria: "Guarnicion", descripcion: "Corte tradicional, crujientes" },
      { nombre: "Parrillada Mixta", precio: 12.5, estado: true, categoria: "Especialidad", descripcion: "Variedad de carnes a la parrilla" },
    ],
  });

  // CLIENTES
  const cliente1 = await prisma.cliente.create({
    data: {
      id: 1,
      nombre: "Ana Torres",
      telefono: "0987654321"
    }
  });

  const cliente2 = await prisma.cliente.create({
    data: {
      id: 2,
      nombre: "Carlos Pérez",
      telefono: "0991234567"
    }
  });

  // MESAS
  const mesa1 = await prisma.mesa.create({
    data: {
      capacidad: 4,
      disponibilidad: true,
      descripcion: "Cerca de la ventana"
    }
  });

  const mesa2 = await prisma.mesa.create({
    data: {
      capacidad: 2,
      disponibilidad: false,
      descripcion: "En la esquina"
    }
  });

  // RESERVAS
  const reserva1 = await prisma.reserva.create({
    data: {
      id_cliente: cliente1.id,
      id_mesa: mesa1.id,
      fecha: new Date('2025-07-18T19:30:00Z'),
      num_personas: 3,
      estado: "Confirmada"
    }
  });

  const reserva2 = await prisma.reserva.create({
    data: {
      id_cliente: cliente2.id,
      id_mesa: mesa2.id,
      fecha: new Date('2025-07-19T13:00:00Z'),
      num_personas: 2,
      estado: "Completada"
    }
  });

  // FACTURAS Y PEDIDOS
  const factura1 = await prisma.factura.create({
    data: {
      id_cliente: cliente1.id,
      precio_final: 20.5,
      pedidos: {
        create: [
          { id_menu: 1 }, // Ensalada César
          { id_menu: 2 }, // Lomo Saltado
        ]
      }
    }
  });

  const factura2 = await prisma.factura.create({
    data: {
      id_cliente: cliente2.id,
      precio_final: 10.0,
      pedidos: {
        create: [
          { id_menu: 4 }, // Jugo de Naranja
          { id_menu: 3 }, // Tarta de Chocolate
        ]
      }
    }
  });

  console.log("✅ Datos insertados con éxito.");
}

main()
  .catch((e) => {
    console.error("❌ Error en el seeding:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
