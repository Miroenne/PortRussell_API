/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management and authentication
 *
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Authenticate a user
 *     responses:
 *       200:
 *         description: Login successful
 *
 * /users/logout:
 *   post:
 *     tags: [Users]
 *     summary: Logout user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users list
 *   post:
 *     tags: [Users]
 *     summary: Create a user
 *     responses:
 *       201:
 *         description: User created
 *
 * /users/{email}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user by email
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *   put:
 *     tags: [Users]
 *     summary: Update a user by email
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user by email
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */

var express = require("express");
var router = express.Router();
const userController = require("../controllers/usersController.js");
const private = require("../middlewares/private.js");

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
router.post("/login", userController.loginController);

/**
 * Log out the authenticated user.
 *
 * @route POST /users/logout
 */
router.post("/logout", private.verifyToken, userController.logoutController);

/**
 * Create a user account.
 *
 * @route POST /users
 */
router.post("/", userController.createController);

/**
 * Retrieve all users.
 *
 * @route GET /users
 */
router.get("/", private.verifyToken, userController.getAllUsersController);

/**
 * Retrieve one user by email.
 *
 * @route GET /users/:email
 */
router.get(
    "/:email",
    private.verifyToken,
    userController.getUserByEmailController,
);

/**
 * Update one user by email.
 *
 * @route PUT /users/:email
 */
router.put("/:email", private.verifyToken, userController.updateUserController);

/**
 * Delete one user by email.
 *
 * @route DELETE /users/:email
 */
router.delete(
    "/:email",
    private.verifyToken,
    userController.deleteUserController,
);

module.exports = router;
