const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usersRepository = require("../repositories/usersRepository");
const normalize = require("../utils/normalize");
const buildError = require("../utils/errorFactory");

/**
 * @typedef {Object} AuthPayload
 * @property {string} token - Signed JWT used for authentication.
 * @property {Object} user - Authenticated user document without password.
 */

/**
 * Authenticate a user using email and password, then return a JWT token.
 *
 * @async
 * @param {string} email - User email.
 * @param {string} password - Raw user password.
 * @returns {Promise<AuthPayload>} The authentication token and user payload.
 * @throws {Error} Throws when credentials are invalid or user is not found.
 */
exports.loginService = async (email, password) => {
    const normalizedEmail = normalize(email);

    const user = await usersRepository.findByEmail(normalizedEmail);

    if (user) {
        const isValid = bcrypt.compare(password, user.password);

        if (!isValid) {
            throw buildError("Invalid password", 401);
        }

        delete user._doc.password;

        const expireIn = 24 * 60 * 60;

        const token = jwt.sign(
            {
                user: user,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: expireIn,
            },
        );

        return { token, user };
    } else {
        throw buildError("User not found", 404);
    }
};

/**
 * Create a new user account.
 *
 * @async
 * @param {string} userName - User display name.
 * @param {string} password - Raw password that will be hashed by the model hook.
 * @param {string} email - User email address.
 * @returns {Promise<Object>} The created user document.
 * @throws {Error} Throws when email is already used or creation fails.
 */
exports.createUser = async (userName, password, email) => {
    const existingEmail = await usersRepository.findByEmail(email);
    var createUserError = new Error();
    if (existingEmail) {
        throw buildError("Email already used", 409);
    }

    const normalizedEmail = normalize(email);

    const newUser = {
        userName,
        email: normalizedEmail,
        password,
    };

    const createdUser = await usersRepository.create(newUser);

    if (createdUser) {
        return createdUser;
    } else {
        throw buildError("User not created", 500);
    }
};

/**
 * Retrieve all users.
 *
 * @async
 * @returns {Promise<Object[]>} List of users.
 * @throws {Error} Throws when no user list can be retrieved.
 */
exports.getAllUsers = async () => {
    const users = await usersRepository.getAll();

    if (users) {
        return users;
    } else {
        throw buildError("No users found", 404);
    }
};

/**
 * Retrieve one user by email.
 *
 * @async
 * @param {string} email - User email.
 * @returns {Promise<Object>} The matched user document.
 * @throws {Error} Throws when user is not found.
 */
exports.getUserByEmail = async (email) => {
    const normalizedEmail = normalize(email);
    const user = await usersRepository.findByEmail(normalizedEmail);

    if (user) {
        return user;
    } else {
        throw buildError("User not found", 404);
    }
};

/**
 * Update a user identified by email.
 *
 * @async
 * @param {string} email - Current user email.
 * @param {string} newEmail - New email to apply.
 * @param {string} newUserName - New user name to apply.
 * @param {string} newPassword - New password to apply.
 * @returns {Promise<Object>} The updated user document.
 * @throws {Error} Throws when email conflict exists or user is not found.
 */
exports.updateUser = async (email, newEmail, newUserName, newPassword) => {
    if (newEmail) {
        const normalizedNewEmail = normalize(newEmail);
        const normalizedEmail = normalize(email);

        if (normalizedNewEmail !== normalizedEmail) {
            const existingEmail =
                await usersRepository.findByEmail(normalizedNewEmail);

            if (existingEmail) {
                throw buildError("Email already used", 409);
            }
        }
    }

    const user = await usersRepository.findByEmail(email);

    if (user) {
        if (newEmail) {
            user.email = normalize(newEmail);
        } else {
            user.email = user.email;
        }

        if (newUserName) {
            user.userName = newUserName;
        } else {
            user.userName = user.userName;
        }

        if (newPassword) {
            user.password = newPassword;
        } else {
            user.password = user.password;
        }

        return await usersRepository.update(user);
    } else {
        throw buildError("User not found", 404);
    }
};

/**
 * Delete a user by email.
 *
 * @async
 * @param {string} email - User email.
 * @returns {Promise<Object>} The deletion result returned by the repository.
 * @throws {Error} Throws when user is not found.
 */
exports.deleteUser = async (email) => {
    const normalizedEmail = normalize(email);
    const user = await usersRepository.findByEmail(normalizedEmail);

    if (user) {
        return await usersRepository.delete(normalizedEmail);
    } else {
        throw buildError("User not found", 404);
    }
};
