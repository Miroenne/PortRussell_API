const User = require('../models/user');

const usersRepository = {
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
    update: async(user) => {
        console.log('Entrée dans update')
        return await user.save();
    },
    delete: async(email) => {
        return await User.deleteOne({email : email});
    }
}

module.exports = usersRepository;