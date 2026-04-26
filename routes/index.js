var express = require("express");
var router = express.Router();
const path = require("path");

/**
 * Router handling the root endpoint.
 *
 * @type {import('express').Router}
 */

/**
 * Render the home page.
 *
 * @route GET /
 * @param {import('express').Request} req - Express request.
 * @param {import('express').Response} res - Express response.
 * @param {import('express').NextFunction} next - Express next middleware callback.
 * @returns {void} Renders the index view.
 */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Port Russell API" });
});

router.get("/docs", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "README.md"));
});

module.exports = router;
