// ---------------------------
// Backend Controller for Auth
// ---------------------------

const model = require('../../models');
const FDC_User = model.FDC_User;
const bcrypt = require('bcryptjs');
const applicationHelper = require('../helpers/applicationHelper.js');

const authController = {
    // Login Function
    login: async (req, res, next) => {
        try{
            // Find User
            const findUser = await FDC_User.findOne({
                where: {
                    username: req.body.username.toLowerCase().trim()
                }
            })

            // User Check
            if (!findUser){
                throw new Error('Wrong user id or password');
            }
    
            // Password Check
            const checkPassword = await bcrypt.compare(req.body.password, findUser.password);
    
            if (!checkPassword){
                throw new Error('Wrong password');
            }

            // Generate Access Token
            const jwtToken = applicationHelper.generate_access_token(findUser.id, findUser.username);

            // User Data
            const user = {
                username: findUser.username
            }

            req.token = jwtToken;
            req.current_user = findUser;

            return res.status(200).send({message: "logged in", jwtToken, user})
        }
        catch(e){
            res.status(400).send({error: e.message})
        }
    },
    // Logout Function
    logout: async (req, res) => {
        try{
            // Save Log
            authLogger.info(`User ${req.current_user.username} logged out`)
            req.token = '';
            req.current_user = '';
            res.status(200).send({message: "logged out"})
        }catch(e){
            res.status(400).send({error: e.message})
        }
    },
    changepass: async (req, res) => {
        try{
            const thisUsername = req.body.username;
            const newPass = req.body.newPass;
            const currPass = req.body.currPass;

            let findUser = await FDC_User.findOne({
                where: {
                    username: thisUsername
                }
            });

            // Password Check
            const checkPassword = await bcrypt.compare(req.body.currPass, findUser.password);

            if (!checkPassword){
                throw new Error('Wrong password');
            }
            
            findUser.password = await bcrypt.hash(req.body.newPass, 8);
            await findUser.save();

            res.status(200).send({message: "Success", findUser});
        }catch(e){
            res.status(400).send({error: e.message})
        }
    }
}

module.exports = authController