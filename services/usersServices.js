const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const userRepository = require('../repositories/userRepository');
const normalize = require('../middlewares/normalize'); 


exports.loginService = async (email, password) => {

    console.log('Entrée dans loginService')

    const normalizedEmail = normalize(email);

    const user = await userRepository.findByEmail(normalizedEmail);

    console.log(user)

    if(user){

        console.log("entrée dans la condition if")
        console.log(user.password)

        const isValid = bcrypt.compare(password, user.password)
        console.log(isValid)
        if(!isValid){
            console.log("Mot de passe incorrect")
            throw new Error("Mot de passe incorrect");
        }
        
        console.log("User found")

        delete user._doc.password;

        console.log("User's password deleted")

        const expireIn = 24 * 60 * 60;

        const token = jwt.sign(
            {
                user : user
            },
            process.env.SECRET_KEY,
            {
                expiresIn: expireIn
            }
        );

        console.log("Token generated")        

        console.log("User logged successfully")

        return  {token, user};
                           
    }
}
    



exports.createService = async (userName, password, email) => {
    const existingEmail = await userRepository.findByEmail(email);

    if(existingEmail){
        throw new Error("Cet email est déjà utilisé")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const normalizedEmail = normalize(email);


    const newUser = {
        userName,
        email : normalizedEmail,
        password : hashedPassword
    }

    return await userRepository.create(newUser);
}

exports.getAllUsers = async () => {
    return await userRepository.getAll();
}