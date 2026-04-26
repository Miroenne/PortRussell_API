/**
 * Mongoose library used for MongoDB object modeling.
 */
const mongoose = require("mongoose");

/**
 * Enable query debug logs for development.
 */
mongoose.set("debug", true);

/**
 * Connection options passed to `mongoose.connect`.
 */
const clientOptions = {
    dbName: "Port_Russell",
};
console.log(process.env.DB_URL);

/**
 * Initialize the MongoDB client connection using Mongoose.
 *
 * @async
 * @returns {Promise<void>} Resolves when the database connection is established.
 * @throws {Error} Throws when the connection attempt fails.
 */
exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, clientOptions);
        console.log("Connected");
    } catch (error) {
        console.error(error);
        throw error;
    }
};
