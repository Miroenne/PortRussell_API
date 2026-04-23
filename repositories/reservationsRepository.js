const Reservation = require('../models/reservation');

const reservationsRepository = {
    create: async (reservation) => {
        console.log("Entrée dans create")
        return await Reservation.create(reservation);
    },
    checkPreviousReservation: async (catwayNumber, startDate, endDate) => {
        console.log("Entrée dans checkPreviousReservation")

        return await Reservation.findOne({
            catwayNumber,
            startDate : {$lt : endDate},
            endDate : {$gt : startDate}
        });
    },
    getAll: async (catwayNumber) => {
        console.log(catwayNumber)
        console.log("Entrée dans getAll")
        return await Reservation.find(catwayNumber);
    }
}

module.exports = reservationsRepository;