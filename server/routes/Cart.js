// const express = require('express');
// var cors = require('cors');
// const carts = express.Router();

// // const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcrypt');

// /*
//   see https://mongoosejs.com/docs/models.html for querying, deleting, and updating documents
// */

// //get user model
// const cart = require("../models/Cart");
// carts.use(cors());

// SECRET_KEY = "MySecret";

// //add cart to database
// carts.post('/Cart', (req, res) => {

// //store information from request body that will be used to create a cart
// const newCart = {
//     book: req.body.book
// };

// //const port = 5000;
// carts.use(bodyParser.json());
// carts.use(cors());
// carts.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// );

// carts.get('/products', (req, res) => { //lists all  available products
//     return res.json(data.products);
//   });
  

//  //store cartItem that was given in request body, need to cast the string into ObjectId
//   const cartItem = new mongoose.Types.ObjectId(req.body._id);

//   cart.post('/Cart', (req, res) => { //generates the list of products in the cart
//     let products = [], id = null;
//     let cart1 = JSON.parse(req.body.cart);
//     if (!cart1) return res.json(products)
//     for (var i = 0; i < data.products.length; i++) {
//       id = data.products[i].id.toString();
//       if (cart1.hasOwnProperty(id)) {
//         data.products[i].qty = cart1[id]
//         products.push(data.products[i]);
//       }
//     }
//     return res.json(products);
//   });
  
  
// //   app.get('/api/pay', middleware, (req, res) => { //checkout route for signed in users
// //     return res.json("Payment Successful!");
// //   });

// });