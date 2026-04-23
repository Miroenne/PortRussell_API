const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersRepository = require('../repositories/usersRepository');
const normalize = require('../middlewares/normalize'); 


exports.loginService = async (email, password) => {

    console.log('Entrée dans loginService')

    const normalizedEmail = normalize(email);

    const user = await usersRepository.findByEmail(normalizedEmail);

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
                           
    }else{        
        throw new Error("User not found");    
    }
}

exports.createUser = async (userName, password, email) => {
    const existingEmail = await usersRepository.findByEmail(email);
    var createUserError = new Error();
    if(existingEmail){

        createUserError.message = "Email already used";
        createUserError.code = 409;      

        throw createUserError;
    }
    
    const normalizedEmail = normalize(email);

    const newUser = {
        userName,
        email : normalizedEmail,
        password 
    }

    const createdUser = await usersRepository.create(newUser);

    if(createdUser){
        return createdUser;
    }else{
        createUserError.message = "User not created";
        createUserError.code = 500;
        throw createUserError;
    }
    
}

exports.getAllUsers = async () => {
    const users = await usersRepository.getAll();

    if(users){
        return users;
    }else{
        throw new Error("No users found")
    }
}

exports.getUserByEmail = async (email) => {
    const normalizedEmail = normalize(email);
    const user = await usersRepository.findByEmail(normalizedEmail);

    if(user){
        return user;
    }else{
        throw new Error("User not found")
    }
}

exports.updateUser = async (email, newEmail, newUserName, newPassword) => {

    console.log('Entrée dans updateUserService')

    if(newEmail){
        const normalizedNewEmail = normalize(newEmail);
        const normalizedEmail = normalize(email);
        
        if(normalizedNewEmail !== normalizedEmail){
           const existingEmail = await usersRepository.findByEmail(normalizedNewEmail);
        }
        if(existingEmail){
        console.log ('Entrée dans la condition if("existingEmail")')
        throw new Error("Email already used")
        }
    }

    const user = await usersRepository.findByEmail(email);
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

        return await usersRepository.update(user);
            
    }else{
        throw new Error("User not found")
    }
    
}

exports.deleteUser = async (email) => {

    const normalizedEmail = normalize(email);
    const user = await usersRepository.findByEmail(normalizedEmail);

    console.log('normalized email : ', normalizedEmail)

    if(user){
        console.log(normalizedEmail)
        return await usersRepository.delete(normalizedEmail);
    }else{
        throw new Error("User not found")
    }
}