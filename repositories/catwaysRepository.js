const Catway = require("../models/catway");

/**
 * Data access layer for catway documents.
 */
const catwaysRepository = {
    /**
     * Create a catway document.
     *
     * @async
     * @param {Object} catway - Catway payload.
     * @returns {Promise<Object>} Created catway document.
     */
    create: async (catway) => {
        return await Catway.create(catway);
    },
    /**
     * Find one catway by its number.
     *
     * @async
     * @param {string} catwayNumber - Catway identifier.
     * @returns {Promise<Object|null>} Matching catway document or `null`.
     */
    findByCatwayNumber: async (catwayNumber) => {
        return await Catway.findOne({ catwayNumber });
    },
    /**
     * Retrieve all catway documents.
     *
     * @async
     * @returns {Promise<Object[]>} List of catways.
     */
    getAll: async () => {
        return await Catway.find();
    },
    /**
     * Persist updates for an existing catway document.
     *
     * @async
     * @param {Object} catway - Mongoose catway document to save.
     * @returns {Promise<Object>} Updated catway document.
     */
    update: async (catway) => {
        return await catway.save();
    },
    /**
     * Delete one catway by its number.
     *
     * @async
     * @param {string} catwayNumber - Catway identifier.
     * @returns {Promise<Object>} Mongoose deletion result.
     */
    delete: async (catwayNumber) => {
        return await Catway.deleteOne({ catwayNumber: catwayNumber });
    },
};

module.exports = catwaysRepository;
