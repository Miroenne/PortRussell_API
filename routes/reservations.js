var express = require('express');
var router = express.Router({mergeParams : true});
const reservationsController = require('../controllers/reservationsController');

router.post('/', reservationsController.createController);

router.get('/', reservationsController.getAllReservationsController);

module.exports = router;