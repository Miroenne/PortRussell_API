const catwaysRepository = require("../repositories/catwaysRepository");
const buildError = require("../utils/errorFactory");

/**
 * @typedef {Object} CatwayDocument
 * @property {string} catwayNumber - Unique catway identifier.
 * @property {string} catwayType - Catway type (`long` or `short`).
 * @property {string} catwayState - Current availability/state description.
 */

/**
 * Create a catway after checking that its number is not already used.
 *
 * @async
 * @param {string} catwayNumber - Unique catway number.
 * @param {string} catwayType - Catway type.
 * @param {string} catwayState - Current catway state.
 * @returns {Promise<CatwayDocument>} The created catway document.
 * @throws {Error} Throws when the catway already exists or cannot be created.
 */
exports.createCatway = async (catwayNumber, catwayType, catwayState) => {
    const existingCatway =
        await catwaysRepository.findByCatwayNumber(catwayNumber);

    if (existingCatway) {
        throw buildError(
            "Catway number : " + catwayNumber + " already used",
            409,
        );
    }

    const newCatway = {
        catwayNumber,
        catwayType,
        catwayState,
    };

    try {
        return await catwaysRepository.create(newCatway);
    } catch (error) {
        throw buildError("Catway not created", 500);
    }
};

/**
 * Retrieve every existing catway.
 *
 * @async
 * @returns {Promise<CatwayDocument[]>} A list of catways.
 * @throws {Error} Throws when no catway list can be retrieved.
 */
exports.getAllCatways = async () => {
    const catways = await catwaysRepository.getAll();

    if (catways) {
        return catways;
    } else {
        throw buildError("No catways found", 404);
    }
};

/**
 * Retrieve one catway by its catway number.
 *
 * @async
 * @param {string} catwayNumber - Target catway number.
 * @returns {Promise<CatwayDocument>} The matching catway.
 * @throws {Error} Throws when the catway does not exist.
 */
exports.getCatwayByCatwayNumber = async (catwayNumber) => {
    const catway = await catwaysRepository.findByCatwayNumber(catwayNumber);

    if (catway) {
        return catway;
    } else {
        throw buildError("Catway not found", 404);
    }
};

/**
 * Update only the state of an existing catway.
 *
 * @async
 * @param {string} catwayNumber - Target catway number.
 * @param {string} catwayState - New catway state.
 * @returns {Promise<CatwayDocument>} The updated catway document.
 * @throws {Error} Throws when the catway does not exist.
 */
exports.updateCatway = async (catwayNumber, catwayState) => {
    const updateCatway =
        await catwaysRepository.findByCatwayNumber(catwayNumber);

    if (updateCatway) {
        if (catwayState) {
            updateCatway.catwayState = catwayState;
        } else {
            updateCatway.catwayState = updateCatway.catwayState;
        }
        return await catwaysRepository.update(updateCatway);
    } else {
        throw new buildError("Catway not found", 404);
    }
};

/**
 * Delete a catway by its catway number.
 *
 * @async
 * @param {string} catwayNumber - Target catway number.
 * @returns {Promise<Object>} The deletion result returned by the repository.
 * @throws {Error} Throws when the catway does not exist.
 */
exports.deleteCatway = async (catwayNumber) => {
    const catway = await catwaysRepository.findByCatwayNumber(catwayNumber);

    if (catway) {
        return await catwaysRepository.delete(catwayNumber);
    } else {
        throw buildError("Catway not found", 404);
    }
};
