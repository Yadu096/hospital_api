const Doctor = require('../models/doctors');
const jwt = require('jsonwebtoken');

//Register the doctor 
module.exports.register = async function(req, res){
    try{
        console.log(req.body);
        //search if a doctor with the same username exists or not
        let doctor = await Doctor.findOne({username: req.body.username});
        if(doctor){
            return res.status(404).json({
                message: "Username already exists, please login to continue or choose another username"
            });
        }else{
            //Check if confirm password matches with the password field
            if(req.body.password === req.body.confirm_password){
                //register the doctor 
                let doctor = await Doctor.create({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password
                });

                return res.status(200).json({
                    message: "You have successfully registered",
                    data:{
                        doctor: doctor
                    } 
                });

            }else{
                return res.status(404).json({
                    message: "Passwords do not match, please try again"
                });
            }
            
        }

    }catch(err){
        console.log(err, "***Error***");
        return res.status(404).json({
            message: "Could not register the doctor"
        });
    }
}

//create session 
module.exports.createSession = async function(req, res){
    try{
        //find the doctor with the username
        let doctor = await Doctor.findOne({username: req.body.username});

        if(!doctor || doctor.password != req.body.password){
            return res.status(422).json({
                message: "Invalid Username/Password"
            });
        }

        return res.status(200).json({
            message: "You have succesfully signed in. Here is your token: ",
            data:{
                token: jwt.sign(doctor.toJSON(), 'Hospital', {expiresIn: 100000})
            }
        });

    }catch(err){
        console.log(err, "***Error***");
        return res.staus(422).json({
            message: "Could not sign you in",
            data:{
                Error: err
            }
        });
    }
}