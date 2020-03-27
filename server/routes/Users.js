const express = require('express');
var cors = require('cors');
const users = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/*
  see https://mongoosejs.com/docs/models.html for querying, deleting, and updating documents
*/

//get user model
const User = require("../models/User");
users.use(cors());

SECRET_KEY = "MySecret";


//endpont to add user to database
users.post('/signup', (req,res) => {
    //must validate confirm password! TODO

    //store information from request body that will be used to create a new user
    const userData = {
        _id: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
        wishLists: [{
            name: 'primary'
        }]
    };

    //find user by id (username)
    User.findOne({
        _id: req.body.username
    }).then(user => {
        //.then is a callback function that lets you do something with the result of the query
        //in this case, the result is stored in user variable
        if(!user){
            //if no user exists with that username, then create a new user
            bcrypt.hash(req.body.password, 10,(err,hash)=>{
                //make user password in db the hashed version
                userData.password = hash;
                //create user using userData from request
                User.create(userData)
                .then(user => {
                    const payload = {
                        _id : user._id
                    };
    
                    //create a token for user session
                    let token = jwt.sign(payload, SECRET_KEY, {
                        expiresIn: 60*60*24*30
                    });
    
                    res.json({token: token});
                })
                .catch(err=>{
                    res.send("error: "+err);
                })
            });            
        }else{
            //user already exists
            res.json({username_error: 'Username already exists'});
        }
    }).catch(err => {
        res.send('error: ' + err); 
    });
});


//Endpoint to login user
users.post('/login', (req,res)=>{
    User.findOne({
        _id : req.body.username
    })
    .then(user =>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                //password matches
                const payload = {
                    _id : user._id,
                };

                //create a token for user session
                let token = jwt.sign(payload, SECRET_KEY, {
                    expiresIn: 60*60*24*30
                });

                res.json({token: token});
            }else{
                //no password match
                res.json({password_error: 'Password incorrect'});
            }
        }else{
            res.json({"username_error": 'Username does not exist'});
        }
    })
    .catch(err=>{
        res.send("error: " + err);
    });
});

//Endpoint to get user information to be used in profile page
users.get("/profile",(req,res)=> {
    var decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
    User.findOne({
        _id:decoded._id,
    })
    .then(user => {
        if(user){
            res.json({user:user});
            
        }else{
            res.send("User " + decoded.user_id+" does not exist");
        }
    })
    .catch(err=>{
        res.send("error: "+ err);
    });
});

//Endpoint to change password
users.post("/changePassword",(req,res)=> {
    var decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
    User.findOne({
        _id:decoded._id,
    })
    .then(user => {
        if(user){
            bcrypt.hash(req.body.password, 10,(err,hash)=>{
                user.password = hash;
                user.save();
                res.send("password saved");
            }); 
            
        }else{
            res.send("User " + decoded.user_id+" does not exist");
        }
    })
    .catch(err=>{
        res.send("error: "+ err);
    });
});

//Endpoint to change personal Info
users.post("/changePersonalInfo",(req,res)=> {
    var decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
    User.findOne({
        _id:decoded._id,
    })
    .then(user => {
        if(user){
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.nickname = req.body.nickname;
            user.homeAddress.street = req.body.street;
            user.homeAddress.city = req.body.city;
            user.homeAddress.state = req.body.state;
            user.homeAddress.zip = req.body.zip;
            user.save();
            res.send("Saved successfully");
            
        }else{
            res.send("User " + decoded.user_id+" does not exist");
        }
    })
    .catch(err=>{
        res.send("error: "+ err);
    });
});

module.exports = users;
