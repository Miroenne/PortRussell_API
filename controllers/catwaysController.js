const catwaysServices = require('../services/catwaysServices');

exports.createController = async (req, res) => {
    const {catwayNumber, catwayType, catwayState} = req.body;
    console.log("Entrée dans createController")
    try{        
        const catway = await catwaysServices.createCatway(catwayNumber, catwayType, catwayState);
        res.status(201).json(catway);
    }catch(error){
        res.status(404).json(error.message);
    }
}

exports.getAllCatwaysController = async (req, res) => {
    try{
        const catways = await catwaysServices.getAllCatways();
        res.status(200).json(catways);
    }catch(error){
        res.status(404).json(error.message);

    }

}

exports.getCatwayByCatwayNumberController = async (req, res) => {
    
    const {id} = req.params;    
    const catwayNumber = id;
    try{
        const catway = await catwaysServices.getCatwayByCatwayNumber(catwayNumber);
        res.status(200).json(catway);
    }catch(error){
        res.status(404).json(error.message);
    }
}

exports.updateCatwayController = async (req, res) => {
    const {id} = req.params;
    const catwayNumber = id;
    const {catwayState} = req.body;
   
    try{
        const catway = await catwaysServices.updateCatway(catwayNumber, catwayState);
        res.status(200).json(catway);
    }catch(error){
        res.status(404).json(error.message);
    }

}

exports.deleteCatwayController = async (req, res) => {
    const {id} = req.params;
    const catwayNumber = id;
    try{
        const catway = await catwaysServices.deleteCatway(catwayNumber);
        res.status(200).json(catway);
    }catch(error){
        res.status(404).json(error.message);
    }
}