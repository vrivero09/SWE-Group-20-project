const express = require('express');
var cors = require('cors');
const users = express.Router();

//get user model
const User = require("../models/User");
users.use(cors());

//endpont to add user to database
users.get('/signup', (req,res) => {
    // const userData = {
    //     _id: req.body.username,
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.lastName,
    //     nickname: req.body.nickname,
    //     password: req.body.password,
    //     confirmPassword: req.body.password,
    // };

    res.send("Testing endpoint");

    // User.findOne({
    //     _id: req.body.username
    // }).then(user => {
    //     if(!user){
    //         res.send('Unique User!'); 
    //     }else{
    //         res.json({error: 'User already exists'});
    //     }
    // }).catch(err => {
    //     res.send('error: ' + err); 
    // })
});

module.exports = users;
