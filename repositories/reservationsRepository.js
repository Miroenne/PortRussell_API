const Reservation = require("../models/reservation");

/**
 * Data access layer for reservation documents.
 */
const reservationsRepository = {
    /**
     * Create a reservation document.
     *
     * @async
     * @param {Object} reservation - Reservation payload.
     * @returns {Promise<Object>} Created reservation document.
     */
    create: async (reservation) => {
        console.log("Entrée dans create");
        return await Reservation.create(reservation);
    },
    /**
     * Check if an overlapping reservation already exists on the same catway.
     *
     * @async
     * @param {string} catwayNumber - Catway identifier.
     * @param {Date} startDate - Requested start date.
     * @param {Date} endDate - Requested end date.
     * @returns {Promise<Object|null>} Overlapping reservation or `null`.
     */
    checkPreviousReservation: async (catwayNumber, startDate, endDate) => {
        console.log("Entrée dans checkPreviousReservation");

        return await Reservation.findOne({
            catwayNumber,
            startDate: { $lt: endDate },
            endDate: { $gt: startDate },
        });
    },
    /**
     * Retrieve reservations matching the provided filter.
     *
     * @async
     * @param {Object} catwayNumber - Query filter containing catway data.
     * @returns {Promise<Object[]>} List of reservations.
     */
    getAll: async (catwayNumber) => {
        console.log(catwayNumber);
        console.log("Entrée dans getAll");
        return await Reservation.find(catwayNumber);
    },
    /**
     * Retrieve one reservation by id and catway number.
     *
     * @async
     * @param {string|Object} _id - Reservation identifier.
     * @param {string} reservedCatwayNumber - Catway identifier.
     * @returns {Promise<Object|null>} Matching reservation document or `null`.
     */
    getReservation: async (_id, reservedCatwayNumber) => {
        console.log("repo _id : ", _id);
        console.log("repo reservedCatwayNumber : ", reservedCatwayNumber);
        const catwayNumber = reservedCatwayNumber;

        console.log(typeof catwayNumber);

        return await Reservation.findOne({
            _id,
            catwayNumber,
        });
    },
    /**
     * Persist updates for an existing reservation document.
     *
     * @async
     * @param {Object} reservation - Mongoose reservation document to save.
     * @returns {Promise<Object>} Updated reservation document.
     */
    update: async (reservation) => {
        console.log("Entrée dans update");
        return await reservation.save();
    },
    /**
     * Delete one reservation document.
     *
     * @async
     * @param {Object} reservation - Mongoose reservation document to delete.
     * @returns {Promise<Object>} Mongoose deletion result.
     */
    delete: async (reservation) => {
        console.log("Entrée dans delete");
        return await reservation.deleteOne();
    },
};

module.exports = reservationsRepository;
