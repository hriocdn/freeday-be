// ---------------------------
// Helper for Application
// ---------------------------

const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt');
const model = require("../../models")

const applicationHelper = {
    // Generate Access Token Function
    generate_access_token: (userid, userName) => {
        const jwtToken = jwt.sign(
            {
                id: userid,
                username: userName,
            },
            jwtConfig.secret,
            {
                expiresIn: '12h',
            }
        );
        return jwtToken
    },
}

module.exports = applicationHelper;