const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports={
    //Authorization middleware 
    loggedIn:async function (req, res, next) {
        let token = req.header('Authorization');
        let req_url = req.originalUrl;
        console.log(req_url); 
        //không có Token có thể vào duong dan login
        if(!token && (

               req_url.includes("/authenticate/login/local")
            || req_url.includes("/authentication/hash/password")      

        )){
            next();
            return ;
        }
        
        if (!token) return res.status(400).send("Access Denied");
    
        //login with accesstoken
        try {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer and whitespace from string
                token = token.slice(7, token.length).trimLeft();
            }
            const verified = jwt.verify(token, process.env.TOKEN_SECRET_ACCESSTOKEN); 
           
            req.admin = verified;

            next();
        }
        catch (err) {
            return res.status(400).send("Invalid Token");
        }
    }
}
