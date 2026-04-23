var express = require('express');
var router = express.Router();
const userController = require('../controllers/usersController.js');
const private = require('../middlewares/private.js');


router.post('/login', userController.loginController);

router.post('/logout', private.verifyToken, userController.logoutController);

router.post('/', userController.createController);

router.get('/', private.verifyToken, userController.getAllUsersController);

router.get('/:email', private.verifyToken, userController.getUserByEmailController);

router.put('/:email', private.verifyToken, userController.updateUserController);

router.delete('/:email', private.verifyToken, userController.deleteUserController);

module.exports = router;
