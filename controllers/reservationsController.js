const reservationsServices = require("../services/reservationsServices");

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

exports.getReservationByIdController = async (req, res) => {
    const id = req.params.id;
    const idReservation = req.params.idReservation;

    console.log("controller id :", id);
    console.log("controller idReservation :", idReservation);
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

exports.updateReservationController = async (req, res) => {
    const id = req.params.id;
    const idReservation = req.params.idReservation;
    const { clientName, boatName } = req.body;
    const { startDate, endDate } = req.validatedDates || {};

    try {
        const reservation = await reservationsServices.updateReservation(
            { catwayNumber: id },
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
