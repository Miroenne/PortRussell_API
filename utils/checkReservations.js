const buildError = require("../utils/errorFactory");
const reservationsRepository = require("../repositories/reservationsRepository");

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
