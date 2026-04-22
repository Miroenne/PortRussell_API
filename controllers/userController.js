const usersServices = require('../services/usersServices');

exports.loginController = async (req, res) => {

    console.log('Entrée dans loginController')

    try{

        const {email, password} = req.body;
        const { token, user } = await usersServices.loginService(email, password);

        res.cookie('tokenCookie', token,
        { 
            httpOnly : true,
            sameSite : 'strict',
        });

        res.status(200).json(user);
    }catch(error){
        res.status(400).json(error);
    }
}



exports.createController = async (req, res) => {
    const {userName, password, email} = req.body;

    try{
        const user = await usersServices.createService(userName, password, email);
        res.status(201).json(user);
    }catch(error){
        console.log("Erreur lors de la création de l'utilisateur : ", error)
        res.status(400).json({
            message         : "Erreur lors de la création de l'utilisateur",
            name            : error.name,
            code            : error.code,
            errorMessage    : error.message,
            errors          : error.errors
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