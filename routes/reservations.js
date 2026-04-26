/**
 * @swagger
 * tags:
 *   - name: Reservations
 *     description: Catway reservation management
 *
 * /catways/{id}/reservations:
 *   get:
 *     tags: [Reservations]
 *     summary: Get all reservations for a catway
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservations list
 *   post:
 *     tags: [Reservations]
 *     summary: Create a reservation for a catway
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Reservation created
 *
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     tags: [Reservations]
 *     summary: Get one reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation found
 *   put:
 *     tags: [Reservations]
 *     summary: Update one reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation updated
 *   delete:
 *     tags: [Reservations]
 *     summary: Delete one reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation deleted
 */

var express = require("express");
var router = express.Router({ mergeParams: true });
const reservationsController = require("../controllers/reservationsController");
const availablesDates = require("../middlewares/availablesDates");

/**
 * Router handling reservation endpoints nested under a catway resource.
 *
 * @type {import("express").Router}
 */

/**
 * Create a reservation for the current catway.
 *
 * @route POST /catways/:id/reservations
 */
router.post("/", availablesDates, reservationsController.createController);

/**
 * Retrieve all reservations for the current catway.
 *
 * @route GET /catways/:id/reservations
 */
router.get("/", reservationsController.getAllReservationsController);

/**
 * Retrieve one reservation by id for the current catway.
 *
 * @route GET /catways/:id/reservations/:idReservation
 */
router.get(
    "/:idReservation",
    reservationsController.getReservationByIdController,
);

/**
 * Update one reservation by id for the current catway.
 *
 * @route PUT /catways/:id/reservations/:idReservation
 */
router.put(
    "/:idReservation",
    availablesDates,
    reservationsController.updateReservationController,
);

/**
 * Delete one reservation by id for the current catway.
 *
 * @route DELETE /catways/:id/reservations/:idReservation
 */
router.delete(
    "/:idReservation",
    reservationsController.deleteReservationController,
);

module.exports = router;
