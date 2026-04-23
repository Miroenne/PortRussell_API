const reservationsServices = require('../services/reservationsServices');

exports.createController = async (req, res) => {
    const {catwayNumber, clientName, boatName, startDate, endDate} = req.body;
    
    try{
        const reservation = await reservationsServices.createReservation(catwayNumber, clientName, boatName, startDate, endDate);
        res.status(201).json(reservation);
    }catch(error){
        res.status(400).json({
            message         : "Erreur lors de la création de la réservation",            
            code            : error.code,
            errorMessage    : error.message,            
        });
    }
}

exports.getAllReservationsController = async (req, res) => {

    const id = req.params.id;
    console.log(req.params)

    try{
        const reservations = await reservationsServices.getAllReservations({catwayNumber : id});
        res.status(200).json(reservations);
    }catch(error){
        res.status(400).json({
            message         : "Erreur lors de la récupération des réservations",            
            code            : error.code,
            errorMessage    : error.message,            
        });
    }
}