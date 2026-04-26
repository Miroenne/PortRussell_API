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
