import { Router } from "express";
import * as BillCt from "../controllers/factura-ct.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Factura:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_cliente:
 *           type: integer
 *         precio_final:
 *           type: number
 *           format: float
 *         pedidos:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Pedido'
 *       example:
 *         id: 10
 *         id_cliente: 1
 *         precio_final: 25.5
 *         pedidos:
 *           - id_menu: 2
 *           - id_menu: 4
 * 
 *     FacturaInput:
 *       type: object
 *       required:
 *         - id_cliente
 *         - precio_final
 *       properties:
 *         id_cliente:
 *           type: integer
 *         precio_final:
 *           type: number
 *           format: float
 *         pedidos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_menu:
 *                 type: integer
 *       example:
 *         id_cliente: 1
 *         precio_final: 18.75
 *         pedidos:
 *           - id_menu: 3
 *           - id_menu: 5
 * 
 *     Pedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_factura:
 *           type: integer
 *         id_menu:
 *           type: integer
 *       example:
 *         id: 1
 *         id_factura: 10
 *         id_menu: 3
 */

/**
 * @swagger
 * tags:
 *   name: Facturas
 *   description: Operaciones relacionadas con las facturas de los clientes
 */

/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Obtener todas las facturas
 *     tags: [Facturas]
 *     responses:
 *       200:
 *         description: Lista de facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 */
router.get("/", BillCt.getBills);

/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Datos de la factura
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       404:
 *         description: Factura no encontrada
 */
router.get("/:id", BillCt.getBill);

/**
 * @swagger
 * /facturas:
 *   post:
 *     summary: Crear una nueva factura
 *     tags: [Facturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaInput'
 *     responses:
 *       201:
 *         description: Factura creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 */
router.post("/", BillCt.createBill);

/**
 * @swagger
 * /facturas/{id}:
 *   put:
 *     summary: Actualizar una factura por ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaInput'
 *     responses:
 *       200:
 *         description: Factura actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       404:
 *         description: Factura no encontrada
 */
router.put("/:id", BillCt.updateBill);

/**
 * @swagger
 * /facturas/{id}:
 *   delete:
 *     summary: Eliminar una factura por ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       204:
 *         description: Factura eliminada correctamente
 *       404:
 *         description: Factura no encontrada
 */
router.delete("/:id", BillCt.deleteBill);

export default router;
