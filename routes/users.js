var express = require('express');
var router = express.Router();
const userController = require('../controllers/usersController.js');
const private = require('../middlewares/private.js');

/**
 * Router handling user and authentication endpoints.
 *
 * @type {import('express').Router}
 */

/**
 * Authenticate a user and issue a session token.
 *
 * @route POST /users/login
 */
router.post('/login', userController.loginController);

/**
 * Log out the authenticated user.
 *
 * @route POST /users/logout
 */
router.post('/logout', private.verifyToken, userController.logoutController);

/**
 * Create a user account.
 *
 * @route POST /users
 */
router.post('/', userController.createController);

/**
 * Retrieve all users.
 *
 * @route GET /users
 */
router.get('/', private.verifyToken, userController.getAllUsersController);

/**
 * Retrieve one user by email.
 *
 * @route GET /users/:email
 */
router.get('/:email', private.verifyToken, userController.getUserByEmailController);

/**
 * Update one user by email.
 *
 * @route PUT /users/:email
 */
router.put('/:email', private.verifyToken, userController.updateUserController);

/**
 * Delete one user by email.
 *
 * @route DELETE /users/:email
 */
router.delete('/:email', private.verifyToken, userController.deleteUserController);

module.exports = router;
