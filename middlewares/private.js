const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Verify the JWT token from cookie/header and refresh it on success.
 *
 * @async
 * @param {import('express').Request} req - Express request containing the token.
 * @param {import('express').Response} res - Express response used to return auth errors and refreshed token.
 * @param {import('express').NextFunction} next - Express next middleware callback.
 * @returns {Promise<void>} Continues the middleware chain when token is valid.
 */
exports.verifyToken = async (req, res, next) => {
    /**
     * Compatibility behavior: token accepted from cookie, custom header, or Authorization header.
     */
    let token =
        req.cookies.token ||
        req.headers["x-access-token"] ||
        req.headers["authorization"];

    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    if (!token) {
        return res.status(401).json("token_not_found");
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json("token_not_valid");
            } else {
                req.decoded = decoded;

                /**
                 * Sliding session: issue a fresh token on every valid request and
                 * return it in the Authorization response header.
                 */
                const expiresIn = 24 * 60 * 60;
                const newToken = jwt.sign(
                    {
                        user: decoded.user,
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expiresIn,
                    },
                );

                res.cookie("token", newToken, {
                    httpOnly: true,
                    // sameSite: "none",
                    secure: false,
                    path: "/",
                });

                next();
            }
        });
    } else {
        return res.status(401).json("token_required");
    }
};
