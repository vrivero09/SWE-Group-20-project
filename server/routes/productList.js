const express = require('express');
var cors = require('cors');
const users = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/*
  see https://mongoosejs.com/docs/models.html for querying, deleting, and updating documents
*/

//get user model
const products = require("../models/Books");
products.use(cors());



   //store information from request body that will be used to create a new user
    const userData = {
        _id: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
    };