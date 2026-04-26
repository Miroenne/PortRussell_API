const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

/**
 * Library used to hash user passwords before persistence.
 */
const bcrypt = require('bcrypt');

/**
 * Mongoose schema describing a user document.
 */
const User = new Schema({
    userName: {
        type: String,
        trim : true,
        required: [true, 'Le nom est requis']
    },
    email: {
        type: String,
        trim : true,
        required: [true, "L'email est requis"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        trim : true,
        /**
         * Enforce a minimum password length.
         */
        minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères']
    }    

}, {
    /**
     * Automatically maintain `createdAt` and `updatedAt` timestamps.
     */
    timestamps: true
});

/**
 * Hash the password before saving when it has been modified.
 *
 * @param {import('mongoose').CallbackWithoutResultAndOptionalError} next - Mongoose pre-save callback.
 * @returns {Promise<void>} Resolves after password hash is applied.
 */
User.pre('save', async function(next) {
    /**
     * Skip hashing when the password field has not changed.
     */
    if (!this.isModified('password')) {
        return ;
    }
    
    /**
     * Generate salt and hash password with bcrypt.
     */
    const salt = await bcrypt.genSalt(10);
    /**
     * Persist hashed password on the current document.
     */
    this.password = await bcrypt.hash(this.password, salt);       
    
});

module.exports = mongoose.model('User', User);
