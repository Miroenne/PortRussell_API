var express = require('express');
var router = express.Router();
const catwaysController = require('../controllers/catwaysController');
const reservationsRouter = require('./reservations');
const private = require('../middlewares/private.js');

/**
 * Router handling catway endpoints.
 *
 * @type {import('express').Router}
 */

/**
 * Mount reservation routes under a specific catway.
 *
 * @route USE /catways/:id/reservations
 */
router.use('/:id/reservations', reservationsRouter);

/**
 * Create a catway.
 *
 * @route POST /catways
 */
router.post('/', catwaysController.createController);

/**
 * Retrieve all catways.
 *
 * @route GET /catways
 */
router.get('/', catwaysController.getAllCatwaysController);

/**
 * Retrieve one catway by number.
 *
 * @route GET /catways/:id
 */
router.get('/:id', catwaysController.getCatwayByCatwayNumberController);

/**
 * Update one catway by number.
 *
 * @route PUT /catways/:id
 */
router.put('/:id', catwaysController.updateCatwayController);

/**
 * Delete one catway by number.
 *
 * @route DELETE /catways/:id
 */
router.delete('/:id', catwaysController.deleteCatwayController);

module.exports = router;
