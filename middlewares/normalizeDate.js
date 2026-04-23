function normalizeDate(value){

    if(typeof value !== 'string' || value.trim() === '') return null;

    const normalizedDateValue = new Date(value);
    return Number.isNaN(normalizedDateValue.getTime()) ? null : normalizedDateValue;
}

module.exports = normalizeDate;