import { Router } from "express";
import * as MenuCt from "../controllers/menu-ct.js"
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         precio:
 *           type: number
 *           format: float
 *         estado:
 *           type: boolean
 *         categoria:
 *           type: string
 *           enum: [Entrada, Principal, Postre, Bebida, Guarnicion, Especialidad]
 *         descripcion:
 *           type: string
 *       example:
 *         id: 1
 *         nombre: "Lomo Saltado"
 *         precio: 8.5
 *         estado: true
 *         categoria: "Principal"
 *         descripcion: "Clásico plato peruano con carne y papas"
 * 
 *     MenuInput:
 *       type: object
 *       required:
 *         - nombre
 *         - precio
 *         - estado
 *         - categoria
 *       properties:
 *         nombre:
 *           type: string
 *         precio:
 *           type: number
 *           format: float
 *         estado:
 *           type: boolean
 *         categoria:
 *           type: string
 *           enum: [Entrada, Principal, Postre, Bebida, Guarnicion, Especialidad]
 *         descripcion:
 *           type: string
 *       example:
 *         nombre: "Tarta de Limón"
 *         precio: 4.0
 *         estado: true
 *         categoria: "Postre"
 *         descripcion: "Refrescante tarta con base de galleta"
 */

/**
 * @swagger
 * tags:
 *   name: Menús
 *   description: Operaciones relacionadas con el menú del restaurante
 */

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Obtener todos los menús
 *     tags: [Menús]
 *     responses:
 *       200:
 *         description: Lista de menús
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */
router.get("/", MenuCt.getMenus);

/**
 * @swagger
 * /menus/{id}:
 *   get:
 *     summary: Obtener un menú por ID
 *     tags: [Menús]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del menú
 *     responses:
 *       200:
 *         description: Menú encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menú no encontrado
 */
router.get("/:id", MenuCt.getMenu);

/**
 * @swagger
 * /menus:
 *   post:
 *     summary: Crear un nuevo menú
 *     tags: [Menús]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuInput'
 *     responses:
 *       201:
 *         description: Menú creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 */
router.post("/", MenuCt.createMenu);

/**
 * @swagger
 * /menus/{id}:
 *   put:
 *     summary: Actualizar un menú por ID
 *     tags: [Menús]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del menú
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuInput'
 *     responses:
 *       200:
 *         description: Menú actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menú no encontrado
 */
router.put("/:id", MenuCt.updateMenu);

/**
 * @swagger
 * /menus/{id}:
 *   delete:
 *     summary: Eliminar un menú por ID
 *     tags: [Menús]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del menú
 *     responses:
 *       204:
 *         description: Menú eliminado correctamente
 *       404:
 *         description: Menú no encontrado
 */
router.delete("/:id", MenuCt.deleteMenu);

export default router;
