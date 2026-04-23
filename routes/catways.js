var express = require('express');
var router = express.Router();
const catwaysController = require('../controllers/catwaysController');
const reservationsRouter = require('./reservations');
const private = require('../middlewares/private.js');


router.use('/:id/reservations', reservationsRouter);

router.post('/', catwaysController.createController);

router.get('/', catwaysController.getAllCatwaysController);

router.get('/:id', catwaysController.getCatwayByCatwayNumberController);

router.put('/:id', catwaysController.updateCatwayController);

router.delete('/:id', catwaysController.deleteCatwayController);

module.exports = router;