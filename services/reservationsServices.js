const reservationsRepository = require("../repositories/reservationsRepository");
const buildError = require("../utils/errorFactory");
const checkAvailability = require("../utils/checkReservations");

exports.createReservation = async (
    catwayNumber,
    clientName,
    boatName,
    startDate,
    endDate,
) => {
    console.log(startDate instanceof Date);
    console.log(typeof endDate);

    const newReservation = {
        catwayNumber: catwayNumber.catwayNumber,
        clientName,
        boatName,
        startDate,
        endDate,
    };

    await checkAvailability(catwayNumber, startDate, endDate);

    try {
        const createdReservation =
            await reservationsRepository.create(newReservation);
        return createdReservation;
    } catch (error) {
        throw buildError("Reservation not created", 500);
    }
};

exports.getAllReservations = async (catwayNumber) => {
    const reservations = await reservationsRepository.getAll(catwayNumber);
    console.log(reservations);

    if (reservations) {
        return reservations;
    } else {
        throw buimdError("No reservations found", 404);
    }
};

exports.getReservationById = async (catwayNumber, _id) => {
    console.log("services _id : ", _id);
    console.log("services catwayNumber : ", catwayNumber);
    const _idReservation = _id._idReservation;
    const reservedCatwayNumber = catwayNumber.catwayNumber;

    const reservation = reservationsRepository.getReservation(
        _id,
        reservedCatwayNumber,
    );

    if (reservation) {
        return reservation;
    } else {
        throw buildError("No reservation found", 404);
    }
};

exports.updateReservation = async (
    catwayNumber,
    _id,
    clientName,
    boatName,
    startDate,
    endDate,
) => {
    const reservedCatwayNumber = catwayNumber.catwayNumber;

    const actualReservation = await reservationsRepository.getReservation(
        _id,
        reservedCatwayNumber,
    );

    console.log(actualReservation);

    if (!actualReservation) {
        throw buildError("Reservation not found", 404);
    }

    console.log(actualReservation.startDate);
    console.log(startDate);
    console.log(actualReservation.endDate);
    console.log(endDate);

    if (
        actualReservation.startDate.getTime() !== startDate.getTime() ||
        actualReservation.endDate.getTime() !== endDate.getTime()
    ) {
        await checkAvailability(
            { catwayNumber: reservedCatwayNumber },
            startDate,
            endDate,
        );
    }

    actualReservation.clientName = clientName || actualReservation.clientName;
    actualReservation.boatName = boatName || actualReservation.boatName;
    actualReservation.startDate = startDate || actualReservation.startDate;
    actualReservation.endDate = endDate || actualReservation.endDate;

    try {
        return await reservationsRepository.update(actualReservation);
    } catch (error) {
        throw buildError("Reservation not updated", 500);
    }
};

exports.deleteReservation = async (_id, catwayNumber) => {
    const reservedCatwayNumber = catwayNumber.catwayNumber;

    const actualReservation = await reservationsRepository.getReservation(
        _id,
        reservedCatwayNumber,
    );

    if (!actualReservation) {
        throw buildError("Reservation not found", 404);
    }

    return await reservationsRepository.delete(actualReservation);
};
