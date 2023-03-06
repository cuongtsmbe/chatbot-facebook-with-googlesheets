const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports={
    AccessTokenAndRefreshTokenAdmin:async function(admin){
        var payload={
            username:admin.username,
            iat: Math.floor(Date.now() / 1000),
        };

        //create AccessToken AND refreshToken
        const AccessToken = jwt.sign(payload, process.env.TOKEN_SECRET_ACCESSTOKEN,{ expiresIn: "5h"});
        
        //reponse
        return{
            code:200,
            message:"Login success.",
            user:{
                username:admin.username,
                AccessToken:AccessToken
            }

        };  
    }
}
  