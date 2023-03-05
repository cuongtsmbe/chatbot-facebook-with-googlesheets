const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors=require('cors');
const Webhooks = require("./webhooks/webhooks");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors({
  origin: ["https://www.facebook.com"],
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','DELETE'],
  credentials: true
}));

app.get("/about",function(req,res,next){
    res.send(`/3/2023.Google sheet + chatbot fanpage FB.`);
})

//Add support for GET requests to facebook webhook
app.get("/webhook",Webhooks.getWebHook);
app.post('/webhook', Webhooks.postWebHook);

app.listen(port, () => {
  console.log(` listening on port ${port}!`);
});
