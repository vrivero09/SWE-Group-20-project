const express = require('express');
var cors = require('cors');
const users = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//get user model
const User = require("../models/User");
users.use(cors());

//endpont to add user to database
users.post('/signup', (req,res) => {
    //must validate confirm password! TODO
    const userData = {
        _id: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
    };

    //find user by id (username)
    User.findOne({
        _id: req.body.username
    }).then(user => {
        //new user
        if(!user){
            bcrypt.hash(req.body.password, 10,(err,hash)=>{
                //make user password in db the hashed version
                userData.password = hash;
                //create user using userData from request
                User.create(userData)
                .then(user => {
                    res.json({status: user._id + " registered"});
                })
                .catch(err=>{
                    res.send("error: "+err);
                })
            });            
        }else{
            //user already exists
            res.json({error: 'User already exists'});
        }
    }).catch(err => {
        res.send('error: ' + err); 
    });
});

module.exports = users;
