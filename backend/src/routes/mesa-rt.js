import { Router } from "express";
import * as MesaCt from "../controllers/mesa-ct.js"
const router = Router();
/**
 * @swagger
 * /api/table:
 *   get:
 *     tags: [Mesas]
 *     summary: Obtener todas las mesas
 *     description: Retorna una lista completa de todas las mesas disponibles
 *     responses:
 *       200:
 *         description: Lista de mesas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mesa'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/table/{id}:
 *   get:
 *     tags: [Mesas]
 *     summary: Obtener mesa por ID
 *     description: Retorna los detalles de una mesa específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico de la mesa
 *     responses:
 *       200:
 *         description: Datos de la mesa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mesa'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Mesa no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/table:
 *   post:
 *     tags: [Mesas]
 *     summary: Crear nueva mesa
 *     description: Registra una nueva mesa en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MesaInput'
 *     responses:
 *       201:
 *         description: Mesa creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mesa'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/table/{id}:
 *   put:
 *     tags: [Mesas]
 *     summary: Actualizar mesa existente
 *     description: Modifica los datos de una mesa específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico de la mesa a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MesaInput'
 *     responses:
 *       200:
 *         description: Mesa actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mesa'
 *       400:
 *         description: Datos inválidos o ID incorrecto
 *       404:
 *         description: Mesa no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/table/{id}:
 *   delete:
 *     tags: [Mesas]
 *     summary: Eliminar mesa
 *     description: Elimina permanentemente una mesa del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico de la mesa a eliminar
 *     responses:
 *       200:
 *         description: Mesa eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mesa eliminada correctamente"
 *       400:
 *         description: ID inválido o mesa con reservas asociadas
 *       404:
 *         description: Mesa no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.get("/",MesaCt.getAllMesas);
router.get("/:id",MesaCt.getMesaById);
router.get("/",MesaCt.createMesa);
router.put("/:id", MesaCt.updateMesa);
router.delete("/:id", MesaCt.deleteMesa);
export default router;
