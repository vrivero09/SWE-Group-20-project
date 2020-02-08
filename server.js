'use strict';

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require ('body-parser')
const data = require('./client/src/api/data');
const middleware = require('./client/src/api/middleware');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const port = 5000; 

app.get('/api/products', (req, res) => { //lists all  available products
    return res.json(data.products);
  });

  app.post('/api/products', (req, res) => { //generates the list of products in the cart
    let products = [], id = null;
    let cart = JSON.parse(req.body.cart);
    if (!cart) return res.json(products)
    for (var i = 0; i < data.products.length; i++) {
      id = data.products[i].id.toString();
      if (cart.hasOwnProperty(id)) {
        data.products[i].qty = cart[id]
        products.push(data.products[i]);
      }
    }
    return res.json(products);
  });

  app.post('/api/products', (req, res) => { //generates the list of products in the cart
    let products = [], id = null;
    let cart = JSON.parse(req.body.cart);
    if (!cart) return res.json(products)
    for (var i = 0; i < data.products.length; i++) {
      id = data.products[i].id.toString();
      if (cart.hasOwnProperty(id)) {
        data.products[i].qty = cart[id]
        products.push(data.products[i]);
      }
    }
    return res.json(products);
  });
   
  app.post('/api/auth', (req,res) => { //signs in user
    let user = data.users.filter((user) => {
      return user.name == req.body.name && user.password == req.body.password;
    });
    if (user.length){
      // create a token using user name and password vaild for 2 hours
      let token_payload = {name: user[0].name, password: user[0].password};
      let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
      let response = { message: 'Token Created, Authentication Successful!', 
                       token: token };
   
        // return the information including token as JSON
        return res.status(200).json(response);
   
    } else {
        return res.status("401").json("Authentication failed. admin not found.");
    }
  });
   
  app.get('/api/pay', middleware, (req, res) => { //checkout route for signed in users
    return res.json("Payment Successful!");
  });
  

// app.get('/api/customers', (_req, res) => {
//     const customers =[
//         {id:1, firstName: 'Juan', lastName: 'Serret'},
//         {id:2, firstName: 'Vanessa', lastName: 'Serret'},
//         {id:3, firstName: 'Sarah', lastName: 'Whiddon'}
//     ];
//     res.json(customers);
// });


const mongoURI = 'mongodb+srv://admin:admin123@cluster0-ywzdx.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {useNewUrlParser: true})
    .catch(err => console.log(err));

const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database conncetion established successfully");
});

app.listen(port, ()=> console.log('Server started on port' + port));
