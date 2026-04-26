const reservationsRepository = require("../repositories/reservationsRepository");
const buildError = require("../utils/errorFactory");
const checkAvailability = require("../utils/checkReservations");

/**
 * @typedef {Object} CatwayScope
 * @property {string} catwayNumber - Catway identifier used to scope reservation operations.
 */

/**
 * @typedef {Object} ReservationDocument
 * @property {string} catwayNumber - Catway linked to the reservation.
 * @property {string} clientName - Reservation owner's full name.
 * @property {string} boatName - Reserved boat name.
 * @property {Date} startDate - Reservation start date.
 * @property {Date} endDate - Reservation end date.
 */

/**
 * Create a reservation after validating date availability for the targeted catway.
 *
 * @async
 * @param {CatwayScope} catwayNumber - Catway data containing the `catwayNumber` value.
 * @param {string} clientName - Reservation owner's full name.
 * @param {string} boatName - Boat name for the reservation.
 * @param {Date} startDate - Reservation start date.
 * @param {Date} endDate - Reservation end date.
 * @returns {Promise<ReservationDocument>} The created reservation document.
 * @throws {Error} Throws an error when the catway is unavailable or creation fails.
 */
exports.createReservation = async (
    catwayNumber,
    clientName,
    boatName,
    startDate,
    endDate,
) => {
    const newReservation = {
        catwayNumber: catwayNumber.catwayNumber,
        clientName,
        boatName,
        startDate,
        endDate,
    };

    await checkAvailability(catwayNumber, startDate, endDate);

    try {
        return await reservationsRepository.create(newReservation);
    } catch (error) {
        throw buildError("Reservation not created", 500);
    }
};

/**
 * Retrieve every reservation matching the provided catway scope.
 *
 * @async
 * @param {CatwayScope} catwayNumber - Catway filter object.
 * @returns {Promise<ReservationDocument[]>} A list of matching reservations.
 * @throws {Error} Throws an error when no reservation list is available.
 */
exports.getAllReservations = async (catwayNumber) => {
    const reservations = await reservationsRepository.getAll(catwayNumber);

    if (reservations) {
        return reservations;
    } else {
        throw buimdError("No reservations found", 404);
    }
};

/**
 * Retrieve a reservation by id and catway number.
 *
 * @async
 * @param {CatwayScope} catwayNumber - Catway filter object.
 * @param {string|Object} _id - Reservation id or object containing the reservation id.
 * @returns {Promise<ReservationDocument>} The matched reservation.
 * @throws {Error} Throws an error when no reservation is found.
 */
exports.getReservationById = async (catwayNumber, _id) => {
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

/**
 * Update an existing reservation after optional availability validation.
 *
 * @async
 * @param {CatwayScope} catwayNumber - Catway filter object.
 * @param {string|Object} _id - Reservation id or object containing the reservation id.
 * @param {string} clientName - Updated client name.
 * @param {string} boatName - Updated boat name.
 * @param {Date} startDate - Updated start date.
 * @param {Date} endDate - Updated end date.
 * @returns {Promise<ReservationDocument>} The updated reservation document.
 * @throws {Error} Throws an error when reservation lookup or update fails.
 */
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

    if (!actualReservation) {
        throw buildError("Reservation not found", 404);
    }

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

/**
 * Delete an existing reservation by id and catway number.
 *
 * @async
 * @param {string|Object} _id - Reservation id or object containing the reservation id.
 * @param {CatwayScope} catwayNumber - Catway filter object.
 * @returns {Promise<Object>} The deletion result returned by the repository.
 * @throws {Error} Throws an error when the reservation cannot be found.
 */
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
