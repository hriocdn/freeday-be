// ---------------------------
// Authentication Middleware
// ---------------------------

const model = require('../../models');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt');
const FDC_User = model.FDC_User

// Authentication Function -> Access Token Checking
const authentication = async (req, res, next) => {
    try{
        // Get Access Token from Authorization Header
        // nb. Authorization Header Format == 'Bearer <token>'
        const token = req.header('Authorization').split(" ")[1];
        //Verify and Retrieve Token
        const decoded = jwt.verify(token, jwtConfig.secret);

        // Find User
        const current_user = await FDC_User.findOne({
            where: {
                id: decoded.id
            }
        });

        if(!current_user){
            return res.status(400).send({error: "Please do login first !"});
        }
        
        req.token = token;
        req.current_user = current_user;
        // Proceed
        next();
    }catch(e){
        return res.status(400).send({error: "Please do login first !"});
    }
}

module.exports = authentication;