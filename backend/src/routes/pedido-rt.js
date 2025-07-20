import { Router } from "express";
import * as PedidoCt from "../controllers/pedido-ct.js"
const router = Router();
/**
 * @swagger
 * /api/order:
 *   get:
 *     tags: [Pedidos]
 *     summary: Obtener todos los pedidos
 *     description: Retorna una lista completa de todos los pedidos del sistema
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PedidoCompleto'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     tags: [Pedidos]
 *     summary: Obtener pedido por ID
 *     description: Retorna los detalles completos de un pedido específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico del pedido
 *     responses:
 *       200:
 *         description: Datos del pedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PedidoCompleto'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/order:
 *   post:
 *     tags: [Pedidos]
 *     summary: Crear nuevo pedido
 *     description: Registra un nuevo pedido en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoInput'
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PedidoCompleto'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Factura o Menú no encontrados
 *       409:
 *         description: Conflicto (pedido duplicado)
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/order/{id}:
 *   put:
 *     tags: [Pedidos]
 *     summary: Actualizar pedido existente
 *     description: Modifica los datos de un pedido específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico del pedido a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoInput'
 *     responses:
 *       200:
 *         description: Pedido actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PedidoCompleto'
 *       400:
 *         description: Datos inválidos o ID incorrecto
 *       404:
 *         description: Pedido, Factura o Menú no encontrados
 *       409:
 *         description: Conflicto (pedido duplicado)
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     tags: [Pedidos]
 *     summary: Eliminar pedido
 *     description: Elimina permanentemente un pedido del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico del pedido a eliminar
 *     responses:
 *       200:
 *         description: Pedido eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pedido eliminado correctamente"
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.get("/", PedidoCt.getAllPedidos);
router.get("/:id", PedidoCt.getPedidoById);
router.post("/", PedidoCt.createPedido);
router.put("/:id", PedidoCt.updatePedido);
router.delete("/:id", PedidoCt.deletePedido);

export default router;