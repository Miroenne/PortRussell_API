const Catway = require('../models/catway');

const catwaysRepository = {
    create: async (catway) => {
        console.log('Entrée dans create')
        return await Catway.create(catway);
    },
    findByCatwayNumber: async (catwayNumber) => {
        console.log('Entrée dans findByCatwayNumber')
        return await Catway.findOne({catwayNumber});
    },
    getAll: async () => {
        return await Catway.find();
    },
    update: async(catway) => {
        console.log('Entrée dans update')
        return await catway.save();
    },
    delete: async(catwayNumber) => {
        return await Catway.deleteOne({catwayNumber : catwayNumber});
    }
}

module.exports = catwaysRepository;