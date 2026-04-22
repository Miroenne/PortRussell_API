var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const private = require('../middlewares/private.js');



router.post('/login', userController.loginController);

router.post('/', userController.createController);

router.get('/', /*private.verifyToken,*/ userController.getAllUsersController);


module.exports = router;
