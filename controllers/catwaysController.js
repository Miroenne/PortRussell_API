const catwaysServices = require("../services/catwaysServices");

/**
 * Create a new catway.
 *
 * @async
 * @param {import('express').Request} req - Express request containing catway payload.
 * @param {import('express').Response} res - Express response used to return the created catway.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.createController = async (req, res) => {
    const { catwayNumber, catwayType, catwayState } = req.body;

    try {
        const catway = await catwaysServices.createCatway(
            catwayNumber,
            catwayType,
            catwayState,
        );
        res.status(201).json(catway);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la modification de l'utilisateur",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Retrieve all catways.
 *
 * @async
 * @param {import('express').Request} req - Express request.
 * @param {import('express').Response} res - Express response used to return catways.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.getAllCatwaysController = async (req, res) => {
    try {
        const catways = await catwaysServices.getAllCatways();
        res.status(200).json(catways);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la modification de l'utilisateur",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Retrieve one catway by its catway number.
 *
 * @async
 * @param {import('express').Request} req - Express request containing `id` route param.
 * @param {import('express').Response} res - Express response used to return the catway.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.getCatwayByCatwayNumberController = async (req, res) => {
    const { id } = req.params;
    const catwayNumber = id;
    try {
        const catway =
            await catwaysServices.getCatwayByCatwayNumber(catwayNumber);
        res.status(200).json(catway);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la modification de l'utilisateur",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Update a catway state by its catway number.
 *
 * @async
 * @param {import('express').Request} req - Express request with `id` param and update payload.
 * @param {import('express').Response} res - Express response used to return updated catway.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.updateCatwayController = async (req, res) => {
    const { id } = req.params;
    const catwayNumber = id;
    const { catwayState } = req.body;

    try {
        const catway = await catwaysServices.updateCatway(
            catwayNumber,
            catwayState,
        );
        res.status(200).json(catway);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la modification de l'utilisateur",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Delete a catway by its catway number.
 *
 * @async
 * @param {import('express').Request} req - Express request containing `id` route param.
 * @param {import('express').Response} res - Express response used to return deletion result.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.deleteCatwayController = async (req, res) => {
    const { id } = req.params;
    const catwayNumber = id;
    try {
        const catway = await catwaysServices.deleteCatway(catwayNumber);
        res.status(200).json(catway);
    } catch (error) {
        res.status(404).json(error.message);
    }
};
