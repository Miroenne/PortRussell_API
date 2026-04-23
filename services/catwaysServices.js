const catwaysRepository = require ("../repositories/catwaysRepository")


exports.createCatway = async (catwayNumber, catwayType, catwayState) => {

    console.log("Entrée dans createServices")

    const existingCatway = await catwaysRepository.findByCatwayNumber(catwayNumber);

    if(existingCatway){
        console.log("Ce catway existe déjà")
        throw new Error("Ce catway existe déjà")
    }

    const newCatway = {
        catwayNumber,
        catwayType,
        catwayState
    }

    return await catwaysRepository.create(newCatway);

}

exports.getAllCatways = async () => {
    const catways = await catwaysRepository.getAll();

    if(catways){
        return catways;
    }else{
        throw new Error("Aucun catway trouvé")
    }
}

exports.getCatwayByCatwayNumber = async (catwayNumber) => {
    const catway = await catwaysRepository.findByCatwayNumber(catwayNumber);

    if(catway){
        return catway;
    }else{
        throw new Error("Ce catway n'existe pas")
    }

}

exports.updateCatway = async (catwayNumber, catwayState) => {
    console.log("Entrée dans updateServices")

    const updateCatway = await catwaysRepository.findByCatwayNumber(catwayNumber);

    console.log(updateCatway)

    if(updateCatway){
        updateCatway.catwayState = catwayState;
        return await catwaysRepository.update(updateCatway);
    }else{
        throw new Error("Ce catway n'existe pas")
    }

}

exports.deleteCatway = async (catwayNumber) => {
    const catway = await catwaysRepository.findByCatwayNumber(catwayNumber);

    if(catway){
        return await catwaysRepository.delete(catwayNumber);
    }else{
        throw new Error("Ce catway n'existe pas")    }
}