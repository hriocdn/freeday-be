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
    compare_sum: ( a, b ) => {
        if ( a.summary < b.summary ){
            return -1;
        }
        if ( a.summary > b.summary ){
            return 1;
        }
        return 0;
    },
    compare_rate: ( a, b ) => {
        if ( a.rate < b.rate ){
            return -1;
        }
        if ( a.rate > b.rate ){
            return 1;
        }
        return 0;
    },
    compare_presence: ( a, b ) => {
        if ( a.presence < b.presence ){
            return -1;
        }
        if ( a.presence > b.presence ){
            return 1;
        }
        return 0;
    }
}

module.exports = applicationHelper;