var express = require('express');
var router = express.Router();
const catwaysController = require('../controllers/catwaysController');
const private = require('../middlewares/private.js');


router.post('/', catwaysController.createController);

router.get('/', catwaysController.getAllCatwaysController);

router.get('/:id', catwaysController.getCatwayByCatwayNumberController);

router.put('/:id', catwaysController.updateCatwayController);

router.delete('/:id', catwaysController.deleteCatwayController);

module.exports = router;