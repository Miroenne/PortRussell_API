const reservationsRepository = require('../repositories/reservationsRepository');
const normalizeDate = require('../middlewares/normalizeDate');

const createReservationError = new Error();

exports.createReservation = async (catwayNumber, clientName, boatName, startDate, endDate) => {

    

    const newStartDate = normalizeDate(startDate);
    const newEndDate = normalizeDate(endDate);    

    console.log(newStartDate instanceof Date)
    console.log(newEndDate instanceof Date)
    console.log(typeof newStartDate)
    console.log(typeof newEndDate)


    if(!newStartDate || !newEndDate){
        console.log("Entrée dans la vérification des dates")
        createReservationError.message = "Dates invalides";
        createReservationError.code = 400;
        throw createReservationError;
    }

    if(newEndDate.getTime() < newStartDate.getTime()){
        console.log("Entrée dans la vérification de la date de fin")
        createReservationError.message = "La date de fin doit être équivalente ou postérieure à la date de début";
        createReservationError.code = 400;
        throw createReservationError;
    }

    try{
        const previousReservation = await reservationsRepository.checkPreviousReservation(catwayNumber, newStartDate, newEndDate);
        console.log("Réservation précédente : ", previousReservation)
        if(previousReservation){
            console.log("previousReservation est présent")
            createReservationError.message = "Le catway est déjà réservé pour cette période";
            createReservationError.code = 409;
            throw createReservationError;        
        }
    }catch(error){
        console.log("Erreur lors de la vérification de la réservation précédente")
        createReservationError.message = error.message;
        createReservationError.code = error.code;
        throw createReservationError;
    }

    console.log(startDate instanceof Date)
    console.log(typeof endDate)

    const newReservation = {
        catwayNumber,
        clientName,
        boatName,
        startDate ,
        endDate 
    }

    try{
        const createdReservation = await reservationsRepository.create(newReservation);
        return createdReservation;
    }catch(error){
        createReservationError.message = "Reservation not created";
        createReservationError.code = 500;
        throw createReservationError;
    }
    
}

exports.getAllReservations = async (catwayNumber) => {

    
    console.log(catwayNumber)


    const reservations = await reservationsRepository.getAll(catwayNumber);
    console.log(reservations)

    if(reservations){
        return reservations;
    }else{
        createReservationError.message = "No reservations found";
        createReservationError.code = 404;
        throw createReservationError;
    }
    
}