const buildError = require("../utils/errorFactory");
const reservationsRepository = require("../repositories/reservationsRepository");

/**
 * Ensure the requested reservation period is available for a catway.
 *
 * @async
 * @param {{catwayNumber: string}} catwayNumber - Catway scope object.
 * @param {Date} startDate - Requested reservation start date.
 * @param {Date} endDate - Requested reservation end date.
 * @returns {Promise<void>} Resolves when no overlap exists.
 * @throws {Error} Throws when an overlapping reservation is found or lookup fails.
 */
async function checkAvailability(catwayNumber, startDate, endDate) {
    try {
        const previousReservation =
            await reservationsRepository.checkPreviousReservation(
                catwayNumber.catwayNumber,
                startDate,
                endDate,
            );
        if (previousReservation) {
            throw buildError(
                "Le catway est déjà réservé pour cette période",
                409,
            );
        }
    } catch (error) {
        console.log(
            "Erreur lors de la vérification des réservation existantes",
        );
        throw buildError(error.message, error.code);
    }
}

module.exports = checkAvailability;
