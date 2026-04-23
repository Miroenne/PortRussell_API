const usersServices = require('../services/usersServices');

exports.loginController = async (req, res) => {

    console.log('Entrée dans loginController')

    try{

        const {email, password} = req.body;
        const { token, user } = await usersServices.loginService(email, password);

        res.cookie('token', token,
        { 
            httpOnly : true,
            sameSite : 'strict',
        });

        res.status(200).json(user);
    }catch(error){
        res.status(404).json(error.message);

    }
}

exports.logoutController = async (req, res) => {
    
    res.clearCookie('token', 
        {  
            httpOnly: true,
            sameSite: 'strict'
        }
    );
    res.status(200).json('logout_succeed');
}

exports.createController = async (req, res) => {
    const {userName, password, email} = req.body;

    try{
        const user = await usersServices.createUser(userName, password, email);
        res.status(201).json(user);
    }catch(error){
        console.log("Erreur lors de la création de l'utilisateur : ", error)
        res.status(400).json({
            message         : "Erreur lors de la création de l'utilisateur",            
            code            : error.code,
            errorMessage    : error.message,            
        });    
    }
}

exports.getAllUsersController = async (req, res) => {
    try{
        const users = await usersServices.getAllUsers();
        res.status(200).json(users);
    }catch(error){
        res.status(501).json(error);
    }
}

exports.getUserByEmailController = async (req, res) => {
    const {email} = req.params;
    try{
        const user = await usersServices.getUserByEmail(email);
        res.status(200).json(user);
    }catch(error){
        res.status(501).json(error);
    }
}

exports.updateUserController = async (req, res) => {
    const newEmail = req.body.email;
    const newUserName = req.body.userName;
    const newPassword = req.body.password;
    const email = req.params.email;

    console.log(email)
    console.log(newEmail)
    console.log(newUserName)
    console.log(newPassword)


    try{
        const user = await usersServices.updateUser(email, newEmail, newUserName, newPassword);
        res.status(200).json(user);
    }catch(error){
        res.status(501).json(error);
    }
        
}

exports.deleteUserController = async (req, res) => {
    const email = req.params.email;

    console.log('controller email : ',email)

    try{
        const user = await usersServices.deleteUser(email);
        res.status(200).json(user);
    }catch(error){
        res.status(501).json(error);
    }
}