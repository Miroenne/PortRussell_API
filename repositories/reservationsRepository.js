const Reservation = require("../models/reservation");

const reservationsRepository = {
    create: async (reservation) => {
        console.log("Entrée dans create");
        return await Reservation.create(reservation);
    },
    checkPreviousReservation: async (catwayNumber, startDate, endDate) => {
        console.log("Entrée dans checkPreviousReservation");

        return await Reservation.findOne({
            catwayNumber,
            startDate: { $lt: endDate },
            endDate: { $gt: startDate },
        });
    },
    getAll: async (catwayNumber) => {
        console.log(catwayNumber);
        console.log("Entrée dans getAll");
        return await Reservation.find(catwayNumber);
    },
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
    update: async (reservation) => {
        console.log("Entrée dans update");
        return await reservation.save();
    },
    delete: async (reservation) => {
        console.log("Entrée dans delete");
        return await reservation.deleteOne();
    },
};

module.exports = reservationsRepository;
