const normalizeDate = require("../utils/normalizeDate");

/**
 * Validate reservation start and end dates from the request body.
 * Parsed dates are attached to `req.validatedDates` for downstream handlers.
 *
 * @param {import("express").Request} req - Express request containing date fields.
 * @param {import("express").Response} res - Express response.
 * @param {import("express").NextFunction} next - Express next middleware callback.
 * @returns {void} Calls next middleware when validation succeeds.
 * @throws {Error} Throws when dates are missing, invalid, or inconsistent.
 */
function availablesDates(req, res, next) {
    const datesError = new Error();
    const start = normalizeDate(req.body.startDate);
    const end = normalizeDate(req.body.endDate);

    if (!start || !end) {
        datesError.message = "Dates invalides";
        datesError.code = 400;
        throw datesError;
    }

    if (end.getTime() < start.getTime()) {
        datesError.message =
            "La date de fin doit être équivalente ou postérieure à la date de début";
        datesError.code = 400;
        throw datesError;
    }

    req.validatedDates = { startDate: start, endDate: end };
    next();
}

module.exports = availablesDates;
