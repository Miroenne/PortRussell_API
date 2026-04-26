/**
 * @swagger
 * tags:
 *   - name: Catways
 *     description: Catway management
 *
 * /catways:
 *   get:
 *     tags: [Catways]
 *     summary: Get all catways
 *     responses:
 *       200:
 *         description: List of catways
 *   post:
 *     tags: [Catways]
 *     summary: Create a catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [catwayNumber, catwayType, catwayState]
 *             properties:
 *               catwayNumber:
 *                 type: string
 *               catwayType:
 *                 type: string
 *                 enum: [long, short]
 *               catwayState:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catway created
 *
 * /catways/{id}:
 *   get:
 *     tags: [Catways]
 *     summary: Get a catway by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway found
 *   put:
 *     tags: [Catways]
 *     summary: Update catway state
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway updated
 *   delete:
 *     tags: [Catways]
 *     summary: Delete a catway
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway deleted
 */

var express = require("express");
var router = express.Router();
const catwaysController = require("../controllers/catwaysController");
const reservationsRouter = require("./reservations");
const private = require("../middlewares/private.js");

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
router.use("/:id/reservations", reservationsRouter);

/**
 * Create a catway.
 *
 * @route POST /catways
 */
router.post("/", catwaysController.createController);

/**
 * Retrieve all catways.
 *
 * @route GET /catways
 */
router.get("/", catwaysController.getAllCatwaysController);

/**
 * Retrieve one catway by number.
 *
 * @route GET /catways/:id
 */
router.get("/:id", catwaysController.getCatwayByCatwayNumberController);

/**
 * Update one catway by number.
 *
 * @route PUT /catways/:id
 */
router.put("/:id", catwaysController.updateCatwayController);

/**
 * Delete one catway by number.
 *
 * @route DELETE /catways/:id
 */
router.delete("/:id", catwaysController.deleteCatwayController);

module.exports = router;
