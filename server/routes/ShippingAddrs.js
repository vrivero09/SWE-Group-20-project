const express = require('express');
var cors = require('cors');
const addrs = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/*
  see https://mongoosejs.com/docs/models.html for querying, deleting, and updating documents
*/

//get user model
const User = require("../models/User");
addrs.use(cors());

SECRET_KEY = "MySecret";

//Endpoint to add a shipping address to user's list
addrs.post('/add', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
    const address = {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    }

    User.findOne({
        _id: decoded._id
    })
    .then(user => {
        user.shippingAddress.push(address);
        user.save();
        res.send({addresses:user.shippingAddress});
    }).catch(err=>{
        res.send(err);
    });
});

//Endpoint to remove a user's shipping address from the list
addrs.post('/remove', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);

    User.findOne({
        _id: decoded._id
    })
    .then(user => {
        user.shippingAddress.pull(req.body.addr_id);
        user.save();
        res.send({addresses:user.shippingAddress});
    }).catch(err=>{
        res.send(err);
    });
});

//Endpoint to update a user's shiiping address from the list
addrs.post('/update', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);

    User.findOne({
        _id: decoded._id
    })
    .then(user => {
        //get the address with the given id
        var address = user.shippingAddress.id(req.body.addr_id);
        //update fields
        address.street = req.body.street;
        address.city = req.body.city;
        address.state = req.body.state;
        address.zip = req.body.zip;
        //save document
        user.save();
        //return list of addresses
        res.send({addresses:user.shippingAddress});
    }).catch(err=>{
        res.send(err);
    });
});

module.exports = addrs;