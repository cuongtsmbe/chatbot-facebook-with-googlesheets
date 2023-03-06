
const LINK = require("../util/links.json");
const adminModel=require("../models/admin.model");
const tokenMdw = require("../mdw/token.mdw");
const crypto=require('crypto');
const str2ab = require('string-to-arraybuffer');

require('dotenv').config();

module.exports = {
    AuthenticateClientRouters:function(app){  

        app.get(LINK.ADMIN.AUTHENTICATE_HASH_PW                             ,this.hashPw);
        app.post(LINK.ADMIN.AUTHENTICATE_LOGIN_LOCAL                        ,this.loginLocal);
        
    },

    //hash pw and response . for staff edit password in DB 
    //because project don't have register for admin
    hashPw:function(req,res,next){
        var value={
            password:req.query.password 
        };
        try{
            //hash password and response
            crypto.pbkdf2(value.password,process.env.SALT_ADMIN_PW, 310000,32, 'sha256',async function(err, hashedPassword) {
                if (err) {
                    res.json({
                        code:1,
                        message:"Server error."
                    });            
                    return false;
                }

                //cover to String hex 
                hashedPassword=hashedPassword.toString("hex");
                return res.json({
                    code:2,
                    password:hashedPassword
                });   
            }); 
        }catch(err){
            return  res.json({
                code:1,
                message:"Server error."
            });    
        }

    },


    //LOGIN LOCAL
    loginLocal:async function(req,res,next){
       try{
            var value={
                username:req.body.username,
                password:req.body.password 
            };
            
            if(value.password === undefined || value.password === null || value.username === undefined || value.username === null){
                return res.json({
                    code:5,
                    message:"username or password empty/not defined."
                });
            }
            
            //removes whitespace
            value.username=value.username.trim();

            //kiem tra username có tồn tại chưa
            var admin=await adminModel.getOne({username:value.username});

            if(0==admin.length){          
                return res.json({
                    code:1,
                    message:"Incorrect username or password ."
                });
            }

            admin=admin[0];

            //3.kiểm tra password(chua hash) với password hash của admin trên DB 
            crypto.pbkdf2(value.password,process.env.SALT_ADMIN_PW, 310000,32, 'sha256',async function(err, hashedPassword) {
                if (err) {
                    res.json({
                        code:2,
                        message:"Server error."
                    });            
                    return false;
                }
                
                try{
                        //cover to String hex 
                    hashedPassword=hashedPassword.toString("hex");
                    //check password
                    if (!crypto.timingSafeEqual(str2ab(String(admin.password)),str2ab(String(hashedPassword)))) {
                
                        return res.json({
                            code:1,
                            message:"Incorrect username or password."
                        });      
                        
                    }
                    //4.Create and assign token
                    return res.json(await tokenMdw.AccessTokenAndRefreshTokenAdmin(admin));
                    
                }catch(err){
                    console.log(err);
                    res.status(400).json({
                        code:3,
                        message:"check password fail.error server",
                        error:err
                    })
                }      
            });
        }catch(err){
            return  res.json({
                code:1,
                message:"Server error."
            });    
        }

    },
}