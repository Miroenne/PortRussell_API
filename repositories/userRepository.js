const User = require('../models/user');

const userRepository = {
    create: async (user) => {
        return await User.create(user);
    },
    findByEmail: async (email) => {
        console.log('Entrée dans findByEmail')
        return await User.findOne({email});
    },
    getAll: async () => {
        return await User.find().select('-password');
    },
    update: async() => {
        return await User.save();
    },
    delete: async() => {
        return await User.deleteOne();
    }
}

module.exports = userRepository;