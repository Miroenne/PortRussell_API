/**
 * Convert a raw date string into a valid `Date` object.
 *
 * @param {string} value - Raw date input.
 * @returns {Date|null} Parsed date, or `null` when input is invalid.
 */
function normalizeDate(value){

    if(typeof value !== 'string' || value.trim() === '') return null;

    const normalizedDateValue = new Date(value);
    return Number.isNaN(normalizedDateValue.getTime()) ? null : normalizedDateValue;
}

module.exports = normalizeDate;
