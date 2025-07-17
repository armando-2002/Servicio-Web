-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('Entrada', 'Principal', 'Postre', 'Bebida', 'Guarnicion', 'Especialidad');

-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('Confirmada', 'Cancelada', 'Completada');

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mesa" (
    "id" SERIAL NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "disponibilidad" BOOLEAN NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Mesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_mesa" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "num_personas" INTEGER NOT NULL,
    "estado" "EstadoReserva" NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Factura" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "precio_final" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Factura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "id_factura" INTEGER NOT NULL,
    "id_menu" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_telefono_key" ON "Cliente"("telefono");

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_mesa_fkey" FOREIGN KEY ("id_mesa") REFERENCES "Mesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Factura" ADD CONSTRAINT "Factura_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_menu_fkey" FOREIGN KEY ("id_menu") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_factura_fkey" FOREIGN KEY ("id_factura") REFERENCES "Factura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
