const express = require('express');
var cors = require('cors');
const cards = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/*
  see https://mongoosejs.com/docs/models.html for querying, deleting, and updating documents
*/

//get user model
const User = require("../models/User");
cards.use(cors());

SECRET_KEY = "MySecret";

//Endpoint to add a card to user's credit card list
cards.post('/addCard', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
    const card = {
        cardHolderName: req.body.cardHolderName,
        cardNumber: req.body.cardNumber,
        expirationMonth: req.body.expirationMonth,
        expirationYear: req.body.expirationYear,
        securityCode: req.body.securityCode
    }

    User.findOne({
        _id: decoded._id
    })
    .then(user => {
        user.creditCards.push(card);
        user.save();
        res.send({cards:user.creditCards});
    }).catch(err=>{
        res.send(err);
    });
});

//Endpoint to remove a user's credit card from the list
cards.post('/remove', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);

    User.findOne({
        _id: decoded._id
    })
    .then(user => {
        user.creditCards.pull(req.body.card_id);
        user.save();
        res.send({cards:user.creditCards});
    }).catch(err=>{
        res.send(err);
    });
});

//Endpoint to update a user's credit card from the list
cards.post('/update', (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);

    User.findOne({
        _id: decoded._id
    })
    .then(user => {
        //get the credit card with the given id
        var card = user.creditCards.id(req.body.card_id);
        //update fields
        card.cardHolderName = req.body.cardHolderName;
        card.cardNumber = req.body.cardNumber;
        card.expirationMonth = req.body.expirationMonth;
        card.expirationYear = req.body.expirationYear;
        card.securityCode = req.body.securityCode;
        //save document
        user.save();
        //return list of cards
        res.send({cards:user.creditCards});
    }).catch(err=>{
        res.send(err);
    });
});

module.exports = cards;