const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctors');

//const User = require('../models/user');

const opts= {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Hospital'
};

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){

    //Find the user using jwt payload
    Doctor.findById(jwtPayLoad).then((doctor)=>{
        if(doctor!=undefined){
            return done(null, doctor);
        }
        return done(null, false);
    }).catch((err)=>{
        console.log(err, " Error in finding doctor from JWT");
        return;
    });
}));


module.exports = passport;