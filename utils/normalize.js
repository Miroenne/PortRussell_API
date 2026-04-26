/**
 * Normalize a string value by trimming spaces and lowercasing it.
 *
 * @param {string} value - Raw input string.
 * @returns {string} Normalized string.
 */
function normalize(value){
    const normalizedValue = value.trim().toLowerCase();
    console.log(normalizedValue);
    return normalizedValue;
}

module.exports = normalize;
