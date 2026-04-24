const normalizeDate = require("../utils/normalizeDate");

function availablesDates(req, res, next) {
    const datesError = new Error();
    const start = normalizeDate(req.body.startDate);
    const end = normalizeDate(req.body.endDate);
    console.log("Entrée dans availablesDates");

    if (!start || !end) {
        console.log("Entrée dans la vérification des dates");
        datesError.message = "Dates invalides";
        datesError.code = 400;
        throw datesError;
    }

    if (end.getTime() < start.getTime()) {
        console.log("Entrée dans la vérification de la date de fin");
        datesError.message =
            "La date de fin doit être équivalente ou postérieure à la date de début";
        datesError.code = 400;
        throw datesError;
    }

    req.validatedDates = { startDate: start, endDate: end };
    next();
}

module.exports = availablesDates;
