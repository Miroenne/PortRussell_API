const usersServices = require("../services/usersServices");

/**
 * Authenticate a user and set the authentication token cookie.
 *
 * @async
 * @param {import('express').Request} req - Express request containing login credentials.
 * @param {import('express').Response} res - Express response used to return authenticated user data.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await usersServices.loginService(
            email,
            password,
        );

        const isProd = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la modification de l'utilisateur",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Clear the authentication token cookie.
 *
 * @async
 * @param {import('express').Request} req - Express request.
 * @param {import('express').Response} res - Express response used to confirm logout.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.logoutController = async (req, res) => {
    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/",
    });
    res.status(200).json("logout_succeed");
};

/**
 * Create a new user.
 *
 * @async
 * @param {import('express').Request} req - Express request containing user payload.
 * @param {import('express').Response} res - Express response used to return created user.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.createController = async (req, res) => {
    const { userName, password, email } = req.body;

    try {
        const user = await usersServices.createUser(userName, password, email);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la création de l'utilisateur",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Retrieve all users.
 *
 * @async
 * @param {import('express').Request} req - Express request.
 * @param {import('express').Response} res - Express response used to return users.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.getAllUsersController = async (req, res) => {
    try {
        const users = await usersServices.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la modification de l'utilisateur",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Retrieve one user by email.
 *
 * @async
 * @param {import('express').Request} req - Express request containing `email` route param.
 * @param {import('express').Response} res - Express response used to return the user.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.getUserByEmailController = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await usersServices.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la modification de l'utilisateur",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Update one user by email.
 *
 * @async
 * @param {import('express').Request} req - Express request containing `email` route param and update payload.
 * @param {import('express').Response} res - Express response used to return updated user.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.updateUserController = async (req, res) => {
    const newEmail = req.body.email;
    const newUserName = req.body.userName;
    const newPassword = req.body.password;
    const email = req.params.email;

    console.log(email);
    console.log(newEmail);
    console.log(newUserName);
    console.log(newPassword);

    try {
        const user = await usersServices.updateUser(
            email,
            newEmail,
            newUserName,
            newPassword,
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la modification de l'utilisateur",
            code: error.code,
            errorMessage: error.message,
        });
    }
};

/**
 * Delete one user by email.
 *
 * @async
 * @param {import('express').Request} req - Express request containing `email` route param.
 * @param {import('express').Response} res - Express response used to return deletion result.
 * @returns {Promise<void>} Sends an HTTP response.
 */
exports.deleteUserController = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await usersServices.deleteUser(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la modification de l'utilisateur",
            code: error.code,
            errorMessage: error.message,
        });
    }
};
