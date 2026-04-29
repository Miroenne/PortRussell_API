const reservationsServices = require("../services/reservationsServices");

/**
 * Create a reservation for a given catway.
 *
 * @async
 * @param {import("express").Request} req - Express request containing route params, payload, and validated dates.
 * @param {import("express").Response} res - Express response used to return the created reservation.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.createController = async (req, res) => {
    const { clientName, boatName } = req.body;
    const id = req.params.id;
    const { startDate, endDate } = req.validatedDates || {};

    try {
        const reservation = await reservationsServices.createReservation(
            { catwayNumber: id },
            clientName,
            boatName,
            startDate,
            endDate,
        );
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la création de la réservation",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Retrieve all reservations for a given catway.
 *
 * @async
 * @param {import("express").Request} req - Express request containing the catway id.
 * @param {import("express").Response} res - Express response used to return reservations.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.getAllReservationsController = async (req, res) => {
    const id = req.params.id;

    try {
        const reservations = await reservationsServices.getAllReservations({
            catwayNumber: id,
        });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la récupération des réservations",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Retrieve one reservation by reservation id and catway id.
 *
 * @async
 * @param {import("express").Request} req - Express request containing route parameters.
 * @param {import("express").Response} res - Express response used to return the reservation.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.getReservationByIdController = async (req, res) => {
    const id = req.params.id;
    const idReservation = req.params.idReservation;

    try {
        const reservation = await reservationsServices.getReservationById(
            { catwayNumber: id },
            { _id: idReservation },
        );
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la récupération des réservations",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Update one reservation by reservation id and catway id.
 *
 * @async
 * @param {import("express").Request} req - Express request containing route params, payload, and validated dates.
 * @param {import("express").Response} res - Express response used to return updated reservation.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.updateReservationController = async (req, res) => {
    const id = req.params.id;
    const idReservation = req.params.idReservation;

    const catwayNumber = req.body;
    const { clientName, boatName } = req.body;
    const { startDate, endDate } = req.validatedDates || {};

    try {
        const reservation = await reservationsServices.updateReservation(
            { reservedCatwayNumber: id },
            { catwayNumber: catwayNumber.catwayNumber },
            idReservation,
            clientName,
            boatName,
            startDate,
            endDate,
        );
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la mise à jour de la réservation",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Delete one reservation by reservation id and catway id.
 *
 * @async
 * @param {import("express").Request} req - Express request containing route parameters.
 * @param {import("express").Response} res - Express response used to return deletion result.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.deleteReservationController = async (req, res) => {
    const id = req.params.id;
    const idReservation = req.params.idReservation;

    try {
        const reservation = await reservationsServices.deleteReservation(
            idReservation,
            { catwayNumber: id },
        );
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la suppression de la réservation",
            code: error.code,
            errorMessage: error.message,
        });
    }
};
