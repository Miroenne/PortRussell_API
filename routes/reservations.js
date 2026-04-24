var express = require("express");
var router = express.Router({ mergeParams: true });
const reservationsController = require("../controllers/reservationsController");
const availablesDates = require("../middlewares/availablesDates");

router.post("/", availablesDates, reservationsController.createController);

router.get("/", reservationsController.getAllReservationsController);

router.get(
    "/:idReservation",
    reservationsController.getReservationByIdController,
);

router.put(
    "/:idReservation",
    availablesDates,
    reservationsController.updateReservationController,
);

router.delete(
    "/:idReservation",
    reservationsController.deleteReservationController,
);

module.exports = router;
