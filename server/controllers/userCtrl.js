var passport = require('passport'), 
    session = require('express-session'), 
    mongoose = require('mongoose'), 
    localStrategy = require('passport-local').Strategy;

var User = require('./../models/User');

//Passport
passport.use(new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },

    function(email, password, done){
        //Do they have an email?
        User.findOne({email: email}, function(findErr, foundUser){
            if(findErr) {
                done(findErr);
            } else if (foundUser) {
                //Do passwords match?
                if(foundUser.verifyPassword(password)) {
                    //correct password
                    delete foundUser.password; //removes password from session, sending it only to the database
                    done(null, foundUser);
                } else {
                    //bad password
                    done(null, null, {reason: 'Invalid password'});
                }
            } else {
                done(null, null, {reason: 'Could not find email'});
            }
        });
    }));

//Serialization
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

//Endpoints
module.exports = {
    
    register: function(req, res) {     
        User.findOne({email: req.body.email}, function(err, result) {
            if (!result) {
                User.create(req.body, function(createErr, createResult){
                    if (createErr) {
                        res.status(500).json(createErr);
                    } else {
                        res.json(createResult);
                    }
                });
            } else {
                res.send('email in use');
            }
        })
    },
    
    me: function(req, res, next) {
        if (!req.user) return res.status(401).send('current user not defined');
        req.user.password = null;
        return res.status(200).json(req.user);
    },

    update: function(req, res, next) {
        User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
            if (err) { 
                next(err);
            } else {
                res.status(200).send('user updated');
            }
        });
    },
    
    read: function(req, res) {
        User
            .find({})
            .exec(function(err, result) {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
    },
    
    isAuthed: function(req,res, next) {
        if(req.user) {
            next();
        } else {
            res.status(403).send('Not Permitted');
        }
    },
    
    
    ////////////////////////////////////////
    
    getCurrentUser: function(req, res) {
        if(req.user){
            res.status(200).send(req.user);
        } else {
            res.status(403).send('forbidden');
        }
    },

    getUser: function(req, res) {
        User.findById(req.query.id, function(err, user) {
            if (err) {
                return console.error(err);
            } else {
                res.send(user);
            }
        });
    }
}