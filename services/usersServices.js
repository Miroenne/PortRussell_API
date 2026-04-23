const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/usersRepository');
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
    
    const normalizedEmail = normalize(email);

    const newUser = {
        userName,
        email : normalizedEmail,
        password 
    }

    return await userRepository.create(newUser);
}

exports.getAllUsers = async () => {
    return await userRepository.getAll();
}

exports.getUserByEmail = async (email) => {
    const normalizedEmail = normalize(email);
    return await userRepository.findByEmail(normalizedEmail);
}

exports.updateUserService = async (email, newEmail, newUserName, newPassword) => {

    console.log('Entrée dans updateUserService')

    if(newEmail){
        const normalizedNewEmail = normalize(newEmail);
        const normalizedEmail = normalize(email);
        
        if(normalizedNewEmail !== normalizedEmail){
           const existingEmail = await userRepository.findByEmail(normalizedNewEmail);
        }
        if(existingEmail){
        console.log ('Entrée dans la condition if("existingEmail")')
        throw new Error("Cet email est déjà utilisé")
        }
    }

    const user = await userRepository.findByEmail(email);
    console.log(user)

    if(user){
        
        console.log('Entrée dans la condition if("user")')

        if(newEmail){
            user.email = normalise(newEmail);
        }else{
            user.email = user.email;
        }

        if(newUserName){
            user.userName = newUserName;        
        }else{
            user.userName = user.userName;
        }

        if(newPassword){
            user.password = newPassword;
        }else{
            user.password = user.password;
        }
        
        console.log(user)

        return await userRepository.update(user);
            
    }
    
}

exports.deleteUserService = async (email) => {

    const normalizedEmail = normalize(email);
    const user = await userRepository.findByEmail(normalizedEmail);

    console.log('normalized email : ', normalizedEmail)

    if(user){
        console.log(normalizedEmail)
        return await userRepository.delete(normalizedEmail);
    }
}