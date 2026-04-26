const User = require("../models/user");

/**
 * Data access layer for user documents.
 */
const usersRepository = {
    /**
     * Create a user document.
     *
     * @async
     * @param {Object} user - User payload.
     * @returns {Promise<Object>} Created user document.
     */
    create: async (user) => {
        return await User.create(user);
    },
    /**
     * Find one user by email.
     *
     * @async
     * @param {string} email - User email.
     * @returns {Promise<Object|null>} Matching user document or `null`.
     */
    findByEmail: async (email) => {
        return await User.findOne({ email });
    },
    /**
     * Retrieve all users without passwords.
     *
     * @async
     * @returns {Promise<Object[]>} List of users.
     */
    getAll: async () => {
        return await User.find().select("-password");
    },
    /**
     * Persist updates for an existing user document.
     *
     * @async
     * @param {Object} user - Mongoose user document to save.
     * @returns {Promise<Object>} Updated user document.
     */
    update: async (user) => {
        return await user.save();
    },
    /**
     * Delete one user by email.
     *
     * @async
     * @param {string} email - User email.
     * @returns {Promise<Object>} Mongoose deletion result.
     */
    delete: async (email) => {
        return await User.deleteOne({ email: email });
    },
};

module.exports = usersRepository;
