/**
 * Build a standardized application error with message and status code.
 *
 * @param {string} message - Human-readable error message.
 * @param {number} code - HTTP-oriented error code.
 * @returns {Error & {code: number}} Standardized error object.
 */
function buildError(message, code) {
    const error = new Error();
    error.message = message;
    error.code = code;
    return error;
}

module.exports = buildError;
