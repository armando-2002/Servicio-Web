import { Router } from "express";
import * as ReservaCt from "../controllers/reserva-ct.js"
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Hotel reservation management
 */

/**
 * @swagger
 * /api/booking:
 *   get:
 *     tags: [Reservations]
 *     summary: Get all reservations
 *     description: Retrieve a list of all reservations in the system
 *     responses:
 *       200:
 *         description: A list of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/booking/{id}:
 *   get:
 *     tags: [Reservations]
 *     summary: Get a reservation by ID
 *     description: Retrieve detailed information about a specific reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the reservation
 *     responses:
 *       200:
 *         description: Reservation details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/booking:
 *   post:
 *     tags: [Reservations]
 *     summary: Create a new reservation
 *     description: Register a new reservation in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationInput'
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Conflict (e.g., room already booked)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/booking/{id}:
 *   put:
 *     tags: [Reservations]
 *     summary: Update a reservation
 *     description: Modify details of an existing reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the reservation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationInput'
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/booking/{id}:
 *   delete:
 *     tags: [Reservations]
 *     summary: Delete a reservation
 *     description: Remove a reservation from the system
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the reservation to delete
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reservation deleted successfully"
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Internal server error
 */
router.get("/", ReservaCt.getAllReservas);
router.get("/:id", ReservaCt.getReservaById);
router.post("/", ReservaCt.createReserva);
router.put("/:id", ReservaCt.updateReserva);
router.delete("/:id", ReservaCt.deleteReserva);

export default router;