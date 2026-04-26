const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema describing a reservation document.
 */
const Reservation = new Schema({
    catwayNumber:{
        type: String,
        required: [true, 'Le numéro du catway est requis']
    },
    clientName:{
        type: String,
        trim : true,
        required: [true, 'Le nom du client est requis']
    },
    boatName:{
        type: String,
        trim : true,
        required: [true, 'Le nom du bateau est requis']
    },
    startDate: {
        type: Date,
        required: [true, 'La date de début de la réservation est requise']
    },
    endDate: {
        type: Date,
        required: [true, 'La date de fin de la réservation est requise']
    }
}, {
    /**
     * Automatically maintain `createdAt` and `updatedAt` timestamps.
     */
    timestamps: true
});

module.exports = mongoose.model('Reservation', Reservation);
