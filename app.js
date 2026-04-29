/**
 * Swagger library used to generate an OpenAPI specification from JSDoc annotations.
 */
const swaggerJSDoc = require("swagger-jsdoc");

/**
 * Swagger UI middleware used to expose interactive API documentation.
 */
const swaggerUi = require("swagger-ui-express");
/**
 * Main Express application bootstrap.
 * It wires middleware, routers, and database initialization.
 *
 * @module app
 */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongodb = require("./db/mongoose.js");
const allowedOrigins = process.env.ALLOWED_ORIGINS;
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catwaysRouter = require("./routes/catways");
const cors = require("cors");

/**
 *  Create the Express app before registering middlewares/routes.
 */
var app = express();

/**
 * Swagger configuration used to build the OpenAPI specification.
 * `failOnErrors: true` helps detect invalid YAML annotations early.
 *
 * @type {import("swagger-jsdoc").Options}
 */
const options = {
    failOnErrors: true,
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Port Russell API",
            version: "1.0.0",
        },
        servers: [
            { url: "http://localhost:3000" },
            { url: "https://portrussell-api.onrender.com" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./routes/*.js"], // files containing @swagger / @openapi blocks
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * Raw OpenAPI JSON endpoint used by Swagger UI.
 */
app.get("/api-docs.json", (req, res) => {
    res.type("application/json");
    res.status(200).send(swaggerSpec);
});

/**
 * Interactive Swagger UI endpoint.
 */
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(null, {
        explorer: true,
        swaggerOptions: {
            url: "/api-docs.json",
        },
    }),
);

mongodb.initClientDbConnection();

app.use(
    cors({
        origin(origin, cb) {
            if (!origin) return cb(null, true);
            if (allowedOrigins.includes(origin)) return cb(null, true);
            return cb(new Error("Not allowed by CORS"));
        },
        allowedHeaders: ["Authorization", "Content-Type"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }),
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catways", catwaysRouter);

module.exports = app;
