const express = require('express');
const app = express();
const port = 8000;
const passportJWT = require('./config/passport_jwt_strategy');
const db = require('./config/mongoose');

//Parse the form data
app.use(express.urlencoded({extended: false}));

//use the router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(err, "Could not connect to the port");
    }

    console.log("Server is running on the port", port);
});
