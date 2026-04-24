function buildError(message, code) {
    const error = new Error();
    error.message = message;
    error.code = code;
    return error;
}

module.exports = buildError;
