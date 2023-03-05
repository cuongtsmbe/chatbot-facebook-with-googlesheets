const request = require('request');
require('dotenv').config();
const Sheet= require('./googleSheetsService.js');
const userModel =require("../models/user.model");

module.exports={

    //get details fanpage by fanpage id facebook
    getDetailsUser:async function(fanpageID){
        var condition={
            fanpage_id:fanpageID
        };
        
        try{
            //query to DB and get user
            var result= await userModel.getOneByFBID(condition);
        }catch(e){
            console.log(e);
            return null;
        }

        return result;
    },

    
    //handle Messenger text or file
    handleMessage:async function(sender_psid, received_message) {

        let response;
        
        //lay thong tin lien quan den Fanpage facebook id
        var user= await this.getDetailsUser(received_message.recipient.id);

        if(user === null || user.length == 0){
            console.log("fanpage id khong duoc tim thay.");
            return false;
        }else{
            user=user[0];
        }

        // Checks if the message contains text
        if (received_message.text) {  
            // Create the payload for a AI response text message, which
            // will be added to the body of our request to the Send API
            var data;
            var text=received_message.text;
            try{
                if(text.includes("sdt:")||text.includes("madon:")){
                    let auth= await Sheet.authorize(); //get author
                    //get all infomation of text
                    data=await Sheet.listMajors(auth,text,user); //handle value in google sheet
                    
                    if(data === null || data.length == 0){
                        data="Khong tim thay don !";
                    }
                }
            }catch(e){
                console.log(e);
            }

            response = {
                "text": data.toString()
            }
        } else if (received_message.attachments) {
            // Get the URL of the message attachment
            // reponse for image or ..
            let attachment_url = received_message.attachments[0].payload.url;
            response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tôi không hiểu ảnh này của bạn.Làm ơn hãy gửi text cho tôi.",
                        "image_url": attachment_url,
                        }]
                    }
                }
            }
        } 
        
        // Send the response message
        this.callSendAPI(sender_psid, response, user.key_fanpage);    
    },


    // Sends response messages via the Send API
    // response from page to sender_id
    callSendAPI: function(sender_psid, response, PAGE_ACCESS_TOKEN) {
        // Construct the message body
        let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
        }
    
        // Send the HTTP request to the Messenger Platform
        request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
        }, (err, res, body) => {
        if (!err) {
            console.log('message sent!',request_body);
            
        } else {
            console.error("Unable to send message:" + err);
        }
        }); 
    }



}