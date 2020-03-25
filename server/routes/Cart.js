
const data = require('../data');
const express = require('express');
const ObjectID = require('mongodb').ObjectID;
var cors = require('cors');
const cart = express.Router();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');


const Book = require("../models/Book");
cart.use(cors());

cart.use(bodyParser.json());
cart.use(
  bodyParser.urlencoded({
    extended: false
  })
);

cart.get('/api/products', (req, res) => {
  return res.json(data.products);
});

cart.post('/api/products', (req, res) => {
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

cart.get('/Products/api/products', (req, res) => {
  const book_ID = new mongoose.Types.ObjectId(req.body._id);
  console.log("Get aaaaaahhhhhhh")
    Book.find(
    {
          _id: book_ID

    }, (err, books) => {
    res.json(books)
  })  
})
// cart.get('/api/products', (req, res) => {
//   return res.json(data.products);
// });
//     cart.post('/api/products', (req, res) => {
//       let products = [], id = null;
//       let cart = JSON.parse(req.body.cart);
//       if (!cart) return res.json(products)
//       for (var i = 0; i < data.products.length; i++) {
//         id = data.products[i].id.toString();
//         if (cart.hasOwnProperty(id)) {
//           data.products[i].qty = cart[id]
//           products.push(data.products[i]);
//         }
//       }
//       return res.json(products);
//     });

// //endpoint to get books from db
// cart.post('/api/products',(req,res)=> {
//   console.log("Hello from route Cart get")
//   const book_ID = new mongoose.Types.ObjectId(req.body._id);
//     var decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
//     Book.find({
//         _id:book_ID,
//     }).then(books => {
//             console.log('Hellllooooo')
//       if (book == null) {
//         res.send("Book is null");
//       } else {
//         res.send(book);
//       }
//     });
// });

// //endpoint to post books
// cart.post('/Products/api/products', (req, res) =>{
//   console.log('Hello from Cart route file')
//   const book_ID = new mongoose.Types.ObjectId(req.body._id);

//   const decoded = jwt.verify(req.headers['authorization'], SECRET_KEY);
//   Book.findOne(
//       {
//           _id: book_ID
//       })
//       .then(books => {
//         const book_id = req.body.book_id;
//         let findBook = books.bookList.find(books => books._id.equals(ObjectID(findBook)));
        
//         findBook.books.push(ObjectID(book_id));
//         Book.findOne({_id: ObjectID(book_id)})
//         .then(
//             book => {
//                 wishListTo.books.push(book);
//                 res.json({message: 'success', bookList: books.bookList});
//             }
//         )


//       });
  

// })

//   //enpoint to post products in cart
//   cart.post('/api/products', (req, res) => {
//     let products = [], id = null;
//     let cart = JSON.parse(req.body.cart);
//     if (!cart) return res.json(products)
//     for (var i = 0; i < data.products.length; i++) {
//       id = data.products[i].id.toString();
//       if (cart.hasOwnProperty(id)) {
//         data.products[i].qty = cart[id]
//         products.push(data.products[i]);
//       }
//     }
//     return res.json(products);
//   });  
  
module.exports = cart;
